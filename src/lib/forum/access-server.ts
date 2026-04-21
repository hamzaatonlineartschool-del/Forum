import { cookies } from "next/headers";
import {
  FORUM_ENTITLEMENTS_COOKIE,
  parseEntitlements,
  type ForumEntitlements,
  hasCommunityAccess,
  hasMyFeedFullAccess,
} from "./entitlements";
import { debugAgentLogServer } from "@/lib/debug-agent-log-server";

export async function getForumEntitlementsServer(): Promise<ForumEntitlements> {
  const jar = await cookies();
  const raw = jar.get(FORUM_ENTITLEMENTS_COOKIE)?.value;
  const e = parseEntitlements(raw);
  // #region agent log
  await debugAgentLogServer({
    hypothesisId: "H1",
    location: "lib/forum/access-server.ts:getForumEntitlementsServer",
    message: "parsed entitlements",
    data: {
      hasCookie: Boolean(raw && raw.length > 0),
      fullFeed: e.fullFeed,
      communityCount: e.communities.length,
    },
  });
  // #endregion
  return e;
}

export async function hasCommunityAccessServer(slug: string): Promise<boolean> {
  return hasCommunityAccess(slug, await getForumEntitlementsServer());
}

export async function hasMyFeedFullAccessServer(): Promise<boolean> {
  return hasMyFeedFullAccess(await getForumEntitlementsServer());
}
