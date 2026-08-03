import * as React from "react";
import {
  ArchiveIcon,
  HomeIcon,
  MessageSquareIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";

import {
  M3NavigationDrawerHeader,
  M3NavigationDrawerItem,
  M3NavigationDrawerSection,
  M3StandardNavigationDrawer,
} from "@/material-3-ui/components/m3-navigation-drawer/m3-navigation-drawer";

const destinations = [
  {
    badge: null,
    href: "#home",
    icon: HomeIcon,
    id: "home",
    label: "Home",
  },
  {
    badge: "12",
    href: "#messages",
    icon: MessageSquareIcon,
    id: "messages",
    label: "Messages",
  },
  {
    badge: null,
    href: "#starred",
    icon: StarIcon,
    id: "starred",
    label: "Starred",
  },
  {
    badge: null,
    href: "#sent",
    icon: SendIcon,
    id: "sent",
    label: "Sent",
  },
  {
    badge: null,
    href: "#archive",
    icon: ArchiveIcon,
    id: "archive",
    label: "Archive",
  },
] as const;

export default function M3NavigationDrawerDemo() {
  const [selected, setSelected] = React.useState("home");

  return (
    <div className="grid w-full max-w-4xl overflow-hidden rounded-[16px] border border-[#cac4d0] bg-[#fffbfe] md:grid-cols-[auto_minmax(0,1fr)] dark:border-[#49454f] dark:bg-[#1d1b20]">
      <M3StandardNavigationDrawer>
        <M3NavigationDrawerHeader
          headline="Studio"
          supportingText="Material workspace"
        />
        <M3NavigationDrawerSection>
          {destinations.map((destination) => (
            <M3NavigationDrawerItem
              badge={destination.badge}
              href={destination.href}
              icon={<destination.icon />}
              isSelected={selected === destination.id}
              key={destination.id}
              label={destination.label}
              onPress={() => setSelected(destination.id)}
            />
          ))}
        </M3NavigationDrawerSection>
      </M3StandardNavigationDrawer>
      <main className="grid min-h-[32rem] content-start gap-4 p-6">
        <h3 className="font-heading text-2xl leading-8 font-normal text-[#1d1b20] dark:text-[#e6e0e9]">
          {destinations.find((destination) => destination.id === selected)
            ?.label ?? "Home"}
        </h3>
        <div className="grid gap-3">
          <div className="h-24 rounded-[20px] bg-[#f7f2fa] dark:bg-[#211f26]" />
          <div className="h-16 rounded-[20px] bg-[#f7f2fa] dark:bg-[#211f26]" />
          <div className="h-16 rounded-[20px] bg-[#f7f2fa] dark:bg-[#211f26]" />
        </div>
      </main>
    </div>
  );
}
