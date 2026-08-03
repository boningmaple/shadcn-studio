import * as React from "react";
import {
  ArchiveIcon,
  Clock3Icon,
  InboxIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";

import {
  MDNavigationRail,
  MDNavigationRailContent,
  MDNavigationRailItem,
} from "@/ui/material-design/components/md-navigation-rail/md-navigation-rail";

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

export default function MDNavigationRailDemo() {
  const [selected, setSelected] = React.useState("inbox");

  return (
    <MDNavigationRail className="rounded-[24px]" width="6rem">
      <MDNavigationRailContent>
        {destinations.map((destination) => (
          <MDNavigationRailItem
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            labelVisibility="always"
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </MDNavigationRailContent>
    </MDNavigationRail>
  );
}
