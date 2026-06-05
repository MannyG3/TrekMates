"use client";

import { useMemo, useState } from "react";
import { BuddyCard } from "@/components/buddy/BuddyCard";
import { BuddyPostForm } from "@/components/buddy/BuddyPostForm";
import { EmptyState } from "@/components/ui/EmptyState";
import type { BuddyRequestWithJoins } from "@/types";
import { INDIAN_REGIONS } from "@/types";

type Tab = "find" | "post";

interface TrailOption {
  id: string;
  name: string;
  region: string;
}

interface BuddyFinderProps {
  initialRequests: BuddyRequestWithJoins[];
  trails: TrailOption[];
}

export function BuddyFinder({ initialRequests, trails }: BuddyFinderProps) {
  const [tab, setTab] = useState<Tab>("find");
  const [requests] = useState(initialRequests);
  const [trailFilter, setTrailFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (trailFilter && r.trail_id !== trailFilter) return false;
      if (regionFilter !== "All Regions" && r.trail.region !== regionFilter)
        return false;
      if (dateFrom && r.trek_date < dateFrom) return false;
      if (dateTo && r.trek_date > dateTo) return false;
      return true;
    });
  }, [requests, trailFilter, regionFilter, dateFrom, dateTo]);

  const handlePostSuccess = () => {
    setTab("find");
    window.location.reload();
  };

  return (
    <div>
      <p className="overline mb-3">Connect</p>
      <h1 className="mb-6 font-serif text-3xl text-stone-100">
        Find a Trek Buddy
      </h1>

      <div className="mb-6 flex gap-1 rounded-lg bg-night-800 p-1">
        {(["find", "post"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === t
                ? "bg-sage-800/30 text-sage-500"
                : "text-stone-400 hover:text-stone-100"
            }`}
          >
            {t === "find" ? "Find a buddy" : "Post a trek"}
          </button>
        ))}
      </div>

      {tab === "find" ? (
        <>
          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select
              value={trailFilter}
              onChange={(e) => setTrailFilter(e.target.value)}
              className="input-field"
            >
              <option value="" className="bg-night-800">
                All trails
              </option>
              {trails.map((t) => (
                <option key={t.id} value={t.id} className="bg-night-800">
                  {t.name}
                </option>
              ))}
            </select>

            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="input-field"
            >
              {INDIAN_REGIONS.map((r) => (
                <option key={r} value={r} className="bg-night-800">
                  {r}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="input-field"
            />

            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="space-y-4">
            {filtered.length === 0 ? (
              <EmptyState
                heading="The trail is clear — nothing here yet"
                subtext="No open buddy requests match your filters. Post your own trek and find companions."
                ctaLabel="Post a trek"
                onCta={() => setTab("post")}
              />
            ) : (
              filtered.map((request) => (
                <BuddyCard key={request.id} request={request} />
              ))
            )}
          </div>
        </>
      ) : (
        <div className="card-surface p-6">
          <h2 className="mb-4 font-serif text-lg text-stone-100">
            Post your upcoming trek
          </h2>
          <BuddyPostForm onSuccess={handlePostSuccess} />
        </div>
      )}
    </div>
  );
}
