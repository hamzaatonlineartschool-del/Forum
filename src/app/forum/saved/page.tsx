import { Bookmark } from "lucide-react";
import { SavedPostsList } from "@/components/forum";

export default function SavedPostsPage() {
  return (
    <div>
      <header className="border-b border-white/50 pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <span
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--navy)]/12 to-[var(--lavender)]/25 text-[var(--navy)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-white/70"
            aria-hidden
          >
            <Bookmark className="size-7" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Library
            </p>
            <h1 className="font-heading mt-1 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Saved posts
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              A compact reading list — stored in this browser until you connect Payload and
              accounts.
            </p>
          </div>
        </div>
      </header>
      <SavedPostsList />
    </div>
  );
}
