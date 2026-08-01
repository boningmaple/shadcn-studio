import { EditIcon, NavigationIcon, SendIcon, StarIcon } from "lucide-react";

import { ExtendedFABButton } from "@/components/extended-fab/extended-fab";

const fabs = [
  { color: "surface", icon: EditIcon, label: "Edit" },
  { color: "primary", icon: SendIcon, label: "Send" },
  { color: "secondary", icon: NavigationIcon, label: "Navigate" },
  { color: "tertiary", icon: StarIcon, label: "Favorite" },
] as const;

export default function ExtendedFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {fabs.map(({ color, icon: Icon, label }) => (
        <ExtendedFABButton color={color} key={color}>
          <Icon />
          {label}
        </ExtendedFABButton>
      ))}
    </div>
  );
}
