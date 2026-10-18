import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { caseStudyFile, parseCaseStudy } from "./caseStudyContent.js";

const sourceRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const caseRoot = path.join(sourceRoot, "case-studies");

export function loadCaseStudyFiles() {
  const studies = {};
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile() && entry.name.endsWith(".md")) {
        const relative = path
          .relative(caseRoot, file)
          .split(path.sep)
          .join("/");
        const id = relative.slice(0, -3);
        caseStudyFile(id);
        studies[id] = parseCaseStudy(fs.readFileSync(file, "utf8"), id);
      }
    }
  }
  visit(caseRoot);
  return studies;
}
