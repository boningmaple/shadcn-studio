import * as React from "react";
import {
  HomeIcon,
  InboxIcon,
  MenuIcon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDModalNavigationDrawer,
  MDNavigationDrawerHeader,
  MDNavigationDrawerItem,
  MDNavigationDrawerSection,
  MDNavigationDrawerTrigger,
} from "@/ui/material-design/components/md-navigation-drawer/md-navigation-drawer";

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

export default function MDNavigationDrawerDemo() {
  const [selected, setSelected] = React.useState("inbox");

  return (
    <MDNavigationDrawerTrigger>
      <MDIconButton aria-label="Open navigation drawer" variant="standard">
        <MenuIcon />
      </MDIconButton>
      <MDModalNavigationDrawer>
        <MDNavigationDrawerHeader
          headline="Navigation"
          supportingText="Choose a destination"
        />
        <MDNavigationDrawerSection>
          {destinations.map((destination) => (
            <MDNavigationDrawerItem
              href={destination.href}
              icon={<destination.icon />}
              isSelected={selected === destination.id}
              key={destination.id}
              label={destination.label}
              onPress={() => setSelected(destination.id)}
              slot="close"
            />
          ))}
        </MDNavigationDrawerSection>
      </MDModalNavigationDrawer>
    </MDNavigationDrawerTrigger>
  );
}
