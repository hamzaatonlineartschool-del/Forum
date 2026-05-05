import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AddPostDialog,
  CommunityRulesPanel,
  ForumFeedPaywall,
  PostCard,
} from "@/components/forum";
import { getForumRepository } from "@/data/forum";
import {
  formatCommunityDisplayName,
  pickTopPostByEngagementPreferringHero,
  shouldShowCommunityMemberCount,
} from "@/domain/forum";
import { getCommunityCourseLandingUrl } from "@/lib/forum";
import { hasCommunityAccessServer } from "@/lib/forum/access-server";
import { Lock, Users } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export default async function CommunityPage({ params }: Props) {
  const { slug } = await params;
  const forum = getForumRepository();
  const community = forum.getCommunityBySlug(slug);
  if (!community) notFound();

  const feed = forum.listPosts().filter((p) => p.communitySlug === slug);
  const unlocked = await hasCommunityAccessServer(slug);
  const joinHref = getCommunityCourseLandingUrl(slug);
  const showMembers = shouldShowCommunityMemberCount(community.memberCount);

  let displayPosts = feed;
  let hiddenCount = 0;
  if (!unlocked && feed.length > 1) {
    const top = pickTopPostByEngagementPreferringHero(feed);
    displayPosts = top ? [top] : [];
    hiddenCount = Math.max(0, feed.length - displayPosts.length);
  }

  return (
    <div>
      <section className="overflow-hidden rounded-3xl border border-white/50 bg-gradient-to-br from-slate-100/90 to-white/60 shadow-sm backdrop-blur-md">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-10">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-lg md:size-36">
            {community.imageUrl ? (
              <Image src={community.imageUrl} alt="" fill className="object-cover" sizes="144px" />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-3xl font-bold text-[var(--navy)] md:text-4xl">
              {formatCommunityDisplayName(community)}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600">
              {showMembers ? (
                <p className="flex items-center gap-2 text-sm">
                  <Users className="size-4 shrink-0" aria-hidden />
                  {community.memberCount.toLocaleString()} members
                </p>
              ) : null}
              {community.studentsOnly ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/20 px-3 py-1 text-xs font-semibold text-[var(--navy)]">
                  <Lock className="size-3.5 shrink-0" aria-hidden />
                  Students only
                </span>
              ) : null}
            </div>
            <p className="mt-4 max-w-xl text-slate-600">{community.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AddPostDialog
                defaultCommunitySlug={slug}
                triggerClassName="rounded-full border-2 border-white bg-white/90 px-6 py-2.5 text-sm font-semibold text-[var(--navy)] shadow-sm backdrop-blur"
                triggerLabel="+ Add Post"
              />
              {unlocked ? (
                <span className="inline-flex items-center rounded-full bg-slate-200/90 px-6 py-2.5 text-sm font-semibold text-slate-600">
                  Joined
                </span>
              ) : (
                <Link
                  href={joinHref}
                  className="inline-flex items-center rounded-full bg-[var(--navy)] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
                >
                  Join
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 min-w-0 md:mt-8">
        <CommunityRulesPanel />
      </div>

      <div className="mt-8 min-w-0 space-y-6 md:mt-10">
        {displayPosts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-white/40 px-6 py-12 text-center text-slate-500">
            No posts yet. Be the first to share.
          </p>
        ) : (
          displayPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
        <ForumFeedPaywall
          hiddenCount={hiddenCount}
          joinHref={joinHref}
          joinLabel="Join course"
          communitySlug={slug}
        />
      </div>
    </div>
  );
}
