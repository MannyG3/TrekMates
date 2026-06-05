"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useSession } from "@/components/providers/SessionProvider";
import { useState } from "react";

interface TopbarProps {
  title?: string;
}

export function Topbar({ title }: TopbarProps) {
  const { user } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-stone-100/[0.08] bg-night-950/95 px-4 backdrop-blur-sm md:hidden">
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-stone-300 hover:bg-night-800"
        aria-label="Menu"
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      <Link
        href="/feed"
        className="absolute left-1/2 -translate-x-1/2 font-serif text-lg text-stone-100"
      >
        Trail<span className="text-sage-500">Mates</span>
      </Link>

      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-md text-stone-300 hover:bg-night-800"
        aria-label="Search"
      >
        <Search size={20} strokeWidth={1.5} />
      </button>

      {menuOpen && user && (
        <div className="absolute left-0 right-0 top-14 border-b border-stone-100/[0.08] bg-night-900 p-4 md:hidden">
          {title && (
            <p className="text-sm text-stone-400">{title}</p>
          )}
        </div>
      )}
    </header>
  );
}
