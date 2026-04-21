import { cn } from "@/lib/utils";

type Props = { className?: string };

export function CommunityRulesPanel({ className }: Props) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white/40 p-4 text-slate-600 backdrop-blur-sm",
        className,
      )}
    >
      <h2 className="text-sm font-semibold tracking-tight text-[var(--navy)]">
        Community Rules
      </h2>
      <ul className="mt-2 list-inside list-disc space-y-0.5 text-xs leading-relaxed">
        <li>Be kind and respectful</li>
        <li>Keep content appropriate for all ages</li>
        <li>No spam or unsolicited advertising</li>
      </ul>
    </aside>
  );
}
