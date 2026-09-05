import { useHydrated } from "@tanstack/react-router";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PressEvent } from "react-aria-components";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/features/theme-switch/components/theme-context";
import type { Theme } from "@/features/theme-switch/types/theme";
import { capitalize } from "@/lib/utils";

function getLabel(theme: Theme, nextTheme: Theme) {
  return `Theme: ${capitalize(theme)}. Switch to ${capitalize(nextTheme)}.`;
}

export function ThemeSwitchButton() {
  const hydrated = useHydrated();
  const { setTheme, theme } = useTheme();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const focusFrameId = useRef<number | undefined>(undefined);
  const nextTheme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";

  useEffect(() => {
    return () => {
      if (focusFrameId.current !== undefined) {
        cancelAnimationFrame(focusFrameId.current);
      }
    };
  }, []);

  const onPressTheme = ({ pointerType }: PressEvent) => {
    setTheme(nextTheme);
    setIsTooltipOpen(false);

    if (focusFrameId.current !== undefined) {
      cancelAnimationFrame(focusFrameId.current);
    }

    // React Aria never opens a tooltip from a touch (or virtual) interaction;
    // driving `isOpen` ourselves would override that, so opt out here instead.
    if (pointerType === "touch" || pointerType === "virtual") return;

    focusFrameId.current = requestAnimationFrame(() => {
      focusFrameId.current = undefined;
      buttonRef.current?.focus();
      setIsTooltipOpen(true);
    });
  };

  const button = (
    <Button
      ref={buttonRef}
      isDisabled={!hydrated}
      onPress={onPressTheme}
      size="icon"
      variant="outline"
      className="transition-none"
    >
      {/*
        All three labels are rendered so the markup never depends on `theme`
        state, which is what keeps the server and client renders identical.
        `<html data-theme>` picks the live one: `sr-only` keeps a span in the
        accessibility tree, while the `hidden` variant resolves to
        `display: none` and drops the other two. The accessible name therefore
        needs the stylesheet — without it, all three are announced at once.
      */}
      <MonitorIcon className="not-in-data-[theme=system]:hidden" />
      <span className="sr-only not-in-data-[theme=system]:hidden">
        {getLabel("system", "light")}
      </span>
      <SunIcon className="not-in-data-[theme=light]:hidden" />
      <span className="sr-only not-in-data-[theme=light]:hidden">{getLabel("light", "dark")}</span>
      <MoonIcon className="not-in-data-[theme=dark]:hidden" />
      <span className="sr-only not-in-data-[theme=dark]:hidden">{getLabel("dark", "system")}</span>
    </Button>
  );

  if (!hydrated) {
    return button;
  }

  return (
    <TooltipTrigger delay={300} isOpen={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      {button}
      <Tooltip>{getLabel(theme, nextTheme)}</Tooltip>
    </TooltipTrigger>
  );
}
