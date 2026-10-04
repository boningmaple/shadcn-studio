import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  registrySidebarGroups,
  type RegistrySidebarItem,
} from "@/features/registry/data/registry-data";

type RegistrySidebarNavigationProps = {
  onNavigate?: () => void;
};

export function RegistrySidebarNavigation(props: RegistrySidebarNavigationProps) {
  const pathname = useLocation({
    select: (location) => location.pathname.replace(/\/$/, "") || "/",
  });

  return (
    <nav aria-label="Registry">
      {registrySidebarGroups.map((group) => (
        <SidebarGroup key={group.label}>
          {group.showLabel && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <Tree nodes={group.items} pathname={pathname} onNavigate={props.onNavigate} />
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </nav>
  );
}

type TreeProps = {
  nodes: RegistrySidebarItem[];
  pathname: string;
  onNavigate?: () => void;
};

function Tree(props: TreeProps) {
  return (
    <ul className="flex w-full min-w-0 flex-col gap-2">
      {props.nodes.map((item) => (
        <TreeNode
          key={item.label}
          item={item}
          pathname={props.pathname}
          onNavigate={props.onNavigate}
        />
      ))}
    </ul>
  );
}

type TreeNodeProps = {
  item: RegistrySidebarItem;
  pathname: string;
  onNavigate?: () => void;
};

function containsPath(item: RegistrySidebarItem, pathname: string): boolean {
  return (
    item.to === pathname || (item.items?.some((child) => containsPath(child, pathname)) ?? false)
  );
}

function TreeNode(props: TreeNodeProps) {
  const [expansion, setExpansion] = useState(() => ({
    pathname: props.pathname,
    expanded: containsPath(props.item, props.pathname),
  }));
  const isExpanded =
    expansion.pathname === props.pathname
      ? expansion.expanded
      : containsPath(props.item, props.pathname);

  if (expansion.pathname !== props.pathname) {
    setExpansion({ pathname: props.pathname, expanded: isExpanded });
  }

  if (props.item.items === undefined || props.item.items.length === 0) {
    if (props.item.to === undefined) return null;

    return (
      <li className="group/menu-item relative">
        <SidebarMenuButton
          aria-current={props.item.to === props.pathname ? "page" : undefined}
          href={props.item.to}
          isActive={props.item.to === props.pathname}
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
      <Collapsible
        isExpanded={isExpanded}
        className="[&[data-expanded=true]>button>svg:last-child]:rotate-90"
        onExpandedChange={(expanded) => setExpansion({ pathname: props.pathname, expanded })}
      >
        <SidebarMenuButton slot="trigger" className="text-base">
          {props.item.icon === undefined ? null : <props.item.icon />}
          <span>{props.item.label}</span>
          <ChevronRightIcon className="ml-auto transition-transform" />
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub>
            {props.item.items.map((item) => (
              <TreeNode
                key={item.label}
                item={item}
                pathname={props.pathname}
                onNavigate={props.onNavigate}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
