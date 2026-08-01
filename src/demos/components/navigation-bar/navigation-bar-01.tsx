import * as React from "react";
import { HomeIcon, SearchIcon, UserRoundIcon } from "lucide-react";

import {
  NavigationBar,
  NavigationBarItem,
} from "@/components/navigation-bar/navigation-bar";

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

export default function NavigationBarDemo() {
  const [selected, setSelected] = React.useState("home");

  return (
    <NavigationBar className="max-w-md overflow-hidden rounded-[24px]">
      {destinations.map((destination) => (
        <NavigationBarItem
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
