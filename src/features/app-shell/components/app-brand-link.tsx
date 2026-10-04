import { Link, type LinkComponentProps } from "@tanstack/react-router";

import { Route as homeRoute } from "@/routes/_rootLayout/index";
import { cn } from "@/shared/lib/utils";

type AppBrandLinkProps = LinkComponentProps;

export function AppBrandLink({ className, ...props }: AppBrandLinkProps) {
  return (
    <Link
      aria-label={homeRoute.options.staticData.ariaLabel}
      to={homeRoute.to}
      activeOptions={{ exact: true }}
      className={cn("text-xl font-bold hover:underline whitespace-nowrap", className)}
      {...props}
    >
      VibeUI
    </Link>
  );
}
