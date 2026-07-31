import {
  ComponentIcon,
  HomeIcon,
  ChevronRightIcon,
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
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

export type AppSidebarItem = {
  label: string;
  to?: string;
  icon?: LucideIcon;
  items?: AppSidebarItem[];
};

export type AppSidebarGroup = {
  label: string;
  items: AppSidebarItem[];
};

export type AppSidebarData = {
  title: string;
  description?: string;
  groups: AppSidebarGroup[];
};

type Props = React.ComponentPropsWithoutRef<typeof Sidebar> & {
  data: AppSidebarData;
};

export function AppSidebar({ data, ...props }: Props) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col gap-0.5 px-2 py-1">
          <span className="text-sm font-semibold">{data.title}</span>
          {data.description === undefined ? null : (
            <span className="text-xs text-sidebar-foreground/70">
              {data.description}
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
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

export const appSidebarData: AppSidebarData = {
  title: "Shadcn Studio",
  description: "Copy-and-paste components",
  groups: [
    {
      label: "workspace",
      items: [
        {
          label: "Home",
          to: "/",
          icon: HomeIcon,
        },
      ],
    },
    {
      label: "library",
      items: [
        {
          label: "components",
          icon: ComponentIcon,
          items: [
            {
              label: "badge",
              to: "/components/badge",
            },
            {
              label: "button",
              to: "/components/button",
            },
            {
              label: "toggle button",
              to: "/components/toggle-button",
            },
            {
              label: "tabs",
              to: "/components/tabs",
            },
          ],
        },
      ],
    },
  ],
};
