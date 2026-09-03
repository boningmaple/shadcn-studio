import registry from "../registry.json" with { type: "json" };
import { vibeRegistrySchema } from "../src/features/registry/types/registry.ts";

if (import.meta.filename === process.argv[1]) {
  vibeRegistrySchema.parse(registry);
  process.stdout.write("\u001B[32m✔\u001B[0m Validating registry.\n");
}
