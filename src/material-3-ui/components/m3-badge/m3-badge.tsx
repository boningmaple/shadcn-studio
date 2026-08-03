import type * as React from "react";
import { tv } from "tailwind-variants";

import { m3GetBadgeSize } from "@/material-3-ui/components/m3-badge/m3-badge-state";
import { cn } from "@/lib/utils";

export const m3BadgeVariants = tv({
  base: [
    "pointer-events-none absolute z-10 box-border inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "bg-[#b3261e] text-white dark:bg-[#f2b8b5] dark:text-[#601410]",
  ],
  variants: {
    size: {
      small: "top-0 end-0 size-1.5 rounded-[3px]",
      large: [
        "-top-0.5 -end-1 h-4 min-w-4 max-w-[34px] rounded-[8px] px-1",
        "text-[11px] leading-4 font-medium tracking-[0.5px]",
      ],
    },
  },
  defaultVariants: {
    size: "small",
  },
});

export type M3BadgeProps = React.ComponentPropsWithRef<"span">;

export function M3Badge({ children, className, ref, ...props }: M3BadgeProps) {
  const size = m3GetBadgeSize(children);

  return (
    <span
      ref={ref}
      className={m3BadgeVariants({ className, size })}
      data-size={size}
      data-slot="badge"
      {...props}
    >
      {size === "large" ? (
        <span data-slot="badge-label">{children}</span>
      ) : null}
    </span>
  );
}

export type M3BadgeAnchorProps = React.ComponentPropsWithRef<"span">;

export function M3BadgeAnchor({
  className,
  ref,
  ...props
}: M3BadgeAnchorProps) {
  return (
    <span
      ref={ref}
      className={cn(
        "relative isolate inline-flex shrink-0 items-center justify-center overflow-visible",
        className,
      )}
      data-slot="badge-anchor"
      {...props}
    />
  );
}
