import { createHighlighter, type Highlighter } from "shiki";

import type { HighlightedRegistryFile, RegistryItemFile } from "../types/registry.ts";

let highlighter: Promise<Highlighter> | undefined;

export async function highlightFiles(
  files: readonly RegistryItemFile[],
): Promise<HighlightedRegistryFile[]> {
  highlighter ??= createHighlighter({
    langs: ["bash", "css", "html", "javascript", "json", "markdown", "text", "tsx", "typescript"],
    themes: ["github-dark", "github-light"],
  });

  const instance = await highlighter;

  return files.map((file) => ({
    ...file,
    html: instance.codeToHtml(file.content, {
      lang: languageFor(file.target ?? file.path),
      themes: { dark: "github-dark", light: "github-light" },
    }),
  }));
}

function languageFor(filePath: string): string {
  const extension = filePath.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "css":
      return "css";
    case "html":
      return "html";
    case "js":
    case "jsx":
      return "javascript";
    case "json":
      return "json";
    case "md":
    case "mdx":
      return "markdown";
    case "sh":
      return "bash";
    case "ts":
      return "typescript";
    case "tsx":
      return "tsx";
    default:
      return "text";
  }
}
