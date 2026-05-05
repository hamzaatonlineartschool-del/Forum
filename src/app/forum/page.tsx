import { ForumFeedHeader, ForumFeedPaywall, PostCard } from "@/components/forum";
import { getForumRepository } from "@/data/forum";
import {
  parseFeedSort,
  pickTopPostByEngagement,
  sortPostsForFeed,
} from "@/domain/forum";
import { hasMyFeedFullAccessServer } from "@/lib/forum/access-server";
import { debugAgentLogServer } from "@/lib/debug-agent-log-server";

type Props = { searchParams?: Promise<{ sort?: string }> };

export default async function ForumFeedPage({ searchParams }: Props) {
  const sort = parseFeedSort(
    searchParams ? (await searchParams).sort : undefined,
  );
  const sorted = sortPostsForFeed(
    getForumRepository().listPosts().filter((p) => p.includeInMainFeed !== false),
    sort,
  );
  const fullAccess = await hasMyFeedFullAccessServer();

  let posts = sorted;
  let hiddenCount = 0;
  if (!fullAccess && sorted.length > 1) {
    const top = pickTopPostByEngagement(sorted);
    posts = top ? [top] : [];
    hiddenCount = Math.max(0, sorted.length - posts.length);
  }

  // #region agent log
  await debugAgentLogServer({
    hypothesisId: "H2",
    location: "app/forum/page.tsx:ForumFeedPage",
    message: "my feed gate",
    data: {
      sort,
      fullAccess,
      sortedLen: sorted.length,
      postsLen: posts.length,
      hiddenCount,
    },
  });
  // #endregion

  return (
    <div>
      <ForumFeedHeader title="My Feed" sortable currentSort={sort} />
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <ForumFeedPaywall
        hiddenCount={hiddenCount}
        joinHref="/about"
        joinLabel="View courses"
      />
    </div>
  );
}
