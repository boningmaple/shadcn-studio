import { ScriptOnce } from "@tanstack/react-router";

import { themeHydrationScript } from "@/features/theme-switch/script/theme-hydration-script";

/**
 * Belongs in `<head>`, before the body renders: it is what stops the browser
 * from painting a light document for a user whose stored theme is dark.
 */
export function ThemeHydrationScript() {
  return <ScriptOnce>{themeHydrationScript}</ScriptOnce>;
}
