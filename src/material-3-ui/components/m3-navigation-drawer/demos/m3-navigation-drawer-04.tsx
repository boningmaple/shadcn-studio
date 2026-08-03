import * as React from "react";
import {
  ArchiveIcon,
  BellIcon,
  InboxIcon,
  MenuIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3ModalNavigationDrawer,
  M3NavigationDrawerDivider,
  M3NavigationDrawerHeader,
  M3NavigationDrawerItem,
  M3NavigationDrawerSection,
  M3NavigationDrawerTrigger,
} from "@/material-3-ui/components/m3-navigation-drawer/m3-navigation-drawer";

const destinations = [
  {
    badge: "24",
    href: "#inbox",
    icon: InboxIcon,
    id: "inbox",
    label: "Inbox",
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
  const [selected, setSelected] = React.useState("inbox");

  return (
    <M3NavigationDrawerTrigger>
      <M3IconButton aria-label="Open account drawer" variant="tonal">
        <MenuIcon />
      </M3IconButton>
      <M3ModalNavigationDrawer>
        <M3NavigationDrawerHeader>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-[#6750a4] text-lg font-medium text-white dark:bg-[#d0bcff] dark:text-[#381e72]">
              A
            </span>
            <span className="grid min-w-0">
              <span className="truncate text-base leading-6 text-[#1d1b20] dark:text-[#e6e0e9]">
                Alex Morgan
              </span>
              <span className="truncate text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
                alex@example.com
              </span>
            </span>
          </div>
        </M3NavigationDrawerHeader>
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
              slot="close"
            />
          ))}
        </M3NavigationDrawerSection>
        <M3NavigationDrawerDivider />
        <M3NavigationDrawerSection>
          <M3NavigationDrawerItem
            href="#notifications"
            icon={<BellIcon />}
            label="Notification settings"
            slot="close"
          />
        </M3NavigationDrawerSection>
      </M3ModalNavigationDrawer>
    </M3NavigationDrawerTrigger>
  );
}
