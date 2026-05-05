"use client";

import { useMemo, useState } from "react";
import { RichTextReader } from "@/components/editor/rich-text-reader";
import { CommentsSection } from "@/components/forum/comments/comments-section";
import {
  normalizeCaptionWhitespace,
  plainParagraphsFromLexical,
} from "@/lib/forum/lexical-plain-text";
import type { ForumPost } from "@/types/forum";

function captionIsExpandable(excerpt: string, body: ForumPost["body"]): boolean {
  const paragraphs = plainParagraphsFromLexical(body);
  if (paragraphs.length === 0) return false;
  const fullPlain = paragraphs.join("\n\n").trim();
  const ex = excerpt.trim();
  if (paragraphs.length > 1) return true;
  if (!ex) return false;
  return normalizeCaptionWhitespace(fullPlain) !== normalizeCaptionWhitespace(ex);
}

type Props = Pick<ForumPost, "excerpt" | "body" | "id">;

export function PostCardExpandableCaption({ excerpt, body, id }: Props) {
  const [open, setOpen] = useState(false);
  const expandable = useMemo(
    () => (excerpt ? captionIsExpandable(excerpt, body) : false),
    [excerpt, body],
  );

  if (!excerpt) return null;

  return (
    <div className="px-5 pt-4">
      {!open ? (
        <p className="text-[15px] leading-relaxed text-slate-600">
          {excerpt}
          {expandable ? (
            <>
              {" "}
              <button
                type="button"
                className="inline font-medium text-[var(--navy)] underline decoration-[var(--navy)]/30 underline-offset-2 hover:decoration-[var(--navy)]"
                aria-expanded={false}
                onClick={() => setOpen(true)}
              >
                View more
              </button>
            </>
          ) : null}
        </p>
      ) : (
        <div className="space-y-4">
          <div className="text-slate-800">
            <RichTextReader serialized={body} />
          </div>
          {expandable ? (
            <button
              type="button"
              className="text-sm font-medium text-[var(--navy)] underline decoration-[var(--navy)]/30 underline-offset-2 hover:decoration-[var(--navy)]"
              aria-expanded
              onClick={() => setOpen(false)}
            >
              View less
            </button>
          ) : null}
          <CommentsSection postId={id} embedded />
        </div>
      )}
    </div>
  );
}
