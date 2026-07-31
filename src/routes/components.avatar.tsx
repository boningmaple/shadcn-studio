import { createFileRoute } from "@tanstack/react-router";

import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";
import Avatar01 from "@/demos/components/avatar/avatar-01";
import Avatar02 from "@/demos/components/avatar/avatar-02";
import Avatar03 from "@/demos/components/avatar/avatar-03";
import Avatar04 from "@/demos/components/avatar/avatar-04";
import Avatar05 from "@/demos/components/avatar/avatar-05";
import Avatar06 from "@/demos/components/avatar/avatar-06";
import Avatar07 from "@/demos/components/avatar/avatar-07";
import Avatar08 from "@/demos/components/avatar/avatar-08";
import Avatar09 from "@/demos/components/avatar/avatar-09";
import Avatar10 from "@/demos/components/avatar/avatar-10";

export const Route = createFileRoute("/components/avatar")({
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
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="avatar"
      description="Explore composable avatars with image fallbacks, sizes, badges, groups, and interactive states, built with React and Tailwind CSS."
      exampleNoun="avatar"
      examples={avatarExamples}
      sectionId="avatar-patterns-title"
      sectionTitle="Avatar Patterns"
      title="Avatar"
    />
  );
}

const avatarExamples: ComponentExample[] = [
  { component: Avatar01, id: "01", name: "Images and fallbacks" },
  { component: Avatar02, id: "02", name: "Avatar sizes" },
  { component: Avatar03, id: "03", name: "Presence statuses" },
  {
    component: Avatar04,
    id: "04",
    name: "Badges with outline rings",
    wide: true,
  },
  {
    component: Avatar05,
    id: "05",
    name: "Outlined avatars",
  },
  {
    component: Avatar06,
    id: "06",
    name: "Avatar buttons",
  },
  { component: Avatar07, id: "07", name: "Avatar group" },
  {
    component: Avatar08,
    id: "08",
    name: "Leading avatar on top",
  },
  { component: Avatar09, id: "09", name: "Group with count" },
  {
    component: Avatar10,
    id: "10",
    name: "Social proof",
  },
];
