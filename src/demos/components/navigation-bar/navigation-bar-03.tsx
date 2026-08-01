import * as React from "react";
import {
  ArchiveIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
} from "lucide-react";

import {
  NavigationBar,
  NavigationBarItem,
} from "@/components/navigation-bar/navigation-bar";

const destinations = [
  {
    href: "#feed",
    icon: HomeIcon,
    id: "feed",
    label: "Feed",
  },
  {
    href: "#saved",
    icon: StarIcon,
    id: "saved",
    label: "Saved",
  },
  {
    href: "#search",
    icon: SearchIcon,
    id: "search",
    label: "Search",
  },
  {
    href: "#archive",
    icon: ArchiveIcon,
    id: "archive",
    label: "Archive",
  },
  {
    href: "#settings",
    icon: SettingsIcon,
    id: "settings",
    label: "Settings",
  },
] as const;

export default function NavigationBarDemo() {
  const [selected, setSelected] = React.useState("feed");

  return (
    <NavigationBar className="max-w-2xl overflow-hidden rounded-[24px]">
      {destinations.map((destination) => (
        <NavigationBarItem
          href={destination.href}
          icon={<destination.icon />}
          isSelected={selected === destination.id}
          key={destination.id}
          label={destination.label}
          labelVisibility="selected"
          onPress={() => setSelected(destination.id)}
        />
      ))}
    </NavigationBar>
  );
}
