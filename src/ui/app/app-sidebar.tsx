import {
  ComponentIcon,
  HomeIcon,
  ChevronRightIcon,
  type LucideIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
} from "@/ui/shadcn/react-aria/collapsible";
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
} from "@/ui/shadcn/react-aria/sidebar";
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
  title: "VibeUI",
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
              to: "/material-design/components/app-bar",
            },
            {
              label: "avatar",
              to: "/material-design/components/avatar",
            },
            {
              label: "badge",
              to: "/material-design/components/badge",
            },
            {
              label: "bottom sheet",
              to: "/material-design/components/bottom-sheet",
            },
            {
              label: "button",
              to: "/material-design/components/button",
            },
            {
              label: "button group",
              to: "/material-design/components/button-group",
            },
            {
              label: "card",
              to: "/material-design/components/card",
            },
            {
              label: "carousel",
              to: "/material-design/components/carousel",
            },
            {
              label: "checkbox",
              to: "/material-design/components/checkbox",
            },
            {
              label: "chips",
              to: "/material-design/components/chips",
            },
            {
              label: "date picker",
              to: "/material-design/components/date-picker",
            },
            {
              label: "dialog",
              to: "/material-design/components/dialog",
            },
            {
              label: "divider",
              to: "/material-design/components/divider",
            },
            {
              label: "extended FAB",
              to: "/material-design/components/extended-fab",
            },
            {
              label: "FAB",
              to: "/material-design/components/fab",
            },
            {
              label: "FAB menu",
              to: "/material-design/components/fab-menu",
            },
            {
              label: "icon button",
              to: "/material-design/components/icon-button",
            },
            {
              label: "list",
              to: "/material-design/components/list",
            },
            {
              label: "loading indicator",
              to: "/material-design/components/loading-indicator",
            },
            {
              label: "menu",
              to: "/material-design/components/menu",
            },
            {
              label: "navigation bar",
              to: "/material-design/components/navigation-bar",
            },
            {
              label: "navigation drawer",
              to: "/material-design/components/navigation-drawer",
            },
            {
              label: "navigation rail",
              to: "/material-design/components/navigation-rail",
            },
            {
              label: "progress indicator",
              to: "/material-design/components/progress-indicator",
            },
            {
              label: "radio button",
              to: "/material-design/components/radio-button",
            },
            {
              label: "search",
              to: "/material-design/components/search",
            },
            {
              label: "segmented button",
              to: "/material-design/components/segmented-button",
            },
            {
              label: "side sheet",
              to: "/material-design/components/side-sheet",
            },
            {
              label: "slider",
              to: "/material-design/components/slider",
            },
            {
              label: "snackbar",
              to: "/material-design/components/snackbar",
            },
            {
              label: "split button",
              to: "/material-design/components/split-button",
            },
            {
              label: "switch",
              to: "/material-design/components/switch",
            },
            {
              label: "tabs",
              to: "/material-design/components/tabs",
            },
            {
              label: "text field",
              to: "/material-design/components/text-field",
            },
            {
              label: "time picker",
              to: "/material-design/components/time-picker",
            },
            {
              label: "toggle button",
              to: "/material-design/components/toggle-button",
            },
            {
              label: "toolbar",
              to: "/material-design/components/toolbar",
            },
            {
              label: "tooltip",
              to: "/material-design/components/tooltip",
            },
          ],
        },
      ],
    },
  ],
};
