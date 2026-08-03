import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import {
  Card as BaseCard,
  CardContent as BaseCardContent,
  CardHeader as BaseCardHeader,
} from "@/ui/shadcn/react-aria/card";
import { cn } from "@/lib/utils";

export const m3CardStyles = tv({
  slots: {
    root: [
      "relative isolate flex flex-col gap-0 overflow-hidden rounded-[12px] border py-0 text-[#1d1b20] ring-0 outline-0 outline-solid outline-offset-2 outline-transparent [--card-spacing:0px]",
      "transition-[background-color,border-color,box-shadow,outline-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "data-[interactive=true]:cursor-pointer data-[interactive=true]:select-none",
      "data-[interactive=true]:hover:before:opacity-[0.08]",
      "data-[interactive=true]:focus-visible:before:opacity-[0.1] data-[interactive=true]:focus-visible:outline-2 data-[interactive=true]:focus-visible:outline-[#6750a4]",
      "data-[interactive=true]:active:before:opacity-[0.1]",
      "dark:text-[#e6e0e9] dark:data-[interactive=true]:focus-visible:outline-[#d0bcff]",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
    ],
    header: "relative z-10 grid gap-1 px-4 pt-4",
    content:
      "relative z-10 px-4 py-4 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    actions: "relative z-10 flex items-center justify-end gap-2 px-2 pt-0 pb-2",
  },
  variants: {
    variant: {
      elevated: {
        root: [
          "border-transparent bg-[#fffbfe]",
          "shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
          "data-[interactive=true]:hover:shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)]",
          "dark:bg-[#1d1b20]",
        ],
      },
      filled: {
        root: ["border-transparent bg-[#e6e0e9]", "dark:bg-[#49454f]"],
      },
      outlined: {
        root: [
          "border-[#cac4d0] bg-[#fffbfe]",
          "dark:border-[#49454f] dark:bg-[#1d1b20]",
        ],
      },
    },
  },
  defaultVariants: {
    variant: "elevated",
  },
});

export type M3CardVariantProps = VariantProps<typeof m3CardStyles>;
type CardSlotProps = Parameters<ReturnType<typeof m3CardStyles>["root"]>[0];

export function m3CardVariants({
  variant = "elevated",
}: M3CardVariantProps = {}) {
  const resolve = () => m3CardStyles({ variant });

  return {
    actions: (props?: CardSlotProps) => resolve().actions(props),
    content: (props?: CardSlotProps) => resolve().content(props),
    header: (props?: CardSlotProps) => resolve().header(props),
    root: (props?: CardSlotProps) => resolve().root(props),
  };
}

export type M3CardProps = React.ComponentPropsWithRef<typeof BaseCard> &
  M3CardVariantProps & {
    interactive?: boolean;
  };

export function M3Card({
  className,
  interactive = false,
  tabIndex,
  variant = "elevated",
  ...props
}: M3CardProps) {
  const { root } = m3CardVariants({ variant });
  const resolvedTabIndex = interactive ? (tabIndex ?? 0) : tabIndex;

  return (
    <BaseCard
      className={root({ className })}
      data-interactive={interactive}
      data-slot="card"
      data-variant={variant}
      tabIndex={resolvedTabIndex}
      {...props}
    />
  );
}

export type M3CardHeaderProps = React.ComponentPropsWithRef<
  typeof BaseCardHeader
>;

export function M3CardHeader({ className, ...props }: M3CardHeaderProps) {
  const { header } = m3CardVariants();

  return (
    <BaseCardHeader
      className={header({ className })}
      data-slot="card-header"
      {...props}
    />
  );
}

export type M3CardContentProps = React.ComponentPropsWithRef<
  typeof BaseCardContent
>;

export function M3CardContent({ className, ...props }: M3CardContentProps) {
  const { content } = m3CardVariants();

  return (
    <BaseCardContent
      className={content({ className })}
      data-slot="card-content"
      {...props}
    />
  );
}

export type M3CardActionsProps = React.ComponentPropsWithRef<"div">;

export function M3CardActions({ className, ...props }: M3CardActionsProps) {
  const { actions } = m3CardVariants();

  return (
    <div
      className={cn(actions(), className)}
      data-slot="card-actions"
      {...props}
    />
  );
}
