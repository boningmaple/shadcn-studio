import { Link, useRouter } from "@tanstack/react-router";
import {
  BlocksIcon,
  ChevronRightIcon,
  HomeIcon,
  LayoutTemplateIcon,
  ShapesIcon,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
import type {
  RegistryItemKind,
  RegistryNavigationResult,
} from "@/features/registry/types/registry";
import type { QuickLink } from "@/features/search/types/quick-links";
import { Route as homeRoute } from "@/routes/_rootLayout.index";

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

const labelByKind: Record<RegistryItemKind, string> = {
  block: "Blocks",
  component: "Components",
  page: "Pages",
};

const iconByKind: Record<RegistryItemKind, LucideIcon> = {
  block: BlocksIcon,
  component: ShapesIcon,
  page: LayoutTemplateIcon,
};

export function AppSidebar({
  navigation,
  ...props
}: React.ComponentPropsWithoutRef<typeof Sidebar> & { navigation: RegistryNavigationResult }) {
  const router = useRouter();
  const groups = navigation.status === "ok" ? [...registryGroups(navigation.sections)] : [];

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
        {navigation.status === "error" ? (
          <SidebarGroup>
            <SidebarGroupLabel>Registry unavailable</SidebarGroupLabel>
            <SidebarGroupContent className="px-2 text-xs text-muted-foreground">
              <p>Registry navigation could not be loaded.</p>
              <Button
                className="mt-2"
                onPress={() => void router.invalidate()}
                size="sm"
                variant="outline"
              >
                Try again
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
    </Sidebar>
  );
}

function registryGroups(
  sections: Extract<RegistryNavigationResult, { status: "ok" }>["sections"],
): AppSidebarGroup[] {
  return [
    {
      items: sections.map((section) => ({
        icon: iconByKind[section.kind],
        items: section.collections.map((collection) => ({
          label: collection.title,
          to: collection.href,
        })),
        label: labelByKind[section.kind],
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
