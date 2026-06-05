"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface MountainSilhouetteProps {
  className?: string;
  parallax?: boolean;
}

export function MountainSilhouette({
  className = "",
  parallax = false,
}: MountainSilhouetteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const layers = [
    { d: "M0 320 L120 180 L280 260 L420 140 L600 220 L800 100 L1000 200 L1200 80 L1440 160 L1440 400 L0 400 Z", opacity: 0.1 },
    { d: "M0 360 L200 240 L380 300 L560 200 L760 280 L960 160 L1200 240 L1440 180 L1440 400 L0 400 Z", opacity: 0.15 },
    { d: "M0 380 L160 300 L340 340 L520 260 L700 320 L900 220 L1100 300 L1440 260 L1440 400 L0 400 Z", opacity: 0.2 },
  ];

  const svg = (
    <svg
      viewBox="0 0 1440 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      {layers.map((layer, i) => (
        <path
          key={i}
          d={layer.d}
          fill="#7EC8A4"
          fillOpacity={layer.opacity}
        />
      ))}
    </svg>
  );

  if (parallax) {
    return (
      <div ref={ref} className={`pointer-events-none ${className}`}>
        <motion.div style={{ y }}>{svg}</motion.div>
      </div>
    );
  }

  return <div className={`pointer-events-none ${className}`}>{svg}</div>;
}
