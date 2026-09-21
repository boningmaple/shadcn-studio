import * as React from "react";

const MOBILE_BREAKPOINT = 1024;

const getIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
const getServerIsMobile = () => false;

const subscribeToViewport = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

export function useIsMobile() {
  return React.useSyncExternalStore(subscribeToViewport, getIsMobile, getServerIsMobile);
}
