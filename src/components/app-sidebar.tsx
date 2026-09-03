import { Link } from "@tanstack/react-router";
import {
  BlocksIcon,
  ChevronRightIcon,
  HomeIcon,
  LayoutTemplateIcon,
  ShapesIcon,
  type LucideIcon,
} from "lucide-react";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import { registrySidebarSections } from "@/features/registry/data/registry-sidebar.gen";
import type {
  VibeRegistryItemType,
  VibeRegistrySidebarSection,
} from "@/features/registry/types/registry";
import type { QuickLink } from "@/features/search/types/quick-links";
import { Route as homeRoute } from "@/routes/_rootLayout/index";

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

const labelByType: Record<VibeRegistryItemType, string> = {
  "registry:block": "Blocks",
  "registry:component": "Components",
  "registry:page": "Pages",
};

const iconByType: Record<VibeRegistryItemType, LucideIcon> = {
  "registry:block": BlocksIcon,
  "registry:component": ShapesIcon,
  "registry:page": LayoutTemplateIcon,
};

export function AppSidebar(props: React.ComponentPropsWithoutRef<typeof Sidebar>) {
  const groups = registryGroups(registrySidebarSections);
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="w-full h-(--header-height) border-b border-dashed flex-row items-center px-4 py-0 lg:hidden">
        <Link
          className="text-xl font-bold hover:underline"
          aria-label={homeRoute.options.staticData.ariaLabel}
          to={homeRoute.to}
          activeOptions={{ exact: true }}
          onClick={() => setOpenMobile(false)}
        >
          VibeUI
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            {group.showLabel ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuTree items={group.items} setOpenMobile={setOpenMobile} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

function registryGroups(sections: readonly VibeRegistrySidebarSection[]): AppSidebarGroup[] {
  return [
    {
      items: sections.map((section) => ({
        icon: iconByType[section.type],
        items: section.collections.map((collection) => ({
          label: collection.title,
          to: collection.href,
        })),
        label: labelByType[section.type],
      })),
      label: "Registry",
      showLabel: false,
    },
  ];
}

function SidebarMenuTree({
  items,
  setOpenMobile,
}: {
  items: AppSidebarItem[];
  setOpenMobile: (open: boolean) => void;
}) {
  return items.map((item) =>
    item.items === undefined || item.items.length === 0 ? (
      <SidebarAtomicMenuItem item={item} key={item.label} setOpenMobile={setOpenMobile} />
    ) : (
      <SidebarCollapsibleMenuItem item={item} key={item.label} setOpenMobile={setOpenMobile} />
    ),
  );
}

function SidebarAtomicMenuItem({
  item,
  setOpenMobile,
}: {
  item: AppSidebarItem;
  setOpenMobile: (open: boolean) => void;
}) {
  if (item.to === undefined) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        href={item.to}
        render={(props) =>
          "href" in props ? (
            <Link {...props} onClick={() => setOpenMobile(false)} to={props.href}>
              {item.icon === undefined ? null : <item.icon />}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span {...props} />
          )
        }
      />
    </SidebarMenuItem>
  );
}

function SidebarCollapsibleMenuItem({
  item,
  setOpenMobile,
}: {
  item: AppSidebarItem;
  setOpenMobile: (open: boolean) => void;
}) {
  return (
    <SidebarMenuItem>
      <Collapsible className="[&[data-expanded=true]>button>svg:last-child]:rotate-90">
        <SidebarMenuButton slot="trigger">
          {item.icon === undefined ? null : <item.icon />}
          <span>{item.label}</span>
          <ChevronRightIcon className="ml-auto transition-transform" />
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuTree items={item.items ?? []} setOpenMobile={setOpenMobile} />
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
