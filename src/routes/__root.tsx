import * as React from "react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AppHeader } from "@/ui/app/app-header";
import { AppSidebar, appSidebarData } from "@/ui/app/app-sidebar";
import { Separator } from "@/ui/shadcn/react-aria/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/ui/shadcn/react-aria/sidebar";
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
    <html className="dark" lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-svh flex-col">
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
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
