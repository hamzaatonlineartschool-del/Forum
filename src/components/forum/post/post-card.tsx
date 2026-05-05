import Link from "next/link";
import { formatCommunityDisplayName } from "@/domain/forum";
import type { ForumPost } from "@/types/forum";
import { formatDistanceToNow } from "@/lib/format-date";
import { PostBodyImage } from "./post-body-image";
import { PostCardExpandableCaption } from "./post-card-expandable-caption";
import { PostCardActions } from "./post-card-actions";

type Props = { post: ForumPost };

export function PostCard({ post }: Props) {
  const when = formatDistanceToNow(post.createdAt);

  return (
    <article className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-[0_4px_24px_rgba(26,54,93,0.06)] backdrop-blur-sm">
      <div className="flex items-start gap-3 p-5 pb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.author.avatarUrl}
          alt=""
          className="size-10 shrink-0 rounded-full object-cover ring-2 ring-white"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <Link
              href={`/forum/c/${post.communitySlug}`}
              title={formatCommunityDisplayName({
                slug: post.communitySlug,
                handle: post.communityHandle,
                displayName: post.communityDisplayName,
              })}
              className="font-medium text-[var(--navy)] hover:underline"
            >
              {formatCommunityDisplayName({
                slug: post.communitySlug,
                handle: post.communityHandle,
                displayName: post.communityDisplayName,
              })}
            </Link>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600">{post.author.name}</span>
            <span className="text-slate-400">·</span>
            <time className="text-slate-400" dateTime={post.createdAt}>
              {when}
            </time>
          </div>
          <Link href={`/forum/c/${post.communitySlug}/p/${post.id}`}>
            <h2 className="font-heading mt-2 text-xl font-bold tracking-tight text-slate-900 hover:text-[var(--navy)]">
              {post.title}
            </h2>
          </Link>
        </div>
      </div>

      {post.imageUrl ? (
        <Link
          href={`/forum/c/${post.communitySlug}/p/${post.id}`}
          className="block px-5"
        >
          <PostBodyImage
            src={post.imageUrl}
            variant="feed"
            sizes="(max-width: 768px) 100vw, 720px"
            className="rounded-xl"
          />
        </Link>
      ) : null}

      {post.excerpt ? (
        <PostCardExpandableCaption excerpt={post.excerpt} body={post.body} id={post.id} />
      ) : null}

      <PostCardActions postId={post.id} communitySlug={post.communitySlug} />
    </article>
  );
}
