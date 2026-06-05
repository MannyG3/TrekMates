"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Route, TrendingUp, Star } from "lucide-react";
import {
  type Trail,
  DIFFICULTY_LABELS,
  DIFFICULTY_SHORT,
} from "@/types";
import {
  difficultyBgStyle,
  estimateElevationGain,
} from "@/lib/trail-utils";

interface TrailCardProps {
  trail: Trail;
  compact?: boolean;
}

export function TrailCard({ trail, compact = false }: TrailCardProps) {
  const elevation = estimateElevationGain(trail);
  const imageHeight = compact ? "h-32" : "h-48";

  return (
    <Link href={`/trails/${trail.id}`} className="block h-full">
      <motion.article
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="group card-surface h-full cursor-pointer overflow-hidden transition-colors hover:border-sage-500/20"
      >
        <div className={`relative ${imageHeight} w-full bg-night-700`}>
          {trail.cover_image_url ? (
            <Image
              src={trail.cover_image_url}
              alt={trail.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-night-700">
              <TrendingUp className="text-sage-500/30" size={40} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
          <span
            className="label-caps absolute bottom-3 left-3 rounded-sm px-2.5 py-1 font-medium"
            style={difficultyBgStyle(trail.difficulty)}
          >
            {DIFFICULTY_SHORT[trail.difficulty]}
          </span>
        </div>

        <div className={compact ? "p-3" : "p-4"}>
          <h3
            className={`font-serif text-stone-100 transition-colors group-hover:text-sage-400 line-clamp-1 ${
              compact ? "text-base" : "text-lg"
            }`}
          >
            {trail.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-stone-400">
            {trail.region}
          </p>

          <div className="mt-2 flex gap-4 text-sm font-mono text-stone-300">
            <span className="flex items-center gap-1.5">
              <Route size={14} className="text-stone-400" />
              {trail.distance_km} km
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-stone-400" />
              {elevation} m
            </span>
          </div>

          {!compact && (
            <div className="mt-3 flex items-center gap-1.5 text-sage-500">
              <Star size={14} fill="currentColor" strokeWidth={0} />
              <span className="text-sm font-mono">{trail.avg_rating.toFixed(1)}</span>
              <span className="text-xs text-stone-400">
                · {trail.review_count} reviews
              </span>
            </div>
          )}

          {compact && (
            <p className="mt-1 text-[10px] uppercase tracking-wider text-stone-400">
              {DIFFICULTY_LABELS[trail.difficulty]}
            </p>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
