"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Clapperboard,
  Coffee,
  Heart,
  LayoutGrid,
  Music2,
  Palette,
  PartyPopper,
  PenLine,
  Sparkles,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CommunityCard } from "@/components/forum";
import { getForumRepository } from "@/data/forum";
import type { ExploreCategory } from "@/domain/forum";
import { EXPLORE_PAGE_SIZE } from "@/domain/forum";
import { cn } from "@/lib/utils";

const forum = getForumRepository();
const communities = forum.listCommunities();
const exploreCategories = forum.getExploreCategories();

const CATEGORY_ICON: Record<ExploreCategory, LucideIcon> = {
  Art: Palette,
  "Body And Mind": Heart,
  Craft: Sparkles,
  Dance: PartyPopper,
  Illustration: PenLine,
  Lifestyle: Coffee,
  Music: Music2,
  Photography: Camera,
  Videography: Clapperboard,
};

export function ExploreCommunitiesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<ExploreCategory[]>([]);

  const filtered = useMemo(() => {
    if (selectedCategories.length === 0) return communities;
    const set = new Set(selectedCategories);
    return communities.filter((c) => c.category && set.has(c.category as ExploreCategory));
  }, [selectedCategories]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / EXPLORE_PAGE_SIZE));
  const rawPage = Number.parseInt(searchParams.get("page") || "1", 10);
  const page =
    Number.isFinite(rawPage) && rawPage >= 1
      ? Math.min(rawPage, totalPages)
      : 1;

  const pageItems = useMemo(
    () => filtered.slice((page - 1) * EXPLORE_PAGE_SIZE, page * EXPLORE_PAGE_SIZE),
    [filtered, page],
  );

  useEffect(() => {
    // #region agent log
    void fetch("/api/debug-e53ead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hypothesisId: "H4",
        location: "explore-communities-content.tsx:pagination",
        message: "explore slice",
        data: {
          filteredLen: filtered.length,
          totalPages,
          rawPage,
          clampedPage: page,
          pageItemsLen: pageItems.length,
          pageSize: EXPLORE_PAGE_SIZE,
        },
        timestamp: Date.now(),
        sessionId: "e53ead",
      }),
    }).catch(() => {});
    // #endregion
  }, [filtered.length, page, pageItems.length, rawPage, totalPages]);

  const prevFilterSig = useRef<string | null>(null);
  const filterSig = [...selectedCategories].sort().join("\0");
  useEffect(() => {
    if (prevFilterSig.current === null) {
      prevFilterSig.current = filterSig;
      return;
    }
    if (prevFilterSig.current === filterSig) return;
    prevFilterSig.current = filterSig;
    const sp = new URLSearchParams(searchParams.toString());
    sp.delete("page");
    const q = sp.toString();
    router.replace(q ? `${pathname}?${q}` : pathname);
  }, [filterSig, pathname, router, searchParams]);

  const setPage = (next: number) => {
    const clamped = Math.min(Math.max(1, next), totalPages);
    const sp = new URLSearchParams(searchParams.toString());
    if (clamped <= 1) sp.delete("page");
    else sp.set("page", String(clamped));
    const q = sp.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
  };

  const clearFilters = () => setSelectedCategories([]);

  const toggleCategory = (cat: ExploreCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const from = filtered.length === 0 ? 0 : (page - 1) * EXPLORE_PAGE_SIZE + 1;
  const to = Math.min(page * EXPLORE_PAGE_SIZE, filtered.length);

  return (
    <div className="min-w-0">
      <header className="border-b border-white/40 pb-6 md:pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Discover
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Communities
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          Join a space that matches your practice — tap one or more topics to narrow the list, then open a community.
        </p>
      </header>

      <section
        className="sticky top-[var(--forum-sticky-top)] z-30 mt-6 rounded-3xl border border-white/55 bg-gradient-to-r from-white/50 via-white/40 to-white/35 p-4 shadow-[0_12px_40px_rgba(16,59,107,0.07),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-2xl backdrop-saturate-150 md:mt-8 md:p-5"
        aria-label="Filter by topic"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex shrink-0 items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--navy)]/12 to-[var(--lavender)]/18 text-[var(--navy)] ring-1 ring-white/60">
              <Sparkles className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Browse by focus
              </p>
              <p className="text-xs text-slate-600">
                Tap topics to add or remove —{" "}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-semibold text-[var(--navy)] underline decoration-[var(--navy)]/30 underline-offset-2 hover:decoration-[var(--navy)]"
                >
                  show all
                </button>
              </p>
            </div>
          </div>
          {selectedCategories.length > 0 ? (
            <button
              type="button"
              onClick={clearFilters}
              className="shrink-0 self-start rounded-full border border-white/60 bg-white/55 px-4 py-1.5 text-xs font-semibold text-[var(--navy)] shadow-sm backdrop-blur-sm transition hover:bg-white/85 sm:self-center"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        <div
          className="mt-4 flex gap-2 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:thin] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300/80 [&::-webkit-scrollbar-track]:bg-transparent"
          role="group"
        >
          <TopicChip
            icon={LayoutGrid}
            label="All"
            count={communities.length}
            active={selectedCategories.length === 0}
            onClick={clearFilters}
          />
          {exploreCategories.map((cat) => {
            const Icon = CATEGORY_ICON[cat];
            const count = communities.filter((c) => c.category === cat).length;
            return (
              <TopicChip
                key={cat}
                icon={Icon}
                label={cat}
                count={count}
                active={selectedCategories.includes(cat)}
                onClick={() => toggleCategory(cat)}
              />
            );
          })}
        </div>
      </section>

      <div className="mt-8 min-w-0 md:mt-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-800">
              {selectedCategories.length === 0
                ? "All topics"
                : selectedCategories.join(" · ")}
            </p>
            <p className="text-xs text-slate-500">
              Showing {filtered.length}{" "}
              {filtered.length === 1 ? "community" : "communities"}
              {filtered.length > 0 ? (
                <>
                  {" "}
                  · {from}–{to} on this page
                </>
              ) : null}
              {selectedCategories.length > 1 ? " (any of the selected focuses)" : null}
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
          {pageItems.map((c) => (
            <li key={c.id} className="flex min-h-0 min-w-0">
              <CommunityCard community={c} />
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-slate-200/80 bg-white/40 px-6 py-10 text-center text-sm text-slate-600 backdrop-blur-sm">
            No communities match these focuses yet. Adjust your selection or show all.
          </p>
        ) : null}

        {totalPages > 1 ? (
          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-white/40 pt-8"
            aria-label="Pagination"
          >
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm tabular-nums text-slate-600">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </nav>
        ) : null}
      </div>
    </div>
  );
}

function TopicChip({
  icon: Icon,
  label,
  count,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 text-left shadow-sm backdrop-blur-sm transition md:px-4",
        active
          ? "border-[var(--navy)]/30 bg-[var(--navy)] text-white shadow-md ring-1 ring-white/20"
          : "border-white/60 bg-white/45 text-slate-800 hover:border-[var(--lavender)]/45 hover:bg-white/70",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg border shadow-inner",
          active
            ? "border-white/25 bg-white/15 text-white"
            : "border-white/55 bg-white/70 text-[var(--navy)]",
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="max-w-[10rem] truncate text-sm font-semibold leading-none md:max-w-[12rem]">
          {label}
        </span>
        <span
          className={cn(
            "text-[11px] font-medium tabular-nums",
            active ? "text-white/85" : "text-slate-500",
          )}
        >
          {count} {count === 1 ? "space" : "spaces"}
        </span>
      </span>
    </button>
  );
}
