import { Podcast } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "~/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Podcast className="size-4" />
            </div>
            Podcast Clipper
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
        <div className="text-accent absolute inset-0 z-10 flex flex-col items-center justify-center">
          <h1 className="text-[3vw] font-bold">Podcast Clipper</h1>
          <p className="text-[1.5vw]">
            Turn long podcast into clips by{" "}
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
