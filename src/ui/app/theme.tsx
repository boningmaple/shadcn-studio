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
  const systemIsDark = matchMedia(darkModeMediaQuery).matches;
  const isDark = theme === "dark" || (theme === "system" && systemIsDark);

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

const themeHydrationScript = (() => {
  function themeHydrationFn() {
    const defaultTheme = "system";
    const systemIsDark = matchMedia("(prefers-color-scheme: dark)").matches;

    let theme = defaultTheme;
    const storedTheme = localStorage.getItem("theme") ?? defaultTheme;
    if (["system", "light", "dark"].includes(storedTheme)) {
      theme = storedTheme;
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

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== themeStorageKey || event.storageArea !== localStorage)
        return;
      setTheme(parseTheme(event.newValue));
    };

    addEventListener("storage", onStorage);
    return () => removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem(themeStorageKey, theme);
    applyThemeToDocument(theme);

    if (theme === "system") {
      const onChange = () => applyThemeToDocument(theme);
      const mediaQuery = matchMedia(darkModeMediaQuery);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
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
  const { theme, setTheme } = useTheme();
  const nextTheme = getNextTheme(theme);
  const label = `Theme: ${capitalize(theme)}. Switch to ${capitalize(nextTheme)}.`;

  return (
    <TooltipTrigger delay={300}>
      <Button
        onPress={() => setTheme(nextTheme)}
        size="icon-sm"
        variant="outline"
      >
        <MonitorIcon className="not-in-data-[theme=system]:hidden" />
        <SunIcon className="not-in-data-[theme=light]:hidden" />
        <MoonIcon className="not-in-data-[theme=dark]:hidden" />
        <span className="sr-only not-in-data-[theme=system]:hidden">
          Theme: System. Switch to Light.
        </span>
        <span className="sr-only not-in-data-[theme=light]:hidden">
          Theme: Light. Switch to Dark.
        </span>
        <span className="sr-only not-in-data-[theme=dark]:hidden">
          Theme: Dark. Switch to System.
        </span>
      </Button>
      <Tooltip>{label}</Tooltip>
    </TooltipTrigger>
  );
}

function capitalize(value: Theme): string {
  return value[0].toUpperCase() + value.slice(1);
}
