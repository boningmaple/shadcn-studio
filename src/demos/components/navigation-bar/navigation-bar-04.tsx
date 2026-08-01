import * as React from "react";
import { Clock3Icon, HomeIcon, SendIcon, UserRoundIcon } from "lucide-react";

import {
  NavigationBar,
  NavigationBarItem,
} from "@/components/navigation-bar/navigation-bar";

const destinations = [
  {
    badge: null,
    href: "#overview",
    icon: HomeIcon,
    id: "overview",
    label: "Overview",
  },
  {
    badge: "3",
    href: "#activity",
    icon: Clock3Icon,
    id: "activity",
    label: "Activity",
  },
  {
    badge: null,
    href: "#send",
    icon: SendIcon,
    id: "send",
    label: "Send",
  },
  {
    badge: null,
    href: "#account",
    icon: UserRoundIcon,
    id: "account",
    label: "Account",
  },
] as const;

export default function NavigationBarDemo() {
  const [selected, setSelected] = React.useState("overview");

  return (
    <div className="grid w-full max-w-sm overflow-hidden rounded-[28px] border border-[#cac4d0] bg-[#fffbfe] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] dark:border-[#49454f] dark:bg-[#1d1b20]">
      <div className="grid min-h-[22rem] content-start gap-4 p-6">
        <span className="text-sm font-medium text-[#6750a4] dark:text-[#d0bcff]">
          Dashboard
        </span>
        <div className="grid gap-3">
          <div className="h-24 rounded-[20px] bg-[#f7f2fa] dark:bg-[#211f26]" />
          <div className="h-16 rounded-[20px] bg-[#f7f2fa] dark:bg-[#211f26]" />
          <div className="h-16 rounded-[20px] bg-[#f7f2fa] dark:bg-[#211f26]" />
        </div>
      </div>
      <NavigationBar>
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
    </div>
  );
}
