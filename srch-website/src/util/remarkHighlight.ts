// remarkHighlight.ts
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Text, Parent } from "mdast";

export const remarkHighlight: Plugin<[string?], any> = (highlight) => {
  if (!highlight) return () => {};
  const re = new RegExp(`(${highlight})`, "gi");

  return (tree) => {
    visit(tree, "text", (node: Text, index: number, parent: Parent) => {
      if (!parent || !node.value) return;
      const parts = node.value.split(re);
      if (parts.length === 1) return;

      const out = parts.map((p, i) =>
        i % 2 === 1
          ? { type: "mdxTextExpression", value: "", data: { hName: "mark", hChildren: [{ type: "text", value: p }] } }
          : { type: "text", value: p }
      );
      parent.children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
};
