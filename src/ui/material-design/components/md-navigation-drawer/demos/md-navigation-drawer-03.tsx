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
  MDNavigationDrawerDivider,
  MDNavigationDrawerHeader,
  MDNavigationDrawerItem,
  MDNavigationDrawerSection,
  MDStandardNavigationDrawer,
} from "@/ui/material-design/components/md-navigation-drawer/md-navigation-drawer";

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

export default function MDNavigationDrawerDemo() {
  const [selected, setSelected] = React.useState("projects");

  return (
    <MDStandardNavigationDrawer className="rounded-[16px] border" width="20rem">
      <MDNavigationDrawerHeader
        headline="Resources"
        supportingText="Grouped drawer destinations"
      />
      <MDNavigationDrawerSection title="Workspace">
        {primaryDestinations.map((destination) => (
          <MDNavigationDrawerItem
            badge={destination.badge}
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </MDNavigationDrawerSection>
      <MDNavigationDrawerDivider />
      <MDNavigationDrawerSection title="Preferences">
        {secondaryDestinations.map((destination) => (
          <MDNavigationDrawerItem
            href={destination.href}
            icon={<destination.icon />}
            isSelected={selected === destination.id}
            key={destination.id}
            label={destination.label}
            onPress={() => setSelected(destination.id)}
          />
        ))}
      </MDNavigationDrawerSection>
    </MDStandardNavigationDrawer>
  );
}
