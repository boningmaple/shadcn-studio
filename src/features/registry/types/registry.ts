import {
  type Registry as ShadcnRegistry,
  type RegistryItem as ShadcnRegistryItem,
  registryItemSchema,
  registrySchema,
} from "shadcn/schema";
import { z } from "zod";

type ShadcnSchema<T> = {
  safeParse(data: unknown):
    | { success: true; data: T }
    | {
        success: false;
        error: { issues: { message: string; path: (string | number)[] }[] };
      };
};

function fromShadcnSchema<T>(schema: ShadcnSchema<T>, message: string): z.ZodType<T> {
  return z.transform((value, context): T => {
    const result = schema.safeParse(value);
    if (result.success) return result.data;

    for (const issue of result.error.issues) {
      context.issues.push({
        code: "custom",
        input: value,
        message: `${message} ${issue.message}`,
        path: issue.path,
      });
    }
    return z.NEVER;
  });
}

const vibeRegistryItemNameSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must use lowercase letters, numbers, and single hyphens.")
  .refine((value) => !["index", "route"].includes(value), "Cannot use a reserved route filename.");

const vibeRegistryItemRequirementsSchema = z
  .looseObject({
    name: vibeRegistryItemNameSchema,
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    type: z.enum(["registry:block", "registry:component", "registry:page"]),
    files: z.array(z.looseObject({ path: z.string() })),
    categories: z.tuple([vibeRegistryItemNameSchema]),
  })
  .refine(
    (item) => {
      const itemPath = `registry/vibe-ui/${item.name}/${item.name}.tsx`;
      return item.files.some((file) => file.path === itemPath);
    },
    {
      error: (issue) => {
        const item = issue.input as { name: string };
        return `Must declare registry/vibe-ui/${item.name}/${item.name}.tsx as an installable file.`;
      },
      path: ["files"],
    },
  );

export const vibeRegistryItemSchema = z.intersection(
  fromShadcnSchema<ShadcnRegistryItem>(registryItemSchema, "Invalid shadcn Registry item."),
  vibeRegistryItemRequirementsSchema,
);

const vibeRegistryRequirementsSchema = z
  .object({
    name: z.literal("Vibe UI"),
    items: z.array(vibeRegistryItemSchema),
  })
  .superRefine((registry, context) => {
    const itemNames = new Set<string>();
    const routeKeys = new Set<string>();

    for (const [index, item] of registry.items.entries()) {
      if (itemNames.has(item.name)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate Registry item name: ${item.name}.`,
          path: ["items", index, "name"],
        });
      }
      itemNames.add(item.name);

      const routeKey = `${item.type}/${item.categories[0]}/${item.name}`;
      if (routeKeys.has(routeKey)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate route identity: ${routeKey}.`,
          path: ["items", index],
        });
      }
      routeKeys.add(routeKey);
    }
  });

export const vibeRegistrySchema = z.intersection(
  fromShadcnSchema<ShadcnRegistry>(registrySchema, "Invalid shadcn Registry."),
  vibeRegistryRequirementsSchema,
);

export type VibeRegistry = z.infer<typeof vibeRegistrySchema>;
export type VibeRegistryItem = z.infer<typeof vibeRegistryItemSchema>;
export type VibeRegistryItemType = VibeRegistryItem["type"];

export type VibeRegistryItemSummary = {
  category: string;
  description: string;
  href: string;
  name: string;
  title: string;
  type: VibeRegistryItemType;
};

export type VibeRegistryCollection = {
  category: string;
  description: string;
  href: string;
  items: VibeRegistryItemSummary[];
  title: string;
  type: VibeRegistryItemType;
};

export type VibeRegistrySection = {
  collections: VibeRegistryCollection[];
  description: string;
  href: string;
  title: string;
  type: VibeRegistryItemType;
};

export type VibeRegistrySidebarCollection = {
  href: string;
  title: string;
};

export type VibeRegistrySidebarSection = {
  collections: VibeRegistrySidebarCollection[];
  label: string;
  type: VibeRegistryItemType;
};

export type VibeRegistryItemFile = {
  content: string;
  path: string;
  target?: string;
  type: string;
};

export type VibeHighlightedRegistryFile = VibeRegistryItemFile & {
  html?: string;
};
