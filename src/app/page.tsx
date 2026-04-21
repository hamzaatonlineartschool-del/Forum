import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center">
      <p className="font-heading text-5xl font-semibold text-[var(--navy)] md:text-6xl">
        Forum
      </p>
      <p className="mt-4 text-2xl font-light text-slate-600">2026</p>
      <p className="mt-10 max-w-lg text-lg leading-relaxed text-slate-600">
        Premium community spaces for every course — explore discussions, share work, and learn
        with peers. Connect Payload when you&apos;re ready; the UI is built to match your OAS
        brand.
      </p>
      <Link
        href="/forum"
        className="mt-10 rounded-full bg-[var(--navy)] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--navy)]/20 transition hover:brightness-110"
      >
        Enter community
      </Link>
    </div>
  );
}
