import { createIsomorphicFn } from "@tanstack/react-start";

import {
  defaultTheme,
  localStorageKey,
  parseTheme,
  type Theme,
} from "@/features/theme-switch/types/theme";

/**
 * The stored preference, or the default where there is no storage to read.
 *
 * `createIsomorphicFn` is a build-time transform, so this resolves to the
 * server branch while rendering and the client branch in the browser — which
 * is what keeps the first client render agreeing with the server's.
 */
export const getLocalStorageTheme = createIsomorphicFn()
  .server((): Theme => defaultTheme)
  .client((): Theme => {
    try {
      return parseTheme(localStorage.getItem(localStorageKey));
    } catch {
      return defaultTheme;
    }
  });

/** Storage can throw — a private window, or a full quota. Losing the write is survivable. */
export function setLocalStorageTheme(key: string, value: Theme) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}
