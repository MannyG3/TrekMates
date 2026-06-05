import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import type { TrailPostWithJoins } from "@/types";

interface FeedPostCardProps {
  post: TrailPostWithJoins;
}

export function FeedPostCard({ post }: FeedPostCardProps) {
  const timeAgo = getTimeAgo(post.created_at);

  return (
    <article className="card-surface overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.profile.username}`}>
            <Avatar
              src={post.profile.avatar_url}
              alt={post.profile.full_name || post.profile.username}
              size="md"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link
              href={`/profile/${post.profile.username}`}
              className="text-sm font-medium text-stone-100 transition-colors hover:text-sage-400"
            >
              {post.profile.full_name || post.profile.username}
            </Link>
            <p className="text-sm text-stone-400">
              trekked{" "}
              <Link
                href={`/trails/${post.trail.id}`}
                className="text-sage-500 transition-colors hover:text-sage-400"
              >
                {post.trail.name}
              </Link>
              {" · "}
              {timeAgo}
            </p>
          </div>
          <Badge variant="region">{post.trail.region}</Badge>
        </div>

        <p className="mt-3 leading-relaxed text-stone-200 font-light">
          {post.body}
        </p>

        {post.rating && (
          <div className="mt-2">
            <StarRating rating={post.rating} />
          </div>
        )}

        {post.visited_on && (
          <p className="mt-1 text-xs text-stone-400">
            Visited{" "}
            {new Date(post.visited_on).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      {post.photos && post.photos.length > 0 && (
        <div className="relative aspect-[16/9] w-full bg-night-700">
          <Image
            src={post.photos[0]}
            alt={`Photo from ${post.trail.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
      )}
    </article>
  );
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}
