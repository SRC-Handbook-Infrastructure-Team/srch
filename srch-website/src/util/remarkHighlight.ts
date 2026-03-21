// remarkHighlight.ts
import type { Plugin } from "unified";
import type { Root, Parent } from "mdast";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type HighlightInput =
  | string
  | string[]
  | { terms?: string | string[]; scopeAnchor?: string | null };

function normalizeHighlightInput(highlight?: HighlightInput) {
  if (!highlight) return [];
  const rawBase =
    typeof highlight === "object" && !Array.isArray(highlight)
      ? highlight.terms
      : highlight;
  const raw = Array.isArray(rawBase) ? rawBase : [rawBase];
  const seen = new Set<string>();
  const terms: string[] = [];

  raw.forEach((term) => {
    const clean = String(term || "").trim();
    if (!clean) return;
    const key = clean.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    terms.push(clean);
  });

  return terms.sort((a, b) => b.length - a.length);
}

function getScopeAnchor(highlight?: HighlightInput): string | null {
  if (!highlight || typeof highlight !== "object" || Array.isArray(highlight)) {
    return null;
  }
  const anchor = highlight.scopeAnchor;
  if (!anchor) return null;
  return String(anchor).trim().toLowerCase() || null;
}

function createIdFromHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getNodeText(node: any): string {
  if (!node) return "";
  if (node.type === "text") return String(node.value || "");
  if (!Array.isArray(node.children)) return "";
  return node.children.map((child: any) => getNodeText(child)).join("");
}

function getScopedRange(root: Root, scopeAnchor: string | null) {
  if (
    !scopeAnchor ||
    !Array.isArray(root.children) ||
    root.children.length === 0
  ) {
    return { start: 0, end: root.children.length };
  }

  const topLevel = root.children as any[];
  const h2Indexes: number[] = [];
  topLevel.forEach((node, idx) => {
    if (node?.type === "heading" && node.depth === 2) h2Indexes.push(idx);
  });

  if (scopeAnchor === "intro") {
    const firstH2 = h2Indexes.length > 0 ? h2Indexes[0] : topLevel.length;
    return { start: 0, end: firstH2 };
  }

  let start = -1;
  for (const idx of h2Indexes) {
    const headingId = createIdFromHeading(getNodeText(topLevel[idx]));
    if (headingId === scopeAnchor) {
      start = idx;
      break;
    }
  }

  if (start === -1) {
    return { start: 0, end: topLevel.length };
  }

  let end = topLevel.length;
  for (const idx of h2Indexes) {
    if (idx > start) {
      end = idx;
      break;
    }
  }

  return { start, end };
}

function applyHighlightToNode(node: any, re: RegExp) {
  if (!node || typeof node !== "object") return;
  if (!Array.isArray(node.children)) return;

  for (let i = 0; i < node.children.length; i += 1) {
    const child = node.children[i] as any;
    if (child?.type === "text" && typeof child.value === "string") {
      const parts = child.value.split(re);
      if (parts.length === 1) continue;
      const out = parts.map((part, idx) =>
        idx % 2 === 1
          ? {
              type: "mdxTextExpression",
              value: "",
              data: {
                hName: "mark",
                hChildren: [{ type: "text", value: part }],
              },
            }
          : { type: "text", value: part },
      );
      node.children.splice(i, 1, ...out);
      i += out.length - 1;
      continue;
    }

    applyHighlightToNode(child, re);
  }
}

export const remarkHighlight: Plugin<[HighlightInput?], any> = (highlight) => {
  const terms = normalizeHighlightInput(highlight);
  if (terms.length === 0) return () => {};
  const re = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const scopeAnchor = getScopeAnchor(highlight);

  return (tree: Root) => {
    if (!tree || !Array.isArray(tree.children)) return;

    const { start, end } = getScopedRange(tree, scopeAnchor);
    for (let i = start; i < end; i += 1) {
      applyHighlightToNode(tree.children[i] as Parent, re);
    }
  };
};
