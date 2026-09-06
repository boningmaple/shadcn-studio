import { useHydrated } from "@tanstack/react-router";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { PreviewTheme } from "@/features/registry/types/preview-theme";
import { capitalize, cn } from "@/lib/utils";

export function getResolvedDocumentTheme(): PreviewTheme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useRegistryPreviewTheme(initialTheme?: PreviewTheme) {
  const hydrated = useHydrated();
  const [documentTheme, setDocumentTheme] = useState<PreviewTheme | null>(null);
  const [themeOverride, setThemeOverride] = useState<PreviewTheme | null>(initialTheme ?? null);

  useEffect(() => {
    if (!hydrated || initialTheme) return;

    const root = document.documentElement;
    const syncDocumentTheme = () => setDocumentTheme(getResolvedDocumentTheme());
    const observer = new MutationObserver(syncDocumentTheme);

    syncDocumentTheme();
    observer.observe(root, { attributeFilter: ["class"], attributes: true });

    return () => observer.disconnect();
  }, [hydrated, initialTheme]);

  return {
    setTheme: setThemeOverride,
    theme: themeOverride ?? documentTheme,
  };
}

export function RegistryPreviewThemeBoundary({
  children,
  className,
  theme,
}: {
  children: ReactNode;
  className?: string;
  theme: PreviewTheme | null;
}) {
  return (
    <div
      className={cn("bg-background text-foreground", theme, className)}
      data-slot="registry-preview-theme"
      data-theme={theme ?? undefined}
      style={theme ? { colorScheme: theme } : undefined}
    >
      {children}
    </div>
  );
}

export function RegistryPreviewThemeSwitch({
  setTheme,
  theme,
}: {
  setTheme: (theme: PreviewTheme) => void;
  theme: PreviewTheme | null;
}) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = theme
    ? `Preview theme: ${capitalize(theme)}. Switch to ${capitalize(nextTheme)}.`
    : "Preview theme loading.";

  return (
    <Button
      aria-label={label}
      className="transition-none"
      isDisabled={theme === null}
      onPress={() => setTheme(nextTheme)}
      size="icon"
      variant="outline"
    >
      <MoonIcon className={cn(theme === null ? "dark:hidden" : theme === "dark" && "hidden")} />
      <SunIcon
        className={cn(theme === null ? "hidden dark:block" : theme === "light" && "hidden")}
      />
    </Button>
  );
}
