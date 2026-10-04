import {
  BlocksIcon,
  ChartNoAxesCombinedIcon,
  ComponentIcon,
  HomeIcon,
  LayoutTemplateIcon,
  type LucideIcon,
} from "lucide-react";

import type { VibeRegistrySectionName } from "../types/registry";
import { registrySections as generatedRegistrySections } from "./registry-sections.gen";

export type RegistrySidebarItem = {
  icon?: LucideIcon;
  items?: RegistrySidebarItem[];
  label: string;
  to?: string;
};

export type RegistrySidebarGroup = {
  label: string;
  showLabel: boolean;
  items: RegistrySidebarItem[];
};

const iconBySection: Record<VibeRegistrySectionName, LucideIcon> = {
  charts: ChartNoAxesCombinedIcon,
  blocks: BlocksIcon,
  components: ComponentIcon,
  pages: LayoutTemplateIcon,
};

export const registrySections = generatedRegistrySections.map((section) => ({
  ...section,
  icon: iconBySection[section.section],
}));

export const appHeaderNavLinks = registrySections.map((section) => ({
  icon: section.icon,
  label: section.label,
  to: section.href,
}));

export const appQuickLinks = [{ icon: HomeIcon, label: "Home", to: "/" }, ...appHeaderNavLinks];

export const registrySidebarGroups: RegistrySidebarGroup[] = [
  {
    label: "Registry",
    showLabel: false,
    items: registrySections.map((section) => ({
      icon: section.icon,
      label: section.label,
      items: [
        { label: "Overview", to: section.href },
        ...section.collections.map((collection) => ({
          label: collection.title,
          to: collection.href,
        })),
      ],
    })),
  },
];
