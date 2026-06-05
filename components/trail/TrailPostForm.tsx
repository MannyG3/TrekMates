"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useSession } from "@/components/providers/SessionProvider";

interface TrailPostFormProps {
  trailId: string;
  onSuccess?: () => void;
}

export function TrailPostForm({ trailId, onSuccess }: TrailPostFormProps) {
  const { user } = useSession();
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);
  const [visitedOn, setVisitedOn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase.from("trail_posts").insert({
      user_id: user.id,
      trail_id: trailId,
      body,
      rating,
      visited_on: visitedOn || null,
    });

    setLoading(false);

    if (insertError) {
      setError("Something went sideways — try again.");
      return;
    }

    setBody("");
    setRating(5);
    setVisitedOn("");
    onSuccess?.();
  };

  if (!user) {
    return (
      <p className="text-sm text-stone-400">
        Log in to share your trek experience.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-caps mb-1 block text-stone-400">
          Your experience
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={4}
          placeholder="Trail conditions, highlights, and tips for fellow trekkers..."
          className="input-field resize-none"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="label-caps mb-1 block text-stone-400">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="input-field"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r} className="bg-night-800">
                {r} ★
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="label-caps mb-1 block text-stone-400">
            Visited on
          </label>
          <input
            type="date"
            value={visitedOn}
            onChange={(e) => setVisitedOn(e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      {error && <p className="text-sm text-altitude-hard">{error}</p>}

      <Button type="submit" disabled={loading || !body.trim()}>
        {loading ? "Posting..." : "Post to trail"}
      </Button>
    </form>
  );
}
