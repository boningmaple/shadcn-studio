import type { VibeHighlightedRegistryFile, VibeRegistryItemFile } from "../types/registry.ts";
import { shikiLanguageForPath } from "./shiki-language.ts";
import { bundledThemes, codeToHtml } from "./shiki.bundle.gen.ts";

const lightTheme = "github-light" satisfies keyof typeof bundledThemes;
const darkTheme = "github-dark" satisfies keyof typeof bundledThemes;

export async function highlightRegistryFiles(
  files: readonly VibeRegistryItemFile[],
): Promise<VibeHighlightedRegistryFile[]> {
  return Promise.all(
    files.map(async (file) => ({
      ...file,
      html: await codeToHtml(file.content, {
        lang: shikiLanguageForPath(file.target)!,
        themes: { dark: darkTheme, light: lightTheme },
      }),
    })),
  );
}
