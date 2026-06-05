import { type HTMLAttributes } from "react";

type BadgeVariant = "default" | "region" | "sage" | "pro";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-night-700 text-stone-400",
  region: "bg-sage-800/40 text-sage-500 border border-sage-500/20",
  sage: "bg-sage-800/30 text-sage-500",
  pro: "bg-sage-800/50 text-sage-400 border border-sage-500/30",
};

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`label-caps inline-flex items-center rounded-sm px-2.5 py-1 font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
