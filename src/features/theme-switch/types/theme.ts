import { z } from "zod";

/** What a visitor can ask the document to look like. */
export type Theme = "system" | "light" | "dark";

export const themes: Theme[] = ["system", "light", "dark"] as const;
export const themeSchema = z.enum(themes);
/** Anything unrecognised is the default rather than an error. */
export function parseTheme(value: unknown): Theme {
  const result = themeSchema.safeParse(value);
  return result.success ? result.data : defaultTheme;
}
export const defaultTheme: Theme = "system";

/** Where the preference is kept, and read from by the hydration script. */
export const localStorageKey = "theme";
export const darkModeMediaQuery = "(prefers-color-scheme: dark)";
