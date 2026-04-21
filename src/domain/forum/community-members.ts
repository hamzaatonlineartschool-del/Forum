/** Minimum members before we show a public member count (marketing / privacy). */
export const COMMUNITY_MEMBERS_DISPLAY_MIN = 50;

export function shouldShowCommunityMemberCount(memberCount: number): boolean {
  return memberCount >= COMMUNITY_MEMBERS_DISPLAY_MIN;
}
