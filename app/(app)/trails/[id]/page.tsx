import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TrailDetailView } from "@/components/trail/TrailDetailView";
import type { Trail, TrailPostWithJoins } from "@/types";

interface TrailDetailPageProps {
  params: { id: string };
}

export default async function TrailDetailPage({ params }: TrailDetailPageProps) {
  const supabase = await createClient();

  const { data: trail } = await supabase
    .from("trails")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!trail) notFound();

  const { data: posts } = await supabase
    .from("trail_posts")
    .select(
      `
      *,
      profile:profiles(*),
      trail:trails(*)
    `
    )
    .eq("trail_id", params.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <TrailDetailView
      trail={trail as Trail}
      posts={(posts as unknown as TrailPostWithJoins[]) ?? []}
    />
  );
}
