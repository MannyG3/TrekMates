import { createClient } from "@/lib/supabase/server";
import { FeedList } from "@/components/feed/FeedList";
import type { TrailPostWithJoins } from "@/types";

const PAGE_SIZE = 10;

export default async function FeedPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("trail_posts")
    .select(
      `
      *,
      profile:profiles(*),
      trail:trails(*)
    `
    )
    .order("created_at", { ascending: false })
    .range(0, PAGE_SIZE - 1);

  return (
    <FeedList
      initialPosts={(posts as unknown as TrailPostWithJoins[]) ?? []}
      initialRegion="All Regions"
    />
  );
}
