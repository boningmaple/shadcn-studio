import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import * as React from "react";

import { Toaster } from "@/components/ui/sonner";
import { ThemeHydrationScript } from "@/features/theme-switch/components/theme-hydration-script";

import fontCss from "@/styles/font.css?url";
import rootCss from "@/styles/root.css?url";

export const Route = createRootRoute({
  staticData: { ariaLabel: "" },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "VibeUI",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: fontCss,
      },
      {
        rel: "stylesheet",
        href: rootCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeHydrationScript />
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
