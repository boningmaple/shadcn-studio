import type { BundledLanguage } from "../generated/shiki.bundle.gen.ts";
import type { VibeHighlightedRegistryFile, VibeRegistryItemFile } from "../types/registry.ts";

const supportedExtensions: Record<string, BundledLanguage> = {
  css: "css",
  html: "html",
  js: "javascript",
  jsx: "javascript",
  json: "json",
  md: "markdown",
  mdx: "markdown",
  sh: "bash",
  ts: "typescript",
  tsx: "tsx",
};

export async function highlightRegistryFiles(
  files: readonly VibeRegistryItemFile[],
): Promise<VibeHighlightedRegistryFile[]> {
  const filesWithLanguages = files.map((file) => ({
    file,
    language: languageFor(file.target ?? file.path),
  }));

  if (filesWithLanguages.every(({ language }) => language === undefined)) return [...files];

  const { codeToHtml } = await import("../generated/shiki.bundle.gen.ts");

  return Promise.all(
    filesWithLanguages.map(async ({ file, language }) =>
      language === undefined
        ? file
        : {
            ...file,
            html: await codeToHtml(file.content, {
              lang: language,
              themes: { dark: "github-dark", light: "github-light" },
            }),
          },
    ),
  );
}

function languageFor(filePath: string): BundledLanguage | undefined {
  const extension = filePath.split(".").pop()?.toLowerCase();
  return extension === undefined ? undefined : supportedExtensions[extension];
}
