import { CheckIcon, CopyIcon, FileIcon, FolderIcon, TriangleAlertIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

import { useRegistryCode } from "../hooks/use-registry-code.ts";
import { buildFileTree, registryFileDisplayPath, type FileTreeNode } from "../lib/file-tree.ts";
import type { HighlightedRegistryFile } from "../types/registry.ts";

export function RegistryCodePanel({ enabled, name }: { enabled: boolean; name: string }) {
  const { retry, state } = useRegistryCode(name, enabled);

  if (state.status === "idle" || state.status === "loading") {
    return (
      <output className="flex min-h-80 items-center justify-center gap-2 text-sm text-muted-foreground">
        <Spinner /> Loading code
      </output>
    );
  }

  if (state.status === "error") {
    return (
      <Empty className="min-h-80" role="alert">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TriangleAlertIcon />
          </EmptyMedia>
          <EmptyTitle>Code could not be loaded</EmptyTitle>
          <EmptyDescription>{state.error.message}</EmptyDescription>
        </EmptyHeader>
        <Button onPress={retry} variant="outline">
          Try again
        </Button>
      </Empty>
    );
  }

  return <CodeExplorer files={state.files} highlightingFailed={state.highlightingFailed} />;
}

export function CodeExplorer({
  files,
  highlightingFailed,
}: {
  files: HighlightedRegistryFile[];
  highlightingFailed: boolean;
}) {
  const [selectedPath, setSelectedPath] = useState(() => registryFileDisplayPath(files[0]!));
  const [copied, setCopied] = useState(false);
  const selectedFile =
    files.find((file) => registryFileDisplayPath(file) === selectedPath) ?? files[0]!;
  const tree = useMemo(() => buildFileTree(files), [files]);

  const copy = async () => {
    await navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    globalThis.setTimeout(() => setCopied(false), 1_500);
  };

  return (
    <div className="overflow-hidden rounded-lg border">
      {highlightingFailed ? (
        <output className="block border-b bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
          Syntax highlighting is unavailable. Showing plain code.
        </output>
      ) : null}
      <div className={files.length > 1 ? "grid min-h-96 md:grid-cols-[16rem_1fr]" : "min-h-96"}>
        {files.length > 1 ? (
          <aside
            aria-label="Registry item files"
            className="border-b p-2 md:border-r md:border-b-0"
          >
            <FileTree nodes={tree} onSelect={setSelectedPath} selectedPath={selectedPath} />
          </aside>
        ) : null}
        <section className="min-w-0">
          <div className="flex h-11 items-center justify-between gap-3 border-b px-3">
            <span className="truncate text-xs text-muted-foreground">
              {registryFileDisplayPath(selectedFile)}
            </span>
            <Button aria-label="Copy current file" onPress={copy} size="icon-sm" variant="ghost">
              {copied ? <CheckIcon /> : <CopyIcon />}
            </Button>
          </div>
          {selectedFile.html === undefined ? (
            <pre className="max-h-[36rem] overflow-auto p-4 text-sm">
              <code>{selectedFile.content}</code>
            </pre>
          ) : (
            <div
              className="max-h-[36rem] overflow-auto text-sm [&_pre]:min-h-96 [&_pre]:p-4"
              dangerouslySetInnerHTML={{ __html: selectedFile.html }}
            />
          )}
        </section>
      </div>
    </div>
  );
}

function FileTree({
  nodes,
  onSelect,
  selectedPath,
  prefix = "",
}: {
  nodes: FileTreeNode[];
  onSelect: (path: string) => void;
  selectedPath: string;
  prefix?: string;
}) {
  return (
    <ul className="space-y-0.5">
      {nodes.map((node) => {
        const path = prefix === "" ? node.name : `${prefix}/${node.name}`;

        return (
          <li key={path}>
            {node.file === undefined ? (
              <>
                <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium">
                  <FolderIcon className="size-3.5" /> {node.name}
                </div>
                <div className="pl-3">
                  <FileTree
                    nodes={node.children}
                    onSelect={onSelect}
                    prefix={path}
                    selectedPath={selectedPath}
                  />
                </div>
              </>
            ) : (
              <button
                className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-xs hover:bg-muted aria-current:bg-muted"
                aria-current={selectedPath === path ? "page" : undefined}
                onClick={() => onSelect(path)}
                type="button"
              >
                <FileIcon className="size-3.5" /> {node.name}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
