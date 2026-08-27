import { glob, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { codeToHtml } from "shiki";

import { components, demoAnchorId } from "../src/features/search/data/registry.ts";

/**
 * Writes one code artifact per Demo, for the code dialog and the large
 * preview's code tab to fetch.
 *
 * Driven by the registry rather than by whatever `.tsx` files happen to be on
 * disk — the same source `build-search-index.ts` reads. A Demo the registry
 * names but nothing implements is a build failure here, rather than a preview
 * that renders nothing and a code dialog that 404s at runtime.
 */
type DemoFile = {
  anchorId: string;
  outputFilename: string;
  path: string;
};

type GeneratedFile = {
  filename: string;
  json: string;
};

async function globFiles(pattern: string, cwd: string) {
  const files: string[] = [];

  for await (const file of glob(pattern, { cwd })) {
    files.push(file);
  }

  return files;
}

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "public/generated");
const demoDirectory = "src/features/ui-material-design/components";

const demoFiles: DemoFile[] = components.flatMap((component) =>
  component.demos.map((demo) => {
    const anchorId = demoAnchorId(component, demo);

    return {
      anchorId,
      outputFilename: `${anchorId}.json`,
      path: `${demoDirectory}/${component.codeArtifactPrefix}/demos/${anchorId}.tsx`,
    };
  }),
);

if (demoFiles.length === 0) {
  throw new Error("The registry names no Demos to generate code for");
}

const outputFilenames = demoFiles.map(({ outputFilename }) => outputFilename);
const duplicateOutputFilename = outputFilenames.find(
  (filename, index) => outputFilenames.indexOf(filename) !== index,
);

if (duplicateOutputFilename !== undefined) {
  throw new Error(
    `Multiple Demos would generate ${duplicateOutputFilename}; a Demo's anchor id must be unique`,
  );
}

const onDisk = new Set(await globFiles(`${demoDirectory}/md-*/demos/md-*.tsx`, projectRoot));
const missing = demoFiles.filter(({ path: demoPath }) => !onDisk.has(demoPath));

if (missing.length > 0) {
  throw new Error(
    `The registry names ${missing.length} Demo(s) with no source file:\n` +
      missing.map(({ path: demoPath }) => `  ${demoPath}`).join("\n"),
  );
}

const generatedFiles: GeneratedFile[] = await Promise.all(
  demoFiles.map(async ({ path: demoPath, outputFilename }) => {
    const code = (await readFile(path.join(projectRoot, demoPath), "utf8")).trimEnd();
    const html = await codeToHtml(code, {
      lang: "tsx",
      theme: "github-dark",
    });

    return {
      filename: outputFilename,
      json: `${JSON.stringify({ code, html }, null, 2)}\n`,
    };
  }),
);

await mkdir(outputDirectory, { recursive: true });

await Promise.all(
  generatedFiles.map(({ filename, json }) =>
    writeFile(path.join(outputDirectory, filename), json, "utf8"),
  ),
);

const generatedFilenames = new Set(generatedFiles.map(({ filename }) => filename));
const staleFiles = (await globFiles("*.json", outputDirectory))
  .filter((filename) => !generatedFilenames.has(filename))
  .map((filename) => unlink(path.join(outputDirectory, filename)));

await Promise.all(staleFiles);

process.stdout.write(
  `Generated ${generatedFiles.length} component code files in ${outputDirectory}\n`,
);
