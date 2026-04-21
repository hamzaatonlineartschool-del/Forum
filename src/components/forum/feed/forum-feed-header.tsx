"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { FeedSort } from "@/domain/forum";
import { cn } from "@/lib/utils";
import { AddPostDialog } from "../dialogs/add-post-dialog";

const SORT_LABELS: Record<FeedSort, string> = {
  newest: "Newest",
  oldest: "Oldest",
  liked: "Most liked",
};

const SORT_OPTIONS: readonly FeedSort[] = ["newest", "oldest", "liked"];

type Props = {
  title: string;
  sortable?: boolean;
  currentSort?: FeedSort;
};

export function ForumFeedHeader({
  title,
  sortable,
  currentSort = "newest",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const navigateToSort = (next: FeedSort) => {
    // #region agent log
    void fetch("/api/debug-e53ead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hypothesisId: "H5",
        location: "forum-feed-header.tsx:navigateToSort",
        message: "sort nav",
        data: { pathname, next },
        sessionId: "e53ead",
      }),
    }).catch(() => {});
    // #endregion
    if (next === "newest") {
      router.push(pathname);
    } else {
      router.push(`${pathname}?sort=${next}`);
    }
  };

  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h1>
      <div className="flex items-center gap-3">
        {sortable ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
              >
                {SORT_LABELS[currentSort]}
                <ChevronDown className="size-4 shrink-0 opacity-60" aria-hidden />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-[200] min-w-[180px] rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
                sideOffset={4}
                align="end"
              >
                {SORT_OPTIONS.map((key) => (
                  <DropdownMenu.Item
                    key={key}
                    className={cn(
                      "cursor-pointer rounded-lg px-3 py-2 text-sm outline-none hover:bg-slate-100",
                      currentSort === key &&
                        "bg-slate-50 font-medium text-[var(--navy)]",
                    )}
                    onSelect={() => navigateToSort(key)}
                  >
                    {SORT_LABELS[key]}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : null}
        <AddPostDialog
          triggerClassName="rounded-full bg-[var(--navy)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--navy)]/15 transition hover:brightness-110"
          triggerLabel="+ Post"
        />
      </div>
    </div>
  );
}
