import Link from "next/link";
import { formatCommunityDisplayName } from "@/domain/forum";
import type { Community } from "@/types/forum";
import { PostBodyImage } from "./post-body-image";

type Props = {
  community: Community;
  postTitle: string;
  joinHref: string;
  /** Hero from the post the learner tried to open (still visible when paywalled). */
  imageUrl?: string;
};

export function PostLockedView({
  community,
  postTitle,
  joinHref,
  imageUrl,
}: Props) {
  const name = formatCommunityDisplayName(community);
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-white/60 bg-white/70 px-8 py-12 text-center shadow-sm backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
        Members only
      </p>
      <h1 className="mt-3 font-heading text-2xl font-bold text-[var(--navy)]">
        This post is part of {name}
      </h1>
      <p className="mt-2 text-sm text-slate-600 line-clamp-2">{postTitle}</p>
      {imageUrl ? (
        <div className="mt-6 text-left">
          <PostBodyImage
            src={imageUrl}
            variant="feed"
            sizes="(max-width: 768px) 100vw, 512px"
            className="rounded-xl opacity-90 ring-1 ring-slate-200/60"
          />
        </div>
      ) : null}
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        Purchase the course to read the full thread and join the conversation.
      </p>
      <Link
        href={joinHref}
        className="mt-8 inline-flex rounded-full bg-[var(--navy)] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
      >
        Go to course
      </Link>
      <p className="mt-6 text-xs text-slate-400">
        <Link href={`/forum/c/${community.slug}`} className="underline hover:text-slate-600">
          Back to community
        </Link>
      </p>
    </div>
  );
}
