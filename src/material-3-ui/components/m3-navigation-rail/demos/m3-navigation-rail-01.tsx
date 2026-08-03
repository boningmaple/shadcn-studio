import * as React from "react";
import {
  HomeIcon,
  ImageIcon,
  PlusIcon,
  SearchIcon,
  UserRoundIcon,
} from "lucide-react";

import { M3FABButton } from "@/material-3-ui/components/m3-fab/m3-fab";
import {
  M3NavigationRail,
  M3NavigationRailContent,
  M3NavigationRailHeader,
  M3NavigationRailItem,
} from "@/material-3-ui/components/m3-navigation-rail/m3-navigation-rail";

const destinations = [
  {
    badge: null,
    href: "#home",
    icon: HomeIcon,
    id: "home",
    label: "Home",
  },
  {
    badge: null,
    href: "#search",
    icon: SearchIcon,
    id: "search",
    label: "Search",
  },
  {
    badge: "6",
    href: "#images",
    icon: ImageIcon,
    id: "images",
    label: "Images",
  },
  {
    badge: null,
    href: "#profile",
    icon: UserRoundIcon,
    id: "profile",
    label: "Profile",
  },
] as const;

export default function M3NavigationRailDemo() {
  const [selected, setSelected] = React.useState("home");

  return (
    <M3NavigationRail className="rounded-[24px]" showDivider>
      <M3NavigationRailHeader>
        <M3FABButton aria-label="Create" color="primary" size="small">
          <PlusIcon />
        </M3FABButton>
      </M3NavigationRailHeader>
      <M3NavigationRailContent>
        {destinations.map((destination) => (
          <M3NavigationRailItem
            badge={destination.badge}
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </M3NavigationRailContent>
    </M3NavigationRail>
  );
}
