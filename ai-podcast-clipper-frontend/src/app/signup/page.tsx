"use server";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppLogo from "~/components/app-logo";

import { SignupForm } from "~/components/signup-form";
import { auth } from "~/server/auth";
import {
  Zap,
  Play,
  Volume2,
  Sparkles,
  Scissors,
  AudioWaveform,
} from "lucide-react";

const LoginBackground = () => {
  return (
    <div className="from-primary/5 via-background to-accent/10 relative max-h-screen overflow-hidden bg-gradient-to-br">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* CSS-only floating orbs */}
        <div className="bg-chart-2/20 animate-float absolute top-1/4 right-1/4 h-32 w-32 rounded-full blur-2xl" />
        <div className="bg-primary/15 animate-float-delayed absolute bottom-1/3 left-1/3 h-24 w-24 rounded-full blur-xl" />
        <div className="bg-accent/10 absolute top-2/3 right-1/3 h-40 w-40 animate-pulse rounded-full blur-3xl" />
        <div
          className="bg-chart-3/20 absolute top-1/2 left-1/4 h-16 w-16 animate-bounce rounded-full blur-xl"
          style={{ animationDuration: "3s" }}
        />

        {/* Gradient overlay */}
        <div className="from-primary/5 to-accent/5 absolute inset-0 bg-gradient-to-t via-transparent" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
              `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-12">
        {/* Title */}
        <div className="animate-fade-in-delayed mb-12 text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold">
            Welcome to{" "}
            <span className="from-primary to-chart-2 bg-gradient-to-r bg-clip-text text-transparent">
              PodClip AI
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-lg">
            Transform your podcasts into viral clips with the power of AI
          </p>
        </div>

        {/* Feature showcase */}
        <div className="animate-fade-in-slow mx-auto grid max-w-sm grid-cols-1 gap-6">
          {/* AI Processing Card */}
          <div className="bg-card/80 border-border/20 hover:border-primary/30 rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105">
            <div className="mb-4 flex items-center space-x-4">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                <Zap className="text-primary h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold">AI Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Smart content detection
                </p>
              </div>
            </div>

            {/* Mini waveform */}
            <div className="flex h-8 items-center space-x-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-primary/40 animate-pulse rounded-full"
                  style={{
                    width: "3px",
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Clip Generation Card */}
          <div className="bg-card/80 border-border/20 hover:border-chart-2/30 rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105">
            <div className="mb-4 flex items-center space-x-4">
              <div className="bg-chart-2/10 flex h-12 w-12 items-center justify-center rounded-xl">
                <Scissors
                  className="text-chart-2 h-6 w-6 animate-bounce"
                  style={{ animationDuration: "2s" }}
                />
              </div>
              <div>
                <h3 className="text-foreground font-semibold">Auto Clipping</h3>
                <p className="text-muted-foreground text-sm">
                  Perfect moments captured
                </p>
              </div>
            </div>

            {/* Generated clips preview */}
            <div className="space-y-2">
              {[1, 2].map((clip) => (
                <div
                  key={clip}
                  className="bg-accent/20 flex items-center space-x-3 rounded-lg p-2"
                >
                  <div className="bg-chart-2/20 flex h-6 w-6 items-center justify-center rounded-md">
                    <Play className="text-chart-2 h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="text-foreground text-xs">Clip {clip}</div>
                    <div className="text-muted-foreground text-xs">
                      0:{clip * 15}s
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="from-primary/10 to-chart-2/10 border-border/20 rounded-2xl border bg-gradient-to-r p-6 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-foreground text-2xl font-bold">10K+</div>
                <div className="text-muted-foreground text-xs">
                  Clips Generated
                </div>
              </div>
              <div>
                <div className="text-foreground text-2xl font-bold">95%</div>
                <div className="text-muted-foreground text-xs">Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating sparkles */}
        <div className="animate-float absolute top-20 left-20">
          <Sparkles className="text-primary/40 h-6 w-6" />
        </div>
        <div className="animate-float-delayed absolute right-16 bottom-32">
          <Volume2 className="text-chart-2/40 h-5 w-5" />
        </div>
        <div className="absolute top-40 right-32 animate-pulse">
          <AudioWaveform className="text-accent/60 h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

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
            <AppLogo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <LoginBackground />
      </div>
    </div>
  );
}
