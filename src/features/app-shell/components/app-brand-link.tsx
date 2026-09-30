import { Link, type LinkComponentProps } from "@tanstack/react-router";

import { Route as homeRoute } from "@/routes/_rootLayout/index";

type AppBrandLinkProps = LinkComponentProps;

export function AppBrandLink(props: AppBrandLinkProps) {
  return (
    <Link
      aria-label={homeRoute.options.staticData.ariaLabel}
      to={homeRoute.to}
      activeOptions={{ exact: true }}
      className="text-xl font-bold hover:underline"
      {...props}
    >
      VibeUI
    </Link>
  );
}
