import { useEffect, useState, type RefObject } from "react";

import { useTheme } from "@/features/theme-switch/components/theme-context";
import type { Theme } from "@/features/theme-switch/types/theme";

import { themeDarkMessage, themeLightMessage } from "../lib/preview-frame-message";
import type { PreviewTheme } from "../types/preview-theme";

type PreviewThemeState = {
  appTheme: Theme;
  resolvedTheme: PreviewTheme;
  previewThemeOverride: PreviewTheme | null;
};

export function usePreviewTheme(previewFrameRef: RefObject<HTMLIFrameElement | null>) {
  const { resolvedTheme, theme: appTheme } = useTheme();
  const [state, setState] = useState<PreviewThemeState>({
    appTheme,
    resolvedTheme,
    previewThemeOverride: null,
  });
  const appThemeChanged = state.appTheme !== appTheme || state.resolvedTheme !== resolvedTheme;

  if (appThemeChanged) {
    setState({ appTheme, resolvedTheme, previewThemeOverride: null });
  }

  const isFollowingAppTheme = appThemeChanged || state.previewThemeOverride === null;

  const previewTheme = appThemeChanged
    ? resolvedTheme
    : (state.previewThemeOverride ?? resolvedTheme);

  useEffect(() => {
    const message = previewTheme === "light" ? themeLightMessage : themeDarkMessage;
    previewFrameRef.current?.contentWindow?.postMessage(message, location.origin);
  }, [previewFrameRef, previewTheme]);

  const setPreviewTheme = (previewTheme: PreviewTheme) => {
    setState({ appTheme, resolvedTheme, previewThemeOverride: previewTheme });
  };

  return {
    previewTheme,
    isFollowingAppTheme,
    setPreviewTheme,
  };
}
