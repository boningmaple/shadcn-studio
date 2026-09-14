import { writeFile } from "node:fs/promises";
import path from "node:path";

import { codegen } from "shiki-codegen";

const projectRoot = path.resolve(import.meta.dirname, "..");

export const shikiBundleFilePath = path.join(
  projectRoot,
  "src/features/registry/lib/shiki.bundle.gen.ts",
);

export async function buildShikiBundle(): Promise<string> {
  const { code } = await codegen({
    engine: "javascript",
    langs: [
      "bash",
      "css",
      "html",
      "javascript",
      "jsx",
      "json",
      "markdown",
      "mdx",
      "tsx",
      "typescript",
    ],
    themes: ["github-light", "github-dark"],
    typescript: true,
  });

  return code;
}

if (import.meta.filename === process.argv[1]) {
  await writeFile(shikiBundleFilePath, await buildShikiBundle(), "utf8");
  process.stdout.write(`Generated ${shikiBundleFilePath}\n`);
}
