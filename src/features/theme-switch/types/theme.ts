import { z } from "zod";

export const themes = {
  system: "system",
  light: "light",
  dark: "dark",
} as const;

export const themeSchema = z.enum(themes);
export type Theme = z.infer<typeof themeSchema>;
export type Themes = typeof themes;
export const defaultTheme: Theme = themes.system;

/** Anything unrecognised is the default rather than an error. */
export function parseTheme(value: unknown): Theme {
  const result = themeSchema.safeParse(value);
  return result.success ? result.data : defaultTheme;
}

/** Where the preference is kept, and read from by the hydration script. */
export const localStorageKey = "theme";
export const darkModeMediaQuery = "(prefers-color-scheme: dark)";
