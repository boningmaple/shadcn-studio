import type * as React from "react";

export type BadgeSize = "large" | "small";

export function getBadgeSize(children: React.ReactNode): BadgeSize {
  return children === null ||
    children === undefined ||
    typeof children === "boolean"
    ? "small"
    : "large";
}
