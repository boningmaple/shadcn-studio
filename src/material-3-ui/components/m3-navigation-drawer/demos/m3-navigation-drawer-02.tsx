import * as React from "react";
import {
  HomeIcon,
  InboxIcon,
  MenuIcon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3ModalNavigationDrawer,
  M3NavigationDrawerHeader,
  M3NavigationDrawerItem,
  M3NavigationDrawerSection,
  M3NavigationDrawerTrigger,
} from "@/material-3-ui/components/m3-navigation-drawer/m3-navigation-drawer";

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

export default function M3NavigationDrawerDemo() {
  const [selected, setSelected] = React.useState("inbox");

  return (
    <M3NavigationDrawerTrigger>
      <M3IconButton aria-label="Open navigation drawer" variant="standard">
        <MenuIcon />
      </M3IconButton>
      <M3ModalNavigationDrawer>
        <M3NavigationDrawerHeader
          headline="Navigation"
          supportingText="Choose a destination"
        />
        <M3NavigationDrawerSection>
          {destinations.map((destination) => (
            <M3NavigationDrawerItem
              href={destination.href}
              icon={<destination.icon />}
              isSelected={selected === destination.id}
              key={destination.id}
              label={destination.label}
              onPress={() => setSelected(destination.id)}
              slot="close"
            />
          ))}
        </M3NavigationDrawerSection>
      </M3ModalNavigationDrawer>
    </M3NavigationDrawerTrigger>
  );
}
