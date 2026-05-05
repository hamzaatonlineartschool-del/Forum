import type { ForumPost } from "@/types/forum";

function engagementScore(p: ForumPost): number {
  return p.likeCount + p.commentCount;
}

function postTimeMs(p: ForumPost): number {
  return new Date(p.createdAt).getTime();
}

/** Top post by likeCount + commentCount; tie-break newer first, then id. */
export function pickTopPostByEngagement(
  posts: readonly ForumPost[],
): ForumPost | undefined {
  if (posts.length === 0) return undefined;
  const copy = [...posts];
  copy.sort((a, b) => {
    const s = engagementScore(b) - engagementScore(a);
    if (s !== 0) return s;
    const t = postTimeMs(b) - postTimeMs(a);
    if (t !== 0) return t;
    return a.id.localeCompare(b.id);
  });
  return copy[0];
}

/**
 * Paywall teaser: when at least one thread has hero media, rank only those so
 * locked feeds still show a visual. Falls back to all posts if none have images.
 */
export function pickTopPostByEngagementPreferringHero(
  posts: readonly ForumPost[],
): ForumPost | undefined {
  if (posts.length === 0) return undefined;
  const withHero = posts.filter((p) => p.imageUrl);
  if (withHero.length > 0) return pickTopPostByEngagement(withHero);
  return pickTopPostByEngagement(posts);
}
