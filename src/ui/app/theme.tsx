"use client";

import * as React from "react";
import { ScriptOnce } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { z } from "zod";
import { create } from "zustand";
import { persist, type PersistStorage } from "zustand/middleware";

import { Button } from "@/ui/shadcn/react-aria/button";
import { Tooltip, TooltipTrigger } from "@/ui/shadcn/react-aria/tooltip";

export const themes = ["system", "light", "dark"] as const;
export const themeSchema = z.enum(themes);

export type Theme = z.infer<typeof themeSchema>;

const defaultTheme = "system" satisfies Theme;
const themeStorageKey = "theme";
const darkModeMediaQuery = "(prefers-color-scheme: dark)";
const nextTheme: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

export function parseTheme(value: unknown): Theme {
  const result = themeSchema.safeParse(value);

  return result.success ? result.data : defaultTheme;
}

export function getNextTheme(theme: Theme): Theme {
  return nextTheme[theme];
}

const readStoredTheme = createIsomorphicFn()
  .server((_key: string): string | null => null)
  .client((key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  });

const writeStoredTheme = createIsomorphicFn()
  .server((_key: string, _theme: Theme) => {})
  .client((key: string, theme: Theme) => {
    try {
      localStorage.setItem(key, theme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  });

const removeStoredTheme = createIsomorphicFn()
  .server((_key: string) => {})
  .client((key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Storage can be unavailable in restricted browsing contexts.
    }
  });

const applyTheme = createIsomorphicFn()
  .server((_theme: Theme) => {})
  .client((theme: Theme) => {
    const isDark =
      theme === "dark" ||
      (theme === "system" && matchMedia(darkModeMediaQuery).matches);
    const root = document.documentElement;

    root.dataset.theme = theme;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  });

const subscribeToSystemTheme = createIsomorphicFn()
  .server((_onChange: () => void) => () => {})
  .client((onChange: () => void) => {
    const mediaQuery = matchMedia(darkModeMediaQuery);
    const handleChange = () => onChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  });

const subscribeToStoredTheme = createIsomorphicFn()
  .server((_onChange: (theme: Theme) => void) => () => {})
  .client((onChange: (theme: Theme) => void) => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== themeStorageKey) {
        return;
      }

      try {
        if (event.storageArea !== localStorage) {
          return;
        }
      } catch {
        return;
      }

      onChange(parseTheme(event.newValue));
    };

    addEventListener("storage", handleStorage);

    return () => removeEventListener("storage", handleStorage);
  });

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

type PersistedThemeStore = Pick<ThemeStore, "theme">;

const themeStorage: PersistStorage<PersistedThemeStore> = {
  getItem: (key) => {
    const storedTheme = readStoredTheme(key);

    if (storedTheme === null) {
      return null;
    }

    return { state: { theme: parseTheme(storedTheme) } };
  },
  setItem: (key, value) => {
    writeStoredTheme(key, parseTheme(value.state.theme));
  },
  removeItem: (key) => {
    removeStoredTheme(key);
  },
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      setTheme: (theme) => set({ theme: themeSchema.parse(theme) }),
      cycleTheme: () => set((state) => ({ theme: getNextTheme(state.theme) })),
    }),
    {
      name: themeStorageKey,
      storage: themeStorage,
      partialize: (state) => ({ theme: state.theme }),
      skipHydration: true,
    },
  ),
);

interface ThemeInitOptions {
  themes: readonly Theme[];
  defaultTheme: Theme;
  themeStorageKey: string;
  darkModeMediaQuery: string;
}

function initializeTheme({
  themes,
  defaultTheme,
  themeStorageKey,
  darkModeMediaQuery,
}: ThemeInitOptions) {
  let theme = defaultTheme;

  try {
    const storedTheme = localStorage.getItem(themeStorageKey);
    if (themes.some((validTheme) => validTheme === storedTheme)) {
      theme = storedTheme as Theme;
    }
  } catch {}

  let systemIsDark = false;
  try {
    systemIsDark = matchMedia(darkModeMediaQuery).matches;
  } catch {}

  const isDark = theme === "dark" || (theme === "system" && systemIsDark);
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

const themeInitScript = `(${initializeTheme.toString()})(${JSON.stringify({
  themes,
  defaultTheme,
  themeStorageKey,
  darkModeMediaQuery,
} satisfies ThemeInitOptions)})`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    let isActive = true;
    let unsubscribeSystemTheme: (() => void) | undefined;

    const synchronizeTheme = (theme: Theme) => {
      unsubscribeSystemTheme?.();
      unsubscribeSystemTheme = undefined;
      applyTheme(theme);

      if (theme === "system") {
        unsubscribeSystemTheme = subscribeToSystemTheme(() => {
          applyTheme("system");
        });
      }
    };

    const unsubscribeStore = useThemeStore.subscribe((state, previousState) => {
      if (state.theme !== previousState.theme) {
        synchronizeTheme(state.theme);
      }
    });
    const unsubscribeStoredTheme = subscribeToStoredTheme((theme) => {
      if (theme !== useThemeStore.getState().theme) {
        useThemeStore.getState().setTheme(theme);
      }
    });

    void Promise.resolve(useThemeStore.persist.rehydrate()).then(() => {
      if (isActive) {
        synchronizeTheme(useThemeStore.getState().theme);
      }
    });

    return () => {
      isActive = false;
      unsubscribeStore();
      unsubscribeStoredTheme();
      unsubscribeSystemTheme?.();
    };
  }, []);

  return (
    <>
      <ScriptOnce>{themeInitScript}</ScriptOnce>
      {children}
    </>
  );
}

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const cycleTheme = useThemeStore((state) => state.cycleTheme);
  const followingTheme = getNextTheme(theme);
  const label = `Theme: ${capitalize(theme)}. Switch to ${capitalize(followingTheme)}.`;

  return (
    <TooltipTrigger delay={300}>
      <Button
        aria-label={label}
        onPress={cycleTheme}
        size="icon-sm"
        variant="outline"
      >
        <MonitorIcon className="not-in-data-[theme=system]:hidden" />
        <SunIcon className="not-in-data-[theme=light]:hidden" />
        <MoonIcon className="not-in-data-[theme=dark]:hidden" />
      </Button>
      <Tooltip>{label}</Tooltip>
    </TooltipTrigger>
  );
}

function capitalize(value: Theme): string {
  return value[0].toUpperCase() + value.slice(1);
}
