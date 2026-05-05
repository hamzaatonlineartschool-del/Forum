"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, ChevronRight } from "lucide-react";
import { useForumInteractions } from "@/context/forum-interactions";
import { getForumRepository } from "@/data/forum";
import { formatCommunityDisplayName } from "@/domain/forum";
import { formatDistanceToNow } from "@/lib/format-date";
import type { ForumPost } from "@/types/forum";

export function SavedPostsList() {
  const { savedPostIds } = useForumInteractions();
  const posts = getForumRepository().listPosts();
  const byId = new Map(posts.map((p) => [p.id, p]));
  const items: ForumPost[] = savedPostIds
    .map((id) => byId.get(id))
    .filter((p): p is ForumPost => p != null);

  if (savedPostIds.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300/80 bg-white/40 px-6 py-14 text-center backdrop-blur-sm">
        <Bookmark className="mx-auto size-10 text-slate-300" strokeWidth={1.5} aria-hidden />
        <p className="mt-4 text-slate-600">
          Nothing saved yet — use <strong className="font-semibold text-slate-800">Save</strong>{" "}
          on a post to add it here.
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-8 flex flex-col gap-4">
      {items.map((p) => (
        <li key={p.id}>
          <Link
            href={`/forum/c/${p.communitySlug}/p/${p.id}`}
            className="group flex gap-4 rounded-2xl border border-[var(--lavender)]/30 bg-gradient-to-br from-white/85 via-white/70 to-[var(--lavender)]/[0.07] p-3 shadow-[0_6px_28px_rgba(16,59,107,0.06)] backdrop-blur-md transition hover:border-[var(--lavender)]/50 hover:shadow-[0_10px_36px_rgba(16,59,107,0.1)] sm:p-4"
          >
            <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl bg-slate-200/80 sm:w-40">
              {p.imageUrl ? (
                <Image
                  src={p.imageUrl}
                  alt=""
                  fill
                  className="object-contain transition duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 96px, 160px"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-gradient-to-br from-[var(--navy)]/[0.07] to-[var(--lavender)]/15">
                  <Bookmark
                    className="size-8 text-[var(--navy)]/25"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex max-w-full items-center rounded-full bg-[var(--navy)]/8 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--navy)]">
                  {formatCommunityDisplayName({
                    slug: p.communitySlug,
                    handle: p.communityHandle,
                    displayName: p.communityDisplayName,
                  })}
                </span>
                <span className="text-xs text-slate-400" aria-hidden>
                  ·
                </span>
                <time className="text-xs text-slate-500" dateTime={p.createdAt}>
                  {formatDistanceToNow(p.createdAt)}
                </time>
              </div>
              <h2 className="font-heading text-lg font-bold leading-snug tracking-tight text-slate-900 group-hover:text-[var(--navy)] sm:text-xl">
                {p.title}
              </h2>
              {p.excerpt ? (
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{p.excerpt}</p>
              ) : null}
              <p className="text-xs text-slate-500">
                <span className="font-medium text-slate-600">{p.author.name}</span>
              </p>
            </div>

            <div className="flex shrink-0 items-center self-center sm:self-stretch">
              <span className="flex size-9 items-center justify-center rounded-full border border-white/60 bg-white/50 text-slate-400 shadow-sm transition group-hover:border-[var(--lavender)]/40 group-hover:bg-white/90 group-hover:text-[var(--navy)]">
                <ChevronRight className="size-5" aria-hidden />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
