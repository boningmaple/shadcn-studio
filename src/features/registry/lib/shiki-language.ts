import { bundledLanguages, type BundledLanguage } from "./shiki.bundle.gen.ts";

export function shikiLanguageForPath(path: string): BundledLanguage | undefined {
  const extension = path.split(".").pop()?.toLowerCase();
  return extension !== undefined && Object.hasOwn(bundledLanguages, extension)
    ? (extension as BundledLanguage)
    : undefined;
}
