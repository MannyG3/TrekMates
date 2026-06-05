import { type HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`card-surface ${hover ? "transition-colors hover:border-sage-500/20" : ""} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
