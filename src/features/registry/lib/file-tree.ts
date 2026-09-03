import type { VibeHighlightedRegistryFile } from "../types/registry.ts";

export type FileTreeNode = {
  children: FileTreeNode[];
  file?: VibeHighlightedRegistryFile;
  name: string;
};

export function registryFileDisplayPath(file: VibeHighlightedRegistryFile): string {
  return file.target ?? file.path;
}

export function buildFileTree(files: readonly VibeHighlightedRegistryFile[]): FileTreeNode[] {
  const root: FileTreeNode[] = [];

  for (const file of files) {
    const parts = registryFileDisplayPath(file).split("/").filter(Boolean);
    let level = root;

    for (const [index, part] of parts.entries()) {
      let node = level.find((candidate) => candidate.name === part);
      node ??= { children: [], name: part };
      if (!level.includes(node)) level.push(node);
      if (index === parts.length - 1) node.file = file;
      level = node.children;
    }
  }

  return sortNodes(root);
}

function sortNodes(nodes: FileTreeNode[]): FileTreeNode[] {
  return nodes
    .map((node) => ({ ...node, children: sortNodes(node.children) }))
    .sort((left, right) => {
      const leftIsDirectory = left.file === undefined;
      const rightIsDirectory = right.file === undefined;
      if (leftIsDirectory !== rightIsDirectory) return leftIsDirectory ? -1 : 1;
      return left.name.localeCompare(right.name);
    });
}
