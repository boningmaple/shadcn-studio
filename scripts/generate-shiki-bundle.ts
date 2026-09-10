import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { codegen } from "shiki-codegen";

const projectRoot = path.resolve(import.meta.dirname, "..");

export const shikiBundleArtifactPath = path.join(
  projectRoot,
  "src/features/registry/generated/shiki.bundle.gen.ts",
);

export async function buildShikiBundle(): Promise<string> {
  const { code } = await codegen({
    engine: "javascript",
    langs: ["bash", "css", "html", "javascript", "json", "markdown", "tsx", "typescript"],
    themes: ["github-light", "github-dark"],
    typescript: true,
  });

  return code;
}

if (process.argv.includes("--check")) {
  const expected = await buildShikiBundle();
  const committed = await readFile(shikiBundleArtifactPath, "utf8").catch(() => "");

  if (committed !== expected) {
    process.stderr.write(
      "The committed Shiki bundle does not match its generator configuration.\n" +
        "Fix it with: npm run generate:shiki\n",
    );
    process.exit(1);
  }

  process.stdout.write("Shiki bundle matches its generator configuration\n");
} else {
  await writeFile(shikiBundleArtifactPath, await buildShikiBundle(), "utf8");
  process.stdout.write(`Generated ${shikiBundleArtifactPath}\n`);
}
