import type * as React from "react";

export type MDBadgeSize = "large" | "small";

export function mdGetBadgeSize(children: React.ReactNode): MDBadgeSize {
  return children === null ||
    children === undefined ||
    typeof children === "boolean"
    ? "small"
    : "large";
}
