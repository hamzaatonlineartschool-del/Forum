import { ForumFeedHeader, PostCard } from "@/components/forum";
import { getForumRepository } from "@/data/forum";
import { parseFeedSort, sortPostsForFeed } from "@/domain/forum";

type Props = { searchParams?: Promise<{ sort?: string }> };

export default async function MyPostsPage({ searchParams }: Props) {
  const sort = parseFeedSort(
    searchParams ? (await searchParams).sort : undefined,
  );
  const posts = sortPostsForFeed(getForumRepository().listPosts(), sort);

  return (
    <div>
      <ForumFeedHeader title="My posts" sortable currentSort={sort} />
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-600">
        Demo list — after login this will show your threads from Payload.
      </p>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
