import * as React from "react";
import {
  ArchiveIcon,
  Clock3Icon,
  InboxIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";

import {
  NavigationRail,
  NavigationRailContent,
  NavigationRailItem,
} from "@/components/navigation-rail/navigation-rail";

const destinations = [
  {
    href: "#inbox",
    icon: InboxIcon,
    id: "inbox",
    label: "Inbox",
  },
  {
    href: "#starred",
    icon: StarIcon,
    id: "starred",
    label: "Starred",
  },
  {
    href: "#sent",
    icon: SendIcon,
    id: "sent",
    label: "Sent",
  },
  {
    href: "#recent",
    icon: Clock3Icon,
    id: "recent",
    label: "Recent",
  },
  {
    href: "#archive",
    icon: ArchiveIcon,
    id: "archive",
    label: "Archive",
  },
] as const;

export default function NavigationRailDemo() {
  const [selected, setSelected] = React.useState("inbox");

  return (
    <NavigationRail className="rounded-[24px]" width="6rem">
      <NavigationRailContent>
        {destinations.map((destination) => (
          <NavigationRailItem
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            labelVisibility="always"
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </NavigationRailContent>
    </NavigationRail>
  );
}
