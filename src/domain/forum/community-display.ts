import type { Community } from "@/types/forum";

/** Minimum fields for display naming (works with full {@link Community} or post-derived keys). */
export type CommunityNameInput = Pick<Community, "slug" | "handle" | "displayName">;

/** Slug → human title for legacy single-token slugs without hyphens (extend when seeding new communities). */
const DISPLAY_NAME_BY_SLUG: Record<string, string> = {
  photographybasics: "Photography basics",
  digitalphotography: "Digital photography",
  discomoves: "Disco moves",
  spraypainting: "Spray painting",
  oilpainting: "Oil painting",
};

function titleCaseHyphenated(segment: string): string {
  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function singleTokenTitle(token: string): string {
  const key = token.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(DISPLAY_NAME_BY_SLUG, key)) {
    return DISPLAY_NAME_BY_SLUG[key]!;
  }
  return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
}

/**
 * Human-readable community title for cards, headers, and navigation.
 * Prefers hyphenated `slug`, then hyphenated handle tail, then slug-specific overrides.
 */
export function formatCommunityDisplayName(
  community: Community | CommunityNameInput,
): string {
  if (community.displayName?.trim()) {
    return community.displayName.trim();
  }

  if (community.slug.includes("-") || community.slug.includes("_")) {
    return titleCaseHyphenated(community.slug);
  }

  const tail = community.handle.includes("/")
    ? community.handle.split("/").pop()!
    : community.handle;

  if (tail.includes("-")) {
    return titleCaseHyphenated(tail);
  }

  if (Object.prototype.hasOwnProperty.call(DISPLAY_NAME_BY_SLUG, community.slug)) {
    return DISPLAY_NAME_BY_SLUG[community.slug]!;
  }

  return singleTokenTitle(tail || community.slug);
}

/** @deprecated Use {@link formatCommunityDisplayName} — behavior is identical. */
export const formatCommunityNavLabel = formatCommunityDisplayName;
