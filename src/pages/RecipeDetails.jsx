import { useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { recipeContext } from "../context/RecipeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  ArrowLeft,
  Clock,
  ChefHat,
  Heart,
  Sparkles,
  UtensilsCrossed,
  Star,
  ChevronUp,
  ChevronDown,
  Bookmark,
  Pencil,
  Trash2,
} from "lucide-react";
import Tag from "../UI/Tag";

const RecipeDetails = () => {
  const naigate = useNavigate();
  const { id } = useParams();
  const { data, setData } = useContext(recipeContext);

  // Filter recipe by ID from context
  const recipe = data?.find((item) => String(item.id) === String(id));

  // Interactive UI states mirroring the reference image
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Accordion open/close states
  const [descOpen, setDescOpen] = useState(true);
  const [ingredientsOpen, setIngredientsOpen] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(true);

  if (!recipe) {
    return (
      <div className="relative z-10 mx-auto flex min-h-[60vh] w-full max-w-350 flex-col items-center justify-center px-4 py-16 text-center text-cream sm:px-8">
        <div className="rounded-full border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <UtensilsCrossed className="h-10 w-10 text-sage" />
        </div>
        <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-red-600">
          Recipe Not Found
        </h2>
        <p className="mt-2 text-sm text-cream/70 max-w-md">
          The dish you are looking for may have been removed or is unavailable
          in our curated culinary collection.
        </p>
        <Link
          to="/all-dishs"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f7f4ea] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0f2a1b] hover:bg-[#e2ab35] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Curated Dishes
        </Link>
      </div>
    );
  }

  const {
    recipeName,
    restaurantName,
    cuisine,
    cookingTime,
    ingredients,
    instructions,
    imageUrl,
  } = recipe;

  const ingredientList = ingredients
    ? ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  // Gallery snapshots (Main image + angle previews)
  const galleryImages = [
    imageUrl ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
  ];

  const deleteHandler = () => {
    const remainderData = data?.filter(
      (item) => String(item.id) !== String(id),
    );

    naigate("/all-dishs");
    setData(remainderData);
  };

  const updateHandler = (id) => {
    naigate(`/recipes/details/update/${id}`);
  };
  return (
    <div className="relative z-10 mx-auto w-full max-w-350 px-4 py-6 sm:px-8 sm:py-10">
      {/* 1. Breadcrumb & Back Navigation (Matching top left of reference) */}
      <nav className="mb-6 flex items-center justify-between text-xs text-cream/60">
        <div className="flex items-center gap-2">
          <Link
            to="/all-dishs"
            className="group flex items-center gap-1.5 text-cream/80 hover:text-[#e2ab35] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-semibold">Curated Dishes</span>
          </Link>
          <span>/</span>
          <span className="text-[#e2ab35] font-medium line-clamp-1 max-w-[200px] sm:max-w-none">
            {recipeName}
          </span>
        </div>
      </nav>

      {/* 2. Main Two-Column Showcase (Matching reference layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Big Product Image & Thumbnail Gallery (Powered by Swiper) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Main Large Showcase Image Card with Swiper Touch/Drag */}
          <div className="relative w-full aspect-[4/4.5] sm:aspect-[4/4] overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#0a1f13] shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
            <Swiper
              onSwiper={setSwiperInstance}
              onSlideChange={(s) => setActiveSlideIndex(s.activeIndex)}
              spaceBetween={0}
              slidesPerView={1}
              speed={450}
              grabCursor={true}
              className="h-full w-full"
            >
              {galleryImages.map((img, idx) => (
                <SwiperSlide key={idx} className="h-full w-full">
                  <img
                    src={img}
                    alt={`${recipeName} view ${idx + 1}`}
                    className="h-full w-full object-cover select-none pointer-events-none"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f13]/90 via-transparent to-black/30 pointer-events-none z-10" />

            {/* Top Indicator Dots (matching reference image) */}
            <div className="absolute top-4 inset-x-0 flex justify-center gap-1.5 pointer-events-none z-20">
              {galleryImages.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlideIndex === i
                      ? "w-6 bg-white shadow-sm"
                      : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Floating Top Badge */}
            <div className="absolute top-5 left-5 z-20">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sage backdrop-blur-md">
                <Sparkles className="h-3 w-3 text-[#e2ab35]" />
                Verified Heirloom
              </span>
            </div>
          </div>

          {/* 3 Thumbnails Row (Syncs with Swiper) */}
          <div className="grid grid-cols-3 gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveSlideIndex(idx);
                  swiperInstance?.slideTo(idx);
                }}
                className={`relative aspect-square overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeSlideIndex === idx
                    ? "border-[#e2ab35] ring-2 ring-[#e2ab35]/40 scale-[1.02]"
                    : "border-white/15 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt="Snapshot"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Recipe Details & Interactive Specs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Header & Title */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Tag title={cuisine || "Authentic Dish"} />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateHandler(id)}
                  title="Update Recipe"
                  aria-label="Update Recipe"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-cream/75 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#e2ab35] hover:bg-[#e2ab35] hover:text-[#0f2a1b] hover:shadow-[0_0_16px_rgba(226,171,53,0.35)] cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={deleteHandler}
                  title="Delete Recipe"
                  aria-label="Delete Recipe"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-cream/75 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-rose-500 hover:bg-rose-500 hover:text-white hover:shadow-[0_0_16px_rgba(244,63,94,0.35)] cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h1 className="font-display 2xl:text-[2.4vw] lg:text-[3vw] font-black uppercase tracking-tight text-white leading-tight">
              {recipeName}
            </h1>

            {/* Restaurant Origin Subtitle */}
            <p className="mt-2 flex items-center gap-2 text-sm text-cream/75">
              <ChefHat className="h-4 w-4 text-[#e2ab35] shrink-0" />
              <span className="font-semibold text-white">{restaurantName}</span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1 text-[#e2ab35] font-bold">
                <Star className="h-3.5 w-3.5 fill-current" />
                {recipe.rating || "4.8"}
              </span>
            </p>
          </div>

          {/* Slow Cooking Alert Bar (Matching the delivery/order timer pill in reference) */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
            <Clock className="h-4 w-4 text-[#e2ab35] shrink-0" />
            <p className="text-xs text-cream/80">
              Estimated prep & cooking time:{" "}
              <strong className="text-white font-semibold">
                {cookingTime ? `${cookingTime} Minutes` : "60 Minutes"}
              </strong>{" "}
              slow-braised to perfection.
            </p>
          </div>

          {/* Action Row: Primary Button + Heart */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className={`w-[70%] flex items-center justify-center gap-2 rounded-full py-3 px-6 font-display text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isSaved
                  ? "bg-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                  : "bg-[#f7f4ea] text-[#0f2a1b] hover:bg-[#e2ab35] hover:shadow-[0_0_25px_rgba(226,171,53,0.35)]"
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
              />
              <span>
                {isSaved ? "Saved to Tasting List" : "Save to Tasting List"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsLiked(!isLiked)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer ${
                isLiked
                  ? "border-rose-500/60 bg-rose-500/20 text-rose-400"
                  : "border-white/15 bg-white/[0.04] text-cream/70 hover:bg-white/10 hover:text-white"
              }`}
              aria-label="Favorite"
            >
              <Heart
                className={`h-5 w-5 ${isLiked ? "fill-current scale-110" : ""}`}
              />
            </button>
          </div>

          {/* Accordion Panels (Matching "Description & Fit" and "Shipping" from reference) */}
          <div className="flex flex-col gap-3 pt-2">
            {/* 1. Description & Preparation Method */}
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setDescOpen(!descOpen)}
                className="flex w-full items-center justify-between p-4 text-left text-xs sm:text-sm font-bold tracking-wide text-white hover:bg-white/[0.02] cursor-pointer"
              >
                <span>Preparation Steps & Method</span>
                {descOpen ? (
                  <ChevronUp className="h-4 w-4 text-sage" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-cream/60" />
                )}
              </button>

              {descOpen && (
                <div className="border-t border-white/10 p-4 text-xs sm:text-sm leading-relaxed text-cream/80 whitespace-pre-line">
                  {instructions ||
                    "Slow cook with heirloom spices on a gentle woodfire simmer until deeply aromatic."}
                </div>
              )}
            </div>

            {/* 2. Signature Ingredients Accordion */}
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setIngredientsOpen(!ingredientsOpen)}
                className="flex w-full items-center justify-between p-4 text-left text-xs sm:text-sm font-bold tracking-wide text-white hover:bg-white/[0.02] cursor-pointer"
              >
                <span>
                  Signature Ingredients ({ingredientList.length || 0})
                </span>
                {ingredientsOpen ? (
                  <ChevronUp className="h-4 w-4 text-sage" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-cream/60" />
                )}
              </button>

              {ingredientsOpen && (
                <div className="border-t border-white/10 p-4 flex flex-wrap gap-2">
                  {ingredientList.length > 0 ? (
                    ingredientList.map((item, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-cream/90 backdrop-blur-md"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-cream/60">
                      No specific ingredients listed.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* 3. Heritage Specs 4-Grid (Matching the 4-icon card in reference!) */}
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setSpecsOpen(!specsOpen)}
                className="flex w-full items-center justify-between p-4 text-left text-xs sm:text-sm font-bold tracking-wide text-white hover:bg-white/[0.02] cursor-pointer"
              >
                <span>Culinary & Kitchen Specs</span>
                {specsOpen ? (
                  <ChevronUp className="h-4 w-4 text-sage" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-cream/60" />
                )}
              </button>

              {specsOpen && (
                <div className="border-t border-white/10 p-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-sage shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-cream/50">
                        Cook Time
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {cookingTime || "45"} Mins
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-sage shrink-0">
                      <UtensilsCrossed className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-cream/50">
                        Cuisine
                      </span>
                      <span className="text-xs font-semibold text-white line-clamp-1">
                        {cuisine}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-sage shrink-0">
                      <ChefHat className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-cream/50">
                        Kitchen
                      </span>
                      <span className="text-xs font-semibold text-white line-clamp-1">
                        {restaurantName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-sage shrink-0">
                      <Sparkles className="h-4 w-4 text-[#e2ab35]" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-cream/50">
                        Verification
                      </span>
                      <span className="text-xs font-semibold text-emerald-400">
                        Heirloom Grade
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Row: Update & Delete Recipe Buttons (Styled matching site's pill buttons) */}
            <div className="flex items-center gap-10 pt-1 hidden">
              <button
                type="button"
                className="group  flex items-center justify-center gap-3 rounded-full bg-[#f7f4ea] text-[#0f2a1b] hover:bg-[#e2ab35] py-2 px-3 font-display text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-[0_0_25px_rgba(226,171,53,0.35)] transition-all duration-300 cursor-pointer"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0f2a1b] text-[#f7f4ea] group-hover:bg-[#0f2a1b] transition-colors shrink-0">
                  <Pencil className="h-3.5 w-3.5" />
                </span>
                <span>Update the recipe</span>
              </button>

              <button
                type="button"
                onClick={deleteHandler}
                className="group  flex items-center justify-center gap-3 rounded-full border border-rose-500/30 bg-rose-500/15 text-rose-200 hover:bg-rose-600 hover:text-white hover:border-rose-600 py-2 px-3  font-display text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md shadow-md hover:shadow-[0_0_25px_rgba(225,29,72,0.35)] transition-all duration-300 cursor-pointer"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/25 text-rose-200 group-hover:bg-white group-hover:text-rose-600 transition-colors shrink-0">
                  <Trash2 className="h-3.5 w-3.5" />
                </span>
                <span>Delete the recipe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Rating & Reviews Section (Matching bottom half of reference image!) */}
      <section className="mt-14 sm:mt-20 border-t border-white/10 pt-10">
        <h2 className="font-['Instrument_Sans'] text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
          Rating & Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Overall Score & Bar Distribution (Aligned mirroring reference) */}
          <div className="lg:col-span-5 flex items-center gap-8 sm:gap-10">
            {/* Big Score: Aligned with inline / 5 like reference image */}
            <div className="flex flex-col items-start shrink-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Instrument_Sans'] text-5xl sm:text-6xl font-bold tracking-tight text-white leading-none">
                  {recipe.rating || "4.8"}
                </span>
                <span className="font-['Instrument_Sans'] text-base sm:text-lg font-medium text-cream/50">
                  / 5
                </span>
              </div>
              <span className="font-['Instrument_Sans'] text-xs text-cream/50 mt-2 font-medium">
                (142 Diners)
              </span>
            </div>

            {/* Distribution Bars */}
            <div className="flex-1 flex flex-col justify-center gap-2">
              {[
                { stars: 5, pct: "85%" },
                { stars: 4, pct: "11%" },
                { stars: 3, pct: "3%" },
                { stars: 2, pct: "1%" },
                { stars: 1, pct: "0%" },
              ].map((row) => (
                <div
                  key={row.stars}
                  className="flex items-center gap-2.5 text-xs"
                >
                  <span className="flex items-center gap-1 w-6 text-cream/70 font-semibold shrink-0">
                    <Star className="h-3 w-3 fill-[#e2ab35] text-[#e2ab35]" />
                    <span>{row.stars}</span>
                  </span>
                  <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#f7f4ea]"
                      style={{ width: row.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Featured Verified Review Card (Matching right card in reference) */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-7 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-1 text-[#e2ab35]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-sage">5.0</span>
                </div>
                <span className="text-xs text-cream/50">18 Oct 2026</span>
              </div>

              <blockquote className="my-4 text-xs sm:text-sm leading-relaxed text-cream/85 italic">
                “The slow-cooked texture and authentic spices captured the
                genuine heritage fire. Easily one of the most memorable dishes
                discovered through Bhoj.”
              </blockquote>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Reviewer"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white/15"
                />
                <div>
                  <span className="block font-['Instrument_Sans'] text-sm font-bold text-white">
                    Riya Sen
                  </span>
                  <span className="text-[11px] text-sage font-medium">
                    ✓ Verified Diner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;
