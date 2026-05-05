import type { SerializedEditorState } from "lexical";

type SerNode = {
  type?: string;
  text?: string;
  children?: SerNode[];
};

function collectText(node: SerNode): string {
  if (typeof node.text === "string") return node.text;
  if (!node.children?.length) return "";
  return node.children.map(collectText).join("");
}

/** Pull paragraph-sized text blocks from seed / Payload-style Lexical JSON. */
export function plainParagraphsFromLexical(
  serialized: SerializedEditorState | string,
): string[] {
  if (typeof serialized === "string") {
    const t = serialized.trim();
    return t ? [t] : [];
  }
  const root = serialized.root as SerNode;
  if (!root?.children?.length) return [];
  const out: string[] = [];
  for (const child of root.children) {
    if (child.type === "paragraph") {
      const t = collectText(child).trim();
      if (t) out.push(t);
    } else if (child.type === "list") {
      for (const li of child.children ?? []) {
        if (li.type === "listitem") {
          const t = collectText(li).trim();
          if (t) out.push(t);
        }
      }
    }
  }
  return out;
}

export function normalizeCaptionWhitespace(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}
