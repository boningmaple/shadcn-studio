import { Link } from "@tanstack/react-router";
import {
  BlocksIcon,
  ChartNoAxesCombinedIcon,
  ChevronRightIcon,
  ComponentIcon,
  LayoutTemplateIcon,
  type LucideIcon,
} from "lucide-react";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { registrySidebarSections } from "@/features/registry/data/registry-sidebar.gen";
import type {
  VibeRegistrySectionName,
  VibeRegistrySidebarSection,
} from "@/features/registry/types/registry";

type RegistrySidebarItem = {
  icon?: LucideIcon;
  items?: RegistrySidebarItem[];
  label: string;
  to?: string;
};

type RegistrySidebarGroup = {
  label: string;
  showLabel: boolean;
  items: RegistrySidebarItem[];
};

const labelBySection: Record<VibeRegistrySectionName, string> = {
  charts: "Charts",
  blocks: "Blocks",
  components: "Components",
  pages: "Pages",
};

const iconBySection: Record<VibeRegistrySectionName, LucideIcon> = {
  charts: ChartNoAxesCombinedIcon,
  blocks: BlocksIcon,
  components: ComponentIcon,
  pages: LayoutTemplateIcon,
};

type RegistrySidebarNavigationProps = {
  onNavigate?: () => void;
};

export function RegistrySidebarNavigation(props: RegistrySidebarNavigationProps) {
  const groups = registryGroups(registrySidebarSections);

  return (
    <nav aria-label="Registry" className="pt-1">
      {groups.map((group) => (
        <SidebarGroup key={group.label}>
          {group.showLabel ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
          <SidebarGroupContent>
            <Tree nodes={group.items} onNavigate={props.onNavigate} />
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </nav>
  );
}

type TreeProps = {
  nodes: RegistrySidebarItem[];
  onNavigate?: () => void;
};

function Tree(props: TreeProps) {
  return (
    <ul className="flex w-full min-w-0 flex-col gap-2">
      {props.nodes.map((item) => (
        <TreeNode key={item.label} item={item} onNavigate={props.onNavigate} />
      ))}
    </ul>
  );
}

type TreeNodeProps = {
  item: RegistrySidebarItem;
  onNavigate?: () => void;
};

function TreeNode(props: TreeNodeProps) {
  if (props.item.items === undefined || props.item.items.length === 0) {
    if (props.item.to === undefined) return null;

    return (
      <li className="group/menu-item relative">
        <SidebarMenuButton
          href={props.item.to}
          render={(linkProps) =>
            "href" in linkProps ? (
              <Link {...linkProps} to={linkProps.href} onClick={props.onNavigate}>
                {props.item.icon === undefined ? null : <props.item.icon />}
                <span>{props.item.label}</span>
              </Link>
            ) : (
              <span {...linkProps} />
            )
          }
          className="text-base"
        />
      </li>
    );
  }

  return (
    <li className="group/menu-item relative">
      <Collapsible className="[&[data-expanded=true]>button>svg:last-child]:rotate-90">
        <SidebarMenuButton slot="trigger" className="text-base">
          {props.item.icon === undefined ? null : <props.item.icon />}
          <span>{props.item.label}</span>
          <ChevronRightIcon className="ml-auto transition-transform" />
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub>
            {props.item.items.map((item) => (
              <TreeNode key={item.label} item={item} onNavigate={props.onNavigate} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}

function registryGroups(sections: readonly VibeRegistrySidebarSection[]): RegistrySidebarGroup[] {
  return [
    {
      items: sections.map((section) => ({
        icon: iconBySection[section.section],
        items: section.collections.map((collection) => ({
          label: collection.title,
          to: collection.href,
        })),
        label: labelBySection[section.section],
      })),
      label: "Registry",
      showLabel: false,
    },
  ];
}
