import { ComponentIcon, HomeIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { components } from "@/features/search/data/registry";
import type { QuickLink } from "@/features/search/types/quick-links";

/**
 * What the sidebar renders, independent of where it came from.
 *
 * `AppSidebar` takes this and nothing else, so the navigation derived from the
 * registry and the handful of hand-written entries are the same shape to it.
 * Labels arrive ready to display — the sidebar does not re-case them.
 */
export type AppSidebarItem = {
  icon?: LucideIcon;
  items?: AppSidebarItem[];
  label: string;
  to?: string;
};

export type AppSidebarGroup = {
  items: AppSidebarItem[];
  label: string;
  showLabel: boolean;
};

export type AppSidebarData = {
  description?: string;
  groups: AppSidebarGroup[];
  title: string;
};

export const appSidebarData: AppSidebarData = {
  description: "Copy-and-paste components",
  groups: [
    {
      items: [{ icon: HomeIcon, label: "Home", to: "/" }],
      label: "Workspace",
      showLabel: true,
    },
    {
      label: "No Label",
      showLabel: false,
      items: [
        {
          icon: ComponentIcon,
          items: materialDesignItems(),
          label: "Material Design",
        },
      ],
    },
  ],
  title: "VibeUI",
};

/**
 * The destinations the search palette offers before anything is typed.
 *
 * Each group's top-level entries that go somewhere — Home today. Deliberately
 * not the whole tree: the Material Design entry is a place to expand rather
 * than a destination, and its children are the very Components search is there
 * to find.
 */
export const appQuickLinks: QuickLink[] = appSidebarData.groups
  .flatMap((group) => group.items)
  .flatMap((item) =>
    item.to === undefined ? [] : [{ icon: item.icon, label: item.label, to: item.to }],
  );

/**
 * The navigation, built from the registry rather than restated beside it.
 *
 * ADR-0003 makes the registry the one source of truth for what exists and what
 * it is called; a hand-written copy here is a second one, and the way a newly
 * added Component goes unlinked. Every Component the registry names appears,
 * under the name and href it already carries.
 */
function materialDesignItems(): AppSidebarItem[] {
  return components.map((component) => ({
    label: component.name,
    to: component.href,
  }));
}
