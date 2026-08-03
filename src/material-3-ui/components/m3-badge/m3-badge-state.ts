import type * as React from "react";

export type M3BadgeSize = "large" | "small";

export function m3GetBadgeSize(children: React.ReactNode): M3BadgeSize {
  return children === null ||
    children === undefined ||
    typeof children === "boolean"
    ? "small"
    : "large";
}
