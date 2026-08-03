import { glob, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { codeToHtml } from "shiki";

type DemoFile = {
  path: string;
  outputFilename: string;
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

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(projectRoot, "public/generated");
const demoPattern = "src/ui/material-design/components/md-*/demos/md-*.tsx";
const demoFiles: DemoFile[] = (await globFiles(demoPattern, projectRoot)).map(
  (demoPath) => ({
    path: demoPath,
    outputFilename: `${path.basename(demoPath, path.extname(demoPath))}.json`,
  }),
);

if (demoFiles.length === 0) {
  throw new Error(`No component demos found matching ${demoPattern}`);
}

const outputFilenames = demoFiles.map(({ outputFilename }) => outputFilename);
const duplicateOutputFilename = outputFilenames.find(
  (filename, index) => outputFilenames.indexOf(filename) !== index,
);

if (duplicateOutputFilename !== undefined) {
  throw new Error(
    `Multiple demos would generate ${duplicateOutputFilename}; demo filenames must be unique`,
  );
}

const generatedFiles: GeneratedFile[] = await Promise.all(
  demoFiles.map(async ({ path: demoPath, outputFilename }) => {
    const code = (
      await readFile(path.join(projectRoot, demoPath), "utf8")
    ).trimEnd();
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

const generatedFilenames = new Set(
  generatedFiles.map(({ filename }) => filename),
);
const staleFiles = (await globFiles("*.json", outputDirectory))
  .filter((filename) => !generatedFilenames.has(filename))
  .map((filename) => unlink(path.join(outputDirectory, filename)));

await Promise.all(staleFiles);

process.stdout.write(
  `Generated ${generatedFiles.length} component code files in ${outputDirectory}\n`,
);
