import { NavigationIcon, PencilIcon, SendIcon, StarIcon } from "lucide-react";

import { FABButton } from "@/components/fab/fab";

const fabs = [
  { color: "surface", icon: PencilIcon, label: "Edit" },
  { color: "primary", icon: SendIcon, label: "Send" },
  { color: "secondary", icon: NavigationIcon, label: "Navigate" },
  { color: "tertiary", icon: StarIcon, label: "Favorite" },
] as const;

export default function FABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {fabs.map(({ color, icon: Icon, label }) => (
        <FABButton aria-label={label} color={color} key={color}>
          <Icon />
        </FABButton>
      ))}
    </div>
  );
}
