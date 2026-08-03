import { NavigationIcon, PencilIcon, SendIcon, StarIcon } from "lucide-react";

import { MDFABButton } from "@/ui/material-design/components/md-fab/md-fab";

const fabs = [
  { color: "surface", icon: PencilIcon, label: "Edit" },
  { color: "primary", icon: SendIcon, label: "Send" },
  { color: "secondary", icon: NavigationIcon, label: "Navigate" },
  { color: "tertiary", icon: StarIcon, label: "Favorite" },
] as const;

export default function MDFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {fabs.map(({ color, icon: Icon, label }) => (
        <MDFABButton aria-label={label} color={color} key={color}>
          <Icon />
        </MDFABButton>
      ))}
    </div>
  );
}
