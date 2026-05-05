import type { SerializedEditorState } from "lexical";

/**
 * Builds minimal Lexical JSON (paragraph nodes only) for seed data and demos.
 * Matches the shape Payload's richText field expects at runtime.
 */
export function lexicalFromParagraphs(paragraphs: string[]): SerializedEditorState {
  const children = paragraphs.map((text) => ({
    children: [
      {
        detail: 0,
        format: 0,
        mode: "normal",
        style: "",
        text,
        type: "text",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "paragraph",
    version: 1,
  }));

  return {
    root: {
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  } as unknown as SerializedEditorState;
}
