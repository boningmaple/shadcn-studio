import { useHydrated } from "@tanstack/react-router";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PreviewTheme } from "@/features/registry/types/preview-theme";
import { capitalize, cn } from "@/lib/utils";

function getLabel(theme: PreviewTheme, nextTheme: PreviewTheme) {
  return `Preview theme: ${capitalize(theme)}. Switch to ${capitalize(nextTheme)}.`;
}

export function CollectionPreviewThemeSwitch({
  previewTheme,
  setPreviewTheme,
}: {
  previewTheme: PreviewTheme | null;
  setPreviewTheme: (previewTheme: PreviewTheme) => void;
}) {
  const hydrated = useHydrated();

  const switchTheme = () => {
    // When no preview override exists, the iframe initially inherits the
    // resolved app theme represented by the outer document's `dark` class.
    const currentTheme =
      previewTheme ?? (document.documentElement.classList.contains("dark") ? "dark" : "light");

    setPreviewTheme(currentTheme === "light" ? "dark" : "light");
  };

  const lightClasses =
    previewTheme === null ? "dark:hidden" : previewTheme === "dark" ? "hidden" : undefined;

  const darkClasses =
    previewTheme === null ? "hidden dark:block" : previewTheme === "light" ? "hidden" : undefined;

  return (
    <Button
      data-slot="collection-preview-theme"
      variant="outline"
      size="icon"
      isDisabled={!hydrated}
      onPress={switchTheme}
      className="transition-none"
    >
      <SunIcon className={lightClasses} />
      <span className={cn("sr-only", lightClasses)}>{getLabel("light", "dark")}</span>

      <MoonIcon className={darkClasses} />
      <span className={cn("sr-only", darkClasses)}>{getLabel("dark", "light")}</span>
    </Button>
  );
}
