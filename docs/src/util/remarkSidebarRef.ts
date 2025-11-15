// remarkSidebarRef.ts
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Text, Parent, Literal } from "mdast";

/**
 * Turns " foo {term|Label} bar " into:
 *   [text(" foo "), sidebarRef({term:"term", label:"Label"}), text(" bar ")]
 * It also EATS optional spaces right around the braces, but only
 * re-inserts a single space when needed to avoid mashing words.
 */
export const remarkSidebarRef: Plugin<[], any> = () => {
  return (tree) => {
    visit(tree, "text", (node: Text, index: number, parent: Parent) => {
      if (!parent || typeof node.value !== "string") return;

      // capture optional spaces around {…} so we can decide what to keep
      const re = / ?\{([^}]+)\} ?/g;
      const value = node.value;
      let match: RegExpExecArray | null;
      let last = 0;
      const out: any[] = [];

      const pushText = (str: string) => {
        if (str) out.push({ type: "text", value: str });
      };

      while ((match = re.exec(value))) {
        const [full, inner] = match;
        const start = match.index;
        const end = start + full.length;

        // text before
        pushText(value.slice(last, start));

        // parse "term|Label" alias
        let term = inner;
        let label: string | null = null;
        const bar = inner.indexOf("|");
        if (bar !== -1) {
          term = inner.slice(0, bar).trim();
          label = inner.slice(bar + 1).trim() || null;
        } else {
          term = term.trim();
        }

        // glue logic: if previous char is \w, insert a single space before the chip.
        const prev = value[last - 1] ?? "";
        const next = value[end] ?? "";
        const leftGlue = /\w/.test(prev);
        const rightGlue = /\w/.test(next);

        if (leftGlue) pushText(" ");

        out.push({
          type: "sidebarRef", // ← custom mdast node
          data: { term, label },
        });

        if (rightGlue) out.push({ type: "text", value: " " });

        last = end;
      }

      // trailing text
      pushText(value.slice(last));

      if (out.length) {
        parent.children.splice(index, 1, ...out);
        return index + out.length;
      }
    });
  };
};
