import type { SerializedEditorState } from "lexical";

/** Mirrors Payload-ish shapes for handoff; IDs are strings (Payload uses string ids). */
export type ForumUser = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type Community = {
  id: string;
  slug: string;
  /** Overrides slug/handle-derived labels in nav and post cards (e.g. course-titled spaces). */
  displayName?: string;
  /** Display handle e.g. oas/Crochet */
  handle: string;
  description: string;
  memberCount: number;
  studentsOnly?: boolean;
  imageUrl?: string;
  category?: string;
};

export type ForumPost = {
  id: string;
  communityId: string;
  /** URL segment e.g. digitalphotography */
  communitySlug: string;
  communityHandle: string;
  /** Copied from {@link Community.displayName} when building the post for card chrome. */
  communityDisplayName?: string;
  title: string;
  /** Plain excerpt for cards; optional */
  excerpt?: string;
  /** Lexical JSON — same shape Payload `richText` expects */
  body: SerializedEditorState | string;
  author: ForumUser;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  imageUrl?: string;
  /** When false, post is omitted from the global /forum feed (still on community pages & permalinks). */
  includeInMainFeed?: boolean;
};

export type ForumComment = {
  id: string;
  postId: string;
  parentId: string | null;
  author: ForumUser;
  body: string;
  createdAt: string;
  likeCount: number;
};

/** Marketing sidebar — mirrors a future CMS / commerce feed. */
export type RecommendedCourse = {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  level: string;
  duration: string;
  price: string;
  imageUrl: string;
};
