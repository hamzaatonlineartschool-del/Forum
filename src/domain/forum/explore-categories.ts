/**
 * Discover-page taxonomy — single source of truth for explore filters and category icons.
 * Community `category` fields in seed data should use these string values.
 */
export const EXPLORE_CATEGORIES = [
  "Art",
  "Body And Mind",
  "Craft",
  "Dance",
  "Illustration",
  "Lifestyle",
  "Music",
  "Photography",
  "Videography",
] as const;

export type ExploreCategory = (typeof EXPLORE_CATEGORIES)[number];
