import { createClient } from "@/lib/supabase/server";
import { ForumExplorer } from "@/components/forum/ForumExplorer";
import type { ForumThreadWithProfile } from "@/types";

export default async function ForumPage() {
  const supabase = await createClient();

  const { data: threads } = await supabase
    .from("forum_threads")
    .select(
      `
      *,
      profile:profiles(*)
    `
    )
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <ForumExplorer
      threads={(threads as unknown as ForumThreadWithProfile[]) ?? []}
    />
  );
}
