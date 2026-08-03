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
  showLabel: boolean;
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

function capitalizeWords(label: string) {
  return label.replace(/\S+/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
}

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
            {group.showLabel ? (
              <SidebarGroupLabel>
                {capitalizeWords(group.label)}
              </SidebarGroupLabel>
            ) : null}
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
              <span>{capitalizeWords(item.label)}</span>
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
          <span>{capitalizeWords(item.label)}</span>
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
      showLabel: true,
      items: [
        {
          label: "home",
          to: "/",
          icon: HomeIcon,
        },
      ],
    },
    {
      label: "unfinished",
      showLabel: false,
      items: [
        {
          label: "material design",
          icon: ComponentIcon,
          items: [
            {
              label: "app bar",
              to: "/material-3-ui/components/app-bar",
            },
            {
              label: "avatar",
              to: "/material-3-ui/components/avatar",
            },
            {
              label: "badge",
              to: "/material-3-ui/components/badge",
            },
            {
              label: "bottom sheet",
              to: "/material-3-ui/components/bottom-sheet",
            },
            {
              label: "button",
              to: "/material-3-ui/components/button",
            },
            {
              label: "button group",
              to: "/material-3-ui/components/button-group",
            },
            {
              label: "card",
              to: "/material-3-ui/components/card",
            },
            {
              label: "carousel",
              to: "/material-3-ui/components/carousel",
            },
            {
              label: "checkbox",
              to: "/material-3-ui/components/checkbox",
            },
            {
              label: "chips",
              to: "/material-3-ui/components/chips",
            },
            {
              label: "date picker",
              to: "/material-3-ui/components/date-picker",
            },
            {
              label: "dialog",
              to: "/material-3-ui/components/dialog",
            },
            {
              label: "divider",
              to: "/material-3-ui/components/divider",
            },
            {
              label: "extended FAB",
              to: "/material-3-ui/components/extended-fab",
            },
            {
              label: "FAB",
              to: "/material-3-ui/components/fab",
            },
            {
              label: "FAB menu",
              to: "/material-3-ui/components/fab-menu",
            },
            {
              label: "icon button",
              to: "/material-3-ui/components/icon-button",
            },
            {
              label: "list",
              to: "/material-3-ui/components/list",
            },
            {
              label: "loading indicator",
              to: "/material-3-ui/components/loading-indicator",
            },
            {
              label: "menu",
              to: "/material-3-ui/components/menu",
            },
            {
              label: "navigation bar",
              to: "/material-3-ui/components/navigation-bar",
            },
            {
              label: "navigation drawer",
              to: "/material-3-ui/components/navigation-drawer",
            },
            {
              label: "navigation rail",
              to: "/material-3-ui/components/navigation-rail",
            },
            {
              label: "progress indicator",
              to: "/material-3-ui/components/progress-indicator",
            },
            {
              label: "radio button",
              to: "/material-3-ui/components/radio-button",
            },
            {
              label: "search",
              to: "/material-3-ui/components/search",
            },
            {
              label: "segmented button",
              to: "/material-3-ui/components/segmented-button",
            },
            {
              label: "side sheet",
              to: "/material-3-ui/components/side-sheet",
            },
            {
              label: "slider",
              to: "/material-3-ui/components/slider",
            },
            {
              label: "snackbar",
              to: "/material-3-ui/components/snackbar",
            },
            {
              label: "split button",
              to: "/material-3-ui/components/split-button",
            },
            {
              label: "switch",
              to: "/material-3-ui/components/switch",
            },
            {
              label: "tabs",
              to: "/material-3-ui/components/tabs",
            },
            {
              label: "text field",
              to: "/material-3-ui/components/text-field",
            },
            {
              label: "time picker",
              to: "/material-3-ui/components/time-picker",
            },
            {
              label: "toggle button",
              to: "/material-3-ui/components/toggle-button",
            },
            {
              label: "toolbar",
              to: "/material-3-ui/components/toolbar",
            },
            {
              label: "tooltip",
              to: "/material-3-ui/components/tooltip",
            },
          ],
        },
      ],
    },
  ],
};
