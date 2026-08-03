import * as React from "react";
import {
  BellIcon,
  CircleHelpIcon,
  FileTextIcon,
  FolderIcon,
  LockIcon,
  UsersRoundIcon,
} from "lucide-react";

import {
  M3NavigationDrawerDivider,
  M3NavigationDrawerHeader,
  M3NavigationDrawerItem,
  M3NavigationDrawerSection,
  M3StandardNavigationDrawer,
} from "@/material-3-ui/components/m3-navigation-drawer/m3-navigation-drawer";

const primaryDestinations = [
  {
    badge: "4",
    href: "#projects",
    icon: FolderIcon,
    id: "projects",
    label: "Projects",
  },
  {
    badge: null,
    href: "#docs",
    icon: FileTextIcon,
    id: "docs",
    label: "Docs",
  },
  {
    badge: null,
    href: "#team",
    icon: UsersRoundIcon,
    id: "team",
    label: "Team",
  },
] as const;

const secondaryDestinations = [
  {
    href: "#notifications",
    icon: BellIcon,
    id: "notifications",
    label: "Notifications",
  },
  {
    href: "#privacy",
    icon: LockIcon,
    id: "privacy",
    label: "Privacy",
  },
  {
    href: "#help",
    icon: CircleHelpIcon,
    id: "help",
    label: "Help",
  },
] as const;

export default function M3NavigationDrawerDemo() {
  const [selected, setSelected] = React.useState("projects");

  return (
    <M3StandardNavigationDrawer className="rounded-[16px] border" width="20rem">
      <M3NavigationDrawerHeader
        headline="Resources"
        supportingText="Grouped drawer destinations"
      />
      <M3NavigationDrawerSection title="Workspace">
        {primaryDestinations.map((destination) => (
          <M3NavigationDrawerItem
            badge={destination.badge}
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </M3NavigationDrawerSection>
      <M3NavigationDrawerDivider />
      <M3NavigationDrawerSection title="Preferences">
        {secondaryDestinations.map((destination) => (
          <M3NavigationDrawerItem
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </M3NavigationDrawerSection>
    </M3StandardNavigationDrawer>
  );
}
