/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { env } from "~/env";
import { db } from "~/server/db";

const stripe = new Stripe(env.STRIPE_SECRECT_KEY, {
  apiVersion: "2025-05-28.basil",
});

const webhookSecrect = env.STRIPE_SIGNING_SECRECT;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") ?? "";

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecrect);
    } catch {
      console.error("webhook signature failed");
      return new NextResponse("Webhook signature verification failed", {
        status: 400,
      });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerId = session.customer as string;

      const retrivedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items"],
        },
      );

      const line_items = retrivedSession.line_items;
      if (line_items && line_items.data.length > 0) {
        const priceId = line_items.data[0]?.price?.id ?? undefined;

        if (priceId) {
          let creditsToAdd = 0;

          if (priceId === env.STRIPE_STARTER_CREDITS_PACK) {
            creditsToAdd = 10;
          } else if (priceId === env.STRIPE_PRO_CREDITS_PACK) {
            creditsToAdd = 50;
          } else if (priceId === env.STRIPE_AGENCY_CREDITS_PACK) {
            creditsToAdd = 100;
          }

          const user = await db.user.update({
            where: {
              stripCustomId: customerId,
            },
            data: {
              credits: {
                increment: creditsToAdd,
              },
            },
          });

          console.log("user=", user);
        }
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Webhook error", { status: 500 });
  }
}
