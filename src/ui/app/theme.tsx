"use client";

import { ScriptOnce } from "@tanstack/react-router";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { z } from "zod";

import { Button } from "@/ui/shadcn/react-aria/button";
import { Tooltip, TooltipTrigger } from "@/ui/shadcn/react-aria/tooltip";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const themes = ["system", "light", "dark"] as const;
export const themeSchema = z.enum(themes);
export type Theme = z.infer<typeof themeSchema>;

const defaultTheme: Theme = "system";
const themeStorageKey = "theme";
const darkModeMediaQuery = "(prefers-color-scheme: dark)";

export function parseTheme(value: unknown): Theme {
  const result = themeSchema.safeParse(value);

  return result.success ? result.data : defaultTheme;
}

export function getNextTheme(theme: Theme): Theme {
  return theme === "system" ? "light" : theme === "light" ? "dark" : "system";
}

function applyThemeToDocument(theme: Theme) {
  let systemIsDark = false;

  try {
    systemIsDark = matchMedia(darkModeMediaQuery).matches;
  } catch {
    // Treat an unavailable media query as a light system preference.
  }

  const isDark = theme === "dark" || (theme === "system" && systemIsDark);

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

const themeHydrationScript = (() => {
  function themeHydrationFn() {
    const defaultTheme = "system";
    let theme = defaultTheme;
    const systemIsDark = matchMedia("(prefers-color-scheme: dark)").matches;

    try {
      const storedTheme = localStorage.getItem("theme") ?? defaultTheme;

      if (["system", "light", "dark"].includes(storedTheme)) {
        theme = storedTheme;
      }
    } catch {
      // Storage can be unavailable in restricted browsing contexts.
    }

    const isDark = theme === "dark" || (theme === "system" && systemIsDark);

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  }
  return `(${themeHydrationFn.toString()})();`;
})();

function readStoredTheme(): Theme {
  try {
    return parseTheme(localStorage.getItem(themeStorageKey));
  } catch {
    return defaultTheme;
  }
}

function writeStoredTheme(theme: Theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // The selected theme still applies when storage is unavailable.
  }
}

function subscribeToSystemTheme(onChange: () => void) {
  const mediaQuery = matchMedia(darkModeMediaQuery);
  const handleChange = () => onChange();

  mediaQuery.addEventListener("change", handleChange);

  return () => mediaQuery.removeEventListener("change", handleChange);
}

function subscribeToStoredTheme(onChange: (theme: Theme) => void) {
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
}

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  // Subscribe once for the provider's lifetime.
  useEffect(() => {
    return subscribeToStoredTheme(setTheme);
  }, []);

  useEffect(() => {
    writeStoredTheme(theme);
    applyThemeToDocument(theme);

    if (theme === "system") {
      return subscribeToSystemTheme(() => {
        applyThemeToDocument("system");
      });
    }
  }, [theme]);

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <ScriptOnce>{themeHydrationScript}</ScriptOnce>
      {children}
    </ThemeContext>
  );
}

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const nextTheme = getNextTheme(theme);
  const label = mounted
    ? `Theme: ${capitalize(theme)}. Switch to ${capitalize(nextTheme)}.`
    : "Switch Theme";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <TooltipTrigger delay={300}>
      <Button
        aria-label={label}
        onPress={() => setTheme(nextTheme)}
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
