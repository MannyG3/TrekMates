import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "ghost" | "danger" | "sage-outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-sage-500 text-night-950 font-medium hover:bg-sage-400 transition-colors",
  ghost:
    "border border-stone-100/20 text-stone-100 hover:bg-night-700 transition-colors",
  danger: "bg-altitude-hard/20 text-altitude-hard hover:bg-altitude-hard/30",
  "sage-outline":
    "border border-sage-500/30 text-sage-500 hover:bg-sage-800/30 transition-colors",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-md transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
