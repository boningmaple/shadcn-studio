import { createFileRoute } from "@tanstack/react-router";

import Tabs01 from "@/ui/material-design/components/md-tabs/demos/md-tabs-01";
import Tabs02 from "@/ui/material-design/components/md-tabs/demos/md-tabs-02";
import Tabs03 from "@/ui/material-design/components/md-tabs/demos/md-tabs-03";
import Tabs04 from "@/ui/material-design/components/md-tabs/demos/md-tabs-04";
import Tabs05 from "@/ui/material-design/components/md-tabs/demos/md-tabs-05";
import Tabs06 from "@/ui/material-design/components/md-tabs/demos/md-tabs-06";
import Tabs07 from "@/ui/material-design/components/md-tabs/demos/md-tabs-07";
import Tabs08 from "@/ui/material-design/components/md-tabs/demos/md-tabs-08";
import Tabs09 from "@/ui/material-design/components/md-tabs/demos/md-tabs-09";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/tabs")({
  component: TabsComponentPage,
  head: () => ({
    meta: [
      {
        title: "Tabs Components | VibeUI",
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
  return <ComponentDemosPage demoComponents={demoComponents} slug="tabs" />;
}

const demoComponents: DemoComponents<"tabs"> = {
  "01": Tabs01,
  "02": Tabs02,
  "03": Tabs03,
  "04": Tabs04,
  "05": Tabs05,
  "06": Tabs06,
  "07": Tabs07,
  "08": Tabs08,
  "09": Tabs09,
};
