import * as React from "react";
import {
  HomeIcon,
  ImageIcon,
  PlusIcon,
  SearchIcon,
  UserRoundIcon,
} from "lucide-react";

import { FABButton } from "@/components/fab/fab";
import {
  NavigationRail,
  NavigationRailContent,
  NavigationRailHeader,
  NavigationRailItem,
} from "@/components/navigation-rail/navigation-rail";

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

export default function NavigationRailDemo() {
  const [selected, setSelected] = React.useState("home");

  return (
    <NavigationRail className="rounded-[24px]" showDivider>
      <NavigationRailHeader>
        <FABButton aria-label="Create" color="primary" size="small">
          <PlusIcon />
        </FABButton>
      </NavigationRailHeader>
      <NavigationRailContent>
        {destinations.map((destination) => (
          <NavigationRailItem
            badge={destination.badge}
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </NavigationRailContent>
    </NavigationRail>
  );
}
