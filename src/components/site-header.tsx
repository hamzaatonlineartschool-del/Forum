"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/forum/explore", label: "Explore" },
  { href: "/forum", label: "Community" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/25 bg-white/35 px-4 py-3 shadow-[0_8px_32px_rgba(26,54,93,0.08)] backdrop-blur-xl backdrop-saturate-150 md:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
        <Link
          href="/"
          className="relative flex h-10 max-w-[10rem] shrink-0 items-center md:h-11 md:max-w-[11rem]"
        >
          <Image
            src="/logo.svg"
            alt="OAS — Online Art School"
            width={355}
            height={186}
            className="h-10 w-auto object-contain object-left md:h-11"
            priority
          />
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <div className="flex w-full max-w-3xl items-center gap-1 rounded-full border border-white/40 bg-white/45 px-2 py-1.5 shadow-sm backdrop-blur-md">
            <nav className="flex shrink-0 items-center gap-1 pl-2">
              {nav.map((item) => {
                const forumActive =
                  item.href === "/forum" && pathname.startsWith("/forum");
                const exactActive =
                  item.href !== "/forum" &&
                  (item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`));
                const active = forumActive || exactActive;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-3 py-2 text-sm font-medium text-[var(--navy)] transition-colors",
                      active && "bg-[var(--navy)] text-white shadow-sm",
                      !active && "hover:bg-white/50",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="relative mx-2 min-w-0 flex-1">
              <input
                type="search"
                placeholder="What do you want to learn?"
                className="w-full rounded-full border border-slate-200/80 bg-white/70 py-2.5 pl-4 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[var(--sky)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--sky)]/30"
                aria-label="Search"
              />
              <Search
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/login"
            className="rounded-full bg-[var(--lavender)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--navy)] shadow-sm transition hover:brightness-105"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Mobile nav + search */}
      <div className="mt-3 space-y-2 md:hidden">
        <div className="flex flex-wrap gap-1 rounded-full border border-white/40 bg-white/45 p-1 backdrop-blur-md">
          {nav.map((item) => {
            const forumActive =
              item.href === "/forum" && pathname.startsWith("/forum");
            const exactActive =
              item.href !== "/forum" &&
              (item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`));
            const active = forumActive || exactActive;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-xs font-medium text-[var(--navy)]",
                  active && "bg-[var(--navy)] text-white",
                  !active && "hover:bg-white/50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="relative">
          <input
            type="search"
            placeholder="What do you want to learn?"
            className="w-full rounded-full border border-slate-200/80 bg-white/70 py-2.5 pl-4 pr-10 text-sm focus:border-[var(--sky)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--sky)]/30"
          />
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
