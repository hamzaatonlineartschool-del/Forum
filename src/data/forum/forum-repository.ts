import type { ExploreCategory } from "@/domain/forum";
import type {
  Community,
  ForumComment,
  ForumPost,
  RecommendedCourse,
} from "@/types/forum";

/**
 * Read-only access to forum entities. Swap implementations (e.g. Payload, REST)
 * via {@link getForumRepository}; UI and route handlers depend only on this contract.
 */
export interface ForumRepository {
  getExploreCategories(): readonly ExploreCategory[];
  listCommunities(): readonly Community[];
  listPosts(): readonly ForumPost[];
  /** Threads for the signed-in user (in the mock seed: Megan Thornton's posts). */
  listMyPosts(): readonly ForumPost[];
  listPostsNewestFirst(): readonly ForumPost[];
  getCommunityBySlug(slug: string): Community | undefined;
  getPostById(id: string): ForumPost | undefined;
  /** Seed comments only — merged with persisted client data in `ForumInteractionsProvider`. */
  getBaselineCommentsForPost(postId: string): readonly ForumComment[];
  listRecommendedCourses(): readonly RecommendedCourse[];
}
