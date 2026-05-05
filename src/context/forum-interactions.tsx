"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getForumRepository } from "@/data/forum";
import { buildUnsplashUrl } from "@/lib/media/unsplash-url";
import type { ForumComment, ForumUser } from "@/types/forum";

const STORAGE_KEY = "oas-forum-interactions-v1";

export const DEMO_USER: ForumUser = {
  id: "you",
  name: "You",
  avatarUrl: buildUnsplashUrl("photo-1573497019940-1c28c88b4f3e", 128),
};

type VoteState = { total: number; user: "up" | null };

type Persisted = {
  postVotes: Record<string, VoteState>;
  savedPosts: string[];
  /** User-authored comments only (merged with mock at read time) */
  extraComments: Record<string, ForumComment[]>;
  commentVotes: Record<string, VoteState>;
};

function migrateVoteState(v: { total: number; user?: unknown }): VoteState {
  if (v.user === "down") {
    return { user: null, total: v.total + 1 };
  }
  return {
    total: v.total,
    user: v.user === "up" ? "up" : null,
  };
}

function loadPersisted(): Partial<Persisted> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const p = JSON.parse(raw) as Partial<Persisted> & {
      postVotes?: Record<string, { total: number; user?: string }>;
      commentVotes?: Record<string, { total: number; user?: string }>;
    };
    const postVotes: Record<string, VoteState> = {};
    for (const [k, v] of Object.entries(p.postVotes ?? {})) {
      postVotes[k] = migrateVoteState(v as { total: number; user?: unknown });
    }
    const commentVotes: Record<string, VoteState> = {};
    for (const [k, v] of Object.entries(p.commentVotes ?? {})) {
      commentVotes[k] = migrateVoteState(v as { total: number; user?: unknown });
    }
    return {
      ...p,
      postVotes,
      commentVotes,
    };
  } catch {
    return {};
  }
}

function savePersisted(data: Persisted) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota */
  }
}

function basePostLikes(postId: string): number {
  return (
    getForumRepository()
      .listPosts()
      .find((p) => p.id === postId)?.likeCount ?? 0
  );
}

function applyUpvoteToggle(prev: VoteState): VoteState {
  const { total, user } = prev;
  if (user === null) return { total: total + 1, user: "up" };
  if (user === "up") return { total: total - 1, user: null };
  return prev;
}

type ForumInteractionsValue = {
  hydrated: boolean;
  getPostVote: (postId: string) => VoteState;
  votePost: (postId: string) => void;
  isSaved: (postId: string) => boolean;
  savedPostIds: string[];
  toggleSave: (postId: string) => void;
  shareUrl: (url: string) => Promise<void>;
  getCommentsForPost: (postId: string) => ForumComment[];
  addComment: (postId: string, body: string, parentId: string | null) => void;
  getCommentVote: (commentId: string, baseLikes: number) => VoteState;
  voteComment: (commentId: string, baseLikes: number) => void;
};

const ForumInteractionsContext = createContext<ForumInteractionsValue | null>(
  null,
);

export function ForumInteractionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [postVotes, setPostVotes] = useState<Record<string, VoteState>>({});
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [extraComments, setExtraComments] = useState<
    Record<string, ForumComment[]>
  >({});
  const [commentVotes, setCommentVotes] = useState<
    Record<string, VoteState>
  >({});

  useEffect(() => {
    const p = loadPersisted();
    /* eslint-disable react-hooks/set-state-in-effect -- single hydration pass */
    setPostVotes(p.postVotes ?? {});
    setSavedPosts(p.savedPosts ?? []);
    setExtraComments(p.extraComments ?? {});
    setCommentVotes(p.commentVotes ?? {});
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePersisted({
      postVotes,
      savedPosts,
      extraComments,
      commentVotes,
    });
  }, [hydrated, postVotes, savedPosts, extraComments, commentVotes]);

  const getPostVote = useCallback(
    (postId: string): VoteState => {
      const base = basePostLikes(postId);
      return postVotes[postId] ?? { total: base, user: null };
    },
    [postVotes],
  );

  const votePost = useCallback((postId: string) => {
    setPostVotes((prev) => {
      const base = basePostLikes(postId);
      const current = prev[postId] ?? { total: base, user: null };
      return {
        ...prev,
        [postId]: applyUpvoteToggle(current),
      };
    });
  }, []);

  const isSaved = useCallback(
    (postId: string) => savedPosts.includes(postId),
    [savedPosts],
  );

  const toggleSave = useCallback((postId: string) => {
    setSavedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }, []);

  const shareUrl = useCallback(async (url: string) => {
    const full = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "OAS Forum", url: full });
        return;
      }
    } catch {
      /* user cancelled or share failed */
    }
    try {
      await navigator.clipboard.writeText(full);
    } catch {
      window.prompt("Copy link:", full);
    }
  }, []);

  const getCommentsForPost = useCallback(
    (postId: string): ForumComment[] => {
      const seed = getForumRepository().getBaselineCommentsForPost(postId);
      const extra = extraComments[postId] ?? [];
      return [...seed, ...extra];
    },
    [extraComments],
  );

  const addComment = useCallback(
    (postId: string, body: string, parentId: string | null) => {
      const trimmed = body.trim();
      if (!trimmed) return;
      const id = `u-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const c: ForumComment = {
        id,
        postId,
        parentId,
        author: DEMO_USER,
        body: trimmed,
        createdAt: new Date().toISOString(),
        likeCount: 0,
      };
      setExtraComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] ?? []), c],
      }));
    },
    [],
  );

  const getCommentVote = useCallback(
    (commentId: string, baseLikes: number): VoteState => {
      return (
        commentVotes[commentId] ?? {
          total: baseLikes,
          user: null,
        }
      );
    },
    [commentVotes],
  );

  const voteComment = useCallback((commentId: string, baseLikes: number) => {
    setCommentVotes((prev) => {
      const current =
        prev[commentId] ?? { total: baseLikes, user: null };
      return {
        ...prev,
        [commentId]: applyUpvoteToggle(current),
      };
    });
  }, []);

  const value = useMemo<ForumInteractionsValue>(
    () => ({
      hydrated,
      getPostVote,
      votePost,
      isSaved,
      savedPostIds: savedPosts,
      toggleSave,
      shareUrl,
      getCommentsForPost,
      addComment,
      getCommentVote,
      voteComment,
    }),
    [
      hydrated,
      getPostVote,
      votePost,
      isSaved,
      savedPosts,
      toggleSave,
      shareUrl,
      getCommentsForPost,
      addComment,
      getCommentVote,
      voteComment,
    ],
  );

  return (
    <ForumInteractionsContext.Provider value={value}>
      {children}
    </ForumInteractionsContext.Provider>
  );
}

export function useForumInteractions() {
  const ctx = useContext(ForumInteractionsContext);
  if (!ctx) {
    throw new Error(
      "useForumInteractions must be used within ForumInteractionsProvider",
    );
  }
  return ctx;
}

/** Safe hook when provider might be absent (e.g. outside /forum) */
export function useForumInteractionsOptional() {
  return useContext(ForumInteractionsContext);
}
