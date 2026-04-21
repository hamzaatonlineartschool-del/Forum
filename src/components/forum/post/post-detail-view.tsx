"use client";

import Image from "next/image";
import Link from "next/link";
import { RichTextReader } from "@/components/editor/rich-text-reader";
import { PostCardActions } from "./post-card-actions";
import { CommentsSection } from "../comments/comments-section";
import { formatCommunityDisplayName } from "@/domain/forum";
import type { Community, ForumPost } from "@/types/forum";
import { formatDistanceToNow } from "@/lib/format-date";

type Props = {
  post: ForumPost;
  community: Community;
};

export function PostDetailView({ post, community }: Props) {
  const when = formatDistanceToNow(post.createdAt);

  return (
    <div>
      <article className="min-w-0 max-w-3xl">
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.author.avatarUrl}
            alt=""
            className="size-12 rounded-full object-cover ring-2 ring-white"
          />
          <div>
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{post.author.name}</span>
              <span className="text-slate-400"> · </span>
              <time dateTime={post.createdAt}>{when}</time>
            </p>
            <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {post.title}
            </h1>
            <Link
              href={`/forum/c/${community.slug}`}
              title={formatCommunityDisplayName(community)}
              className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/60 bg-white/50 py-1 pl-1 pr-3 text-sm font-medium text-[var(--navy)] backdrop-blur hover:bg-white/80"
            >
              {community.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={community.imageUrl}
                  alt=""
                  className="size-7 shrink-0 rounded-full object-cover ring-2 ring-white/80"
                />
              ) : (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-500">
                  ?
                </span>
              )}
              <span className="min-w-0 truncate">{formatCommunityDisplayName(community)}</span>
            </Link>
          </div>
        </div>

        {post.imageUrl ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={post.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        ) : null}

        <div className="mt-8">
          <RichTextReader serialized={post.body} />
        </div>

        <div className="mt-2 border-y border-slate-200/80">
          <PostCardActions
            postId={post.id}
            communitySlug={post.communitySlug}
            className="py-4"
          />
        </div>

        <CommentsSection postId={post.id} />
      </article>
    </div>
  );
}
