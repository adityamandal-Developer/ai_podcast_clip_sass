/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use server";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import Stripe from "stripe";
import { env } from "~/env";
import { redirect } from "next/navigation";

const stripe = new Stripe(env.STRIPE_SECRECT_KEY, {
  apiVersion: "2025-05-28.basil",
});

export type PriceId = "small" | "medium" | "large";

const PRICE_IDS: Record<PriceId, string> = {
  small: env.STRIPE_STARTER_CREDITS_PACK,
  large: env.STRIPE_AGENCY_CREDITS_PACK,
  medium: env.STRIPE_PRO_CREDITS_PACK,
};

export async function createCheckoutSession(priceId: PriceId) {
  const serverSession = await auth();

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: serverSession?.user.id,
    },
    select: {
      stripCustomId: true,
    },
  });

  if (!user.stripCustomId) {
    throw new Error("User has no stripe id");
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: PRICE_IDS[priceId], quantity: 1 }],
    customer: user.stripCustomId,
    mode: "payment",
    success_url: `${env.BASE_URL}/dashboard?success=true"}`,
  });

  if (!session.url) {
    throw new Error("Failed to create session URL");
  }

  redirect(session.url);
}
