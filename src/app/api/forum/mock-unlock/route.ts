import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  FORUM_ENTITLEMENTS_COOKIE,
  mergeEntitlements,
  parseEntitlements,
  serializeEntitlements,
} from "@/lib/forum";

export async function POST(req: Request) {
  let body: { communitySlug?: string; fullFeed?: boolean } = {};
  try {
    body = (await req.json()) as typeof body;
  } catch {
    /* ignore */
  }

  const jar = await cookies();
  const current = parseEntitlements(jar.get(FORUM_ENTITLEMENTS_COOKIE)?.value);
  const next = mergeEntitlements(current, {
    communitySlug:
      typeof body.communitySlug === "string" ? body.communitySlug : undefined,
    fullFeed: body.fullFeed === true,
  });

  const res = NextResponse.json({ ok: true, entitlements: next });
  res.cookies.set(FORUM_ENTITLEMENTS_COOKIE, serializeEntitlements(next), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}
