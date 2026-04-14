const HTML_TAGS_RE = /<[^>]*>/g;
const MARK_RE = /<mark>(.*?)<\/mark>/gi;

export function getHighlightTargetsFromSnippet(snippet, fallbackQuery = "") {
  if (!snippet || typeof snippet !== "string") {
    return fallbackQuery ? [fallbackQuery] : [];
  }

  const snippetPhrases = snippet
    .replace(HTML_TAGS_RE, " ")
    .split(/\n\s*\n/)
    .map((part) =>
      part
        .replace(/^\.\.\./, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((part) => part.length >= 12);

  const markedMatches = Array.from(snippet.matchAll(MARK_RE))
    .map((match) => (match[1] || "").trim())
    .filter(Boolean);

  const source = [...snippetPhrases, ...markedMatches, fallbackQuery];
  const seen = new Set();
  const unique = [];

  source.forEach((term) => {
    const clean = String(term || "")
      .replace(HTML_TAGS_RE, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!clean) return;
    const key = clean.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    unique.push(clean);
  });

  return unique;
}
