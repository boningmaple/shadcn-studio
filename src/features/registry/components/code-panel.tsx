import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { useMemo, useRef, useState, type RefObject } from "react";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { CopyButton } from "@/shared/components/copy-button";

import { useHighlightedRegistryFiles } from "../hooks/use-highlighted-registry-files.ts";
import { buildFileTree, type FileTreeNode } from "../lib/file-tree.ts";
import type { VibeBuiltRegistryItem, VibeHighlightedRegistryFile } from "../types/registry.ts";

type CodePanelProps = {
  item: VibeBuiltRegistryItem;
};

type CodePanelHeaderProps = {
  file: VibeHighlightedRegistryFile;
  hasFileTree: boolean;
};

type CodePanelFileTreeProps = {
  files: VibeHighlightedRegistryFile[];
  selectedFile: VibeHighlightedRegistryFile;
  onSelect: (file: VibeHighlightedRegistryFile) => void;
};

type CodePanelCodeProps = {
  codeScrollerRef: RefObject<HTMLElement | null>;
  file: VibeHighlightedRegistryFile;
};

type TreeNodeProps = {
  node: FileTreeNode;
  onSelect: (file: VibeHighlightedRegistryFile) => void;
  selectedFile: VibeHighlightedRegistryFile;
};

export function CodePanel(props: CodePanelProps) {
  const query = useHighlightedRegistryFiles(props.item);

  const [selectedFile, setSelectedFile] = useState<VibeHighlightedRegistryFile | null>(null);
  const codeScrollerRef = useRef<HTMLElement>(null);

  if (query.isPending || query.isError) {
    return null;
  }

  const files = query.data;
  const file = selectedFile ?? getInitialFile(files, props.item.name);
  const hasFileTree = files.length > 1;

  const selectFile = (file: VibeHighlightedRegistryFile) => {
    setSelectedFile(file);
    codeScrollerRef.current?.scrollTo({ left: 0, top: 0 });
  };

  return (
    <SidebarProvider
      cookieName={false}
      keyboardShortcut={false}
      className="h-[min(30rem,calc(100svh-2rem))] min-h-0 flex-col overflow-hidden rounded-lg border bg-background lg:h-[min(36rem,calc(100svh-2rem))]"
    >
      <CodePanelHeader file={file} hasFileTree={hasFileTree} />

      <div className="relative flex min-h-0 flex-1">
        {hasFileTree ? (
          <CodePanelFileTree files={files} selectedFile={file} onSelect={selectFile} />
        ) : null}

        <CodePanelCode codeScrollerRef={codeScrollerRef} file={file} />
      </div>
    </SidebarProvider>
  );
}

function CodePanelHeader(props: CodePanelHeaderProps) {
  return (
    <header className="flex h-11 shrink-0 items-center gap-2 border-b px-2">
      {props.hasFileTree ? <SidebarTrigger aria-label="Toggle file explorer" size="icon" /> : null}
      <span className="min-w-0 flex-1 truncate px-1 font-mono text-xs text-muted-foreground">
        {props.file.target.split("/").at(-1)}
      </span>
      <CopyButton content={props.file.content} />
    </header>
  );
}

function CodePanelFileTree(props: CodePanelFileTreeProps) {
  const tree = useMemo(() => buildFileTree(props.files), [props.files]);

  return (
    <Sidebar
      collapsible="offcanvas"
      layout="contained"
      mobileSheet={false}
      className="**:data-[slot=sidebar-inner]:bg-background"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Tree nodes={tree} selectedFile={props.selectedFile} onSelect={props.onSelect} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function CodePanelCode({ codeScrollerRef, ...props }: CodePanelCodeProps) {
  return (
    <section
      ref={codeScrollerRef}
      aria-label={`Source code for ${props.file.target.split("/").at(-1)}`}
      className="registry-code min-w-0 flex-1 overflow-auto"
      dangerouslySetInnerHTML={{ __html: props.file.html }}
    />
  );
}

type TreeProps = {
  nodes: FileTreeNode[];
  selectedFile: VibeHighlightedRegistryFile;
  onSelect: (file: VibeHighlightedRegistryFile) => void;
};

function Tree(props: TreeProps) {
  return (
    <ul aria-label="Files" className="flex w-full min-w-0 flex-col gap-0">
      {props.nodes.map((node) => (
        <TreeNode
          key={node.name}
          node={node}
          selectedFile={props.selectedFile}
          onSelect={props.onSelect}
        />
      ))}
    </ul>
  );
}

function TreeNode(props: TreeNodeProps) {
  const { isMobile, setOpenMobile } = useSidebar();

  const file = props.node.file;
  if (file !== undefined) {
    return (
      <li className="group/menu-item relative">
        <SidebarMenuButton
          isActive={file.target === props.selectedFile.target}
          onPress={() => {
            props.onSelect(file);
            if (isMobile) setOpenMobile(false);
          }}
        >
          <FileIcon />
          <span>{props.node.name}</span>
        </SidebarMenuButton>
      </li>
    );
  }

  return (
    <li className="group/menu-item relative">
      <Collapsible
        defaultExpanded
        className="group/collapsible [&[data-expanded=true]>button>svg:first-child]:rotate-90"
      >
        <SidebarMenuButton slot="trigger">
          <ChevronRightIcon className="transition-transform" />
          <FolderIcon />
          <span>{props.node.name.replace(/^@/, "")}</span>
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub className="mr-0! translate-x-0! pr-0!">
            {props.node.children.map((child) => (
              <TreeNode
                key={child.name}
                node={child}
                selectedFile={props.selectedFile}
                onSelect={props.onSelect}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}

function getInitialFile(
  files: readonly VibeHighlightedRegistryFile[],
  name: string,
): VibeHighlightedRegistryFile {
  const canonicalPath = `registry/vibe-ui/${name}/${name}.tsx`;
  return files.find((file) => file.path === canonicalPath) ?? files[0]!;
}
