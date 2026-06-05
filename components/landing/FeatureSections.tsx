import { Map, Users, Backpack } from "lucide-react";

const features = [
  {
    overline: "Discover",
    title: "Trails worth the altitude",
    description:
      "Curated routes across Uttarakhand, Himachal, Karnataka, and beyond — with difficulty ratings, best seasons, and honest reviews from trekkers who've been there.",
    icon: Map,
    bg: "bg-night-950",
  },
  {
    overline: "Connect",
    title: "Never trek alone again",
    description:
      "Post your upcoming trek, set your pace and group size, and match with companions who share your fitness level and summit goals.",
    icon: Users,
    bg: "bg-night-900",
  },
  {
    overline: "Equip",
    title: "Gear that goes further",
    description:
      "Borrow trekking poles, tents, and sleeping bags from fellow trekkers in your city. Travel lighter, spend less, climb more.",
    icon: Backpack,
    bg: "bg-night-950",
  },
];

export function FeatureSections() {
  return (
    <>
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <section
            key={feature.title}
            className={`${feature.bg} py-20 px-6`}
          >
            <div className="mx-auto max-w-6xl">
              <p className="overline mb-3">{feature.overline}</p>
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <h2 className="max-w-md font-serif text-3xl text-stone-100">
                  {feature.title}
                </h2>
                <div className="max-w-lg">
                  <Icon
                    className="mb-4 text-sage-500"
                    size={32}
                    strokeWidth={1.5}
                  />
                  <p className="text-base font-light leading-relaxed text-stone-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
