import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection01() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
      <p className="mb-4 text-sm font-medium text-primary">Ship with confidence</p>
      <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
        A calmer way to build ambitious products
      </h1>
      <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
        Bring planning, design, and delivery into one focused workspace your whole team can use.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button>
          Start building <ArrowRightIcon data-icon="inline-end" />
        </Button>
        <Button variant="outline">See how it works</Button>
      </div>
    </section>
  );
}
