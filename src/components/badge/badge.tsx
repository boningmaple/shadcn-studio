import type * as React from "react";
import { tv } from "tailwind-variants";

import { getBadgeSize } from "@/components/badge/badge-state";
import { cn } from "@/lib/utils";

export const badgeVariants = tv({
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

export type BadgeProps = React.ComponentPropsWithRef<"span">;

export function Badge({ children, className, ref, ...props }: BadgeProps) {
  const size = getBadgeSize(children);

  return (
    <span
      ref={ref}
      className={badgeVariants({ className, size })}
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

export type BadgeAnchorProps = React.ComponentPropsWithRef<"span">;

export function BadgeAnchor({ className, ref, ...props }: BadgeAnchorProps) {
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
