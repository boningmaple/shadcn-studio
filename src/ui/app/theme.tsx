import { ScriptOnce } from "@tanstack/react-router";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { z } from "zod";
import { capitalize } from "@/lib/utils";
import { Button } from "@/ui/shadcn/react-aria/button";
import { Tooltip, TooltipTrigger } from "@/ui/shadcn/react-aria/tooltip";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Theme = "system" | "light" | "dark";
export const themes: Theme[] = ["system", "light", "dark"] as const;
export const themeSchema = z.enum(themes);

export const defaultTheme: Theme = "system";
export const localStorageKey = "theme";
export const darkModeMediaQuery = "(prefers-color-scheme: dark)";

function parseTheme(value: unknown): Theme {
  const result = themeSchema.safeParse(value);
  return result.success ? result.data : defaultTheme;
}

function getLocalStorageTheme(): Theme {
  try {
    return parseTheme(localStorage.getItem(localStorageKey));
  } catch {
    return defaultTheme;
  }
}

function setLocalStorageTheme(key: string, value: Theme) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function applyThemeToDocument(theme: Theme) {
  const systemIsDark = matchMedia(darkModeMediaQuery).matches;
  const isDark = theme === "dark" || (theme === "system" && systemIsDark);
  const colorScheme = isDark ? "dark" : "light";

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = colorScheme;
}

export const themeHydrationScript = (() => {
  function themeHydrationFn() {
    const defaultTheme = "system";

    let theme = defaultTheme;
    try {
      const localStorageTheme = localStorage.getItem("theme");
      if (localStorageTheme === null) {
        localStorage.setItem("theme", theme);
      } else {
        if (["system", "light", "dark"].includes(localStorageTheme)) {
          theme = localStorageTheme;
        } else {
          localStorage.setItem("theme", theme);
        }
      }
    } catch {}

    const systemIsDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && systemIsDark);
    const colorScheme = isDark ? "dark" : "light";

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = colorScheme;
  }
  return `(${themeHydrationFn.toString()})();`;
})();

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
  const [theme, setTheme] = useState<Theme>(getLocalStorageTheme);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== localStorageKey || event.storageArea !== localStorage)
        return;
      setTheme(parseTheme(event.newValue));
    };

    addEventListener("storage", onStorage);
    return () => removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    setLocalStorageTheme(localStorageKey, theme);
    applyThemeToDocument(theme);

    if (theme === "system") {
      const onChange = () => applyThemeToDocument(theme);
      const mediaQuery = matchMedia(darkModeMediaQuery);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }
  }, [theme]);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

/**
 * Belongs in `<head>`, before the body renders: it is what stops the browser
 * from painting a light document for a user whose stored theme is dark.
 */
export function ThemeHydrationScript() {
  return <ScriptOnce children={themeHydrationScript} />;
}

export function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const focusFrameId = useRef<number | undefined>(undefined);
  const nextTheme =
    theme === "system" ? "light" : theme === "light" ? "dark" : "system";
  const label = `Theme: ${capitalize(theme)}. Switch to ${capitalize(nextTheme)}.`;

  useEffect(() => {
    setIsHydrated(true);

    return () => {
      if (focusFrameId.current !== undefined) {
        cancelAnimationFrame(focusFrameId.current);
      }
    };
  }, []);

  const onPressTheme = () => {
    setTheme(nextTheme);
    setIsTooltipOpen(false);

    if (focusFrameId.current !== undefined) {
      cancelAnimationFrame(focusFrameId.current);
    }

    focusFrameId.current = requestAnimationFrame(() => {
      focusFrameId.current = undefined;
      buttonRef.current?.focus();
      setIsTooltipOpen(true);
    });
  };

  const button = (
    <Button
      ref={buttonRef}
      aria-label={label}
      isDisabled={!isHydrated}
      onPress={onPressTheme}
      size="icon-sm"
      variant="outline"
    >
      <MonitorIcon className="not-in-data-[theme=system]:hidden" />
      <SunIcon className="not-in-data-[theme=light]:hidden" />
      <MoonIcon className="not-in-data-[theme=dark]:hidden" />
    </Button>
  );

  if (!isHydrated) {
    return button;
  }

  return (
    <TooltipTrigger
      delay={300}
      isOpen={isTooltipOpen}
      onOpenChange={setIsTooltipOpen}
    >
      {button}
      <Tooltip>{label}</Tooltip>
    </TooltipTrigger>
  );
}
