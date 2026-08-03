import { EditIcon, NavigationIcon, SendIcon, StarIcon } from "lucide-react";

import { M3ExtendedFABButton } from "@/material-3-ui/components/m3-extended-fab/m3-extended-fab";

const fabs = [
  { color: "surface", icon: EditIcon, label: "Edit" },
  { color: "primary", icon: SendIcon, label: "Send" },
  { color: "secondary", icon: NavigationIcon, label: "Navigate" },
  { color: "tertiary", icon: StarIcon, label: "Favorite" },
] as const;

export default function M3ExtendedFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {fabs.map(({ color, icon: Icon, label }) => (
        <M3ExtendedFABButton color={color} key={color}>
          <Icon />
          {label}
        </M3ExtendedFABButton>
      ))}
    </div>
  );
}
