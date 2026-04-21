"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  hiddenCount: number;
  joinHref: string;
  joinLabel?: string;
  /** When set, demo unlock adds this community slug; when omitted, demo unlocks full My Feed. */
  communitySlug?: string;
};

export function ForumFeedPaywall({
  hiddenCount,
  joinHref,
  joinLabel = "Join course",
  communitySlug,
}: Props) {
  const router = useRouter();
  const showDemo =
    typeof process !== "undefined" && process.env.NODE_ENV === "development";

  const mockUnlock = async () => {
    const res = await fetch("/api/forum/mock-unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        communitySlug
          ? { communitySlug }
          : { fullFeed: true },
      ),
    });
    // #region agent log
    void fetch("/api/debug-e53ead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hypothesisId: "H3",
        location: "forum-feed-paywall.tsx:mockUnlock",
        message: "mock-unlock response",
        data: {
          ok: res.ok,
          status: res.status,
          communitySlug: communitySlug ?? null,
        },
        timestamp: Date.now(),
        sessionId: "e53ead",
      }),
    }).catch(() => {});
    // #endregion
    router.refresh();
  };

  if (hiddenCount <= 0) return null;

  return (
    <div className="mt-8 rounded-2xl border border-[var(--lavender)]/35 bg-gradient-to-br from-white/80 to-[var(--lavender)]/[0.08] px-6 py-8 text-center shadow-sm backdrop-blur-sm">
      <p className="font-heading text-lg font-semibold text-[var(--navy)]">
        Unlock to see {hiddenCount} more{" "}
        {hiddenCount === 1 ? "thread" : "threads"}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Purchase the course to read and join the full community feed.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={joinHref}
          className="inline-flex rounded-full bg-[var(--navy)] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
        >
          {joinLabel}
        </Link>
        {showDemo ? (
          <button
            type="button"
            onClick={() => void mockUnlock()}
            className="text-xs font-medium text-slate-500 underline decoration-slate-400 underline-offset-2 hover:text-slate-700"
          >
            Demo: unlock {communitySlug ? "this community" : "full feed"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
