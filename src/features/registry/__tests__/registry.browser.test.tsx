import { expect, it } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { CodeExplorer } from "@/features/registry/components/registry-code-panel";
import type { HighlightedRegistryFile } from "@/features/registry/types/registry";

it("navigates textual files and keeps plain source usable when highlighting fails", async () => {
  const files: HighlightedRegistryFile[] = [
    {
      content: "export function LoginPage() {}",
      path: "registry/login-page.tsx",
      target: "@components/vibe-ui/login-page-01/login-page-01.tsx",
      type: "registry:page",
    },
    {
      content: ".login-page { display: grid; }",
      path: "registry/login-page.css",
      target: "@components/vibe-ui/login-page-01/login-page-01.css",
      type: "registry:file",
    },
  ];

  await render(<CodeExplorer files={files} highlightingFailed />);

  await expect.element(page.getByText(/Syntax highlighting is unavailable/)).toBeInTheDocument();
  await userEvent.click(page.getByRole("button", { name: "login-page-01.css" }));
  await expect.element(page.getByText(".login-page { display: grid; }")).toBeInTheDocument();
});
