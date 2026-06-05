"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useSession } from "@/components/providers/SessionProvider";
import { type BuddyRequestWithJoins } from "@/types";

interface BuddyCardProps {
  request: BuddyRequestWithJoins;
}

export function BuddyCard({ request }: BuddyCardProps) {
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const trekDate = new Date(request.trek_date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleJoin = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("buddy_responses")
      .insert({
        buddy_request_id: request.id,
        user_id: user.id,
      });

    setLoading(false);

    if (insertError) {
      if (insertError.code === "23505") {
        setError("You're already on this trek.");
        setJoined(true);
      } else {
        setError("Something went sideways — try again.");
      }
      return;
    }

    setJoined(true);
  };

  const isOwnRequest = user?.id === request.user_id;

  return (
    <article className="card-surface p-4">
      <div className="flex items-start gap-3">
        <Avatar
          src={request.profile.avatar_url}
          alt={request.profile.full_name || request.profile.username}
          size="md"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-stone-100">
            {request.profile.full_name || request.profile.username}
          </h3>
          <p className="text-sm text-stone-400">{request.trail.name}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-night-700 px-2.5 py-1 font-mono text-[11px] text-stone-300">
              {trekDate}
            </span>
            <span className="text-xs text-stone-400">
              {request.group_size} spots open
            </span>
          </div>

          {request.description && (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-300">
              {request.description}
            </p>
          )}

          <div className="mt-4 flex items-center gap-3">
            {!isOwnRequest && user && (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="sage-outline"
                  size="sm"
                  onClick={handleJoin}
                  disabled={loading || joined}
                >
                  {joined ? "You're in ✓" : loading ? "Joining..." : "I'm in"}
                </Button>
              </motion.div>
            )}
            {!user && (
              <span className="text-xs text-stone-400">
                Log in to join this trek
              </span>
            )}
            {isOwnRequest && (
              <span className="label-caps text-sage-500">Your post</span>
            )}
          </div>

          {error && (
            <p className="mt-2 text-xs text-altitude-hard">{error}</p>
          )}
        </div>
      </div>
    </article>
  );
}
