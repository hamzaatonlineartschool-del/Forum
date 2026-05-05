"use client";

import { Bookmark, Flag, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useForumInteractions } from "@/context/forum-interactions";
import { cn } from "@/lib/utils";
import { ReportPostDialog } from "../dialogs/report-post-dialog";

const SHOW_POST_SHARE = false;

type Props = {
  postId: string;
  communitySlug: string;
  /** Extra classes for the action row (default: card padding) */
  className?: string;
};

export function PostCardActions({
  postId,
  communitySlug,
  className = "px-5 py-4",
}: Props) {
  const { getPostVote, votePost, isSaved, toggleSave, shareUrl, getCommentsForPost } =
    useForumInteractions();

  const { total, user } = getPostVote(postId);
  const saved = isSaved(postId);
  const commentCount = getCommentsForPost(postId).length;
  const postPath = `/forum/c/${communitySlug}/p/${postId}`;

  return (
    <div
      className={`flex flex-wrap items-center gap-4 text-sm text-slate-500 ${className}`}
    >
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100/80 px-1 py-1">
        <button
          type="button"
          aria-pressed={user === "up"}
          aria-label="Upvote"
          className={cn(
            "rounded-full p-1.5 transition hover:bg-white",
            user === "up" && "text-[var(--navy)]",
          )}
          onClick={() => votePost(postId)}
        >
          <ThumbsUp
            className={cn("size-4", user === "up" && "fill-current")}
            aria-hidden
          />
        </button>
        <span className="min-w-[1.25rem] text-center text-sm font-medium text-slate-700">
          {total}
        </span>
      </span>
      <Link
        href={postPath}
        className="inline-flex items-center gap-1 hover:text-[var(--navy)]"
      >
        <MessageCircle className="size-4" />
        Reply
      </Link>
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 transition hover:text-[var(--navy)]",
          saved && "font-medium text-[var(--navy)]",
        )}
        aria-pressed={saved}
        onClick={() => toggleSave(postId)}
      >
        <Bookmark className={cn("size-4", saved && "fill-current")} />
        {saved ? "Saved" : "Save"}
      </button>
      {SHOW_POST_SHARE ? (
        <button
          type="button"
          className="inline-flex items-center gap-1 hover:text-[var(--navy)]"
          onClick={() => void shareUrl(postPath)}
        >
          <Share2 className="size-4" />
          Share
        </button>
      ) : null}
      <span className="ml-auto inline-flex items-center gap-1 text-slate-400">
        <MessageCircle className="size-4" />
        {commentCount}
      </span>
      <ReportPostDialog postId={postId} communitySlug={communitySlug}>
        <button
          type="button"
          aria-label="Report"
          className="text-slate-400 hover:text-[var(--sky)]"
        >
          <Flag className="size-4" />
        </button>
      </ReportPostDialog>
    </div>
  );
}
