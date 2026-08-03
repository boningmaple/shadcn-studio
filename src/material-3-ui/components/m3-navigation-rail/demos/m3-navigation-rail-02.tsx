import * as React from "react";
import {
  BellIcon,
  CalendarDaysIcon,
  HomeIcon,
  MessageSquareIcon,
} from "lucide-react";

import {
  M3NavigationRail,
  M3NavigationRailContent,
  M3NavigationRailItem,
} from "@/material-3-ui/components/m3-navigation-rail/m3-navigation-rail";

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

export default function M3NavigationRailDemo() {
  const [selected, setSelected] = React.useState("messages");

  return (
    <M3NavigationRail className="rounded-[24px]" width="4.5rem">
      <M3NavigationRailContent alignment="center">
        {destinations.map((destination) => (
          <M3NavigationRailItem
            badge={destination.badge}
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </M3NavigationRailContent>
    </M3NavigationRail>
  );
}
