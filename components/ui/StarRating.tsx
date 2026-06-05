import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
}: StarRatingProps) {
  const iconSize = size === "sm" ? 14 : 18;

  return (
    <div className="flex items-center gap-1.5 text-sage-500">
      <Star size={iconSize} fill="currentColor" strokeWidth={0} />
      <span className={`font-mono ${size === "sm" ? "text-sm" : "text-base"}`}>
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-stone-400 text-xs">
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
}
