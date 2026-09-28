import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { TabsContent } from "@/components/ui/tabs";
import { CopyButton } from "@/shared/components/copy-button";

import { useHighlightedRegistryFiles } from "../hooks/use-highlighted-registry-files.ts";
import { buildFileTree, registryFileDisplayPath, type FileTreeNode } from "../lib/file-tree.ts";
import type { VibeBuiltRegistryItem, VibeHighlightedRegistryFile } from "../types/registry.ts";
import type { PreviewTab } from "./preview-block";

type CodeTabPanelProps = {
  item: VibeBuiltRegistryItem;
};

type CodeExplorerProps = {
  files: VibeHighlightedRegistryFile[];
  name?: string;
};

type FileTreeItemProps = {
  node: FileTreeNode;
  onSelect: (path: string) => void;
  selectedPath: string;
  prefix?: string;
};

export function CodeTabPanel(props: CodeTabPanelProps) {
  const query = useHighlightedRegistryFiles(props.item);

  return (
    <TabsContent id={"code" satisfies PreviewTab} shouldForceMount className="data-inert:hidden">
      {query.isPending || query.isError ? null : (
        <CodeExplorer files={query.data} name={props.item.name} />
      )}
    </TabsContent>
  );
}

export function CodeExplorer(props: CodeExplorerProps) {
  const tree = useMemo(() => buildFileTree(props.files), [props.files]);
  const initialPath = useMemo(
    () => initialFilePath(props.files, props.name ?? ""),
    [props.files, props.name],
  );
  const [selectedPath, setSelectedPath] = useState(initialPath);
  const codeScrollerRef = useRef<HTMLElement>(null);
  const selectedFile =
    props.files.find((file) => registryFileDisplayPath(file) === selectedPath) ?? props.files[0]!;
  const selectedFileName = registryFileDisplayPath(selectedFile).split("/").at(-1);
  const hasFileTree = props.files.length > 1;

  const selectFile = (path: string) => {
    setSelectedPath(path);
    codeScrollerRef.current?.scrollTo({ left: 0, top: 0 });
  };

  return (
    <SidebarProvider
      cookieName={false}
      keyboardShortcut={false}
      className="h-[min(30rem,calc(100svh-2rem))] min-h-0 flex-col overflow-hidden rounded-lg border bg-background lg:h-[min(36rem,calc(100svh-2rem))]"
    >
      <header className="flex h-11 shrink-0 items-center gap-2 border-b px-2">
        {hasFileTree ? <SidebarTrigger aria-label="Toggle file explorer" size="icon" /> : null}
        <span className="min-w-0 flex-1 truncate px-1 font-mono text-xs text-muted-foreground">
          {selectedFileName}
        </span>
        <CopyButton content={selectedFile.content} />
      </header>

      <div className="relative flex min-h-0 flex-1">
        {hasFileTree ? (
          <Sidebar
            aria-label="Explorer"
            collapsible="offcanvas"
            layout="contained"
            mobileSheet={false}
          >
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Files</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {tree.map((node) => (
                      <FileTreeItem
                        key={node.name}
                        node={node}
                        selectedPath={selectedPath}
                        onSelect={selectFile}
                      />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        ) : null}

        <section
          ref={codeScrollerRef}
          aria-label={`Source code for ${selectedFileName}`}
          className="registry-code min-w-0 flex-1 overflow-auto"
          dangerouslySetInnerHTML={{ __html: selectedFile.html }}
        />
      </div>
    </SidebarProvider>
  );
}

function FileTreeItem(props: FileTreeItemProps) {
  const prefix = props.prefix ?? "";
  const path = prefix === "" ? props.node.name : `${prefix}/${props.node.name}`;
  const { isMobile, setOpenMobile } = useSidebar();

  if (props.node.file !== undefined) {
    return (
      <SidebarMenuButton
        isActive={path === props.selectedPath}
        onPress={() => {
          props.onSelect(path);
          if (isMobile) setOpenMobile(false);
        }}
      >
        <FileIcon />
        <span>{props.node.name}</span>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        defaultExpanded
        className="group/collapsible [&[data-expanded=true]>button>svg:first-child]:rotate-90"
      >
        <SidebarMenuButton slot="trigger">
          <ChevronRightIcon className="transition-transform" />
          <FolderIcon />
          <span>{props.node.name}</span>
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub className="mr-0! translate-x-0! pr-0!">
            {props.node.children.map((child) => (
              <FileTreeItem
                key={`${path}/${child.name}`}
                node={child}
                prefix={path}
                selectedPath={props.selectedPath}
                onSelect={props.onSelect}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

function initialFilePath(files: readonly VibeHighlightedRegistryFile[], name: string): string {
  const canonicalPath = `registry/vibe-ui/${name}/${name}.tsx`;
  const initialFile = files.find((file) => file.path === canonicalPath) ?? files[0]!;
  return registryFileDisplayPath(initialFile);
}
