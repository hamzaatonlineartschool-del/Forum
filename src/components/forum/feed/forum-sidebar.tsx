"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, Home, LayoutGrid, LifeBuoy, Podcast, User } from "lucide-react";
import { getForumRepository } from "@/data/forum";
import { formatCommunityNavLabel } from "@/domain/forum";
import type { Community } from "@/types/forum";
import { cn } from "@/lib/utils";

const primary = [
  { href: "/forum", label: "My Feed", icon: Home },
  { href: "/forum/saved", label: "Saved Posts", icon: LayoutGrid },
  { href: "/forum/explore", label: "Explore communities", icon: Compass },
  { href: "/forum/my-posts", label: "My posts", icon: User },
] as const;

const resources = [
  { href: "/about", label: "Support", icon: LifeBuoy },
  { href: "/about", label: "Podcast", icon: Podcast },
  { href: "/about", label: "Blog", icon: BookOpen },
] as const;

/** Toggle public community list + Create Community CTA in the sidebar. */
const SHOW_PUBLIC_COMMUNITIES = false;

function CommunitySidebarRow({
  community,
  pathname,
}: {
  community: Community;
  pathname: string;
}) {
  const href = `/forum/c/${community.slug}`;
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group flex items-center gap-2.5 rounded-xl px-2 py-2 text-sm text-slate-700 transition",
          "hover:bg-white/60",
          active &&
            "bg-white/90 font-medium text-[var(--navy)] shadow-sm ring-1 ring-white/90",
        )}
      >
        <span className="relative size-7 shrink-0 overflow-hidden rounded-full bg-slate-200/80 ring-2 ring-white/90 shadow-sm">
          {community.imageUrl ? (
            <Image
              src={community.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="28px"
            />
          ) : (
            <span className="flex size-full items-center justify-center text-[10px] font-semibold text-slate-500">
              ?
            </span>
          )}
        </span>
        <span className="min-w-0 flex-1 truncate leading-snug">
          {formatCommunityNavLabel(community)}
        </span>
      </Link>
    </li>
  );
}

export function ForumSidebar() {
  const pathname = usePathname();
  const communities = getForumRepository().listCommunities();
  const courseComms = communities.filter((c) => c.studentsOnly);

  return (
    <aside className="sticky top-[var(--forum-sticky-top)] z-20 hidden h-fit max-h-[calc(100vh-var(--forum-sticky-top)-0.75rem)] w-64 shrink-0 flex-col gap-7 overflow-y-auto overflow-x-hidden border-r border-white/40 bg-white/35 p-5 shadow-[inset_-1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-xl lg:flex">
      <nav className="space-y-1">
        {primary.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/forum"
              ? pathname === "/forum"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white/60",
                active && "bg-white/80 text-[var(--navy)] shadow-sm",
              )}
            >
              <Icon className="size-4 opacity-80" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200/60 pt-1">
        <p className="mb-2.5 px-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Course communities
        </p>
        <ul className="space-y-0.5">
          {courseComms.map((c) => (
            <CommunitySidebarRow key={c.id} community={c} pathname={pathname} />
          ))}
        </ul>
      </div>

      {SHOW_PUBLIC_COMMUNITIES ? (
        <>
          <div className="border-t border-slate-200/60 pt-1">
            <p className="mb-2.5 px-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Public communities
            </p>
            <ul className="space-y-0.5">
              {communities
                .filter((c) => !c.studentsOnly)
                .slice(0, 4)
                .map((c) => (
                  <CommunitySidebarRow key={c.id} community={c} pathname={pathname} />
                ))}
            </ul>
          </div>

          <Link
            href="/forum/create-community"
            className="rounded-full bg-[var(--navy)] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-[var(--navy)]/20 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--navy)]"
          >
            Create Community
          </Link>
        </>
      ) : null}

      <div className="mt-auto border-t border-slate-200/80 pt-4 text-xs text-slate-500">
        <p className="font-semibold uppercase tracking-wide">Resources</p>
        <div className="mt-2 flex flex-col gap-0.5">
          {resources.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-2 rounded-lg py-1.5 text-slate-600 transition hover:bg-white/50 hover:text-[var(--navy)]"
            >
              <Icon className="size-3.5 shrink-0 opacity-80" aria-hidden />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
