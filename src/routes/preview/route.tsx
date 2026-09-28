import { Outlet, createFileRoute } from "@tanstack/react-router";

import { previewThemeHydrationScript } from "@/features/registry/script/preview-theme-hydration-script";
import { previewThemeSearchSchema } from "@/features/registry/types/preview-theme";

export const Route = createFileRoute("/preview")({
  head: () => ({
    scripts: [{ children: previewThemeHydrationScript }],
  }),
  staticData: { ariaLabel: "" },
  validateSearch: previewThemeSearchSchema,
  component: Outlet,
});
