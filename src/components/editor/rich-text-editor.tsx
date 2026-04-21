"use client";

import { useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import type { EditorState, SerializedEditorState } from "lexical";
import { ToolbarPlugin } from "./toolbar-plugin";
import { OnChangePlugin } from "./on-change-plugin";

const editorTheme = {
  paragraph: "mb-1",
  quote: "lexical-quote border-l-[3px] border-[var(--navy)]/25 pl-3 my-2 text-slate-700",
  heading: {
    h1: "font-heading text-2xl font-bold mt-2 mb-1",
    h2: "font-heading text-xl font-semibold mt-2 mb-1",
    h3: "font-heading text-lg font-semibold mt-1 mb-0.5",
  },
  list: {
    ul: "list-disc pl-6 my-2",
    ol: "list-decimal pl-6 my-2",
    listitem: "my-0.5",
  },
  link: "text-[var(--navy)] underline underline-offset-2",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
};

type Props = {
  className?: string;
  placeholder?: string;
  onChange?: (state: SerializedEditorState) => void;
  initialState?: SerializedEditorState | string | null;
};

function parseInitialEditorState(
  initial: SerializedEditorState | string | null | undefined,
): string | undefined {
  if (initial == null) return undefined;
  if (typeof initial === "string") return initial;
  return JSON.stringify(initial);
}

export function RichTextEditor({
  className,
  placeholder = "",
  onChange,
  initialState,
}: Props) {
  const initialConfig = useMemo(
    () => ({
      namespace: "OASForumEditor",
      theme: editorTheme,
      editable: true,
      onError: (e: Error) => {
        console.error(e);
      },
      nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode],
      editorState: parseInitialEditorState(initialState),
    }),
    [initialState],
  );

  const showPlaceholder = placeholder.trim().length > 0;

  return (
    <div
      className={`rounded-xl border border-slate-200/90 bg-white/90 shadow-inner ${className ?? ""}`}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={
            <ContentEditable
              aria-placeholder={showPlaceholder ? placeholder : ""}
              placeholder={
                showPlaceholder
                  ? () => (
                      <div className="pointer-events-none absolute left-4 top-[52px] text-sm text-slate-400">
                        {placeholder}
                      </div>
                    )
                  : () => null
              }
              className="lexical-editor-root relative px-4 pb-4 pt-2 text-[15px] leading-relaxed text-slate-800"
            />
          }
        />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        {onChange ? (
          <OnChangePlugin
            onChange={(editorState: EditorState) => {
              onChange(editorState.toJSON());
            }}
          />
        ) : null}
      </LexicalComposer>
    </div>
  );
}
