"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  Zap,
  Scissors,
  Sparkles,
  ArrowRight,
  Volume2,
  Download,
} from "lucide-react";
import Link from "next/link";
import AppLogo from "~/components/app-logo";

const PodcastClipperLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced AI identifies the most engaging moments in your podcast",
    },
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Smart Clipping",
      description:
        "Automatically generate viral-worthy clips with perfect timing",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Context-Aware",
      description:
        "Understands your content to create clips that maintain meaning",
    },
  ];

  const stats = [
    { number: "10K+", label: "Clips Generated" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "5min", label: "Processing Time" },
  ];

  return (
    <div className="from-background via-card to-background relative min-h-screen overflow-hidden bg-gradient-to-b">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="bg-primary/5 absolute h-96 w-96 animate-pulse rounded-full blur-3xl"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="bg-accent/10 absolute top-1/4 right-1/4 h-64 w-64 animate-bounce rounded-full blur-2xl"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="bg-chart-2/10 absolute bottom-1/4 left-1/4 h-48 w-48 animate-pulse rounded-full blur-xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <AppLogo />

          <Link href={"/dashboard"}>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Get Started
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div
              className={`space-y-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            >
              <div className="bg-accent/20 text-accent-foreground inline-flex items-center space-x-2 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Podcast Clipping</span>
              </div>

              <h1 className="text-foreground text-5xl leading-tight font-bold md:text-7xl">
                Turn Your
                <span className="from-primary to-chart-2 animate-gradient bg-gradient-to-r bg-clip-text text-transparent">
                  {" "}
                  Podcast{" "}
                </span>
                Into Viral Clips
              </h1>

              <p className="text-muted-foreground max-w-lg text-xl leading-relaxed">
                Our AI analyzes your podcast content and automatically generates
                engaging clips that capture your best moments and drive audience
                growth.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href={"/dashboard"}>
                  <button className="group bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2 rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <span>Start Clipping Now</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>

                <button className="group border-border text-foreground hover:bg-accent/50 flex items-center space-x-2 rounded-xl border px-8 py-4 font-semibold transition-all duration-300">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-foreground text-2xl font-bold">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Demo Area */}
            <div
              className={`relative ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-card border-border/20 relative rounded-3xl border p-8 shadow-2xl backdrop-blur-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-card-foreground text-lg font-semibold">
                    AI Clipping in Action
                  </h3>
                  <div className="flex space-x-2">
                    <div className="bg-destructive h-3 w-3 rounded-full" />
                    <div className="bg-chart-3 h-3 w-3 rounded-full" />
                    <div className="bg-chart-2 h-3 w-3 rounded-full" />
                  </div>
                </div>

                {/* Simulated waveform */}
                <div className="mb-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground text-sm">
                      Original Podcast Audio
                    </span>
                  </div>
                  <div className="bg-muted/50 flex h-16 items-center space-x-1 rounded-lg p-2">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-primary/60 animate-pulse rounded-full"
                        style={{
                          width: "2px",
                          height: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* AI Processing */}
                <div className="mb-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="text-primary h-4 w-4 animate-pulse" />
                    <span className="text-primary text-sm">
                      AI Processing...
                    </span>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="bg-chart-2 h-2 w-2 animate-pulse rounded-full" />
                        <span className="text-muted-foreground text-xs">
                          Analyzing speech patterns
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="bg-chart-3 h-2 w-2 animate-pulse rounded-full"
                          style={{ animationDelay: "0.5s" }}
                        />
                        <span className="text-muted-foreground text-xs">
                          Identifying key moments
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="bg-primary h-2 w-2 animate-pulse rounded-full"
                          style={{ animationDelay: "1s" }}
                        />
                        <span className="text-muted-foreground text-xs">
                          Generating clips
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Generated Clips */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Scissors className="text-chart-2 h-4 w-4" />
                    <span className="text-chart-2 text-sm">
                      Generated Clips
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((clip) => (
                      <div
                        key={clip}
                        className="bg-accent/20 hover:bg-accent/30 flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                            <Play className="text-primary-foreground h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-foreground text-sm font-medium">
                              Clip {clip}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              0:{clip * 30}s
                            </div>
                          </div>
                        </div>
                        <Download className="text-muted-foreground hover:text-foreground h-4 w-4 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="bg-primary/10 absolute -top-4 -right-4 h-16 w-16 animate-pulse rounded-full blur-xl" />
              <div
                className="bg-chart-2/10 absolute -bottom-8 -left-8 h-24 w-24 animate-bounce rounded-full blur-2xl"
                style={{ animationDuration: "4s" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="from-card/50 to-accent/10 relative z-10 bg-gradient-to-r px-6 py-20 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Powered by Advanced AI
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Our intelligent algorithms understand context, tone, and
              engagement patterns to create clips that resonate with your
              audience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-card/80 border-border/20 hover:border-primary/20 relative rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  activeFeature === index
                    ? "ring-primary/20 bg-primary/5 ring-2"
                    : ""
                }`}
              >
                <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors">
                  <div className="text-primary transition-transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-foreground mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>

                <div className="from-primary/5 to-chart-2/5 absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="from-primary/10 to-chart-2/10 border-border/20 rounded-3xl border bg-gradient-to-r p-12 backdrop-blur-sm">
            <h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
              Ready to Create Viral Clips?
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
              Join thousands of podcasters who are already using AI to grow
              their audience and increase engagement.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={"/dashboard"}>
                <button className="group bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center space-x-2 rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <button className="border-border text-foreground hover:bg-accent/50 rounded-xl border px-8 py-4 font-semibold transition-all duration-300">
                Schedule Demo
              </button>
            </div>

            <p className="text-muted-foreground mt-6 text-sm">
              No credit card required • 5 credits free • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PodcastClipperLanding;
