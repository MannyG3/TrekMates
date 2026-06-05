"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Map,
  Users,
  MessageSquare,
  Backpack,
  User,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useSession } from "@/components/providers/SessionProvider";

const navItems = [
  { href: "/feed", label: "Feed", icon: Home },
  { href: "/trails", label: "Trails", icon: Map },
  { href: "/buddy", label: "Find Buddy", icon: Users },
  { href: "/forum", label: "Forum", icon: MessageSquare },
  { href: "/gear", label: "Gear", icon: Backpack },
];

const mobileNavItems = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "/trails", label: "Trails", icon: Map },
  { href: "/buddy", label: "Buddy", icon: Users },
  { href: "/gear", label: "Gear", icon: Backpack },
  { href: "/profile", label: "Profile", icon: User, isProfile: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useSession();

  const profileHref = profile
    ? `/profile/${profile.username}`
    : "/login";

  const isPro = profile && profile.trek_count >= 10;

  return (
    <>
      {/* Desktop sidebar — 240px */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-night-950 md:flex">
        <div className="flex h-16 items-center px-6">
          <Link href="/feed" className="font-serif text-xl text-stone-100">
            Trail<span className="text-sage-500">Mates</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm tracking-wide transition-colors ${
                  isActive
                    ? "bg-sage-800/30 text-sage-500"
                    : "text-stone-300 hover:bg-night-800 hover:text-stone-100"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-stone-100/[0.08] p-4">
          <Link
            href={profileHref}
            className={`flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-night-800 ${
              pathname.startsWith("/profile") ? "bg-sage-800/20" : ""
            }`}
          >
            <Avatar
              src={profile?.avatar_url}
              alt={profile?.full_name || profile?.username || "User"}
              size="sm"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-stone-100">
                  {profile?.full_name || "Guest"}
                </p>
                {isPro && <Badge variant="pro">Pro</Badge>}
              </div>
              <p className="truncate text-xs text-stone-400">
                @{profile?.username || "login"}
              </p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-stone-100/[0.08] bg-night-950 px-2 py-2 md:hidden">
        {mobileNavItems.map((item) => {
          const href =
            item.isProfile ? profileHref : item.href;
          const isActive = item.isProfile
            ? pathname.startsWith("/profile")
            : pathname === item.href ||
              pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] font-medium tracking-wide transition-colors ${
                isActive ? "text-sage-500" : "text-stone-400"
              }`}
            >
              {item.isProfile && profile ? (
                <Avatar
                  src={profile.avatar_url}
                  alt={profile.full_name || profile.username}
                  size="sm"
                  className="!h-[22px] !w-[22px] !text-[8px]"
                />
              ) : (
                <Icon size={22} strokeWidth={1.5} />
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
