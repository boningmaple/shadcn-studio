import { Link } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";

import type { AppSidebarData, AppSidebarItem } from "@/features/ui-app/data/app-sidebar-data";
import { Collapsible, CollapsibleContent } from "@/features/ui-shadcn/react-aria/collapsible";
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
} from "@/features/ui-shadcn/react-aria/sidebar";

type Props = React.ComponentPropsWithoutRef<typeof Sidebar> & {
  data: AppSidebarData;
};

/** Renders whatever navigation it is handed, to any depth. */
export function AppSidebar({ data, ...props }: Props) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col gap-0.5 px-2 py-1">
          <span className="text-sm font-semibold">{data.title}</span>
          {data.description === undefined ? null : (
            <span className="text-xs text-sidebar-foreground/70">{data.description}</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.groups.map((group) => (
          <SidebarGroup key={group.label}>
            {group.showLabel ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuTree items={group.items} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

function SidebarMenuTree({ items }: { items: AppSidebarItem[] }) {
  return items.map((item) => {
    if (item.items === undefined || item.items.length === 0) {
      return <SidebarAtomicMenuItem key={item.label} item={item} />;
    } else {
      return <SidebarCollapsibleMenuItem key={item.label} item={item} />;
    }
  });
}

function SidebarAtomicMenuItem({ item }: { item: AppSidebarItem }) {
  if (item.to === undefined) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        href={item.to}
        render={(props) =>
          "href" in props ? (
            <Link {...props} to={props.href}>
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

function SidebarCollapsibleMenuItem({ item }: { item: AppSidebarItem }) {
  const ChevronIcon = ChevronRightIcon;

  return (
    <SidebarMenuItem>
      <Collapsible className="[&[data-expanded=true]>button>svg:last-child]:rotate-90">
        <SidebarMenuButton slot="trigger">
          {item.icon && <item.icon />}
          <span>{item.label}</span>
          <ChevronIcon className="ml-auto transition-transform" />
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuTree items={item.items as AppSidebarItem[]} />
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
