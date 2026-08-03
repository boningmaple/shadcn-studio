import * as React from "react";
import {
  BellIcon,
  CalendarDaysIcon,
  HomeIcon,
  MessageSquareIcon,
} from "lucide-react";

import {
  MDNavigationRail,
  MDNavigationRailContent,
  MDNavigationRailItem,
} from "@/ui/material-design/components/md-navigation-rail/md-navigation-rail";

const destinations = [
  {
    badge: null,
    href: "#home",
    icon: HomeIcon,
    id: "home",
    label: "Home",
  },
  {
    badge: "3",
    href: "#messages",
    icon: MessageSquareIcon,
    id: "messages",
    label: "Chat",
  },
  {
    badge: null,
    href: "#calendar",
    icon: CalendarDaysIcon,
    id: "calendar",
    label: "Calendar",
  },
  {
    badge: true,
    href: "#alerts",
    icon: BellIcon,
    id: "alerts",
    label: "Alerts",
  },
] as const;

export default function MDNavigationRailDemo() {
  const [selected, setSelected] = React.useState("messages");

  return (
    <MDNavigationRail className="rounded-[24px]" width="4.5rem">
      <MDNavigationRailContent alignment="center">
        {destinations.map((destination) => (
          <MDNavigationRailItem
            badge={destination.badge}
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </MDNavigationRailContent>
    </MDNavigationRail>
  );
}
