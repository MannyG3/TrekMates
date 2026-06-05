"use client";

import { useMemo, useState } from "react";
import { ForumThread } from "@/components/forum/ForumThread";
import { EmptyState } from "@/components/ui/EmptyState";
import type { ForumThreadWithProfile } from "@/types";

interface ForumExplorerProps {
  threads: ForumThreadWithProfile[];
}

export function ForumExplorer({ threads }: ForumExplorerProps) {
  const [activeRegion, setActiveRegion] = useState("All Regions");

  const regions = useMemo(() => {
    const fromThreads = Array.from(new Set(threads.map((t) => t.region)));
    return ["All Regions", ...fromThreads.sort()];
  }, [threads]);

  const filtered = useMemo(() => {
    if (activeRegion === "All Regions") return threads;
    return threads.filter((t) => t.region === activeRegion);
  }, [threads, activeRegion]);

  return (
    <div>
      <p className="overline mb-3">Discuss</p>
      <h1 className="font-serif text-3xl text-stone-100">Forum</h1>
      <p className="mt-2 text-stone-400">
        Trail conditions, permits, and local wisdom — by region
      </p>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
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

      <div className="mt-6 space-y-3">
        {filtered.map((thread) => (
          <ForumThread key={thread.id} thread={thread} />
        ))}
      </div>

      {filtered.length === 0 && (
        <EmptyState
          heading="The trail is clear — nothing here yet"
          subtext="No discussions in this region. Start a conversation about trail conditions or local tips."
        />
      )}
    </div>
  );
}
