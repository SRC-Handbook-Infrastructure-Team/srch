import {
  caseStudyFile,
  composeCaseStudyMarkdown,
  parseCaseStudy,
  referencedCaseStudyIds,
} from "./caseStudyContent.js";

const caseFiles = import.meta.glob("../case-studies/**/*.md", {
  query: "?raw",
  import: "default",
});
const primerFiles = import.meta.glob("../markdown/**/*.md", {
  query: "?raw",
  import: "default",
});
const casePromises = new Map();

async function loadCaseStudy(id) {
  if (!casePromises.has(id)) {
    casePromises.set(
      id,
      (async () => {
        const load = caseFiles[`../case-studies/${caseStudyFile(id)}`];
        if (!load) throw new Error(`Missing case-study file for ${id}`);
        return parseCaseStudy(await load(), id);
      })(),
    );
  }
  return casePromises.get(id);
}

async function composeBrowserMarkdown(markdown) {
  const entries = await Promise.all(
    referencedCaseStudyIds(markdown).map(async (id) => [
      id,
      await loadCaseStudy(id),
    ]),
  );
  return composeCaseStudyMarkdown(markdown, Object.fromEntries(entries));
}

export const allMarkdownFiles = Object.fromEntries(
  Object.entries(primerFiles).map(([path, load]) => [
    path,
    async () => composeBrowserMarkdown(await load()),
  ]),
);
