import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppBrandLink } from "@/features/app-shell/components/app-brand-link";
import { RegistrySidebarNavigation } from "@/features/registry/components/registry-sidebar-navigation";
import { appQuickLinks } from "@/features/registry/data/registry-data";
import { SearchDialogTrigger } from "@/features/search/components/search-dialog-trigger";
import { ThemeSwitchButton } from "@/features/theme-switch/components/theme-switch-button";

import AppSidebarTrigger from "./app-sidebar-trigger";

export function AppSidebar() {
  const { isMobile, state, setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-dashed">
      <SidebarHeader className="h-(--header-height) border-b border-dashed flex-row items-center lg:justify-end overflow-hidden">
        <div className="w-[calc(var(--sidebar-width)-1rem)] shrink-0 flex items-center justify-between">
          <AppBrandLink
            inert={!isMobile && state === "collapsed"}
            className="pl-2"
            onClick={() => setOpenMobile(false)}
          />
          <AppSidebarTrigger className="hidden lg:inline-flex" />
        </div>
      </SidebarHeader>

      <div className="hidden lg:block px-2 pt-4 pb-2">
        <SearchDialogTrigger quickLinks={appQuickLinks} />
      </div>

      <SidebarContent>
        <RegistrySidebarNavigation onNavigate={() => setOpenMobile(false)} />
      </SidebarContent>

      <SidebarFooter className="h-(--header-height) border-t border-dashed flex-row items-center justify-end hidden lg:flex">
        <ThemeSwitchButton />
      </SidebarFooter>
    </Sidebar>
  );
}
