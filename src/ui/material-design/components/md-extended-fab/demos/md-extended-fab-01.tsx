import { EditIcon, NavigationIcon, SendIcon, StarIcon } from "lucide-react";

import { MDExtendedFABButton } from "@/ui/material-design/components/md-extended-fab/md-extended-fab";

const fabs = [
  { color: "surface", icon: EditIcon, label: "Edit" },
  { color: "primary", icon: SendIcon, label: "Send" },
  { color: "secondary", icon: NavigationIcon, label: "Navigate" },
  { color: "tertiary", icon: StarIcon, label: "Favorite" },
] as const;

export default function MDExtendedFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {fabs.map(({ color, icon: Icon, label }) => (
        <MDExtendedFABButton color={color} key={color}>
          <Icon />
          {label}
        </MDExtendedFABButton>
      ))}
    </div>
  );
}
