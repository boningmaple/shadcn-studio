import * as React from "react";

import { DemoCard } from "@/features/demo-preview/components/demo-card";
import { LargeDemoPreview } from "@/features/demo-preview/components/large-demo-preview";
import { useMarkedAnchorId } from "@/features/demo-preview/lib/use-marked-anchor-id";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import {
  demoAnchorId,
  getComponent,
  type ComponentSlug,
  type Demo,
} from "@/features/search/data/registry";

type ComponentDemosPageProps<TSlug extends ComponentSlug> = {
  demoComponents: DemoComponents<TSlug>;
  slug: TSlug;
};

/** One Component's page: its name, its description, and every one of its Demos. */
export function ComponentDemosPage<TSlug extends ComponentSlug>({
  demoComponents,
  slug,
}: ComponentDemosPageProps<TSlug>) {
  const component = getComponent(slug);
  const markedAnchorId = useMarkedAnchorId();
  // The exact keys are checked where the route module declares them; inside
  // this generic they are only known to be Demo ids of some Component.
  const previews: Record<string, React.ComponentType> = demoComponents;

  return (
    <div className="mx-auto w-full max-w-350 py-6 sm:px-2 sm:py-10">
      <header className="max-w-4xl">
        <h1 className="font-heading text-3xl font-semibold tracking-normal sm:text-4xl">
          {component.name}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          {component.description}
        </p>
      </header>

      <section
        aria-labelledby={component.sectionId}
        className="mt-10 overflow-hidden rounded-lg border bg-card sm:mt-12"
      >
        <div className="flex h-14 items-center border-b bg-muted/45 px-5">
          <h2 className="font-heading text-base font-medium" id={component.sectionId}>
            {component.sectionTitle}
          </h2>
        </div>
        <div className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
          {component.demos.map((demo) => (
            <React.Fragment key={demo.id}>
              {isWideDemo(demo) ? (
                <LargeDemoPreview
                  component={component}
                  demo={demo}
                  isMarked={demoAnchorId(component, demo) === markedAnchorId}
                  preview={previews[demo.id]}
                />
              ) : (
                <DemoCard
                  component={component}
                  demo={demo}
                  isMarked={demoAnchorId(component, demo) === markedAnchorId}
                  preview={previews[demo.id]}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}

function isWideDemo(demo: Demo): boolean {
  return demo.wide === true;
}
