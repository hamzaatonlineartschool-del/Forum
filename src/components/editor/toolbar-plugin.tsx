"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $setBlocksType } from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import { $createParagraphNode } from "lexical";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link2,
  Undo2,
  Redo2,
  ChevronDown,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

function ToolbarButton({
  active,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-[var(--navy)]",
        active && "bg-slate-200/80 text-[var(--navy)]",
      )}
    >
      {children}
    </button>
  );
}

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const format = (fmt: "bold" | "italic" | "strikethrough") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, fmt);
  };

  const setBlock = (kind: "paragraph" | "h1" | "h2" | "quote") => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      if (kind === "paragraph") {
        $setBlocksType(selection, () => $createParagraphNode());
      } else if (kind === "quote") {
        $setBlocksType(selection, () => $createQuoteNode());
      } else {
        $setBlocksType(selection, () =>
          $createHeadingNode(kind === "h1" ? "h1" : "h2"),
        );
      }
    });
  };

  const insertLink = () => {
    const url = window.prompt("Link URL", "https://");
    if (url === null) return;
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url || null);
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200/80 bg-slate-50/80 px-2 py-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg border border-transparent px-2 py-1.5 text-sm font-medium text-slate-700 hover:bg-white"
          >
            Paragraph
            <ChevronDown className="size-4 opacity-60" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="z-[200] min-w-[160px] rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
            sideOffset={4}
          >
            <DropdownMenu.Item
              className="cursor-pointer rounded-lg px-3 py-2 text-sm outline-none hover:bg-slate-100"
              onSelect={() => setBlock("paragraph")}
            >
              Paragraph
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="cursor-pointer rounded-lg px-3 py-2 text-sm outline-none hover:bg-slate-100"
              onSelect={() => setBlock("h1")}
            >
              Heading 1
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="cursor-pointer rounded-lg px-3 py-2 text-sm outline-none hover:bg-slate-100"
              onSelect={() => setBlock("h2")}
            >
              Heading 2
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="cursor-pointer rounded-lg px-3 py-2 text-sm outline-none hover:bg-slate-100"
              onSelect={() => setBlock("quote")}
            >
              Quote
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <div className="mx-1 h-6 w-px bg-slate-200" />

      <ToolbarButton label="Bold" onClick={() => format("bold")}>
        <Bold className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Italic" onClick={() => format("italic")}>
        <Italic className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Strikethrough" onClick={() => format("strikethrough")}>
        <Strikethrough className="size-4" />
      </ToolbarButton>

      <div className="mx-1 h-6 w-px bg-slate-200" />

      <ToolbarButton
        label="Bullet list"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
      >
        <List className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
      >
        <ListOrdered className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Blockquote" onClick={() => setBlock("quote")}>
        <Quote className="size-4" />
      </ToolbarButton>

      <div className="mx-1 h-6 w-px bg-slate-200" />

      <ToolbarButton label="Link" onClick={insertLink}>
        <Link2 className="size-4" />
      </ToolbarButton>

      <div className="mx-1 h-6 w-px bg-slate-200" />

      <ToolbarButton
        label="Undo"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <Undo2 className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <Redo2 className="size-4" />
      </ToolbarButton>
    </div>
  );
}
