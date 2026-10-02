import { HomeIcon, type LucideIcon } from "lucide-react";

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { AppBrandLink } from "@/features/app-shell/components/app-brand-link";
import { RegistrySidebarNavigation } from "@/features/registry/components/registry-sidebar-navigation";
import type { QuickLink } from "@/features/search/types/quick-links";

export type AppSidebarItem = {
  icon?: LucideIcon;
  items?: AppSidebarItem[];
  label: string;
  to?: string;
};

type AppSidebarGroup = {
  label: string;
  showLabel: boolean;
  items: AppSidebarItem[];
};

const fixedGroups: AppSidebarGroup[] = [
  {
    label: "Workspace",
    showLabel: false,
    items: [{ icon: HomeIcon, label: "Home", to: "/" }],
  },
];

export const appQuickLinks: QuickLink[] = fixedGroups
  .flatMap((group) => group.items)
  .flatMap((item) =>
    item.to === undefined ? [] : [{ icon: item.icon, label: item.label, to: item.to }],
  );

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="border-dashed">
      <SidebarHeader className="w-full h-(--header-height) border-b border-dashed flex-row items-center px-4 py-0 lg:hidden">
        <AppBrandLink onClick={() => setOpenMobile(false)} />
      </SidebarHeader>

      <SidebarContent>
        <RegistrySidebarNavigation onNavigate={() => setOpenMobile(false)} />
      </SidebarContent>
    </Sidebar>
  );
}
