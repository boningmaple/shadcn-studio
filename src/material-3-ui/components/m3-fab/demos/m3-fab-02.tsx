import { NavigationIcon, PencilIcon, SendIcon, StarIcon } from "lucide-react";

import { M3FABButton } from "@/material-3-ui/components/m3-fab/m3-fab";

const fabs = [
  { color: "surface", icon: PencilIcon, label: "Edit" },
  { color: "primary", icon: SendIcon, label: "Send" },
  { color: "secondary", icon: NavigationIcon, label: "Navigate" },
  { color: "tertiary", icon: StarIcon, label: "Favorite" },
] as const;

export default function M3FABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {fabs.map(({ color, icon: Icon, label }) => (
        <M3FABButton aria-label={label} color={color} key={color}>
          <Icon />
        </M3FABButton>
      ))}
    </div>
  );
}
