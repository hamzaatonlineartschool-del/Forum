"use client";

import { useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import type { SerializedEditorState } from "lexical";

const readerTheme = {
  paragraph: "mb-3",
  quote: "border-l-[3px] border-[var(--navy)]/20 pl-4 my-4 text-slate-700",
  heading: {
    h1: "font-heading text-3xl font-bold mt-2 mb-4",
    h2: "font-heading text-2xl font-semibold mt-6 mb-3",
    h3: "font-heading text-xl font-semibold mt-4 mb-2",
  },
  list: {
    ul: "list-disc pl-6 my-3",
    ol: "list-decimal pl-6 my-3",
    listitem: "my-1",
  },
  link: "text-[var(--navy)] underline underline-offset-2",
  text: {
    bold: "font-semibold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
};

type Props = {
  serialized: SerializedEditorState | string;
  className?: string;
};

export function RichTextReader({ serialized, className }: Props) {
  const editorState =
    typeof serialized === "string" ? serialized : JSON.stringify(serialized);

  const initialConfig = useMemo(
    () => ({
      namespace: "OASForumReader",
      theme: readerTheme,
      editable: false,
      onError: (e: Error) => {
        console.error(e);
      },
      nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode],
      editorState,
    }),
    [editorState],
  );

  return (
    <div className={`lexical-readonly text-[17px] leading-relaxed text-slate-800 ${className ?? ""}`}>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={
            <ContentEditable className="lexical-editor-root outline-none" />
          }
        />
        <ListPlugin />
        <LinkPlugin />
      </LexicalComposer>
    </div>
  );
}
