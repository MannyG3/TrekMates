"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TrailPostForm } from "@/components/trail/TrailPostForm";
import { FeedPostCard } from "@/components/feed/FeedPostCard";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  DIFFICULTY_LABELS,
  DIFFICULTY_SHORT,
  type Trail,
  type TrailPostWithJoins,
} from "@/types";
import {
  difficultyBgStyle,
  estimateElevationGain,
} from "@/lib/trail-utils";

type Tab = "overview" | "reviews" | "gallery";

interface TrailDetailViewProps {
  trail: Trail;
  posts: TrailPostWithJoins[];
}

export function TrailDetailView({ trail, posts }: TrailDetailViewProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const elevation = estimateElevationGain(trail);
  const photos = posts.flatMap((p) => p.photos).filter(Boolean);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "reviews", label: "Reviews" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <div className="-mx-4 md:-mx-8">
      <div className="relative h-[50vh] w-full bg-night-800">
        {trail.cover_image_url ? (
          <Image
            src={trail.cover_image_url}
            alt={trail.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-night-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent" />

        <Link
          href="/trails"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-stone-100/20 bg-night-950/60 text-stone-100 backdrop-blur-sm transition-colors hover:bg-night-800"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
        </Link>

        <div className="absolute bottom-6 left-6 right-6">
          <span
            className="label-caps mb-3 inline-block rounded-sm px-2.5 py-1 font-medium"
            style={difficultyBgStyle(trail.difficulty)}
          >
            {DIFFICULTY_SHORT[trail.difficulty]} · {DIFFICULTY_LABELS[trail.difficulty]}
          </span>
          <h1 className="font-serif text-4xl text-stone-100">{trail.name}</h1>
          <p className="mt-1 text-sm uppercase tracking-wider text-stone-400">
            {trail.region}
          </p>
        </div>
      </div>

      <div className="bg-night-950 px-4 md:px-8">
        <div className="flex gap-8 border-b border-stone-100/[0.08] py-5">
          {[
            { value: `${trail.distance_km}`, label: "Kilometres" },
            { value: `${elevation}`, label: "Elevation gain" },
            { value: trail.avg_rating.toFixed(1), label: "Rating" },
            { value: trail.best_season || "Year-round", label: "Best season", mono: false },
          ].map((stat) => (
            <div key={stat.label}>
              <p className={`text-2xl text-stone-100 ${stat.mono !== false ? "font-mono" : "font-serif"}`}>
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-stone-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-6 border-b border-stone-100/[0.08]">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`py-4 text-sm transition-colors ${
                tab === t.id
                  ? "border-b-2 border-sage-500 text-sage-500"
                  : "text-stone-400 hover:text-stone-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === "overview" && (
            <div className="space-y-8">
              {trail.description && (
                <p className="max-w-2xl text-base font-light leading-relaxed text-stone-200">
                  {trail.description}
                </p>
              )}
              <div className="card-surface p-6">
                <h2 className="mb-4 font-serif text-lg text-stone-100">
                  Share your experience
                </h2>
                <TrailPostForm trailId={trail.id} />
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div className="space-y-4">
              {posts.length === 0 ? (
                <EmptyState
                  heading="No reviews on the map yet"
                  subtext={`Be the first to share your trek on ${trail.name}.`}
                />
              ) : (
                posts.map((post) => (
                  <FeedPostCard key={post.id} post={post} />
                ))
              )}
            </div>
          )}

          {tab === "gallery" && (
            <div>
              {photos.length === 0 ? (
                <EmptyState
                  heading="The gallery awaits"
                  subtext="Trail photos from trekkers will appear here after their first post."
                />
              ) : (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {photos.map((photo, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-xl bg-night-800"
                    >
                      <Image
                        src={photo}
                        alt={`${trail.name} photo ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
