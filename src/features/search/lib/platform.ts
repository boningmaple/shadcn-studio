import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

/**
 * Whichever user agent is at hand: the request's on the server, the browser's
 * on the client. Read this way so the platform is known while rendering, and
 * the shortcut hint is right in the HTML rather than corrected after mount.
 */
const getUserAgent = createIsomorphicFn()
  .server(() => {
    const userAgent = getRequestHeader("user-agent");
    return userAgent ?? "";
  })
  .client(() => {
    return navigator.userAgent;
  });

/** Whether this visitor's keyboard carries ⌘ rather than Ctrl. */
export function isApplePlatform(): boolean {
  return /mac|iphone|ipad|ipod/i.test(getUserAgent());
}
