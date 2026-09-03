import { describe, expect, it } from "vite-plus/test";

import { buildFileTree } from "@/features/registry/lib/file-tree";
import type { VibeHighlightedRegistryFile } from "@/features/registry/types/registry";

const file = (target: string): VibeHighlightedRegistryFile => ({
  content: target,
  path: `registry/${target}`,
  target,
  type: "registry:file",
});

describe("buildFileTree", () => {
  it("groups installation targets into directories and orders folders before files", () => {
    const tree = buildFileTree([
      file("@components/vibe-ui/login-page-01/login-page-01.tsx"),
      file("@components/vibe-ui/login-page-01/styles/login-page-01.css"),
    ]);

    expect(tree[0]?.name).toBe("@components");
    expect(tree[0]?.children[0]?.children[0]?.children.map((node) => node.name)).toEqual([
      "styles",
      "login-page-01.tsx",
    ]);
  });
});
