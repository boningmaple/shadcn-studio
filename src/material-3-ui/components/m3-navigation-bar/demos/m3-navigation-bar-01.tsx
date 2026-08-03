import * as React from "react";
import { HomeIcon, SearchIcon, UserRoundIcon } from "lucide-react";

import {
  M3NavigationBar,
  M3NavigationBarItem,
} from "@/material-3-ui/components/m3-navigation-bar/m3-navigation-bar";

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

export default function M3NavigationBarDemo() {
  const [selected, setSelected] = React.useState("home");

  return (
    <M3NavigationBar className="max-w-md overflow-hidden rounded-[24px]">
      {destinations.map((destination) => (
        <M3NavigationBarItem
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
