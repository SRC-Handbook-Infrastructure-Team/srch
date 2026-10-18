export function getPlaintextFromMarkdown(content) {
  if (!content) return "";

  content = content.replace(/^---[\s\S]*?---\s*/, "");

  content = content.replace(/!\[[^\]]*\]\([^)]*\)/g, "");

  content = content.replace(/\{[^{}|]+\|([^{}]+)\}/g, "$1");

  content = content.replace(/\{([A-Za-z0-9-]+)\}/g, (match, p1) =>
    p1.replace(/-/g, " "),
  );

  content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  content = content.replace(/(\*\*|__)(.*?)\1/g, "$2");
  content = content.replace(/(\*|_)(.*?)\1/g, "$2");
  content = content.replace(/`([^`]+)`/g, "$1");

  content = content.replace(/^#{1,6}\s*(.*)$/gm, "$1");

  content = content.replace(/\[\^([^\]]+)\]/g, "");

  content = content.replace(/^\s*\|[-:\s|]+\|\s*$/gm, "");

  content = content.replace(/[ \t]{2,}/g, " ");

  content = content.replace(/\n{2,}/g, "\n\n").trim();

  content = content.replace(/\[[^\]]*\]/g, "");

  return content;
}

export function getDrawerSearchTitle(heading, key) {
  const label = getPlaintextFromMarkdown(key.replace(/-/g, " "));
  const title = getPlaintextFromMarkdown(heading || label).replace(
    /^Note:\s*/i,
    "",
  );
  return /^case study:?\s*$/i.test(title) ? `Case Study: ${label}` : title;
}

export function splitSearchBibliography(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const body = [];
  const sources = [];
  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^[ \t]{0,3}\[\^([^\]]+)\]:[ \t]*(.*)$/);
    if (!match) {
      body.push(lines[i]);
      continue;
    }
    const entry = [match[2]];
    while (i + 1 < lines.length) {
      if (/^(?: {4}|\t)/.test(lines[i + 1])) {
        entry.push(lines[++i].replace(/^(?: {4}|\t)/, ""));
      } else if (lines[i + 1] === "" && /^(?: {4}|\t)/.test(lines[i + 2] || "")) {
        entry.push(lines[++i]);
      } else {
        break;
      }
    }
    sources.push(`${match[1]}. ${entry.join("\n").trim()}`);
  }
  return { body: body.join("\n"), bibliography: sources.join("\n\n") };
}
