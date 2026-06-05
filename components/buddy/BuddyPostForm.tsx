"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useSession } from "@/components/providers/SessionProvider";
import type { Trail } from "@/types";

interface BuddyPostFormProps {
  onSuccess?: () => void;
}

export function BuddyPostForm({ onSuccess }: BuddyPostFormProps) {
  const { user } = useSession();
  const [trails, setTrails] = useState<Trail[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [trekDate, setTrekDate] = useState("");
  const [groupSize, setGroupSize] = useState(2);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchTrails = async () => {
      const { data } = await supabase
        .from("trails")
        .select("*")
        .order("name");
      if (data) setTrails(data);
    };
    fetchTrails();
  }, [supabase]);

  const filteredTrails = trails.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.region.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedTrail) return;

    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("buddy_requests")
      .insert({
        user_id: user.id,
        trail_id: selectedTrail.id,
        trek_date: trekDate,
        group_size: groupSize,
        description: description || null,
      });

    setLoading(false);

    if (insertError) {
      setError("Something went sideways — try again.");
      return;
    }

    setSearch("");
    setSelectedTrail(null);
    setTrekDate("");
    setGroupSize(2);
    setDescription("");
    onSuccess?.();
  };

  if (!user) {
    return (
      <p className="text-sm text-stone-400">
        Log in to post a trek and find buddies.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <label className="label-caps mb-1 block text-stone-400">Trail</label>
        <input
          type="text"
          value={selectedTrail ? selectedTrail.name : search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedTrail(null);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search trails — Kedarkantha, Hampta Pass..."
          required
          className="input-field"
        />
        {showSuggestions && !selectedTrail && search && (
          <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-stone-100/10 bg-night-800 shadow-xl">
            {filteredTrails.length === 0 ? (
              <li className="px-3 py-2 text-sm text-stone-400">
                No trails found
              </li>
            ) : (
              filteredTrails.slice(0, 8).map((trail) => (
                <li key={trail.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTrail(trail);
                      setSearch(trail.name);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-stone-200 hover:bg-night-700"
                  >
                    <span className="font-medium">{trail.name}</span>
                    <span className="ml-2 text-stone-400">{trail.region}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="label-caps mb-1 block text-stone-400">
            Trek date
          </label>
          <input
            type="date"
            value={trekDate}
            onChange={(e) => setTrekDate(e.target.value)}
            required
            min={new Date().toISOString().split("T")[0]}
            className="input-field"
          />
        </div>
        <div className="w-32">
          <label className="label-caps mb-1 block text-stone-400">
            Group size
          </label>
          <input
            type="number"
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            min={2}
            max={20}
            required
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="label-caps mb-1 block text-stone-400">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Pace, fitness level, gear requirements, meeting point..."
          className="input-field resize-none"
        />
      </div>

      {error && <p className="text-sm text-altitude-hard">{error}</p>}

      <Button
        type="submit"
        disabled={loading || !selectedTrail || !trekDate}
      >
        {loading ? "Posting..." : "Post to trail"}
      </Button>
    </form>
  );
}
