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
  NavigationDrawerDivider,
  NavigationDrawerHeader,
  NavigationDrawerItem,
  NavigationDrawerSection,
  StandardNavigationDrawer,
} from "@/components/navigation-drawer/navigation-drawer";

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

export default function NavigationDrawerDemo() {
  const [selected, setSelected] = React.useState("projects");

  return (
    <StandardNavigationDrawer className="rounded-[16px] border" width="20rem">
      <NavigationDrawerHeader
        headline="Resources"
        supportingText="Grouped drawer destinations"
      />
      <NavigationDrawerSection title="Workspace">
        {primaryDestinations.map((destination) => (
          <NavigationDrawerItem
            badge={destination.badge}
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </NavigationDrawerSection>
      <NavigationDrawerDivider />
      <NavigationDrawerSection title="Preferences">
        {secondaryDestinations.map((destination) => (
          <NavigationDrawerItem
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </NavigationDrawerSection>
    </StandardNavigationDrawer>
  );
}
