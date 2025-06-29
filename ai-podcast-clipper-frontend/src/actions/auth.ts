"use server";

import { hashPassword } from "~/lib/auth";
import { signupSchema, type SignupFormValues } from "~/schemas/auth";
import { db } from "~/server/db";
import Stripe from "stripe";
import { env } from "~/env";

type signupResult = {
  success: boolean;
  error?: string;
};

export async function signUp(data: SignupFormValues): Promise<signupResult> {
  const validationResult = signupSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const { email, password } = validationResult.data;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Email already in use, please login",
      };
    }

    const hashedPassword = await hashPassword(password);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const strip = new Stripe(env.STRIPE_SECRECT_KEY);

    const stripCustomer = await strip.customers.create({
      email: email.toLowerCase(),
    });

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        stripCustomId: stripCustomer.id,
      },
    });

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong" };
  }
}
