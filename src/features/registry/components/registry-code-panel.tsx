import { ChevronRightIcon, FileIcon, FolderIcon, PanelLeftIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import {
  Button as AriaButton,
  Dialog,
  Heading,
  Modal,
  ModalOverlay,
  Tree,
  TreeItem,
  TreeItemContent,
  type Key,
} from "react-aria-components";

import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  const isMobile = useIsMobile();
  const tree = useMemo(() => buildFileTree(files), [files]);
  const initialPath = useMemo(() => initialFilePath(files, name), [files, name]);
  const [selectedPath, setSelectedPath] = useState(initialPath);
  const [desktopTreeOpen, setDesktopTreeOpen] = useState(true);
  const [mobileTreeOpen, setMobileTreeOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(() => directoryKeys(tree));
  const codeScrollerRef = useRef<HTMLElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const selectedFile =
    files.find((file) => registryFileDisplayPath(file) === selectedPath) ?? files[0]!;
  const selectedFileName = registryFileDisplayPath(selectedFile).split("/").at(-1);
  const hasFileTree = files.length > 1;

  const selectFile = (path: string) => {
    setSelectedPath(path);
    setExpandedKeys((current) => new Set([...current, ...ancestorKeys(path)]));
    setMobileTreeOpen(false);
    codeScrollerRef.current?.scrollTo({ left: 0, top: 0 });
  };

  const treeOpen = isMobile ? mobileTreeOpen : desktopTreeOpen;

  return (
    <div className="h-[min(30rem,calc(100svh-2rem))] lg:h-[min(36rem,calc(100svh-2rem))]jflex w-full flex-col overflow-hidden rounded-lg border bg-background">
      <header className="flex h-11 shrink-0 items-center gap-2 border-b px-2">
        {hasFileTree ? (
          <Button
            aria-expanded={treeOpen}
            aria-label={treeOpen ? "Close file explorer" : "Open file explorer"}
            onPress={() => {
              if (isMobile) setMobileTreeOpen((open) => !open);
              else setDesktopTreeOpen((open) => !open);
            }}
            size="icon"
            variant="ghost"
          >
            <PanelLeftIcon />
          </Button>
        ) : null}
        <span className="min-w-0 flex-1 truncate px-1 font-mono text-xs text-muted-foreground">
          {selectedFileName}
        </span>
        <CopyButton content={selectedFile.content} />
      </header>

      <div className="relative flex min-h-0 flex-1" ref={overlayContainerRef}>
        {hasFileTree ? (
          <aside
            aria-label="Explorer"
            className={cn(
              "hidden shrink-0 overflow-hidden border-r transition-[width] duration-200 ease-linear lg:flex",
              desktopTreeOpen ? "w-64" : "w-0 border-r-0",
            )}
          >
            <div className="flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
              <h3 className="h-10 shrink-0 border-b px-4 py-3 text-xs font-medium">Explorer</h3>
              <FileExplorer
                expandedKeys={expandedKeys}
                nodes={tree}
                onExpandedChange={setExpandedKeys}
                onSelect={selectFile}
                selectedPath={selectedPath}
              />
            </div>
          </aside>
        ) : null}

        <section
          aria-label={`Source code for ${selectedFileName}`}
          className="registry-code min-w-0 flex-1 overflow-auto"
          dangerouslySetInnerHTML={{ __html: selectedFile.html }}
          ref={codeScrollerRef}
        />

        {hasFileTree && isMobile ? (
          <ModalOverlay
            UNSTABLE_portalContainer={overlayContainerRef.current ?? undefined}
            className="absolute inset-0 z-20 flex bg-black/10 transition-opacity duration-150 data-entering:opacity-0 data-exiting:opacity-0 supports-backdrop-filter:backdrop-blur-xs"
            isDismissable
            isOpen={mobileTreeOpen}
            onOpenChange={setMobileTreeOpen}
          >
            <Modal className="h-full w-[min(16rem,80%)] bg-sidebar text-sidebar-foreground shadow-lg transition duration-200 ease-in-out data-entering:-translate-x-10 data-entering:opacity-0 data-exiting:-translate-x-10 data-exiting:opacity-0">
              <Dialog className="flex size-full flex-col outline-none">
                <Heading
                  className="h-10 shrink-0 border-b px-4 py-3 text-xs font-medium"
                  slot="title"
                >
                  Explorer
                </Heading>
                <FileExplorer
                  expandedKeys={expandedKeys}
                  nodes={tree}
                  onExpandedChange={setExpandedKeys}
                  onSelect={selectFile}
                  selectedPath={selectedPath}
                />
              </Dialog>
            </Modal>
          </ModalOverlay>
        ) : null}
      </div>
    </div>
  );
}

function FileExplorer({
  expandedKeys,
  nodes,
  onExpandedChange,
  onSelect,
  selectedPath,
}: {
  expandedKeys: Set<Key>;
  nodes: FileTreeNode[];
  onExpandedChange: (keys: Set<Key>) => void;
  onSelect: (path: string) => void;
  selectedPath: string;
}) {
  const handleExpandedChange = (keys: Set<Key>) => {
    onExpandedChange(new Set([...keys, ...ancestorKeys(selectedPath)]));
  };

  return (
    <Tree
      aria-label="Registry item files"
      className="min-h-0 flex-1 overflow-auto p-2 outline-none"
      disallowEmptySelection
      escapeKeyBehavior="none"
      expandedKeys={expandedKeys}
      onExpandedChange={handleExpandedChange}
      selectedKeys={[selectedPath]}
      selectionBehavior="replace"
      selectionMode="single"
    >
      {nodes.map((node) => (
        <ExplorerTreeItem key={node.name} node={node} onSelect={onSelect} />
      ))}
    </Tree>
  );
}

function ExplorerTreeItem({
  node,
  onSelect,
  prefix = "",
}: {
  node: FileTreeNode;
  onSelect: (path: string) => void;
  prefix?: string;
}) {
  const path = prefix === "" ? node.name : `${prefix}/${node.name}`;

  return (
    <TreeItem
      className="cursor-default rounded-md text-xs outline-none data-focused:bg-sidebar-accent data-focused:text-sidebar-accent-foreground data-selected:bg-sidebar-accent data-selected:text-sidebar-accent-foreground"
      id={path}
      onAction={node.file === undefined ? undefined : () => onSelect(path)}
      textValue={node.name}
    >
      <TreeItemContent>
        {({ hasChildItems, isExpanded, level }) => (
          <div
            className="flex h-7 items-center gap-1.5 pr-2"
            style={{ paddingInlineStart: `${(level - 1) * 12 + 8}px` }}
          >
            {hasChildItems ? (
              <AriaButton
                aria-label={isExpanded ? `Collapse ${node.name}` : `Expand ${node.name}`}
                className="grid size-4 shrink-0 place-items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                slot="chevron"
              >
                <ChevronRightIcon
                  className={cn("size-3 transition-transform", isExpanded && "rotate-90")}
                />
              </AriaButton>
            ) : (
              <span className="size-4 shrink-0" />
            )}
            {hasChildItems ? (
              <FolderIcon className="size-3.5 shrink-0" />
            ) : (
              <FileIcon className="size-3.5 shrink-0" />
            )}
            <span className="truncate">{node.name}</span>
          </div>
        )}
      </TreeItemContent>
      {node.children.map((child) => (
        <ExplorerTreeItem
          key={`${path}/${child.name}`}
          node={child}
          onSelect={onSelect}
          prefix={path}
        />
      ))}
    </TreeItem>
  );
}

function initialFilePath(files: readonly VibeHighlightedRegistryFile[], name: string): string {
  const canonicalPath = `registry/vibe-ui/${name}/${name}.tsx`;
  const initialFile = files.find((file) => file.path === canonicalPath) ?? files[0]!;
  return registryFileDisplayPath(initialFile);
}

function directoryKeys(nodes: readonly FileTreeNode[], prefix = ""): Set<Key> {
  const keys = new Set<Key>();

  for (const node of nodes) {
    const path = prefix === "" ? node.name : `${prefix}/${node.name}`;
    if (node.file === undefined) keys.add(path);
    for (const key of directoryKeys(node.children, path)) keys.add(key);
  }

  return keys;
}

function ancestorKeys(path: string): string[] {
  const parts = path.split("/");
  return parts.slice(0, -1).map((_, index) => parts.slice(0, index + 1).join("/"));
}
