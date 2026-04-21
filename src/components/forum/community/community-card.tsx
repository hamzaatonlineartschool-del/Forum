import Image from "next/image";
import Link from "next/link";
import { Globe, Lock, Users } from "lucide-react";
import { formatCommunityDisplayName, shouldShowCommunityMemberCount } from "@/domain/forum";
import { cn } from "@/lib/utils";
import type { Community } from "@/types/forum";

type Props = { community: Community };

export function CommunityCard({ community }: Props) {
  const title = formatCommunityDisplayName(community);
  const showMembers = shouldShowCommunityMemberCount(community.memberCount);
  const membersLabel = `${community.memberCount.toLocaleString()} members`;
  const accessLabel = community.studentsOnly ? "Students only" : "Public";
  const ariaLabel = showMembers
    ? `${title}, ${membersLabel}, ${accessLabel}`
    : `${title}, ${accessLabel}`;

  return (
    <Link
      href={`/forum/c/${community.slug}`}
      title={title}
      aria-label={ariaLabel}
      className="group flex h-full min-h-0 w-full min-w-0 flex-col rounded-2xl border border-white/50 bg-white/55 p-4 shadow-sm backdrop-blur-sm transition hover:border-[var(--lavender)]/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--navy)] md:p-5"
    >
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex min-w-0 gap-3">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-slate-200/90 ring-1 ring-white/80 shadow-inner md:size-16">
            {community.imageUrl ? (
              <Image
                src={community.imageUrl}
                alt=""
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 56px, 64px"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-sm font-medium text-slate-500">
                ?
              </div>
            )}
          </div>
          <h3 className="font-heading min-w-0 flex-1 self-center text-left text-base font-bold leading-snug tracking-tight text-[var(--navy)] md:text-lg">
            <span className="line-clamp-2 break-words group-hover:underline decoration-[var(--navy)]/25 underline-offset-2">
              {title}
            </span>
          </h3>
        </div>

        <div
          className={cn(
            "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5",
            showMembers ? "justify-between" : "justify-end",
          )}
        >
          {showMembers ? (
            <p className="inline-flex items-center gap-1 text-xs font-medium tabular-nums text-slate-600">
              <Users className="size-3.5 shrink-0 text-slate-400" aria-hidden />
              <span>{membersLabel}</span>
            </p>
          ) : null}
          {community.studentsOnly ? (
            <span className="inline-flex max-w-[11rem] items-center justify-end gap-1 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/20 px-2.5 py-1 text-[11px] font-semibold leading-none text-[var(--navy)]">
              <Lock className="size-3 shrink-0 opacity-90" aria-hidden />
              Students only
            </span>
          ) : (
            <span className="inline-flex max-w-[11rem] items-center justify-end gap-1 rounded-full border border-slate-200/90 bg-white/80 px-2.5 py-1 text-[11px] font-semibold leading-none text-slate-700 shadow-sm">
              <Globe className="size-3 shrink-0 text-slate-500" aria-hidden />
              Public
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 line-clamp-4 text-left text-sm leading-relaxed text-slate-600 md:mt-4">
        {community.description}
      </p>
    </Link>
  );
}
