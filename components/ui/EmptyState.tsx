import Link from "next/link";
import { MountainSilhouette } from "@/components/ui/MountainSilhouette";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  heading: string;
  subtext: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCta?: () => void;
}

export function EmptyState({
  heading,
  subtext,
  ctaLabel,
  ctaHref,
  onCta,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <MountainSilhouette className="w-[200px] opacity-20 mb-8" />
      <h3 className="font-serif text-xl text-stone-300">{heading}</h3>
      <p className="mt-2 max-w-sm text-sm text-stone-400">{subtext}</p>
      {ctaLabel && ctaHref && (
        <Link href={ctaHref} className="mt-6">
          <Button variant="primary">{ctaLabel}</Button>
        </Link>
      )}
      {ctaLabel && onCta && !ctaHref && (
        <Button variant="primary" className="mt-6" onClick={onCta}>
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
