"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { MountainSilhouette } from "@/components/ui/MountainSilhouette";
import { Button } from "@/components/ui/Button";

const stats = [
  { value: 2400, suffix: "+", label: "Trekkers" },
  { value: 380, suffix: "+", label: "Trails" },
  { value: 18, suffix: "", label: "States covered" },
];

export function LandingHero() {
  return (
    <section className="relative flex min-h-screen flex-col bg-night-950">
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-serif text-xl text-stone-100">
          Trail<span className="text-sage-500">Mates</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">
              Join free
            </Button>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 mx-auto flex flex-1 w-full max-w-6xl flex-col justify-center px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="overline mb-4">India&apos;s alpine community</p>
          <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.05] text-stone-100 md:text-7xl">
            Find your tribe
            <br />
            on the <em className="text-sage-500 not-italic">trails</em>
          </h1>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-stone-300">
            From Kedarkantha&apos;s snowfields to Kumara Parvatha&apos;s shola
            forests — discover routes, find trek buddies, and share the climb
            with people who get it.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/trails">
              <Button variant="primary" size="lg">
                Explore trails
              </Button>
            </Link>
            <Link href="/buddy">
              <Button variant="ghost" size="lg">
                Find a buddy
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="mt-16 border-t border-stone-100/[0.08] pt-10">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
              >
                <p className="font-serif text-4xl text-stone-100">
                  <CountUp
                    end={stat.value}
                    duration={2}
                    separator=","
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-stone-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <MountainSilhouette parallax className="w-full" />
      </div>
    </section>
  );
}
