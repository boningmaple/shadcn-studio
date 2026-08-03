import * as React from "react";
import { HomeIcon, ImageIcon, SearchIcon, SettingsIcon } from "lucide-react";

import {
  MDNavigationRail,
  MDNavigationRailContent,
  MDNavigationRailItem,
} from "@/ui/material-design/components/md-navigation-rail/md-navigation-rail";

const destinations = [
  {
    href: "#home",
    icon: HomeIcon,
    id: "home",
    label: "Home",
  },
  {
    href: "#search",
    icon: SearchIcon,
    id: "search",
    label: "Search",
  },
  {
    href: "#gallery",
    icon: ImageIcon,
    id: "gallery",
    label: "Gallery",
  },
  {
    href: "#settings",
    icon: SettingsIcon,
    id: "settings",
    label: "Settings",
  },
] as const;

export default function MDNavigationRailDemo() {
  const [selected, setSelected] = React.useState("gallery");

  return (
    <div className="grid w-full max-w-3xl overflow-hidden rounded-[20px] border border-[#cac4d0] bg-[#fffbfe] grid-cols-[auto_minmax(0,1fr)] dark:border-[#49454f] dark:bg-[#1d1b20]">
      <MDNavigationRail showDivider>
        <MDNavigationRailContent alignment="center">
          {destinations.map((destination) => (
            <MDNavigationRailItem
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
      <main className="grid min-h-[32rem] content-start gap-4 p-6">
        <span className="text-sm font-medium text-[#6750a4] dark:text-[#d0bcff]">
          Adaptive layout
        </span>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-32 rounded-[20px] bg-[#f7f2fa] dark:bg-[#211f26]" />
          <div className="h-32 rounded-[20px] bg-[#f7f2fa] dark:bg-[#211f26]" />
          <div className="h-32 rounded-[20px] bg-[#f7f2fa] dark:bg-[#211f26]" />
          <div className="h-32 rounded-[20px] bg-[#f7f2fa] dark:bg-[#211f26]" />
        </div>
      </main>
    </div>
  );
}
