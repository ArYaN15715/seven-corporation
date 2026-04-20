import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  lines?: number;
}

export function SkeletonCard({
  className,
  showImage = true,
  lines = 3,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card overflow-hidden",
        className,
      )}
    >
      {showImage && <div className="h-44 w-full shimmer" />}
      <div className="p-5 space-y-3">
        <div className="h-3 w-16 rounded shimmer" />
        <div className="h-5 w-3/4 rounded shimmer" />
        <div className="h-3 w-full rounded shimmer" />
        {lines > 1 && <div className="h-3 w-full rounded shimmer" />}
        {lines > 2 && <div className="h-3 w-1/2 rounded shimmer" />}
        <div className="flex gap-3 mt-4 pt-3 border-t border-border">
          <div className="h-4 w-20 rounded shimmer" />
          <div className="h-4 w-20 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}

const CARD_IDS = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  const ids = CARD_IDS.slice(0, Math.min(count, 8));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {ids.map((id) => (
        <SkeletonCard key={`skeleton-${id}`} />
      ))}
    </div>
  );
}
