import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-20 w-20 text-base",
  xl: "h-20 w-20 text-lg",
};

const sizePx = {
  sm: 32,
  md: 44,
  lg: 80,
  xl: 80,
};

export function Avatar({ src, alt, size = "md", className = "" }: AvatarProps) {
  const initials = alt
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={sizePx[size]}
        height={sizePx[size]}
        className={`rounded-full object-cover ring-1 ring-stone-100/10 ${sizeClasses[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-sage-800 font-medium text-sage-500 ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  );
}
