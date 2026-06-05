import { createClient } from "@/lib/supabase/server";
import { TrailsExplorer } from "@/components/trail/TrailsExplorer";
import type { Trail } from "@/types";

export default async function TrailsPage() {
  const supabase = await createClient();

  const { data: trails } = await supabase
    .from("trails")
    .select("*")
    .order("name");

  const regions = Array.from(
    new Set((trails ?? []).map((t: Trail) => t.region))
  ).sort();

  return (
    <TrailsExplorer
      trails={(trails as Trail[]) ?? []}
      regions={regions}
    />
  );
}
