"use client";

import { useMemo, useState } from "react";
import { TrailCard } from "@/components/trail/TrailCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Trail } from "@/types";

interface TrailsExplorerProps {
  trails: Trail[];
  regions: string[];
}

export function TrailsExplorer({ trails, regions }: TrailsExplorerProps) {
  const [activeRegion, setActiveRegion] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeRegion === "All") return trails;
    return trails.filter((t) => t.region === activeRegion);
  }, [trails, activeRegion]);

  return (
    <div>
      <p className="overline mb-3">Explore</p>
      <h1 className="font-serif text-3xl text-stone-100">Trails</h1>
      <p className="mt-2 text-stone-400">
        {trails.length} routes across {regions.length} regions in India
      </p>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveRegion("All")}
          className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
            activeRegion === "All"
              ? "border border-sage-500/20 bg-sage-800/40 text-sage-500"
              : "bg-night-800 text-stone-400 hover:text-stone-200"
          }`}
        >
          All regions
        </button>
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
              activeRegion === region
                ? "border border-sage-500/20 bg-sage-800/40 text-sage-500"
                : "bg-night-800 text-stone-400 hover:text-stone-200"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {filtered.map((trail) => (
          <TrailCard key={trail.id} trail={trail} />
        ))}
      </div>

      {filtered.length === 0 && (
        <EmptyState
          heading="The trail is clear — nothing here yet"
          subtext="No trails match this region. Try another filter or check back as the community adds more routes."
          ctaLabel="View all trails"
          onCta={() => setActiveRegion("All")}
        />
      )}
    </div>
  );
}
