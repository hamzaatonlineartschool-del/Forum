import Image from "next/image";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { getForumRepository } from "@/data/forum";

const recommendedCourses = getForumRepository().listRecommendedCourses();

export function RecommendedCourses() {
  return (
    <aside className="flex w-full max-w-full flex-col gap-4">
      <div className="flex items-center gap-2 px-0.5">
        <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--navy)]/15 to-[var(--lavender)]/20 text-[var(--navy)] shadow-inner ring-1 ring-white/60">
          <Sparkles className="size-4" aria-hidden />
        </span>
        <div>
          <h2 className="font-heading text-sm font-bold tracking-tight text-slate-900">
            Recommended Courses
          </h2>
          <p className="text-[11px] font-medium text-slate-500">Hand-picked for OAS learners</p>
        </div>
      </div>

      <div className="max-h-[calc(100vh-var(--forum-sticky-top)-2rem)] overflow-y-auto rounded-3xl border border-white/55 bg-gradient-to-b from-white/50 via-white/35 to-white/25 p-3 shadow-[0_12px_48px_rgba(16,59,107,0.12),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-2xl backdrop-saturate-150 [scrollbar-width:thin]">
        <div className="space-y-3 pr-0.5">
          {recommendedCourses.map((c) => (
            <article
              key={c.id}
              className="group overflow-hidden rounded-2xl border border-white/50 bg-white/35 shadow-sm ring-1 ring-white/40 backdrop-blur-md transition hover:border-[var(--lavender)]/35 hover:bg-white/45 hover:shadow-md"
            >
              <div className="relative aspect-[5/3] w-full overflow-hidden">
                <Image
                  src={c.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1280px) 260px, 300px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--navy)]/25 via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-3.5">
                <h3 className="font-heading text-[15px] font-semibold leading-snug text-slate-900">
                  {c.title}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.instructorAvatar}
                    alt=""
                    className="size-7 rounded-full object-cover ring-2 ring-white/90 shadow-sm"
                  />
                  <span className="font-medium">By {c.instructor}</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                  {c.level} · {c.duration}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--navy)] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[color-mix(in_srgb,var(--navy)_92%,white)]"
                  >
                    <ShoppingBag className="size-4" />
                    {c.price}
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/60 bg-white/40 p-2.5 text-slate-600 shadow-sm backdrop-blur-sm transition hover:bg-white/70"
                    aria-label="Save course"
                  >
                    <Heart className="size-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
