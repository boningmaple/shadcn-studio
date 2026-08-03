import * as React from "react";
import {
  BellIcon,
  CalendarDaysIcon,
  MailIcon,
  MessageSquareIcon,
} from "lucide-react";

import {
  M3NavigationBar,
  M3NavigationBarItem,
} from "@/material-3-ui/components/m3-navigation-bar/m3-navigation-bar";

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

export default function M3NavigationBarDemo() {
  const [selected, setSelected] = React.useState("messages");

  return (
    <M3NavigationBar className="max-w-xl overflow-hidden rounded-[24px]">
      {destinations.map((destination) => (
        <M3NavigationBarItem
          badge={destination.badge}
          href={destination.href}
          icon={<destination.icon />}
          isSelected={selected === destination.id}
          key={destination.id}
          label={destination.label}
          onPress={() => setSelected(destination.id)}
        />
      ))}
    </M3NavigationBar>
  );
}
