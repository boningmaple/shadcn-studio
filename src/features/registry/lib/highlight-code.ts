import type { VibeHighlightedRegistryFile, VibeRegistryItemFile } from "../types/registry.ts";
import {
  bundledLanguages,
  bundledThemes,
  codeToHtml,
  type BundledLanguage,
} from "./shiki.bundle.gen.ts";

const lightTheme = "github-light" satisfies keyof typeof bundledThemes;
const darkTheme = "github-dark" satisfies keyof typeof bundledThemes;

export async function highlightRegistryFiles(
  files: readonly VibeRegistryItemFile[],
): Promise<VibeHighlightedRegistryFile[]> {
  const filesWithExtensions = files.map((file) => ({
    extension: (file.target ?? file.path).split(".").pop()?.toLowerCase(),
    file,
  }));

  return Promise.all(
    filesWithExtensions.map(async ({ extension, file }) =>
      extension === undefined || !Object.hasOwn(bundledLanguages, extension)
        ? file
        : {
            ...file,
            html: await codeToHtml(file.content, {
              lang: extension as BundledLanguage,
              themes: { dark: darkTheme, light: lightTheme },
            }),
          },
    ),
  );
}
