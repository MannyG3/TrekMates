import { BuddyFinder } from "@/components/buddy/BuddyFinder";
import { createClient } from "@/lib/supabase/server";
import type { BuddyRequestWithJoins } from "@/types";

export default async function BuddyPage() {
  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("buddy_requests")
    .select(
      `
      *,
      profile:profiles(*),
      trail:trails(*)
    `
    )
    .eq("status", "open")
    .gte("trek_date", new Date().toISOString().split("T")[0])
    .order("trek_date", { ascending: true });

  const { data: trails } = await supabase
    .from("trails")
    .select("id, name, region")
    .order("name");

  return (
    <BuddyFinder
      initialRequests={(requests as unknown as BuddyRequestWithJoins[]) ?? []}
      trails={trails ?? []}
    />
  );
}
