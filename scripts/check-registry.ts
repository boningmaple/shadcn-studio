import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const supportedTypes = new Set(["registry:block", "registry:component", "registry:page"]);
const registryRoot = path.resolve(import.meta.dirname, "..");
const itemRoot = path.join(registryRoot, "registry/vibe-ui");

type RegistryItem = {
  categories?: unknown;
  description?: unknown;
  name?: unknown;
  registryDependencies?: unknown;
  title?: unknown;
  type?: unknown;
};

type Registry = { items?: unknown };

export async function registryErrors(): Promise<string[]> {
  const registry = JSON.parse(
    await readFile(path.join(registryRoot, "registry.json"), "utf8"),
  ) as Registry;
  const items = Array.isArray(registry.items) ? (registry.items as RegistryItem[]) : [];
  const errors: string[] = [];
  const itemNames = new Set<string>();
  const routeKeys = new Set<string>();

  for (const item of items) {
    const name = typeof item.name === "string" ? item.name : "";
    const type = typeof item.type === "string" ? item.type : "";
    const categories = Array.isArray(item.categories) ? item.categories : [];

    if (name === "") errors.push("Every Registry item must have a name.");
    if (itemNames.has(name)) errors.push(`Duplicate Registry item name: ${name}`);
    itemNames.add(name);

    if (!supportedTypes.has(type)) errors.push(`${name}: unsupported Registry item type ${type}.`);
    if (typeof item.title !== "string" || item.title.trim() === "") {
      errors.push(`${name}: title is required.`);
    }
    if (typeof item.description !== "string" || item.description.trim() === "") {
      errors.push(`${name}: description is required.`);
    }
    if (
      !Array.isArray(item.registryDependencies) ||
      !item.registryDependencies.every((dependency) => typeof dependency === "string")
    ) {
      errors.push(`${name}: registryDependencies must be an array of names.`);
    }
    if (categories.length !== 1 || typeof categories[0] !== "string") {
      errors.push(`${name}: exactly one category is required.`);
    }

    const previewPath = path.join(itemRoot, name, "preview.tsx");
    try {
      await readFile(previewPath, "utf8");
    } catch {
      errors.push(`${name}: missing registry/vibe-ui/${name}/preview.tsx.`);
    }

    if (typeof categories[0] === "string") {
      const routeKey = `${type}/${categories[0]}/${name}`;
      if (routeKeys.has(routeKey)) errors.push(`${name}: duplicate route identity ${routeKey}.`);
      routeKeys.add(routeKey);
    }
  }

  for (const entry of await readdir(itemRoot, { withFileTypes: true })) {
    if (entry.isDirectory() && !itemNames.has(entry.name)) {
      errors.push(`${entry.name}: preview folder has no Registry item.`);
    }
  }

  return errors;
}

if (import.meta.filename === process.argv[1]) {
  const errors = await registryErrors();

  if (errors.length > 0) {
    process.stderr.write(`${errors.map((error) => `- ${error}`).join("\n")}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write("Registry conventions are valid.\n");
  }
}
