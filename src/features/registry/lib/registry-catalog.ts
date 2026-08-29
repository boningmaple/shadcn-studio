import type {
  RegistryCollection,
  RegistryItemKind,
  RegistryItemSummary,
  RegistryItemType,
  RegistrySection,
  RegistrySourceItem,
} from "../types/registry.ts";

const kindByType: Record<RegistryItemType, RegistryItemKind> = {
  "registry:block": "block",
  "registry:component": "component",
  "registry:page": "page",
};

const segmentByKind: Record<RegistryItemKind, string> = {
  block: "blocks",
  component: "components",
  page: "pages",
};

const pluralByKind: Record<RegistryItemKind, string> = {
  block: "Blocks",
  component: "Components",
  page: "Pages",
};

const sectionDescriptionByKind: Record<RegistryItemKind, string> = {
  block: "Browse complete interface sections and application patterns.",
  component: "Browse focused UI components grouped by category.",
  page: "Browse complete page compositions grouped by purpose.",
};

export function registryKind(type: RegistryItemType): RegistryItemKind {
  return kindByType[type];
}

export function collectionHref(kind: RegistryItemKind, category: string): string {
  return `/${segmentByKind[kind]}/${category}`;
}

export function registrySectionHref(kind: RegistryItemKind): string {
  return `/${segmentByKind[kind]}`;
}

export function registryItemHref(kind: RegistryItemKind, category: string, name: string): string {
  return `${collectionHref(kind, category)}#${name}`;
}

export function registryItemSummaries(items: readonly RegistrySourceItem[]): RegistryItemSummary[] {
  return items.map((item) => {
    const category = item.categories[0]!;
    const kind = registryKind(item.type);
    return {
      category,
      description: item.description,
      href: registryItemHref(kind, category, item.name),
      kind,
      name: item.name,
      title: item.title,
    };
  });
}

export function registryCollections(items: readonly RegistryItemSummary[]): RegistryCollection[] {
  const grouped = new Map<string, RegistryCollection>();

  for (const item of items) {
    const key = `${item.kind}:${item.category}`;
    const existing = grouped.get(key);

    if (existing === undefined) {
      const categoryTitle = humanize(item.category);
      grouped.set(key, {
        category: item.category,
        description: `Browse ${categoryTitle.toLowerCase()} Registry items.`,
        href: collectionHref(item.kind, item.category),
        items: [item],
        kind: item.kind,
        title: categoryTitle,
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
      `${left.kind}:${left.title}`.localeCompare(`${right.kind}:${right.title}`),
    );
}

export function registrySections(items: readonly RegistryItemSummary[]): RegistrySection[] {
  const collections = registryCollections(items);

  return (["component", "block", "page"] as const).flatMap((kind) => {
    const matchingCollections = collections.filter((collection) => collection.kind === kind);
    if (matchingCollections.length === 0) return [];

    return [
      {
        collections: matchingCollections,
        description: sectionDescriptionByKind[kind],
        href: registrySectionHref(kind),
        kind,
        title: pluralByKind[kind],
      },
    ];
  });
}

export function registryTypeSegment(kind: RegistryItemKind): string {
  return segmentByKind[kind];
}

function humanize(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");
}
