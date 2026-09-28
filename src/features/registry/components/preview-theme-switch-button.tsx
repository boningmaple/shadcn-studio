import { useHydrated } from "@tanstack/react-router";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PreviewTheme } from "@/features/registry/types/preview-theme";
import { capitalize, cn } from "@/shared/lib/utils";

function getLabel(theme: PreviewTheme, nextTheme: PreviewTheme) {
  return `Preview theme: ${capitalize(theme)}. Switch to ${capitalize(nextTheme)}.`;
}

type PreviewThemeSwitchButtonProps = {
  previewTheme: PreviewTheme;
  isFollowingAppTheme: boolean;
  setPreviewTheme: (previewTheme: PreviewTheme) => void;
};

export function PreviewThemeSwitchButton(props: PreviewThemeSwitchButtonProps) {
  const hydrated = useHydrated();

  const lightClasses = props.isFollowingAppTheme
    ? "dark:hidden"
    : props.previewTheme === "dark"
      ? "hidden"
      : undefined;
  const darkClasses = props.isFollowingAppTheme
    ? "hidden dark:block"
    : props.previewTheme === "light"
      ? "hidden"
      : undefined;

  const switchTheme = () => {
    props.setPreviewTheme(props.previewTheme === "light" ? "dark" : "light");
  };

  return (
    <Button
      data-slot="collection-preview-theme"
      isDisabled={!hydrated}
      variant="outline"
      size="icon"
      className="transition-none"
      onPress={switchTheme}
    >
      <SunIcon className={lightClasses} />
      <span className={cn("sr-only", lightClasses)}>{getLabel("light", "dark")}</span>

      <MoonIcon className={darkClasses} />
      <span className={cn("sr-only", darkClasses)}>{getLabel("dark", "light")}</span>
    </Button>
  );
}
