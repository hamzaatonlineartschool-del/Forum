import Image from "next/image";
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
 */
export function PostBodyImage({ src, sizes, variant = "feed", className }: Props) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-slate-100/80 ring-1 ring-slate-200/40",
        frameVariants[variant],
        className,
      )}
    >
      <Image src={src} alt="" fill className="object-contain" sizes={sizes} priority={variant === "detail"} />
    </div>
  );
}
