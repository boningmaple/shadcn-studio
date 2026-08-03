import * as React from "react";
import {
  HomeIcon,
  ImageIcon,
  PlusIcon,
  SearchIcon,
  UserRoundIcon,
} from "lucide-react";

import { MDFABButton } from "@/ui/material-design/components/md-fab/md-fab";
import {
  MDNavigationRail,
  MDNavigationRailContent,
  MDNavigationRailHeader,
  MDNavigationRailItem,
} from "@/ui/material-design/components/md-navigation-rail/md-navigation-rail";

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

export default function MDNavigationRailDemo() {
  const [selected, setSelected] = React.useState("home");

  return (
    <MDNavigationRail className="rounded-[24px]" showDivider>
      <MDNavigationRailHeader>
        <MDFABButton aria-label="Create" color="primary" size="small">
          <PlusIcon />
        </MDFABButton>
      </MDNavigationRailHeader>
      <MDNavigationRailContent>
        {destinations.map((destination) => (
          <MDNavigationRailItem
            badge={destination.badge}
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
  );
}
