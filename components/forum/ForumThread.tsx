import Link from "next/link";
import type { ForumThreadWithProfile } from "@/types";

interface ForumThreadProps {
  thread: ForumThreadWithProfile;
}

export function ForumThread({ thread }: ForumThreadProps) {
  const date = new Date(thread.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="card-surface p-4 transition-colors hover:border-sage-500/20">
      <h3 className="text-base font-medium text-stone-100 transition-colors hover:text-sage-400">
        {thread.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-stone-400">{thread.body}</p>
      <div className="mt-3 flex items-center gap-2 text-xs text-stone-400">
        <Link
          href={`/profile/${thread.profile.username}`}
          className="hover:text-sage-400"
        >
          {thread.profile.full_name || thread.profile.username}
        </Link>
        <span>·</span>
        <span>{date}</span>
        <span>·</span>
        <span>{thread.reply_count} replies</span>
        <span>·</span>
        <span className="uppercase tracking-wider">{thread.region}</span>
      </div>
    </article>
  );
}
