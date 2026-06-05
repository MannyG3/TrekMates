import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileView } from "@/components/profile/ProfileView";
import type { Profile, TrailPostWithJoins } from "@/types";

interface ProfilePageProps {
  params: { username: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!profile) notFound();

  const typedProfile = profile as Profile;

  const { data: posts } = await supabase
    .from("trail_posts")
    .select(
      `
      *,
      profile:profiles(*),
      trail:trails(*)
    `
    )
    .eq("user_id", typedProfile.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const { count: followerCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", typedProfile.id);

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", typedProfile.id);

  return (
    <ProfileView
      profile={typedProfile}
      posts={(posts as unknown as TrailPostWithJoins[]) ?? []}
      followerCount={followerCount ?? 0}
      followingCount={followingCount ?? 0}
    />
  );
}
