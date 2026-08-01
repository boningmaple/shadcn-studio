import * as React from "react";
import {
  BellIcon,
  CalendarDaysIcon,
  HomeIcon,
  MessageSquareIcon,
} from "lucide-react";

import {
  NavigationRail,
  NavigationRailContent,
  NavigationRailItem,
} from "@/components/navigation-rail/navigation-rail";

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

export default function NavigationRailDemo() {
  const [selected, setSelected] = React.useState("messages");

  return (
    <NavigationRail className="rounded-[24px]" width="4.5rem">
      <NavigationRailContent alignment="center">
        {destinations.map((destination) => (
          <NavigationRailItem
            badge={destination.badge}
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </NavigationRailContent>
    </NavigationRail>
  );
}
