import type {
  VibeRegistryCollection,
  VibeRegistryItemSummary,
  VibeRegistryItemType,
  VibeRegistrySection,
  VibeRegistryItem,
} from "../types/registry.ts";

const segmentByType: Record<VibeRegistryItemType, string> = {
  "registry:block": "blocks",
  "registry:component": "components",
  "registry:page": "pages",
};

const pluralByType: Record<VibeRegistryItemType, string> = {
  "registry:block": "Blocks",
  "registry:component": "Components",
  "registry:page": "Pages",
};

const sectionDescriptionByType: Record<VibeRegistryItemType, string> = {
  "registry:block": "Browse complete interface sections and application patterns.",
  "registry:component": "Browse focused UI components grouped by category.",
  "registry:page": "Browse complete page compositions grouped by purpose.",
};

export function collectionHref(type: VibeRegistryItemType, category: string): string {
  return `/${segmentByType[type]}/${category}`;
}

export function registrySectionHref(type: VibeRegistryItemType): string {
  return `/${segmentByType[type]}`;
}

export function registryItemHref(
  type: VibeRegistryItemType,
  category: string,
  name: string,
): string {
  return `${collectionHref(type, category)}#${name}`;
}

export function registryItemSummaries(
  items: readonly VibeRegistryItem[],
): VibeRegistryItemSummary[] {
  return items.map((item) => {
    const category = item.categories[0]!;
    return {
      category,
      description: item.description,
      href: registryItemHref(item.type, category, item.name),
      name: item.name,
      title: item.title,
      type: item.type,
    };
  });
}

export function registryCollections(
  items: readonly VibeRegistryItemSummary[],
): VibeRegistryCollection[] {
  const grouped = new Map<string, VibeRegistryCollection>();

  for (const item of items) {
    const key = `${item.type}:${item.category}`;
    const existing = grouped.get(key);

    if (existing === undefined) {
      const categoryTitle = humanize(item.category);
      grouped.set(key, {
        category: item.category,
        description: `Browse ${categoryTitle.toLowerCase()} Registry items.`,
        href: collectionHref(item.type, item.category),
        items: [item],
        title: categoryTitle,
        type: item.type,
      });
    } else {
      existing.items.push(item);
    }
  }

  return [...grouped.values()]
    .map((collection) => ({
      ...collection,
      items: [...collection.items].sort((left, right) => left.title.localeCompare(right.title)),
    }))
    .sort((left, right) =>
      `${left.type}:${left.title}`.localeCompare(`${right.type}:${right.title}`),
    );
}

export function registrySections(items: readonly VibeRegistryItemSummary[]): VibeRegistrySection[] {
  const collections = registryCollections(items);

  return (["registry:component", "registry:block", "registry:page"] as const).flatMap((type) => {
    const matchingCollections = collections.filter((collection) => collection.type === type);
    if (matchingCollections.length === 0) return [];

    return [
      {
        collections: matchingCollections,
        description: sectionDescriptionByType[type],
        href: registrySectionHref(type),
        title: pluralByType[type],
        type,
      },
    ];
  });
}

export function registryTypeSegment(type: VibeRegistryItemType): string {
  return segmentByType[type];
}

function humanize(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");
}
