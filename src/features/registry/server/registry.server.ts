import registry from "../../../../registry.json" with { type: "json" };
import { registryItemSummaries, registrySections } from "../lib/registry-catalog.ts";
import type {
  RegistryItem,
  RegistryItemGroup,
  RegistryItemGroupSummary,
  RegistryItemShowcaseGroup,
  RegistryItemType,
  RegistrySection,
} from "../types/registry.ts";

const registryItems = registry.items as RegistryItem[];
const items = registryItemSummaries(registryItems);
const sections = registrySections(items);

const registryItemGroups = groupRegistryItemsByTypeAndCategory(registryItems);

export function groupRegistryItemsByTypeAndCategory(
  registryItems: RegistryItem[],
): RegistryItemGroup[] {
  const map = new Map<string, RegistryItemGroup>();

  for (const item of registryItems) {
    const category = item.categories.at(0);

    if (category === undefined) {
      continue;
    }

    const key = `${item.type}-${category}`;
    const group = map.get(key);

    if (group) {
      group.items.push(item);
      continue;
    }

    map.set(key, {
      type: item.type,
      category,
      items: [item],
    });
  }

  return Array.from(map.values());
}

export function allRegistrySections(): RegistrySection[] {
  return sections;
}

export function registryItemGroupSummariesByType(
  type: RegistryItemType,
): RegistryItemGroupSummary[] {
  return registryItemGroups
    .filter((group) => group.type === type)
    .map((group) => ({ category: group.category, itemCount: group.items.length }));
}

export function findRegistryItemShowcaseGroup(
  type: RegistryItemType,
  category: string,
): RegistryItemShowcaseGroup | undefined {
  const group = registryItemGroups.find(
    (candidate) => candidate.type === type && candidate.category === category,
  );

  if (group === undefined) return undefined;

  return {
    category: group.category,
    items: group.items.map(({ description, name, title }) => ({ description, name, title })),
  };
}
