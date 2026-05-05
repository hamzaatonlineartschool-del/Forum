import { cn } from "@/lib/utils";

type Props = {
  src: string;
  sizes: string;
  /** Outer frame: fixed max height so portrait assets letterbox instead of stretching */
  variant?: "feed" | "detail";
  className?: string;
};

const frameVariants = {
  feed: "h-[min(72vw,480px)] min-h-[200px] sm:min-h-[220px]",
  detail:
    "h-[min(85vh,680px)] min-h-[220px] sm:h-[min(80vw,640px)]",
} as const;

/**
 * Post hero media: preserves intrinsic aspect ratio (portrait vs landscape) inside a bounded frame.
 * Uses a plain `img` so `/forum/*` and remote URLs always render (avoids `next/image` optimizer edge cases on some hosts).
 */
export function PostBodyImage({
  src,
  sizes,
  variant = "feed",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-slate-100/80 ring-1 ring-slate-200/40",
        frameVariants[variant],
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- predictable rendering for mock/local assets */}
      <img
        src={src}
        alt=""
        sizes={sizes}
        loading={variant === "detail" ? "eager" : "lazy"}
        fetchPriority={variant === "detail" ? "high" : undefined}
        decoding={variant === "detail" ? "sync" : "async"}
        className="absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </div>
  );
}
