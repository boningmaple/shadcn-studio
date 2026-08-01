import * as React from "react";
import {
  BellIcon,
  CalendarDaysIcon,
  MailIcon,
  MessageSquareIcon,
} from "lucide-react";

import {
  NavigationBar,
  NavigationBarItem,
} from "@/components/navigation-bar/navigation-bar";

const destinations = [
  {
    badge: true,
    href: "#inbox",
    icon: MailIcon,
    id: "inbox",
    label: "Inbox",
  },
  {
    badge: "8",
    href: "#messages",
    icon: MessageSquareIcon,
    id: "messages",
    label: "Messages",
  },
  {
    badge: null,
    href: "#calendar",
    icon: CalendarDaysIcon,
    id: "calendar",
    label: "Calendar",
  },
  {
    badge: "99+",
    href: "#alerts",
    icon: BellIcon,
    id: "alerts",
    label: "Alerts",
  },
] as const;

export default function NavigationBarDemo() {
  const [selected, setSelected] = React.useState("messages");

  return (
    <NavigationBar className="max-w-xl overflow-hidden rounded-[24px]">
      {destinations.map((destination) => (
        <NavigationBarItem
          badge={destination.badge}
          href={destination.href}
          icon={<destination.icon />}
          isSelected={selected === destination.id}
          key={destination.id}
          label={destination.label}
          onPress={() => setSelected(destination.id)}
        />
      ))}
    </NavigationBar>
  );
}
