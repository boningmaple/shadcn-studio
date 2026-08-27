import * as React from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function useIsOnline(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );
}
