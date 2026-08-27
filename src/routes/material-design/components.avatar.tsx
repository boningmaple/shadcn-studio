import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import Avatar01 from "@/features/ui-material-design/components/md-avatar/demos/md-avatar-01";
import Avatar02 from "@/features/ui-material-design/components/md-avatar/demos/md-avatar-02";
import Avatar03 from "@/features/ui-material-design/components/md-avatar/demos/md-avatar-03";
import Avatar04 from "@/features/ui-material-design/components/md-avatar/demos/md-avatar-04";
import Avatar05 from "@/features/ui-material-design/components/md-avatar/demos/md-avatar-05";
import Avatar06 from "@/features/ui-material-design/components/md-avatar/demos/md-avatar-06";
import Avatar07 from "@/features/ui-material-design/components/md-avatar/demos/md-avatar-07";
import Avatar08 from "@/features/ui-material-design/components/md-avatar/demos/md-avatar-08";
import Avatar09 from "@/features/ui-material-design/components/md-avatar/demos/md-avatar-09";
import Avatar10 from "@/features/ui-material-design/components/md-avatar/demos/md-avatar-10";

export const Route = createFileRoute("/material-design/components/avatar")({
  component: AvatarComponentPage,
  head: () => ({
    meta: [
      {
        title: "Avatar Components | VibeUI",
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
