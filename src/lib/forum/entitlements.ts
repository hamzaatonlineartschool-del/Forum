export const FORUM_ENTITLEMENTS_COOKIE = "oas_forum_entitlements";

export type ForumEntitlements = {
  communities: string[];
  fullFeed: boolean;
};

const empty: ForumEntitlements = { communities: [], fullFeed: false };

export function parseEntitlements(raw: string | undefined): ForumEntitlements {
  if (!raw?.trim()) return { ...empty, communities: [] };
  try {
    const v = JSON.parse(raw) as unknown;
    if (!v || typeof v !== "object") return { ...empty };
    const communities = Array.isArray((v as { communities?: unknown }).communities)
      ? (v as { communities: string[] }).communities.filter(
          (s): s is string => typeof s === "string" && s.length > 0,
        )
      : [];
    const fullFeed = Boolean((v as { fullFeed?: unknown }).fullFeed);
    return { communities: [...new Set(communities)], fullFeed };
  } catch {
    return { ...empty };
  }
}

export function serializeEntitlements(e: ForumEntitlements): string {
  return JSON.stringify({
    communities: e.communities,
    fullFeed: e.fullFeed,
  });
}

export function mergeEntitlements(
  current: ForumEntitlements,
  patch: { communitySlug?: string; fullFeed?: boolean },
): ForumEntitlements {
  const communities = new Set(current.communities);
  if (patch.communitySlug) communities.add(patch.communitySlug);
  return {
    communities: [...communities],
    fullFeed: current.fullFeed || Boolean(patch.fullFeed),
  };
}

export function hasCommunityAccess(
  slug: string,
  e: ForumEntitlements,
): boolean {
  return e.fullFeed || e.communities.includes(slug);
}

export function hasMyFeedFullAccess(e: ForumEntitlements): boolean {
  return e.fullFeed;
}
