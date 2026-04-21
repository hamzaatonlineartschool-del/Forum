import { notFound } from "next/navigation";
import { PostDetailView, PostLockedView } from "@/components/forum";
import { getForumRepository } from "@/data/forum";
import { pickTopPostByEngagement } from "@/domain/forum";
import { getCommunityCourseLandingUrl } from "@/lib/forum";
import { hasCommunityAccessServer } from "@/lib/forum/access-server";

type Props = { params: Promise<{ slug: string; postId: string }> };

export default async function PostPage({ params }: Props) {
  const { slug, postId } = await params;
  const forum = getForumRepository();
  const post = forum.getPostById(postId);
  const community = forum.getCommunityBySlug(slug);
  if (!post || !community || post.communitySlug !== slug) notFound();

  const unlocked = await hasCommunityAccessServer(slug);
  if (!unlocked) {
    const feed = forum.listPosts().filter((p) => p.communitySlug === slug);
    const featured = pickTopPostByEngagement(feed);
    if (!featured || featured.id !== postId) {
      return (
        <PostLockedView
          community={community}
          postTitle={post.title}
          joinHref={getCommunityCourseLandingUrl(slug)}
        />
      );
    }
  }

  return <PostDetailView post={post} community={community} />;
}
