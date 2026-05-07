/**
 * remark plugin that converts inline {term|label} markers into custom
 * sidebar reference nodes used by the markdown renderer.
 */
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Text, Parent, Literal } from "mdast";
export const remarkSidebarRef: Plugin<[], any> = () => {
  return (tree) => {
    visit(tree, "text", (node: Text, index: number, parent: Parent) => {
      if (!parent || typeof node.value !== "string") return;

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

        pushText(value.slice(last, start));

        let term = inner;
        let label: string | null = null;
        const bar = inner.indexOf("|");
        if (bar !== -1) {
          term = inner.slice(0, bar).trim();
          label = inner.slice(bar + 1).trim() || null;
        } else {
          term = term.trim();
        }

        const prev = value[last - 1] ?? "";
        const next = value[end] ?? "";
        const leftGlue = /\w/.test(prev);
        const rightGlue = /\w/.test(next);

        if (leftGlue) pushText(" ");

        out.push({
          type: "sidebarRef",
          data: { term, label },
        });

        if (rightGlue) out.push({ type: "text", value: " " });

        last = end;
      }

      pushText(value.slice(last));

      if (out.length) {
        parent.children.splice(index, 1, ...out);
        return index + out.length;
      }
    });
  };
};
