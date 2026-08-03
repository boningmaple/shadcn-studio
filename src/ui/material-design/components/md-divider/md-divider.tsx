import type * as React from "react";
import { Separator as RACSeparator } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const mdDividerVariants = tv({
  base: ["block shrink-0 border-0 bg-[#cac4d0]", "dark:bg-[#49454f]"],
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "min-h-6 w-px self-stretch",
    },
    inset: {
      none: "",
      start: "",
      end: "",
      both: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", inset: "start", class: "ms-4" },
    { orientation: "horizontal", inset: "end", class: "me-4" },
    { orientation: "horizontal", inset: "both", class: "mx-4" },
    { orientation: "vertical", inset: "start", class: "mt-4" },
    { orientation: "vertical", inset: "end", class: "mb-4" },
    { orientation: "vertical", inset: "both", class: "my-4" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    inset: "none",
  },
});

export type MDDividerProps = Omit<
  React.ComponentPropsWithRef<typeof RACSeparator>,
  "orientation"
> &
  VariantProps<typeof mdDividerVariants>;

export function MDDivider({
  className,
  inset = "none",
  orientation = "horizontal",
  ...props
}: MDDividerProps) {
  return (
    <RACSeparator
      data-inset={inset}
      data-slot="divider"
      orientation={orientation}
      className={mdDividerVariants({ className, inset, orientation })}
      {...props}
    />
  );
}
