import { createFileRoute } from "@tanstack/react-router";

import Menu01 from "@/material-3-ui/components/m3-menu/demos/m3-menu-01";
import Menu02 from "@/material-3-ui/components/m3-menu/demos/m3-menu-02";
import Menu03 from "@/material-3-ui/components/m3-menu/demos/m3-menu-03";
import Menu04 from "@/material-3-ui/components/m3-menu/demos/m3-menu-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-3-ui/components/menu")({
  component: MenuComponentPage,
  head: () => ({
    meta: [
      {
        title: "Menu Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 menu patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function MenuComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="m3-menu"
      description="Explore Material 3 menus with temporary surfaces, sections, shortcuts, selectable items, and submenus."
      exampleNoun="menu"
      examples={menuExamples}
      sectionId="menu-patterns-title"
      sectionTitle="Menu Patterns"
      title="Menu"
    />
  );
}

const menuExamples: ComponentExample[] = [
  {
    component: Menu01,
    id: "01",
    name: "Simple menu",
  },
  {
    component: Menu02,
    id: "02",
    name: "Sectioned menu",
    wide: true,
  },
  {
    component: Menu03,
    id: "03",
    name: "Selectable menu",
  },
  {
    component: Menu04,
    id: "04",
    name: "Submenu",
  },
];
