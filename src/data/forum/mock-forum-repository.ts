import type { ForumRepository } from "./forum-repository";
import {
  communities,
  exploreCategories,
  getCommentsForPost,
  getCommunityBySlug,
  getPostById,
  myPosts,
  posts,
  postsNewestFirst,
  recommendedCourses,
} from "@/lib/forum";

/**
 * In-memory forum data — production would replace with a repository backed by Payload/DB.
 */
export class MockForumRepository implements ForumRepository {
  getExploreCategories() {
    return exploreCategories;
  }

  listCommunities() {
    return communities;
  }

  listPosts() {
    return posts;
  }

  listMyPosts() {
    return myPosts;
  }

  listPostsNewestFirst() {
    return postsNewestFirst;
  }

  getCommunityBySlug(slug: string) {
    return getCommunityBySlug(slug);
  }

  getPostById(id: string) {
    return getPostById(id);
  }

  getBaselineCommentsForPost(postId: string) {
    return getCommentsForPost(postId);
  }

  listRecommendedCourses() {
    return recommendedCourses;
  }
}
