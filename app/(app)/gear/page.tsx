import { createClient } from "@/lib/supabase/server";
import { GearCard } from "@/components/gear/GearCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { GearListingWithProfile } from "@/types";

export default async function GearPage() {
  const supabase = await createClient();

  const { data: listings } = await supabase
    .from("gear_listings")
    .select(
      `
      *,
      profile:profiles(*)
    `
    )
    .eq("available", true)
    .order("created_at", { ascending: false });

  return (
    <div>
      <p className="overline mb-3">Equip</p>
      <h1 className="font-serif text-3xl text-stone-100">Gear Lending</h1>
      <p className="mt-2 text-stone-400">
        Borrow trekking gear from fellow trekkers — travel lighter, climb further
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {((listings as unknown as GearListingWithProfile[]) ?? []).map(
          (listing) => (
            <GearCard key={listing.id} listing={listing} />
          )
        )}
      </div>

      {(!listings || listings.length === 0) && (
        <EmptyState
          heading="The gear rack is empty"
          subtext="No listings yet. List your spare trekking equipment to help fellow trekkers travel lighter."
        />
      )}
    </div>
  );
}
