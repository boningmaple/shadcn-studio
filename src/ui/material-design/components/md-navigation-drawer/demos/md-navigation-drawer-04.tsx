import * as React from "react";
import {
  ArchiveIcon,
  BellIcon,
  InboxIcon,
  MenuIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDModalNavigationDrawer,
  MDNavigationDrawerDivider,
  MDNavigationDrawerHeader,
  MDNavigationDrawerItem,
  MDNavigationDrawerSection,
  MDNavigationDrawerTrigger,
} from "@/ui/material-design/components/md-navigation-drawer/md-navigation-drawer";

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

export default function MDNavigationDrawerDemo() {
  const [selected, setSelected] = React.useState("inbox");

  return (
    <MDNavigationDrawerTrigger>
      <MDIconButton aria-label="Open account drawer" variant="tonal">
        <MenuIcon />
      </MDIconButton>
      <MDModalNavigationDrawer>
        <MDNavigationDrawerHeader>
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
        </MDNavigationDrawerHeader>
        <MDNavigationDrawerSection>
          {destinations.map((destination) => (
            <MDNavigationDrawerItem
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
        </MDNavigationDrawerSection>
        <MDNavigationDrawerDivider />
        <MDNavigationDrawerSection>
          <MDNavigationDrawerItem
            href="#notifications"
            icon={<BellIcon />}
            label="Notification settings"
            slot="close"
          />
        </MDNavigationDrawerSection>
      </MDModalNavigationDrawer>
    </MDNavigationDrawerTrigger>
  );
}
