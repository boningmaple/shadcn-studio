import { createFileRoute } from "@tanstack/react-router";

import Tabs01 from "@/demos/components/tabs/tabs-01";
import Tabs02 from "@/demos/components/tabs/tabs-02";
import Tabs03 from "@/demos/components/tabs/tabs-03";
import Tabs04 from "@/demos/components/tabs/tabs-04";
import Tabs05 from "@/demos/components/tabs/tabs-05";
import Tabs06 from "@/demos/components/tabs/tabs-06";
import Tabs07 from "@/demos/components/tabs/tabs-07";
import Tabs08 from "@/demos/components/tabs/tabs-08";
import Tabs09 from "@/demos/components/tabs/tabs-09";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/tabs")({
  component: TabsComponentPage,
  head: () => ({
    meta: [
      {
        title: "Tabs Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 tab patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function TabsComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="tabs"
      description="Explore Material 3 primary and secondary tabs, built with React Aria UI, React, and Tailwind CSS."
      exampleNoun="tabs"
      examples={tabsExamples}
      sectionId="tabs-variants-title"
      sectionTitle="Tab Variants and States"
      title="Tabs"
    />
  );
}

const tabsExamples: ComponentExample[] = [
  {
    component: Tabs01,
    id: "01",
    name: "Primary tabs",
    wide: true,
  },
  {
    component: Tabs02,
    id: "02",
    name: "Secondary tabs",
    wide: true,
  },
  {
    component: Tabs03,
    id: "03",
    name: "Primary active tab states",
    wide: true,
  },
  {
    component: Tabs04,
    id: "04",
    name: "Primary inactive tab states",
    wide: true,
  },
  {
    component: Tabs05,
    id: "05",
    name: "Secondary active tab states",
    wide: true,
  },
  {
    component: Tabs06,
    id: "06",
    name: "Secondary inactive tab states",
    wide: true,
  },
  {
    component: Tabs07,
    id: "07",
    name: "Primary tabs with icons",
    wide: true,
  },
  {
    component: Tabs08,
    id: "08",
    name: "Tabs with disabled item",
    wide: true,
  },
  {
    component: Tabs09,
    id: "09",
    name: "Vertical tabs",
    wide: true,
  },
];
