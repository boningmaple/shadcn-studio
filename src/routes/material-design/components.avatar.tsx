import { createFileRoute } from "@tanstack/react-router";

import Avatar01 from "@/ui/material-design/components/md-avatar/demos/md-avatar-01";
import Avatar02 from "@/ui/material-design/components/md-avatar/demos/md-avatar-02";
import Avatar03 from "@/ui/material-design/components/md-avatar/demos/md-avatar-03";
import Avatar04 from "@/ui/material-design/components/md-avatar/demos/md-avatar-04";
import Avatar05 from "@/ui/material-design/components/md-avatar/demos/md-avatar-05";
import Avatar06 from "@/ui/material-design/components/md-avatar/demos/md-avatar-06";
import Avatar07 from "@/ui/material-design/components/md-avatar/demos/md-avatar-07";
import Avatar08 from "@/ui/material-design/components/md-avatar/demos/md-avatar-08";
import Avatar09 from "@/ui/material-design/components/md-avatar/demos/md-avatar-09";
import Avatar10 from "@/ui/material-design/components/md-avatar/demos/md-avatar-10";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/avatar")({
  component: AvatarComponentPage,
  head: () => ({
    meta: [
      {
        title: "Avatar Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Composable avatar patterns with fallbacks, status badges, groups, and interactive states.",
      },
    ],
  }),
});

function AvatarComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="avatar" />;
}

const demoComponents: DemoComponents<"avatar"> = {
  "01": Avatar01,
  "02": Avatar02,
  "03": Avatar03,
  "04": Avatar04,
  "05": Avatar05,
  "06": Avatar06,
  "07": Avatar07,
  "08": Avatar08,
  "09": Avatar09,
  "10": Avatar10,
};
