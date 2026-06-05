"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FeedPostCard } from "@/components/feed/FeedPostCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { TrailCardSkeleton } from "@/components/ui/Skeleton";
import type { TrailPostWithJoins } from "@/types";
import { INDIAN_REGIONS } from "@/types";

const PAGE_SIZE = 10;

interface FeedListProps {
  initialPosts: TrailPostWithJoins[];
  initialRegion: string;
}

export function FeedList({ initialPosts, initialRegion }: FeedListProps) {
  const [posts, setPosts] = useState<TrailPostWithJoins[]>(initialPosts);
  const [region, setRegion] = useState(initialRegion);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length === PAGE_SIZE);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const fetchPosts = useCallback(
    async (pageNum: number, regionFilter: string, reset = false) => {
      setLoading(true);

      const from = pageNum * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const selectQuery =
        regionFilter && regionFilter !== "All Regions"
          ? `
          *,
          profile:profiles(*),
          trail:trails!inner(*)
        `
          : `
          *,
          profile:profiles(*),
          trail:trails(*)
        `;

      let query = supabase
        .from("trail_posts")
        .select(selectQuery)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (regionFilter && regionFilter !== "All Regions") {
        query = query.eq("trail.region", regionFilter);
      }

      const { data, error } = await query;

      setLoading(false);

      if (error || !data) return;

      const newPosts = data as unknown as TrailPostWithJoins[];

      if (reset) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setHasMore(newPosts.length === PAGE_SIZE);
    },
    [supabase]
  );

  const handleRegionChange = async (newRegion: string) => {
    setRegion(newRegion);
    setPage(0);
    await fetchPosts(0, newRegion, true);
    setPage(1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchPosts(nextPage, region);
        }
      },
      { threshold: 0.1 }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loading, page, region, fetchPosts]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="overline mb-1">Community</p>
          <h2 className="font-serif text-2xl text-stone-100">Trail Feed</h2>
        </div>
        <select
          value={region}
          onChange={(e) => handleRegionChange(e.target.value)}
          className="input-field w-auto"
        >
          {INDIAN_REGIONS.map((r) => (
            <option key={r} value={r} className="bg-night-800">
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {posts.length === 0 && !loading && (
          <EmptyState
            heading="The trail is clear — nothing here yet"
            subtext="No trail posts in this region. Be the first to share your trek experience."
            ctaLabel="Explore trails"
            ctaHref="/trails"
          />
        )}

        {posts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}

        {loading && posts.length === 0 && (
          <>
            <TrailCardSkeleton />
            <TrailCardSkeleton />
          </>
        )}
      </div>

      <div
        ref={observerRef}
        className="mt-4 flex h-10 items-center justify-center"
      >
        {loading && posts.length > 0 && (
          <span className="text-sm text-stone-400">
            Reading the trail conditions...
          </span>
        )}
        {!hasMore && posts.length > 0 && (
          <span className="text-sm text-stone-400">
            You&apos;ve reached the summit
          </span>
        )}
      </div>
    </div>
  );
}
