"use server";
import { Podcast } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "~/components/login-form";
import ShinyText from "~/components/ui/shinyText";

import { auth } from "~/server/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Podcast className="size-4" />
            </div>
            <ShinyText
              text="Podcast Clipper"
              disabled={false}
              speed={3}
              className="font-bold"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          height={500}
          width={500}
          src="/banner.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="text-accent absolute inset-0 z-10 ml-4 flex flex-col items-center justify-center px-20 text-center">
          <h1 className="text-[3vw] font-bold">Podcast Clipper</h1>
          <p className="text-[1.5vw] text-shadow-lg">
            Turn long podcast into clips and gain 10x more interaction.
            <br /> Developed by{" "}
            <a
              className="font-semibold"
              href="https://github.com/adityamandal-Developer"
            >
              {" "}
              Aditya Mandal
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
