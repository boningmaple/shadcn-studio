import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { codeToHtml } from "shiki";

type DemoFile = {
  filename: string;
  id: string;
  numericId: number;
};

type GeneratedFile = {
  filename: string;
  json: string;
};

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const demosDirectory = path.join(projectRoot, "src/components/button");
const outputDirectory = path.join(projectRoot, "public/generated");
const demoFilenamePattern = /^button-(0[1-9]|[1-9]\d)\.tsx$/;
const staleOutputFilenamePattern = /^button-\d+\.json$/;

const demoFiles: DemoFile[] = (
  await readdir(demosDirectory, { withFileTypes: true })
)
  .flatMap((entry) => {
    const match = entry.isFile() && demoFilenamePattern.exec(entry.name);

    return match === false || match === null
      ? []
      : [{ filename: entry.name, id: match[1], numericId: Number(match[1]) }];
  })
  .sort((left, right) => left.numericId - right.numericId);

if (demoFiles.length === 0) {
  throw new Error(`No button demos found in ${demosDirectory}`);
}

const generatedFiles: GeneratedFile[] = await Promise.all(
  demoFiles.map(async ({ filename, id }) => {
    const code = (
      await readFile(path.join(demosDirectory, filename), "utf8")
    ).trimEnd();
    const html = await codeToHtml(code, {
      lang: "tsx",
      theme: "github-dark",
    });

    return {
      filename: `button-${id}.json`,
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

const generatedFilenames = new Set(
  generatedFiles.map(({ filename }) => filename),
);
const staleFiles = (await readdir(outputDirectory, { withFileTypes: true }))
  .filter(
    (entry) =>
      entry.isFile() &&
      staleOutputFilenamePattern.test(entry.name) &&
      !generatedFilenames.has(entry.name),
  )
  .map((entry) => unlink(path.join(outputDirectory, entry.name)));

await Promise.all(staleFiles);

process.stdout.write(
  `Generated ${generatedFiles.length} button code files in ${outputDirectory}\n`,
);
