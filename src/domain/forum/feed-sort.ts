import type { ForumPost } from "@/types/forum";

export type FeedSort = "newest" | "oldest" | "liked";

const FEED_SORT_VALUES: readonly FeedSort[] = ["newest", "oldest", "liked"];

export function parseFeedSort(raw: string | undefined): FeedSort {
  if (raw && (FEED_SORT_VALUES as readonly string[]).includes(raw)) {
    return raw as FeedSort;
  }
  return "newest";
}

function postTimeMs(p: ForumPost): number {
  return new Date(p.createdAt).getTime();
}

/** Returns a new array sorted for the feed; does not mutate the input. */
export function sortPostsForFeed(
  posts: readonly ForumPost[],
  sort: FeedSort,
): ForumPost[] {
  const copy = [...posts];
  switch (sort) {
    case "oldest":
      copy.sort(
        (a, b) =>
          postTimeMs(a) - postTimeMs(b) || a.id.localeCompare(b.id),
      );
      break;
    case "liked":
      copy.sort(
        (a, b) =>
          b.likeCount - a.likeCount ||
          postTimeMs(b) - postTimeMs(a) ||
          a.id.localeCompare(b.id),
      );
      break;
    default:
      copy.sort(
        (a, b) =>
          postTimeMs(b) - postTimeMs(a) || a.id.localeCompare(b.id),
      );
  }
  return copy;
}
