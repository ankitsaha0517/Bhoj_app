import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Star,
  MapPin,
  Heart,
  Sparkles,
  UtensilsCrossed,
  X,
  CheckCircle2,
} from "lucide-react";

// DATA ARRAYS (defined cleanly right here in the file, no external contexts needed)
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

const RESTAURANTS = [
  {
    id: 1,
    name: "Kasundi Kitchen",
    rating: 4.8,
    reviewsCount: 342,
    cuisine: ["Bengali", "Seafood", "Heritage"],
    location: "Gariahat, South Kolkata",
    price: "₹₹",
    avgSpend: "₹950 for two",
    mustTry: "Chingri Malai Curry & Kosha Mangsho",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    curatorPick: "Chef Recommended",
    badgeColor: "bg-emerald-950/80 text-sage border-sage/30",
  },
  {
    id: 2,
    name: "The Dosa Counter",
    rating: 4.7,
    reviewsCount: 286,
    cuisine: ["South Indian", "Tiffin", "Breakfast"],
    location: "Sector V, Salt Lake",
    price: "₹",
    avgSpend: "₹350 for two",
    mustTry: "Ghee Podi Roast & Mysore Masala",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
    curatorPick: "Bestseller Tiffin",
    badgeColor: "bg-amber-950/80 text-amber-200 border-amber-400/30",
  },
  {
    id: 3,
    name: "Forno & Flour",
    rating: 4.9,
    reviewsCount: 418,
    cuisine: ["Italian", "Artisan Bakery", "Wine"],
    location: "Park Street, Central",
    price: "₹₹₹",
    avgSpend: "₹1,800 for two",
    mustTry: "Sourdough Burrata & Truffle Funghi Pizza",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
    curatorPick: "Critics Choice 2026",
    badgeColor: "bg-rose-950/80 text-rose-200 border-rose-400/30",
  },
];

const DISHES = [
  {
    id: 1,
    name: "Royal Kosha Mangsho",
    restaurant: "Kasundi Kitchen",
    rating: 4.9,
    category: "Bengali Speciality",
    description:
      "Slow-simmered goat meat cooked in mustard oil, caramelized shallots, and fragrant whole spices until melt-in-mouth tender.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    badge: "Iconic Curry",
  },
  {
    id: 2,
    name: "Crispy Ghee Podi Roast",
    restaurant: "The Dosa Counter",
    rating: 4.8,
    category: "Breakfast Favorite",
    description:
      "Ultra-crisp fermented crepe bathed in organic A2 ghee, generously sprinkled with spicy gun-powder lentil podi and fresh coconut chutney.",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    badge: "Crispy Gold",
  },
  {
    id: 3,
    name: "Charred Margherita Verace",
    restaurant: "Forno & Flour",
    rating: 4.9,
    category: "Wood-fired Sourdough",
    description:
      "San Marzano DOP tomato sauce, pulled fior di latte mozzarella, fragrant sweet basil, and a drizzle of cold-pressed Tuscan olive oil.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    badge: "72hr Fermentation",
  },
];

const REVIEWS = [
  {
    id: 1,
    author: "Riya Sen",
    initials: "RS",
    restaurant: "Kasundi Kitchen",
    date: "12 Oct 2026",
    stars: 5,
    highlight: "The Kosha Mangsho had soul and genuine fire.",
    text: "The mangsho was slow-cooked properly and the kasundi on the side actually had bite. We paired it with luchi and basanti pulao. Go before eight on weekends to grab the heritage window table.",
  },
  {
    id: 2,
    author: "Arjun Mukherjee",
    initials: "AM",
    restaurant: "The Dosa Counter",
    date: "04 Oct 2026",
    stars: 5,
    highlight: "Crisp dosa, honest sambar, unmatched speed.",
    text: "Seating is tight and bustling, but that ghee podi aroma hits you the moment you arrive. Sambar has that authentic drumstick sweetness without artificial tang. Outstanding value.",
  },
  {
    id: 3,
    author: "Neha Kapoor",
    initials: "NK",
    restaurant: "Forno & Flour",
    date: "29 Sep 2026",
    stars: 5,
    highlight: "Blistered crust, airy cornicione, zero gimmicks.",
    text: "As authentic as Roman pizzerias. The 72-hour sourdough crust has magnificent air pockets and pleasant acidity. Save room for their espresso-drenched tiramisu.",
  },
];

const UI = () => {
  // Simple reactive states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState([1]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    restaurant: "Kasundi Kitchen",
    rating: 5,
    name: "",
    text: "",
  });
  const [submittedReview, setSubmittedReview] = useState(false);

  useEffect(() => {
    const handleOpenReviewModal = () => setShowReviewModal(true);
    window.addEventListener("open-review-modal", handleOpenReviewModal);
    return () =>
      window.removeEventListener("open-review-modal", handleOpenReviewModal);
  }, []);

  // GSAP Container Refs
  const rootRef = useRef(null);
  const heroCardRef = useRef(null);

  // GSAP Initial & Floating Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".gsap-header", {
        y: -30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".gsap-hero-title",
          {
            y: 50,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
          },
          "-=0.4",
        )
        .from(
          ".gsap-hero-sub",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".gsap-search-box",
          {
            scale: 0.95,
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4",
        )
        .from(
          ".gsap-hero-media",
          {
            scale: 0.92,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8",
        );

      // 2. Floating elements physics (Award-winning subtle breathing)
      if (heroCardRef.current) {
        gsap.to(heroCardRef.current, {
          y: -12,
          rotation: 0.5,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }



      // 3. Staggered reveal for cards on initial load
      gsap.from(".gsap-card", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.6,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setSubmittedReview(true);
    setTimeout(() => {
      setSubmittedReview(false);
      setShowReviewModal(false);
      setReviewForm({
        restaurant: "Kasundi Kitchen",
        rating: 5,
        name: "",
        text: "",
      });
    }, 1800);
  };

  // Filter restaurants based on live input
  const filteredRestaurants = RESTAURANTS.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      r.mustTry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      !searchLocation ||
      r.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesCat =
      selectedCategory === "all" ||
      r.cuisine.some((c) =>
        c
          .toLowerCase()
          .replace(/[^a-z]/g, "")
          .includes(selectedCategory.replace(/[^a-z]/g, "")),
      );
    return matchesSearch && matchesLocation && matchesCat;
  });

  return (
    <div
      className="relative min-h-screen bg-[#0c2417] text-cream font-body antialiased selection:bg-sage selection:text-forest"
    >
      {/* Background ambient lighting glows for glassmorphism */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-emerald-600/15 blur-[140px]" />
        <div className="absolute top-[35%] -right-32 h-[500px] w-[500px] rounded-full bg-sage/10 blur-[150px]" />
        <div className="absolute bottom-10 left-10 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] space-y-4 p-3 sm:space-y-6 sm:p-6 lg:p-8">
        {/* ============================================================== */}
        {/* HERO SECTION                                                   */}
        {/* ============================================================== */}
     

        {/* ============================================================== */}
        {/* CATEGORIES SECTION: Eat by cuisine                             */}
        {/* ============================================================== */}
        <section
          id="categories"
          className="gsap-card scroll-mt-28 relative overflow-hidden rounded-[2.5rem] bg-[#143224]/90 p-6 sm:p-10 lg:p-12 text-cream ring-1 ring-white/10 noise-bg shadow-[0_25px_60px_rgba(0,0,0,0.4)] backdrop-blur-md"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage">
                Browse Taste Profiles
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl">
                Eat by cuisine.
                <br />
                <span className="text-sage italic font-serif font-normal">
                  Pick a craving.
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === "all"
                    ? "bg-sage text-forest shadow-md"
                    : "border border-cream/30 text-cream hover:bg-white/10"
                }`}
              >
                Show All
              </button>
            </div>
          </div>

          {/* Categories Grid with real imagery & glass blur tags */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(isActive ? "all" : cat.id)}
                  role="button"
                  tabIndex={0}
                  className={`group relative cursor-pointer overflow-hidden rounded-[1.6rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_35px_rgba(0,0,0,0.5)] ${
                    isActive
                      ? "ring-4 ring-sage scale-[1.03]"
                      : "ring-1 ring-white/15"
                  }`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                      loading="lazy"
                    />
                  </div>

                  {/* Gradient & Glass Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-black/30 to-transparent opacity-85 transition-opacity group-hover:opacity-95`}
                  />

                  {/* Content inside card */}
                  <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
                    <span className="text-[10px] font-semibold text-sage uppercase tracking-wider">
                      {cat.count}
                    </span>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-sage transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-[11px] text-cream/70 line-clamp-1">
                      {cat.tag}
                    </p>
                  </div>

                  {isActive && (
                    <div className="absolute top-2.5 right-2.5 rounded-full bg-sage px-2 py-0.5 text-[9px] font-bold text-forest">
                      Selected
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================== */}
        {/* FEATURED RESTAURANTS SECTION                                   */}
        {/* ============================================================== */}
        <section
          id="restaurants"
          className="gsap-card scroll-mt-28 relative overflow-hidden rounded-[2.5rem] bg-[#f7f4ea] p-6 sm:p-10 lg:p-12 text-ink shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-ink/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
                Curated Tables
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-forest sm:text-5xl">
                Featured
                <br />
                Restaurants
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted">
              Authenticated tasting audits, kitchen transparency, and genuine
              atmosphere ratings.
            </p>
          </div>

          {/* Restaurant Cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.length === 0 ? (
              <div className="col-span-full py-12 text-center">
                <UtensilsCrossed className="mx-auto h-12 w-12 text-forest/30 mb-3" />
                <h3 className="font-display text-xl font-bold text-forest">
                  No matching restaurants found
                </h3>
                <p className="text-sm text-muted mt-1">
                  Try clearing filters or searching for "Bengali", "Dosa", or
                  "Italian".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchLocation("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 rounded-full bg-forest px-6 py-2 text-xs font-bold text-cream"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredRestaurants.map((restaurant) => {
                const isBookmarked = bookmarkedIds.includes(restaurant.id);
                return (
                  <div
                    key={restaurant.id}
                    className="group relative overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-20px_rgba(15,42,27,0.4)]"
                  >
                    {/* Image Header */}
                    <div className="relative aspect-[16/11] overflow-hidden p-3 pb-0">
                      <div className="relative h-full w-full overflow-hidden rounded-2xl">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Rating Pill */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1 text-xs font-bold text-forest shadow-md backdrop-blur-md">
                          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                          <span>{restaurant.rating}</span>
                          <span className="font-normal text-muted">
                            ({restaurant.reviewsCount})
                          </span>
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(restaurant.id);
                          }}
                          className={`absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition-colors ${
                            isBookmarked
                              ? "bg-rose-500 text-white"
                              : "bg-black/40 text-white hover:bg-white hover:text-rose-500"
                          }`}
                          aria-label="Save restaurant"
                        >
                          <Heart
                            className={`h-4 w-4 ${isBookmarked ? "fill-white" : ""}`}
                          />
                        </button>

                        {/* Top Curator Badge */}
                        <div
                          className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-md ${restaurant.badgeColor}`}
                        >
                          {restaurant.curatorPick}
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-2xl font-bold text-forest group-hover:text-forest-700 transition-colors">
                          {restaurant.name}
                        </h3>
                        <span className="font-display text-sm font-bold text-forest bg-forest/5 px-2.5 py-1 rounded-lg">
                          {restaurant.price}
                        </span>
                      </div>

                      {/* Cuisines Chips */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {restaurant.cuisine.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-ink/10 bg-cream-200/50 px-3 py-0.5 text-[11px] font-medium text-forest"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Must-try Highlight */}
                      <div className="mt-4 rounded-xl bg-forest/5 p-2.5 text-xs text-forest/90">
                        <span className="font-bold text-forest">
                          Signature:{" "}
                        </span>
                        <span>{restaurant.mustTry}</span>
                      </div>

                      {/* Card Footer */}
                      <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-3 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-forest/50" />
                          {restaurant.location}
                        </span>
                        <span className="font-semibold text-forest">
                          {restaurant.avgSpend}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ============================================================== */}
        {/* DISHES PEOPLE KEEP TALKING ABOUT                               */}
        {/* ============================================================== */}
        <section
          id="dishes"
          className="gsap-card scroll-mt-28 relative overflow-hidden rounded-[2.5rem] bg-[#102a1e] p-6 sm:p-10 lg:p-12 text-cream ring-1 ring-white/10 noise-bg shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage">
                Sensational Plates
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                Dishes people keep
                <br />
                <span className="text-sage italic font-serif font-normal">
                  talking about.
                </span>
              </h2>
            </div>
            <p className="max-w-xs text-sm text-cream/70">
              Dishes so universally revered that people will commute across town
              through rain just for a portion.
            </p>
          </div>

          {/* Staggered Vertical Dish Cards */}
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {DISHES.map((dish, idx) => (
              <div
                key={dish.id}
                className={`group relative overflow-hidden rounded-[2rem] bg-forest-800/80 ring-1 ring-white/15 backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] ${
                  idx === 1 ? "sm:mt-12" : idx === 2 ? "sm:mt-6" : ""
                }`}
              >
                {/* Photo with Overlay */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-112"
                    loading="lazy"
                  />

                  {/* Subtle multi-stop gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2417] via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-80" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 rounded-full bg-forest/80 px-3 py-1 text-xs font-bold text-sage backdrop-blur-md border border-sage/20">
                    {dish.badge}
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-gold backdrop-blur-md">
                    <Star className="h-3.5 w-3.5 fill-gold" />
                    <span>{dish.rating}</span>
                  </div>

                  {/* Bottom Text inside Image */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="text-xs font-medium text-sage">
                      {dish.category}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-sage transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs font-medium text-cream/80 mt-1">
                      Available at{" "}
                      <strong className="text-white">{dish.restaurant}</strong>
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-cream/70 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* REVIEWS SECTION: From the community                            */}
        {/* ============================================================== */}
        <section
          id="reviews"
          className="gsap-card scroll-mt-28 relative overflow-hidden rounded-[2.5rem] bg-[#f7f4ea] p-6 sm:p-10 lg:p-12 text-ink shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-ink/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
                Real Diners
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-forest sm:text-5xl">
                From the
                <br />
                Community
              </h2>
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-cream transition-transform hover:scale-105"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Add Your Voice
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            {/* Spotlight Review: Dark Glass Emerald Panel */}
            <div className="flex flex-col justify-between rounded-[2rem] bg-gradient-to-br from-forest to-[#143926] p-7 sm:p-10 text-cream shadow-xl ring-1 ring-white/10">
              <div>
                <div className="flex items-center gap-1.5 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold" />
                  ))}
                  <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-sage">
                    Verified Visit
                  </span>
                </div>

                <blockquote className="mt-6 font-display text-2xl font-bold leading-snug sm:text-3xl text-cream-100">
                  “The mangsho was slow-cooked properly and the kasundi on the
                  side actually had authentic mustard bite. Go before eight on
                  weekends to grab the heritage window table.”
                </blockquote>

                <p className="mt-4 text-sm text-cream/75 leading-relaxed">
                  Ordered with fresh luchi, hot radhaballabhi and finished with
                  nolen gur ice cream. A true testament to old-world Kolkata
                  kitchen mastery.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3.5 border-t border-white/15 pt-6">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-sage font-display font-bold text-forest text-base shadow-sm">
                  RS
                </div>
                <div>
                  <span className="block font-display text-sm font-bold text-cream">
                    Riya Sen
                  </span>
                  <span className="text-xs text-cream/70">
                    Dined at Kasundi Kitchen · 12 Oct 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Other Community Testimonials */}
            <div className="grid gap-4">
              {REVIEWS.slice(1).map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-[1.8rem] bg-white p-6 shadow-sm ring-1 ring-ink/10 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-sage/30 font-display text-sm font-bold text-forest">
                        {rev.initials}
                      </div>
                      <div>
                        <p className="font-display text-sm font-bold text-forest">
                          {rev.author}
                        </p>
                        <p className="text-xs text-muted">
                          {rev.restaurant} · {rev.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-gold">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                      ))}
                    </div>
                  </div>

                  <p className="mt-3.5 font-display text-sm font-bold text-forest">
                    “{rev.highlight}”
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted">
                    {rev.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CTA BANNER: Been somewhere good?                               */}
        {/* ============================================================== */}
        <section className="gsap-card relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-sage via-[#d8e5b6] to-[#b8cb92] p-8 sm:p-12 text-forest shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-800">
                Independent Foodie Collective
              </span>
              <h2 className="mt-1 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-forest sm:text-5xl">
                Been somewhere good?
                <br />
                <span className="italic font-serif font-normal">
                  Tell the next person.
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-forest/80 leading-relaxed">
                Your authentic review saves someone from a subpar meal and
                guides a hungry foodie to an unforgettable table.
              </p>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-forest px-8 text-sm font-bold uppercase tracking-wider text-cream shadow-lg transition-all duration-300 hover:bg-forest-800 hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              Write A Review Now
            </button>
          </div>

          {/* Decorative subtle concentric rings in background */}
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full border border-forest/10" />
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-60 w-60 rounded-full border border-forest/15" />
        </section>

        {/* ============================================================== */}
        {/* FOOTER                                                         */}
        {/* ============================================================== */}
        <footer className="relative overflow-hidden rounded-[2.5rem] bg-[#0d2618] p-8 sm:p-12 text-cream ring-1 ring-white/10 noise-bg shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
            {/* Col 1 */}
            <div>
              <a
                href="#"
                className="font-display text-3xl font-black tracking-tight text-cream"
              >
                bhoj<span className="text-gold">.</span>
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
                Curating the finest culinary experiences, hidden alleys, and
                Michelin-worthy flavors. Independent, honest, and forever
                obsessed with great food.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-sage">
                  <span className="h-2 w-2 rounded-full bg-sage animate-ping" />
                  Live Platform v2.4
                </span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-display text-base font-bold text-white">
                Explore
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-cream/75">
                <li>
                  <a
                    href="#discover"
                    className="hover:text-sage transition-colors"
                  >
                    Discover
                  </a>
                </li>
                <li>
                  <a
                    href="#restaurants"
                    className="hover:text-sage transition-colors"
                  >
                    Featured Restaurants
                  </a>
                </li>
                <li>
                  <a
                    href="#categories"
                    className="hover:text-sage transition-colors"
                  >
                    Cuisine Cravings
                  </a>
                </li>
                <li>
                  <a
                    href="#dishes"
                    className="hover:text-sage transition-colors"
                  >
                    Legendary Dishes
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    className="hover:text-sage transition-colors"
                  >
                    Diner Reviews
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-display text-base font-bold text-white">
                Curators
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-cream/75">
                <li>
                  <a href="#" className="hover:text-sage transition-colors">
                    Editorial Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sage transition-colors">
                    Restaurant Partnerships
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sage transition-colors">
                    Chef Spotlights
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sage transition-colors">
                    Press & Awards
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-display text-base font-bold text-white">
                Legal & Info
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-cream/75">
                <li>
                  <a href="#" className="hover:text-sage transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sage transition-colors">
                    Terms of Dining
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sage transition-colors">
                    Community Conduct
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sage transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Huge Architectural Brand Watermark */}
          <div className="relative mt-12 overflow-hidden border-t border-white/10 pt-6">
            <p
              aria-hidden="true"
              className="select-none font-display text-[26vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.04] sm:text-[18vw] xl:text-[18rem]"
            >
              bhoj.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-cream/50 mt-4">
              <p>© 2026 Bhoj Technologies Inc. All rights reserved.</p>
              <p>Designed with glassmorphic craft & GSAP motion.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* ============================================================== */}
      {/* INTERACTIVE REVIEW MODAL (Self-contained, zero external store) */}
      {/* ============================================================== */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setShowReviewModal(false)}
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-[#17392a] p-6 sm:p-8 text-cream shadow-2xl ring-1 ring-white/20 noise-bg">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {submittedReview ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-sage mb-4 animate-bounce" />
                <h3 className="font-display text-2xl font-bold text-white">
                  Review Shared!
                </h3>
                <p className="mt-2 text-sm text-cream/70">
                  Thank you for helping our community discover authentic food.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sage">
                  Write A Review
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-white mt-1">
                  How was your meal?
                </h3>
                <p className="text-xs text-cream/70 mt-1">
                  Share your honest tasting notes and dishes to recommend.
                </p>

                <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-cream/80 mb-1">
                      Restaurant Name
                    </label>
                    <select
                      value={reviewForm.restaurant}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          restaurant: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-cream border border-white/15 focus:outline-none focus:ring-2 focus:ring-sage"
                    >
                      <option
                        value="Kasundi Kitchen"
                        className="bg-forest text-cream"
                      >
                        Kasundi Kitchen
                      </option>
                      <option
                        value="The Dosa Counter"
                        className="bg-forest text-cream"
                      >
                        The Dosa Counter
                      </option>
                      <option
                        value="Forno & Flour"
                        className="bg-forest text-cream"
                      >
                        Forno & Flour
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cream/80 mb-1">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() =>
                            setReviewForm({ ...reviewForm, rating: star })
                          }
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= reviewForm.rating
                                ? "fill-gold text-gold"
                                : "text-white/20"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-bold text-gold">
                        {reviewForm.rating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cream/80 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sourav G."
                      value={reviewForm.name}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, name: e.target.value })
                      }
                      className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-cream border border-white/15 placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cream/80 mb-1">
                      Your Dining Review
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How was the texture, spice, service, and atmosphere?"
                      value={reviewForm.text}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, text: e.target.value })
                      }
                      className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-cream border border-white/15 placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sage"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-sage py-3.5 text-xs font-bold uppercase tracking-wider text-forest shadow-lg hover:bg-white transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UI;
