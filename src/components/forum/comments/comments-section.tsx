"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, MessageCircle, Smile, ThumbsUp } from "lucide-react";
import { useForumInteractions } from "@/context/forum-interactions";
import type { ForumComment } from "@/types/forum";
import { formatDistanceToNow } from "@/lib/format-date";
import { cn } from "@/lib/utils";

/** Longer codes first so `:thumbsup:` wins over `:t` if both existed. */
const COMMENT_SHORTCODES: readonly [string, string][] = [
  [":thumbsup:", "👍"],
  [":sparkles:", "✨"],
  [":clap:", "👏"],
  [":fire:", "🔥"],
  [":heart:", "❤️"],
  [":laugh:", "😂"],
  [":smile:", "😊"],
  [":wow:", "😮"],
  [":+1:", "👍"],
  [":D", "😁"],
  [":P", "😛"],
  [":p", "😛"],
  [":)", "🙂"],
  [":(", "🙁"],
  [";)", "😉"],
  [":/", "😕"],
  [":|", "😐"],
  [":o", "😮"],
  [":O", "😮"],
  [":x", "😶"],
  ["<3", "❤️"],
];

const COMMENT_QUICK_EMOJIS = [
  "👍",
  "❤️",
  "😂",
  "😮",
  "🎉",
  "👏",
  "🔥",
  "🙏",
  "💯",
  "✨",
] as const;

function matchShortcodeAtEnd(before: string): { prefix: string; sym: string } | null {
  for (const [code, sym] of COMMENT_SHORTCODES) {
    if (!before.endsWith(code)) continue;
    const prefix = before.slice(0, -code.length);
    const prev = prefix.slice(-1);
    const colonish = code.startsWith(":") || code.startsWith(";");
    if (colonish && prefix.length > 0 && prev !== " " && prev !== "\n" && prev !== "\t") {
      continue;
    }
    if (code === "<3" && prefix.length > 0 && prev !== " " && prev !== "\n" && prev !== "\t") {
      continue;
    }
    return { prefix, sym };
  }
  return null;
}

function tryExpandShortcode(
  full: string,
  cursor: number,
  terminator: " " | "\n",
): { next: string; newCursor: number } | null {
  const before = full.slice(0, cursor);
  const m = matchShortcodeAtEnd(before);
  if (!m) return null;
  const after = full.slice(cursor);
  const next = m.prefix + m.sym + terminator + after;
  const newCursor = m.prefix.length + m.sym.length + terminator.length;
  return { next, newCursor };
}

/** If the whole string ends on a shortcode (e.g. user posts without trailing space), expand once. */
function expandShortcodeTail(s: string): string {
  const m = matchShortcodeAtEnd(s);
  return m ? m.prefix + m.sym : s;
}

function buildTree(comments: ForumComment[]) {
  const byParent = new Map<string | null, ForumComment[]>();
  for (const c of comments) {
    const key = c.parentId;
    const list = byParent.get(key) ?? [];
    list.push(c);
    byParent.set(key, list);
  }
  return byParent;
}

function ThreadBranch({
  comment,
  byParent,
  depth,
  onReply,
}: {
  comment: ForumComment;
  byParent: Map<string | null, ForumComment[]>;
  depth: number;
  onReply: (id: string) => void;
}) {
  const { getCommentVote, voteComment } = useForumInteractions();
  const replies = byParent.get(comment.id) ?? [];
  const when = formatDistanceToNow(comment.createdAt);
  const { total, user } = getCommentVote(comment.id, comment.likeCount);

  return (
    <li className="relative">
      <div
        className="flex gap-3"
        style={{ paddingLeft: depth > 0 ? Math.min(depth * 12, 48) : 0 }}
      >
        {depth > 0 ? (
          <div
            className="absolute flex w-6 flex-col items-stretch"
            style={{
              left: (depth - 1) * 12,
              top: 0,
              bottom: 0,
            }}
          >
            <div className="h-5 w-3 border-b border-l border-slate-300" />
            <div className="min-h-[1rem] flex-1 border-l border-slate-300" />
          </div>
        ) : null}
        <div className="relative z-[1] flex min-w-0 flex-1 gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={comment.author.avatarUrl}
            alt=""
            className="size-9 shrink-0 rounded-full object-cover ring-2 ring-white"
          />
          <div className="min-w-0 flex-1 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-slate-900">{comment.author.name}</span>
              <time className="text-slate-400" dateTime={comment.createdAt}>
                {when}
              </time>
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{comment.body}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-100/90 px-1 py-0.5">
                <button
                  type="button"
                  aria-label="Upvote comment"
                  aria-pressed={user === "up"}
                  className={cn(
                    "rounded p-1 hover:bg-white",
                    user === "up" && "text-[var(--navy)]",
                  )}
                  onClick={() => voteComment(comment.id, comment.likeCount)}
                >
                  <ThumbsUp className="size-3.5" />
                </button>
                <span className="min-w-[1rem] text-center font-medium text-slate-700">
                  {total}
                </span>
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-[var(--navy)]"
                onClick={() => onReply(comment.id)}
              >
                <MessageCircle className="size-3.5" />
                Reply
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-slate-400"
                aria-label="Save comment (demo)"
              >
                <Bookmark className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {replies.length > 0 ? (
        <ul className="mt-3 space-y-3 border-l border-slate-200/90 pl-4">
          {replies.map((r) => (
            <ThreadBranch
              key={r.id}
              comment={r}
              byParent={byParent}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function CommentsSection({ postId }: { postId: string }) {
  const { getCommentsForPost, addComment } = useForumInteractions();
  const [text, setText] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiBtnRef = useRef<HTMLButtonElement>(null);
  const emojiPanelRef = useRef<HTMLDivElement>(null);

  const comments = getCommentsForPost(postId);
  const byParent = useMemo(() => buildTree(comments), [comments]);
  const roots = byParent.get(null) ?? [];

  const replyLabel = useMemo(() => {
    if (!replyToId) return null;
    const flat = comments.find((c) => c.id === replyToId);
    return flat?.author.name ?? "comment";
  }, [replyToId, comments]);

  useEffect(() => {
    if (!emojiOpen) return;
    const onDocDown = (ev: MouseEvent) => {
      const t = ev.target as Node;
      if (emojiPanelRef.current?.contains(t)) return;
      if (emojiBtnRef.current?.contains(t)) return;
      setEmojiOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [emojiOpen]);

  function insertEmoji(emoji: string) {
    const el = textareaRef.current;
    if (!el) {
      setText((t) => t + emoji);
      setEmojiOpen(false);
      return;
    }
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    const next = text.slice(0, start) + emoji + text.slice(end);
    setText(next);
    setEmojiOpen(false);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + emoji.length;
      el.setSelectionRange(pos, pos);
    });
  }

  function onCommentKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") {
      if (emojiOpen) {
        e.preventDefault();
        setEmojiOpen(false);
      }
      return;
    }

    const mod = e.ctrlKey || e.metaKey;
    if (e.shiftKey && mod && e.key.toLowerCase() === "e") {
      e.preventDefault();
      setEmojiOpen((o) => !o);
      return;
    }

    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    if (start !== end) return;

    if (e.key === " ") {
      const r = tryExpandShortcode(text, start, " ");
      if (r) {
        e.preventDefault();
        setText(r.next);
        requestAnimationFrame(() => {
          el.focus();
          el.setSelectionRange(r.newCursor, r.newCursor);
        });
      }
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      const r = tryExpandShortcode(text, start, "\n");
      if (r) {
        e.preventDefault();
        setText(r.next);
        requestAnimationFrame(() => {
          el.focus();
          el.setSelectionRange(r.newCursor, r.newCursor);
        });
      }
    }
  }

  function submit() {
    let body = text.trim();
    for (let i = 0; i < 8; i++) {
      const next = expandShortcodeTail(body);
      if (next === body) break;
      body = next;
    }
    if (!body) return;
    addComment(postId, body, replyToId);
    setText("");
    setReplyToId(null);
    setEmojiOpen(false);
  }

  return (
    <section className="mt-10">
      <h2 className="font-heading text-lg font-semibold text-slate-900">Comments</h2>

      {roots.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">No comments yet — start the thread below.</p>
      ) : (
        <ul className="mt-6 space-y-6">
          {roots.map((c) => (
            <ThreadBranch
              key={c.id}
              comment={c}
              byParent={byParent}
              depth={0}
              onReply={setReplyToId}
            />
          ))}
        </ul>
      )}

      <div className="relative mt-10 rounded-2xl border border-white/50 bg-white/50 p-4 backdrop-blur-sm">
        {replyToId ? (
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-slate-600">
              Replying to <strong className="text-[var(--navy)]">{replyLabel}</strong>
            </span>
            <button
              type="button"
              className="text-slate-500 underline"
              onClick={() => setReplyToId(null)}
            >
              Cancel
            </button>
          </div>
        ) : null}
        <label htmlFor={`comment-${postId}`} className="sr-only">
          Write a comment
        </label>
        <textarea
          ref={textareaRef}
          id={`comment-${postId}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onCommentKeyDown}
          placeholder="Write a comment… (e.g. :D then Space)"
          rows={3}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 outline-none focus:border-[var(--sky)]/60 focus:ring-2 focus:ring-[var(--sky)]/25"
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <button
                ref={emojiBtnRef}
                type="button"
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-500 shadow-sm transition hover:border-[var(--sky)]/40 hover:text-[var(--navy)]",
                  emojiOpen && "border-[var(--sky)]/50 text-[var(--navy)]",
                )}
                aria-expanded={emojiOpen}
                aria-controls={`emoji-panel-${postId}`}
                aria-haspopup="dialog"
                aria-label="Open emoji picker"
                onClick={() => setEmojiOpen((o) => !o)}
              >
                <Smile className="size-5" strokeWidth={1.75} aria-hidden />
              </button>
              {emojiOpen ? (
                <div
                  ref={emojiPanelRef}
                  id={`emoji-panel-${postId}`}
                  role="group"
                  aria-label="Choose emoji"
                  className="absolute bottom-full left-0 z-20 mb-2 grid w-[min(100vw-3rem,280px)] grid-cols-5 gap-1 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-lg"
                >
                  {COMMENT_QUICK_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="flex size-10 items-center justify-center rounded-lg text-lg leading-none transition hover:bg-slate-100"
                      aria-label={`Insert ${emoji}`}
                      onClick={() => insertEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <p className="max-w-[min(100%,20rem)] text-[11px] leading-snug text-slate-400">
              Type shortcodes like{" "}
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 font-mono text-slate-600">
                :D
              </kbd>{" "}
              or{" "}
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 font-mono text-slate-600">
                :)
              </kbd>
              , then Space or Enter.{" "}
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 font-mono text-slate-600">
                Ctrl+Shift+E
              </kbd>{" "}
              /{" "}
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 font-mono text-slate-600">
                ⌘⇧E
              </kbd>{" "}
              opens the picker.
            </p>
          </div>
          <button
            type="button"
            onClick={submit}
            disabled={!text.trim()}
            className="shrink-0 rounded-full bg-[var(--navy)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {replyToId ? "Post reply" : "Post comment"}
          </button>
        </div>
      </div>
    </section>
  );
}
