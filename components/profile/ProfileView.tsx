import {
  Mountain,
  TrendingUp,
  Footprints,
  Map as MapIcon,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { TrailCard } from "@/components/trail/TrailCard";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  DIFFICULTY_LABELS,
  type Profile,
  type Trail,
  type TrailPostWithJoins,
} from "@/types";

interface ProfileViewProps {
  profile: Profile;
  posts: TrailPostWithJoins[];
  followerCount: number;
  followingCount: number;
}

function getBadges(profile: Profile, reviewCount: number) {
  const badges = [];

  if (profile.home_region === "Maharashtra" || profile.home_region === "Karnataka") {
    badges.push({ icon: Mountain, label: "Sahyadri Explorer" });
  }
  if (profile.difficulty_level === "hard" || profile.difficulty_level === "expert") {
    badges.push({ icon: TrendingUp, label: "High Altitude" });
  }
  if (profile.trek_count >= 5) {
    badges.push({ icon: Footprints, label: "100km Club" });
  }
  if (reviewCount >= 3) {
    badges.push({ icon: MapIcon, label: "Trail Reviewer" });
  }

  if (badges.length === 0) {
    badges.push({ icon: Mountain, label: "Trail Seeker" });
  }

  return badges;
}

export function ProfileView({
  profile,
  posts,
  followerCount,
  followingCount,
}: ProfileViewProps) {
  const badges = getBadges(profile, posts.length);
  const uniqueTrails = Array.from(
    new Map(posts.map((p) => [p.trail.id, p.trail])).values()
  ) as Trail[];

  return (
    <div className="-mx-4 md:-mx-8">
      <header className="bg-night-900 px-6 py-8">
        <div className="flex items-start gap-5">
          <Avatar
            src={profile.avatar_url}
            alt={profile.full_name || profile.username}
            size="lg"
          />
          <div>
            <h1 className="font-serif text-2xl text-stone-100">
              {profile.full_name || profile.username}
            </h1>
            <p className="text-sm text-stone-400">@{profile.username}</p>

            {profile.home_region && (
              <Badge variant="region" className="mt-3">
                {profile.home_region}
              </Badge>
            )}

            {profile.bio && (
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-300">
                {profile.bio}
              </p>
            )}

            {profile.difficulty_level && (
              <p className="mt-2 text-xs text-stone-400">
                Comfort level: {DIFFICULTY_LABELS[profile.difficulty_level]}
              </p>
            )}

            <div className="mt-5 flex gap-8">
              {[
                { value: profile.trek_count, label: "Treks" },
                { value: posts.length, label: "Reviews" },
                { value: followerCount, label: "Followers" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono text-xl text-stone-100">
                    {stat.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-stone-400">
                    {stat.label}
                  </p>
                </div>
              ))}
              <div>
                <p className="font-mono text-xl text-stone-100">
                  {followingCount}
                </p>
                <p className="text-[11px] uppercase tracking-widest text-stone-400">
                  Following
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-stone-100/[0.08] px-6 py-6">
        <p className="overline mb-4">Achievements</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="card-surface w-24 shrink-0 p-3 text-center"
              >
                <Icon
                  className="mx-auto text-sage-500"
                  size={28}
                  strokeWidth={1.5}
                />
                <p className="mt-2 text-[10px] uppercase tracking-wider text-stone-400">
                  {badge.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-8">
        <p className="overline mb-4">Trek history</p>
        {uniqueTrails.length === 0 ? (
          <EmptyState
            heading="No treks logged yet"
            subtext="Trail posts and completed treks will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uniqueTrails.map((trail) => (
              <TrailCard key={trail.id} trail={trail} compact />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
