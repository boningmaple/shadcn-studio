import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function LandingPage01() {
  return (
    <main className="min-h-svh">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-semibold">Northstar</span>
        <Button size="sm" variant="outline">
          Sign in
        </Button>
      </nav>
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <p className="mb-5 rounded-full border px-3 py-1 text-xs font-medium">Now in public beta</p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
          Turn your next big idea into momentum
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          Northstar gives modern teams one beautiful place to plan, build, and learn together.
        </p>
        <Button className="mt-8">
          Start for free <ArrowRightIcon data-icon="inline-end" />
        </Button>
        <div className="mt-20 grid w-full grid-cols-3 gap-6 border-y py-8 text-left">
          {[
            ["12k+", "teams"],
            ["42%", "faster delivery"],
            ["99.99%", "uptime"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-2xl font-semibold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
