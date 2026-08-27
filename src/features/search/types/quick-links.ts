import type { LucideIcon } from "lucide-react";

/**
 * A fixed destination the palette offers before anything is typed.
 *
 * The palette takes these from whoever renders it rather than reaching for the
 * app's navigation itself, so the search feature stays something the app
 * depends on rather than the other way around.
 */
export type QuickLink = {
  icon?: LucideIcon;
  label: string;
  to: string;
};
