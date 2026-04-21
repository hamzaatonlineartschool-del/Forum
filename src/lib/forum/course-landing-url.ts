/**
 * Course purchase / landing URL for a community slug.
 * Set NEXT_PUBLIC_MAIN_SITE_ORIGIN when the forum is connected to the main site.
 */
export function getCommunityCourseLandingUrl(communitySlug: string): string {
  const origin = process.env.NEXT_PUBLIC_MAIN_SITE_ORIGIN?.replace(/\/$/, "");
  if (origin) {
    return `${origin}/courses/${encodeURIComponent(communitySlug)}`;
  }
  return `/about?course=${encodeURIComponent(communitySlug)}`;
}
