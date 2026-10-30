import { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import TestimonialsSection from "../UI/Testimonial";
import { Btn } from "../UI/Btn";
import Tag from "../UI/Tag";

const CATEGORIES = [
  {
    id: "bengali",
    name: "Bengali",
    count: "42 Places",
    tag: "Authentic Mustard & Spice",
    image:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    color: "from-amber-900/80 to-emerald-950/90",
  },
  {
    id: "north-indian",
    name: "North Indian",
    count: "58 Places",
    tag: "Clay Oven & Rich Gravies",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    color: "from-orange-900/80 to-stone-950/90",
  },
  {
    id: "south-indian",
    name: "South Indian",
    count: "34 Places",
    tag: "Crisp Dosas & Filter Kaapi",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-900/80 to-teal-950/90",
  },
  {
    id: "chinese",
    name: "Asian & Dumplings",
    count: "29 Places",
    tag: "Wok tossed & Dim Sums",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    color: "from-rose-950/80 to-neutral-950/90",
  },
  {
    id: "italian",
    name: "Italian & Pizza",
    count: "23 Places",
    tag: "Wood-fired & Fresh Pasta",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    color: "from-red-950/80 to-stone-950/90",
  },
  {
    id: "cafes",
    name: "Cafés & Bakes",
    count: "47 Places",
    tag: "Artisan Brews & Croissants",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    color: "from-amber-950/80 to-yellow-950/90",
  },
  {
    id: "street",
    name: "Street Food",
    count: "65 Places",
    tag: "Puchkas, Kathi Rolls & Chaat",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    color: "from-yellow-900/80 to-zinc-950/90",
  },
];

const Home = () => {
  const heroCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroCardRef.current) {
        gsap.to(heroCardRef.current, {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroCardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Hero Section */}
      <main className="relative z-10 mx-auto w-full max-w-350 min-h-[75vh] px-4 sm:px-8 flex items-center">
        <section
          id="discover"
          className="h-full w-full relative overflow-hidden rounded-[2.5rem] bg-linear-to-b from-cream to-cream-200 p-6 text-forest shadow-[0_25px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/30 sm:p-10 lg:p-14 flex items-center"
        >
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center w-full">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4 w-fit rounded-full bg-forest/8 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-forest">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                Over 1,200+ Verified Culinary Gems
              </div>

              <h1 className="font-display text-4xl sm:text-5xl xl:text-[4.2rem] font-extrabold uppercase leading-[0.93] tracking-tight text-forest">
                Find your next <br />
                <span className="italic font-serif font-normal text-forest-700">
                  favourite place
                </span>{" "}
                <br />
                to eat.
              </h1>

              <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-muted">
                Explore handpicked regional cuisines, celebrated heirloom
                kitchens, and unfiltered dining reviews written by genuine
                epicureans who have sat at the table.
              </p>

              {/* Primary Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4"></div>
            </div>

            {/* Right Hero Image Showcase with Glassmorphism Float Overlay */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              {/* Main Featured Arch Image */}
              <div className="group relative aspect-[4/5] max-h-[52vh] w-full overflow-hidden rounded-t-[14rem] rounded-b-[3rem] shadow-[0_30px_70px_rgba(15,42,27,0.4)] ring-2 ring-forest/20">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
                  alt="Gourmet dining spread on a rustic wooden table"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-forest-900/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Top Pill inside Image */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md border border-white/20 whitespace-nowrap">
                  ✨ Kolkata Culinary Capital · 2026 Edition
                </div>

                {/* Caption Banner inside image */}
                <div className="absolute bottom-4 inset-x-4 text-cream/90 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-sage">
                      Handpicked Heritage Feast
                    </p>
                    <p className="font-display text-base font-bold">
                      The Royal Grand Thali
                    </p>
                  </div>
                  <span className="rounded-full bg-cream/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
                    Seasonal Spotlight
                  </span>
                </div>
              </div>

              {/* Floating Glassmorphic Listing Card */}
              <div
                ref={heroCardRef}
                className="absolute -bottom-4 -left-3 sm:-left-6 w-60 rounded-3xl bg-cream/95 p-3.5 shadow-[0_25px_50px_rgba(0,0,0,0.25)] ring-1 ring-ink/10 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
                    alt="Kasundi Kitchen Signature"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 rounded-full bg-forest/80 px-2 py-0.5 text-[10px] font-bold text-cream backdrop-blur-md">
                    Trending #1
                  </div>
                </div>

                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <h4 className="font-display text-sm font-bold text-forest">
                      Kasundi Kitchen
                    </h4>
                    <p className="text-[11px] font-medium text-muted">
                      Ballygunge Circular Rd
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-forest px-2.5 py-1 text-xs font-bold text-cream">
                    <i className="ri-star-fill text-xs text-gold" />
                    <span>4.8</span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-ink/10 pt-2 text-[10px] text-muted">
                  <span className="font-semibold text-emerald-800">
                    Must Try: Kosha Mangsho
                  </span>
                  <span>₹₹</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Categories Section - Clean hardcoded cards with rich imagery & hover effects */}
      <section className="relative z-10 mx-auto w-full max-w-350 px-4 sm:px-8">
        <div
          id="categories"
          className="relative overflow-hidden rounded-[2.5rem] bg-[#143224]/90 p-6 sm:p-10 lg:p-12 text-cream ring-1 ring-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.4)] backdrop-blur-md"
        >
          {/* Section Header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-6">
            <div>
              <Tag title={"Browse Taste Profiles"} />

              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl">
                Eat by cuisine.
                <br />
                <span className="text-sage italic font-serif font-normal">
                  Pick a craving.
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Btn to="/categories" little={"View All Cuisines"} theme={2} />
            </div>
          </div>

          {/* Categories Grid - 7 hardcoded cuisine cards */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to="/categories"
                className="group relative cursor-pointer overflow-hidden rounded-[1.6rem] ring-1 ring-white/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_35px_rgba(0,0,0,0.5)] hover:ring-sage/60"
              >
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                    loading="lazy"
                  />
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-t ${cat.color} via-black/30 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95`}
                />

                {/* Content Inside Card */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-semibold text-sage uppercase tracking-wider">
                    {cat.count}
                  </span>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-sage transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-cream/70 line-clamp-1">
                    {cat.tag}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
};

export default Home;
