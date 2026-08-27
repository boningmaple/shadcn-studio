import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import * as React from "react";

import { ThemeHydrationScript } from "@/features/theme-switch/components/theme-hydration-script";
import { ThemeProvider } from "@/features/theme-switch/components/theme-provider";
import { AppHeader } from "@/features/ui-app/components/app-header";
import { AppSidebar } from "@/features/ui-app/components/app-sidebar";
import { appSidebarData } from "@/features/ui-app/data/app-sidebar-data";
import { Separator } from "@/features/ui-shadcn/react-aria/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/features/ui-shadcn/react-aria/sidebar";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
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
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <ThemeHydrationScript />
      </head>
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>
          <AppHeader />
          <SidebarProvider className="min-h-0 flex-1">
            <AppSidebar data={appSidebarData} />
            <SidebarInset>
              <div
                aria-label="Workspace controls"
                className="flex h-14 shrink-0 items-center gap-2 border-b px-4"
                role="toolbar"
              >
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm font-medium">VibeUI</span>
              </div>
              <main className="flex-1 p-4">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
