export function caseStudyFile(id) {
  if (!/^[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/.test(id)) {
    throw new Error(`Invalid case-study ID: ${id}`);
  }
  return `${id}.md`;
}

export function referencedCaseStudyIds(markdown) {
  return [
    ...new Set(
      Array.from(
        markdown.matchAll(/^[ \t]*CaseStudy:[ \t]*(\S+)[ \t]*$/gm),
        (match) => match[1],
      ),
    ),
  ];
}

function readFootnoteDefinitions(markdown) {
  const definitions = {};
  const kept = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^\[\^([^\]]+)\]:[ \t]*(.*)$/);
    if (!match) {
      kept.push(lines[i]);
      continue;
    }
    if (Object.hasOwn(definitions, match[1])) {
      throw new Error(`Duplicate footnote definition: ${match[1]}`);
    }
    const body = [match[2]];
    while (i + 1 < lines.length) {
      if (/^(?: {4}|\t)/.test(lines[i + 1])) {
        body.push(lines[++i]);
      } else if (
        lines[i + 1] === "" &&
        /^(?: {4}|\t)/.test(lines[i + 2] || "")
      ) {
        body.push(lines[++i]);
      } else {
        break;
      }
    }
    definitions[match[1]] = body.join("\n").trim();
  }
  return { definitions, content: kept.join("\n") };
}

export function parseCaseStudy(markdown, id = "case study") {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) throw new Error(`${id}: missing case-study frontmatter`);
  const metadata = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator < 0 || !line.trim()) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (Object.hasOwn(metadata, key))
      throw new Error(`${id}: duplicate ${key}`);
    if (value.startsWith('"') || value.startsWith("["))
      value = JSON.parse(value);
    metadata[key] = value;
  }
  if (typeof metadata.title !== "string" || !metadata.title.trim()) {
    throw new Error(`${id}: title is required`);
  }
  if (
    metadata.tags !== undefined &&
    (!Array.isArray(metadata.tags) ||
      metadata.tags.some((tag) => typeof tag !== "string"))
  ) {
    throw new Error(`${id}: tags must be a JSON array of strings`);
  }
  const { definitions, content } = readFootnoteDefinitions(
    normalized.slice(match[0].length),
  );
  const body = content.trim();
  if (!body) throw new Error(`${id}: case-study body is empty`);
  if (/^[ \t]*(?:Heading:|CaseStudy:|[A-Za-z0-9_-]+:[ \t]*$)/m.test(body)) {
    throw new Error(
      `${id}: body contains a reserved sidebar directive or key line`,
    );
  }
  const refs = Array.from(
    (metadata.title + "\n" + body).matchAll(/\[\^([^\]]+)\]/g),
    (m) => m[1],
  );
  for (const key of refs) {
    if (!Object.hasOwn(definitions, key))
      throw new Error(`${id}: missing local footnote ${key}`);
  }
  return {
    title: metadata.title,
    tags: metadata.tags || [],
    content: body,
    definitions,
  };
}

export function composeCaseStudyMarkdown(markdown, studies) {
  const ids = referencedCaseStudyIds(markdown);
  if (!ids.length) return markdown;
  const newline = markdown.includes("\r\n") ? "\r\n" : "\n";
  const normalized = markdown.replace(/\r\n/g, "\n");
  const divider = /^##\s*Sidebar\s*$/m.exec(normalized);
  if (!divider)
    throw new Error("CaseStudy directives require a final ## Sidebar block");
  let main = normalized.slice(0, divider.index);
  if (referencedCaseStudyIds(main).length) {
    throw new Error("CaseStudy directives must be inside ## Sidebar");
  }
  const { definitions: pageDefinitions } = readFootnoteDefinitions(main);
  const reserved = Array.from(normalized.matchAll(/\[\^(\d+)\]/g), (m) =>
    Number(m[1]),
  );
  let nextNumber = Math.max(0, ...reserved) + 1;
  const appended = [];
  const blocks = normalized
    .slice(divider.index)
    .split(/(?=^[ \t]*[A-Za-z0-9_-]+:[ \t]*$)/m);
  const composed = blocks
    .map((block) => {
      const references = referencedCaseStudyIds(block);
      if (!references.length) return block;
      if (
        references.length !== 1 ||
        !/^[ \t]*[A-Za-z0-9_-]+:[ \t]*\n[ \t]*CaseStudy:[ \t]*\S+[ \t]*\s*$/.test(
          block,
        )
      ) {
        throw new Error(
          "A case-study drawer must contain only its key and CaseStudy reference",
        );
      }
      const id = references[0];
      const study = studies[id];
      if (!study) throw new Error(`Unknown case study: ${id}`);
      const remap = {};
      for (const [key, definition] of Object.entries(study.definitions)) {
        let target = key;
        // The current renderer expects numeric footnotes. Resolve local collisions
        // without renumbering existing primer citations or changing its notes.
        if (
          !/^\d+$/.test(key) ||
          (Object.hasOwn(pageDefinitions, key) &&
            pageDefinitions[key] !== definition)
        ) {
          while (Object.hasOwn(pageDefinitions, String(nextNumber)))
            nextNumber += 1;
          target = String(nextNumber++);
        }
        remap[key] = target;
        if (!Object.hasOwn(pageDefinitions, target)) {
          pageDefinitions[target] = definition;
          appended.push(`[^${target}]: ${definition}`);
        }
      }
      const rewrite = (text) =>
        text.replace(/\[\^([^\]]+)\]/g, (full, key) =>
          remap[key] === undefined ? full : `[^${remap[key]}]`,
        );
      const replacement = `Heading: ${rewrite(study.title)}\n${rewrite(study.content)}`;
      return block.replace(/^[ \t]*CaseStudy:[ \t]*\S+[ \t]*$/m, replacement);
    })
    .join("");
  if (appended.length) {
    // Further Reading is extracted separately (definitions must precede it)
    const reading = /^##\s+Further Reading\s*$/im.exec(main);
    const insertion = reading ? reading.index : main.length;
    main =
      main.slice(0, insertion).trimEnd() +
      "\n\n" +
      appended.join("\n\n") +
      "\n\n" +
      main.slice(insertion);
  }
  return (main + composed).replace(/\n/g, newline);
}
