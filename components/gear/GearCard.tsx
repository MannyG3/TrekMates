"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { GearListingWithProfile } from "@/types";

interface GearCardProps {
  listing: GearListingWithProfile;
}

export function GearCard({ listing }: GearCardProps) {
  const photo = listing.photos?.[0];

  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="card-surface overflow-hidden"
    >
      <div className="relative h-36 w-full bg-night-700">
        {photo ? (
          <Image
            src={photo}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-400">
            <span className="text-3xl opacity-30">🎒</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <span className="label-caps rounded-sm bg-night-700 px-2 py-1 text-stone-400">
          {listing.category}
        </span>
        <h3 className="mt-2 text-sm font-medium text-stone-100">
          {listing.title}
        </h3>

        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-mono text-lg text-sage-500">
            ₹{listing.daily_rate}
          </span>
          <span className="text-xs text-stone-400">/day</span>
        </div>

        {listing.location && (
          <p className="mt-2 flex items-center gap-1 text-xs text-stone-400">
            <MapPin size={12} />
            {listing.location}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2 border-t border-stone-100/[0.08] pt-3">
          <Link
            href={`/profile/${listing.profile.username}`}
            className="text-xs text-stone-400 transition-colors hover:text-sage-400"
          >
            {listing.profile.full_name || listing.profile.username}
          </Link>
          {listing.deposit > 0 && (
            <span className="text-xs text-stone-400">
              · ₹{listing.deposit} deposit
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
