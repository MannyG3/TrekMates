import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { TrailCard } from "@/components/trail/TrailCard";
import { LandingHero } from "@/components/landing/LandingHero";
import { FeatureSections } from "@/components/landing/FeatureSections";
import type { Trail } from "@/types";

export default async function LandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/feed");
  }

  const { data: featuredTrails } = await supabase
    .from("trails")
    .select("*")
    .order("avg_rating", { ascending: false })
    .limit(3);

  return (
    <div className="min-h-screen bg-night-950">
      <LandingHero />
      <FeatureSections />

      {featuredTrails && featuredTrails.length > 0 && (
        <section className="bg-night-900 py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="overline mb-3">Community picks</p>
            <h2 className="font-serif text-3xl text-stone-100">
              Top-rated treks
            </h2>
            <p className="mt-2 text-stone-400">
              Handpicked by trekkers across the Himalayas and Western Ghats
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(featuredTrails as Trail[]).map((trail) => (
                <TrailCard key={trail.id} trail={trail} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-stone-100/[0.08] bg-night-950 px-6 py-20 text-center">
        <h2 className="font-serif text-3xl text-stone-100">
          Ready for your next summit?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-stone-400">
          Join trekkers from Dehradun to Bangalore sharing routes, trail
          conditions, and companions for the climb ahead.
        </p>
        <Link href="/signup" className="mt-8 inline-block">
          <Button variant="primary" size="lg">
            Create your free account
          </Button>
        </Link>
      </section>

      <footer className="border-t border-stone-100/[0.08] py-8 text-center text-sm text-stone-400">
        © {new Date().getFullYear()} TrailMates — Built for Indian trekkers,
        by trekkers.
      </footer>
    </div>
  );
}
