import { z } from "zod";

export const previewThemeSchema = z.enum(["light", "dark"]);
export type PreviewTheme = z.infer<typeof previewThemeSchema>;

export const previewThemeSearchSchema = z.object({
  theme: previewThemeSchema.optional().catch(undefined),
});
