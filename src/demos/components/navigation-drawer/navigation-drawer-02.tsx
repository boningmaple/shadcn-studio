import * as React from "react";
import {
  HomeIcon,
  InboxIcon,
  MenuIcon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";
import {
  ModalNavigationDrawer,
  NavigationDrawerHeader,
  NavigationDrawerItem,
  NavigationDrawerSection,
  NavigationDrawerTrigger,
} from "@/components/navigation-drawer/navigation-drawer";

const destinations = [
  {
    href: "#home",
    icon: HomeIcon,
    id: "home",
    label: "Home",
  },
  {
    href: "#inbox",
    icon: InboxIcon,
    id: "inbox",
    label: "Inbox",
  },
  {
    href: "#profile",
    icon: UserRoundIcon,
    id: "profile",
    label: "Profile",
  },
  {
    href: "#settings",
    icon: SettingsIcon,
    id: "settings",
    label: "Settings",
  },
] as const;

export default function NavigationDrawerDemo() {
  const [selected, setSelected] = React.useState("inbox");

  return (
    <NavigationDrawerTrigger>
      <IconButton aria-label="Open navigation drawer" variant="standard">
        <MenuIcon />
      </IconButton>
      <ModalNavigationDrawer>
        <NavigationDrawerHeader
          headline="Navigation"
          supportingText="Choose a destination"
        />
        <NavigationDrawerSection>
          {destinations.map((destination) => (
            <NavigationDrawerItem
              href={destination.href}
              icon={<destination.icon />}
              isSelected={selected === destination.id}
              key={destination.id}
              label={destination.label}
              onPress={() => setSelected(destination.id)}
              slot="close"
            />
          ))}
        </NavigationDrawerSection>
      </ModalNavigationDrawer>
    </NavigationDrawerTrigger>
  );
}
