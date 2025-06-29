"use client";

import type { VariantProps } from "class-variance-authority";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { createCheckoutSession, type PriceId } from "~/actions/stripe";
import { Button, type buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type PricingPlan = {
  title: string;
  price: string;
  description: string;
  features: string;
  buttonText: string;
  buttonVariant: VariantProps<typeof buttonVariants>["variant"];
  isPopular?: boolean;
  savePercentage?: string;
  priceId: PriceId;
};

const pricingPlans: PricingPlan[] = [
  {
    title: "Starter",
    price: "₹299",
    description: "Best for trying things out.",
    features: "Includes 10 clip generations (~₹29.9/clip)",
    buttonText: "Get Started",
    buttonVariant: "outline",
    priceId: "small",
  },
  {
    title: "Pro",
    price: "₹899",
    description: "Ideal for content creators and podcasters.",
    features: "Includes 50 clip generations (~₹17.98/clip)",
    buttonText: "Choose Pro",
    buttonVariant: "default",
    isPopular: true,
    savePercentage: "40%",
    priceId: "medium",
  },
  {
    title: "Agency",
    price: "₹1499",
    description: "For teams & power users needing high volume.",
    features: "Includes 100 clip generations (~₹14.99/clip)",
    buttonText: "Choose Agency",
    buttonVariant: "secondary",
    savePercentage: "50%",
    priceId: "large",
  },
];

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <Card
      key={plan.title}
      className={`hover:border-accent-foreground/50 flex flex-col justify-between transition-shadow hover:shadow-2xl ${
        plan.isPopular ? "border-primary hover:border-primary/70 border-2" : ""
      }`}
    >
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold">{plan.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold">{plan.price}</div>
        {plan.savePercentage && (
          <span className="text-muted-foreground text-sm">
            Save {plan.savePercentage} compared to Starter
          </span>
        )}
        <p>{plan.features}</p>
      </CardContent>
      <CardFooter>
        <form
          className="w-full"
          action={() => createCheckoutSession(plan.priceId)}
        >
          <Button
            variant={plan.isPopular ? "default" : "outline"}
            className="w-full"
            type="submit"
          >
            {plan.buttonText}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
const BillingsPage = () => {
  return (
    <div className="py mx-auto flex flex-col space-y-8 px-4 lg:px-16">
      <div className="relative flex items-center justify-center gap-4">
        <Button className="group absolute top-0 left-0" variant={"secondary"}>
          <Link href={"/dashboard"}>
            <ArrowLeftIcon className="size-5 transition-all duration-500 group-hover:rotate-45" />
          </Link>
        </Button>
        <div className="space-y-2 text-center">
          <h1 className="font-mono text-2xl font-bold tracking-tight sm:text-4xl">
            Buy Credits
          </h1>
          <p className="text-accent-foreground/80">
            Purchase credits to generate clips
          </p>
          <p className="text-accent-foreground font-mono">
            1 credits = 1 clip generation,
            <br /> let&apos;s say you generated 3 clips hence 3 credits will be
            deducted from your podcast clipper account
          </p>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard plan={plan} key={plan.title} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BillingsPage;
