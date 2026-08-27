import { useEffect } from "react";

import { isApplePlatform } from "@/features/search/lib/platform";

export function useSearchShortcut(onPress: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (isApplePlatform() ? event.metaKey : event.ctrlKey)) {
        event.preventDefault();
        onPress();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onPress]);
}
