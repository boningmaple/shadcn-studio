import { Outlet, createFileRoute } from "@tanstack/react-router";

import { PreviewThemeProvider } from "@/features/registry/components/preview-theme-provider";
import { previewThemeHydrationScript } from "@/features/registry/script/preview-theme-hydration-script";
import { previewThemeSearchSchema } from "@/features/registry/types/preview-theme";

export const Route = createFileRoute("/preview")({
  head: () => ({
    scripts: [{ children: previewThemeHydrationScript }],
  }),
  staticData: { ariaLabel: "" },
  validateSearch: previewThemeSearchSchema,
  component: PreviewLayout,
});

function PreviewLayout() {
  const { theme } = Route.useSearch();

  return (
    <PreviewThemeProvider theme={theme}>
      <Outlet />
    </PreviewThemeProvider>
  );
}
