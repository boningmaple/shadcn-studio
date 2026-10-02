import type {
  VibeRegistryCollection,
  VibeRegistryItemSummary,
  VibeRegistrySectionName,
  VibeRegistrySection,
  VibeRegistryItem,
} from "../types/registry.ts";
import { registrySectionNames } from "./registry-sections.ts";

const titleBySection: Record<VibeRegistrySectionName, string> = {
  blocks: "Blocks",
  components: "Components",
  pages: "Pages",
  charts: "Charts",
};

const descriptionBySection: Record<VibeRegistrySectionName, string> = {
  blocks: "Browse complete interface sections and application patterns.",
  components: "Browse focused UI components grouped by category.",
  pages: "Browse complete page compositions grouped by purpose.",
  charts: "Explore chart cards for trends, comparisons, and distributions.",
};

type PreviewUrlItem =
  | Pick<VibeRegistryItem, "categories" | "name">
  | Pick<VibeRegistryItemSummary, "section" | "category" | "name">;

export function collectionHref(section: VibeRegistrySectionName, category: string): string {
  return `/${section}/${category}`;
}

export function registrySectionHref(section: VibeRegistrySectionName): string {
  return `/${section}`;
}

export function registryItemHref(
  section: VibeRegistrySectionName,
  category: string,
  name: string,
): string {
  return `${collectionHref(section, category)}#${name}`;
}

export function previewUrl(item: PreviewUrlItem): string {
  const [section, category] =
    "categories" in item ? item.categories : [item.section, item.category];
  return `/preview/${section}/${category}/${item.name}`;
}

export function registryItemSummaries(
  items: readonly VibeRegistryItem[],
): VibeRegistryItemSummary[] {
  return items.map((item) => {
    const [section, category] = item.categories;
    return {
      category,
      description: item.description,
      href: registryItemHref(section, category, item.name),
      name: item.name,
      title: item.title,
      section,
    };
  });
}

export function registryCollections(
  items: readonly VibeRegistryItemSummary[],
): VibeRegistryCollection[] {
  const grouped = new Map<string, VibeRegistryCollection>();

  for (const item of items) {
    const key = `${item.section}:${item.category}`;
    const existing = grouped.get(key);

    if (existing === undefined) {
      const categoryTitle = humanize(item.category);
      grouped.set(key, {
        category: item.category,
        description: `Browse ${categoryTitle.toLowerCase()} Registry items.`,
        href: collectionHref(item.section, item.category),
        items: [item],
        title: categoryTitle,
        section: item.section,
      });
    } else {
      existing.items.push(item);
    }
  }

  return [...grouped.values()].sort((left, right) =>
    `${left.section}:${left.title}`.localeCompare(`${right.section}:${right.title}`),
  );
}

export function registrySections(items: readonly VibeRegistryItemSummary[]): VibeRegistrySection[] {
  const collections = registryCollections(items);

  return registrySectionNames.flatMap((section) => {
    const matchingCollections = collections.filter((collection) => collection.section === section);
    if (matchingCollections.length === 0) return [];

    return [
      {
        collections: matchingCollections,
        description: descriptionBySection[section],
        href: registrySectionHref(section),
        title: titleBySection[section],
        section,
      },
    ];
  });
}

function humanize(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");
}
