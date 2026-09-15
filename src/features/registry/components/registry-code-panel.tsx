import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { CopyButton } from "@/components/copy-button";
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

import { useHighlightedRegistryFiles } from "../hooks/use-highlighted-registry-files.ts";
import { buildFileTree, registryFileDisplayPath, type FileTreeNode } from "../lib/file-tree.ts";
import type { VibeBuiltRegistryItem, VibeHighlightedRegistryFile } from "../types/registry.ts";

export function RegistryCodePanel({ item }: { item: VibeBuiltRegistryItem }) {
  const query = useHighlightedRegistryFiles(item);

  if (query.isPending || query.isError) return null;

  return <CodeExplorer files={query.data} name={item.name} />;
}

export function CodeExplorer({
  files,
  name = "",
}: {
  files: VibeHighlightedRegistryFile[];
  name?: string;
}) {
  const tree = useMemo(() => buildFileTree(files), [files]);
  const initialPath = useMemo(() => initialFilePath(files, name), [files, name]);
  const [selectedPath, setSelectedPath] = useState(initialPath);
  const codeScrollerRef = useRef<HTMLElement>(null);
  const selectedFile =
    files.find((file) => registryFileDisplayPath(file) === selectedPath) ?? files[0]!;
  const selectedFileName = registryFileDisplayPath(selectedFile).split("/").at(-1);
  const hasFileTree = files.length > 1;

  const selectFile = (path: string) => {
    setSelectedPath(path);
    codeScrollerRef.current?.scrollTo({ left: 0, top: 0 });
  };

  return (
    <SidebarProvider
      className="h-[min(30rem,calc(100svh-2rem))] min-h-0 flex-col overflow-hidden rounded-lg border bg-background lg:h-[min(36rem,calc(100svh-2rem))]"
      cookieName={false}
      keyboardShortcut={false}
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
                        onSelect={selectFile}
                        selectedPath={selectedPath}
                      />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        ) : null}

        <section
          aria-label={`Source code for ${selectedFileName}`}
          className="registry-code min-w-0 flex-1 overflow-auto"
          dangerouslySetInnerHTML={{ __html: selectedFile.html }}
          ref={codeScrollerRef}
        />
      </div>
    </SidebarProvider>
  );
}

function FileTreeItem({
  node,
  onSelect,
  selectedPath,
  prefix = "",
}: {
  node: FileTreeNode;
  onSelect: (path: string) => void;
  selectedPath: string;
  prefix?: string;
}) {
  const path = prefix === "" ? node.name : `${prefix}/${node.name}`;
  const { isMobile, setOpenMobile } = useSidebar();

  if (node.file !== undefined) {
    return (
      <SidebarMenuButton
        isActive={path === selectedPath}
        onPress={() => {
          onSelect(path);
          if (isMobile) setOpenMobile(false);
        }}
      >
        <FileIcon />
        <span>{node.name}</span>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-expanded=true]>button>svg:first-child]:rotate-90"
        defaultExpanded
      >
        <SidebarMenuButton slot="trigger">
          <ChevronRightIcon className="transition-transform" />
          <FolderIcon />
          <span>{node.name}</span>
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub className="mr-0! translate-x-0! pr-0!">
            {node.children.map((child) => (
              <FileTreeItem
                key={`${path}/${child.name}`}
                node={child}
                onSelect={onSelect}
                prefix={path}
                selectedPath={selectedPath}
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
