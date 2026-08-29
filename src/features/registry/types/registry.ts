export type RegistryItemType = "registry:block" | "registry:component" | "registry:page";
export type RegistryItemKind = "component" | "block" | "page";

export type RegistryItem = {
  name: string;
  title: string;
  description: string;
  type: RegistryItemType;
  registryDependencies: string[];
  files: {
    path: string;
    target?: string;
    type: string;
  }[];
  categories: string[];
};

export type RegistryItemGroup = {
  type: RegistryItemType;
  category: string;
  items: RegistryItem[];
};

export type RegistryItemGroupSummary = {
  category: string;
  itemCount: number;
};

export type RegistryItemShowcase = {
  description: string;
  name: string;
  title: string;
};

export type RegistryItemShowcaseGroup = {
  category: string;
  items: RegistryItemShowcase[];
};

export type RegistrySourceItem = {
  categories: string[];
  description: string;
  files: {
    path: string;
    target?: string;
    type: string;
  }[];
  name: string;
  registryDependencies: string[];
  title: string;
  type: RegistryItemType;
};

export type RegistryItemSummary = {
  category: string;
  description: string;
  href: string;
  kind: RegistryItemKind;
  name: string;
  title: string;
};

export type RegistryCollection = {
  category: string;
  description: string;
  href: string;
  items: RegistryItemSummary[];
  kind: RegistryItemKind;
  title: string;
};

export type RegistrySection = {
  collections: RegistryCollection[];
  description: string;
  href: string;
  kind: RegistryItemKind;
  title: string;
};

export type RegistryNavigationSection = {
  collections: Pick<RegistryCollection, "href" | "title">[];
  kind: RegistryItemKind;
};

export type RegistryNavigationResult =
  | { sections: RegistryNavigationSection[]; status: "ok" }
  | { status: "error" };

export type RegistryItemFile = {
  content: string;
  path: string;
  target?: string;
  type: string;
};

export type RegistryBuiltItem = {
  categories: string[];
  description: string;
  files: RegistryItemFile[];
  name: string;
  registryDependencies: string[];
  title: string;
  type: RegistryItemType;
};

export type HighlightedRegistryFile = RegistryItemFile & {
  html?: string;
};
