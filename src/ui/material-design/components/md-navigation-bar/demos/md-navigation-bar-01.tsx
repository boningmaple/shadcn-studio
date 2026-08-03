import * as React from "react";
import { HomeIcon, SearchIcon, UserRoundIcon } from "lucide-react";

import {
  MDNavigationBar,
  MDNavigationBarItem,
} from "@/ui/material-design/components/md-navigation-bar/md-navigation-bar";

const destinations = [
  {
    href: "#home",
    icon: HomeIcon,
    id: "home",
    label: "Home",
  },
  {
    href: "#browse",
    icon: SearchIcon,
    id: "browse",
    label: "Browse",
  },
  {
    href: "#profile",
    icon: UserRoundIcon,
    id: "profile",
    label: "Profile",
  },
] as const;

export default function MDNavigationBarDemo() {
  const [selected, setSelected] = React.useState("home");

  return (
    <MDNavigationBar className="max-w-md overflow-hidden rounded-[24px]">
      {destinations.map((destination) => (
        <MDNavigationBarItem
          href={destination.href}
          icon={<destination.icon />}
          isSelected={selected === destination.id}
          key={destination.id}
          label={destination.label}
          onPress={() => setSelected(destination.id)}
        />
      ))}
    </MDNavigationBar>
  );
}
