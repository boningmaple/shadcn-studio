import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { codeToHtml } from "shiki";

type DemoFamily = {
  filenamePattern: RegExp;
  outputPrefix: string;
};

type DemoFile = {
  filename: string;
  id: string;
  numericId: number;
  outputPrefix: string;
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
const demoFamilies: DemoFamily[] = [
  {
    filenamePattern: /^button-(0[1-9]|[1-9]\d)\.tsx$/,
    outputPrefix: "button",
  },
  {
    filenamePattern: /^toggle-button-(0[1-9]|[1-9]\d)\.tsx$/,
    outputPrefix: "toggle-button",
  },
];
const staleOutputFilenamePattern =
  /^(?:button|toggle-button)-(?:0[1-9]|[1-9]\d)\.json$/;

const directoryEntries = await readdir(demosDirectory, {
  withFileTypes: true,
});

const demoFiles = demoFamilies
  .flatMap(({ filenamePattern, outputPrefix }) => {
    const files: DemoFile[] = directoryEntries.flatMap((entry) => {
      const match = entry.isFile() && filenamePattern.exec(entry.name);

      return match === false || match === null
        ? []
        : [
            {
              filename: entry.name,
              id: match[1],
              numericId: Number(match[1]),
              outputPrefix,
            },
          ];
    });

    if (files.length === 0) {
      throw new Error(`No ${outputPrefix} demos found in ${demosDirectory}`);
    }

    return files;
  })
  .sort(
    (left, right) =>
      left.outputPrefix.localeCompare(right.outputPrefix) ||
      left.numericId - right.numericId,
  );

const generatedFiles: GeneratedFile[] = await Promise.all(
  demoFiles.map(async ({ filename, id, outputPrefix }) => {
    const code = (
      await readFile(path.join(demosDirectory, filename), "utf8")
    ).trimEnd();
    const html = await codeToHtml(code, {
      lang: "tsx",
      theme: "github-dark",
    });

    return {
      filename: `${outputPrefix}-${id}.json`,
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
  `Generated ${generatedFiles.length} component code files in ${outputDirectory}\n`,
);
