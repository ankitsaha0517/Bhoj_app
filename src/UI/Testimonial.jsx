import React from "react";
import Tag from "./Tag";

/**
 * Clean, Translucent Glassmorphic Card that blends with any background
 */
export const TestimonialCard = ({
  author,
  text,
  rating = 5,
  restaurant,
  dish,
  href,
}) => {
  const CardContent = (
    <div className="relative flex w-[320px] sm:w-[380px] shrink-0 flex-col justify-between rounded-[2rem] bg-white/[0.04] p-6 sm:p-7 text-cream shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-white/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
      {/* Top Meta: Gold Stars & Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-1 text-[#e2ab35]">
          {[...Array(rating)].map((_, i) => (
            <svg
              key={i}
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
          <span className="ml-1 text-[11px] font-bold text-sage">5.0</span>
        </div>

        {restaurant && (
          <span className="rounded-full bg-white/10 px-3 py-0.5 text-[10px] font-semibold text-sage border border-white/10 backdrop-blur-md">
            {restaurant}
          </span>
        )}
      </div>

      {/* Review Text */}
      <blockquote className="my-5 text-xs sm:text-sm leading-relaxed text-cream/90 font-sans">
        “{text}”
      </blockquote>

      {/* Author Footer */}
      <div className="flex items-center gap-3 pt-3.5 border-t border-white/10">
        <img
          src={author.avatar}
          alt={author.name}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white/15"
          loading="lazy"
        />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-sm font-bold text-white tracking-tight">
              {author.name}
            </span>
            <span className="text-[10px] text-sage font-medium">✓ Verified</span>
          </div>
          <span className="text-[11px] text-cream/60">
            {author.handle || (dish ? `Tried ${dish}` : "Verified Diner")}
          </span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

/**
 * Reusable seamless Marquee Row with dual identical tracks
 */
const MarqueeRow = ({ items, reverse = false, duration = "38s" }) => {
  // Ensure enough items so there is no gap on wide monitors
  const trackItems = items.length < 5 ? [...items, ...items] : items;

  return (
    <div
      className="group flex overflow-hidden py-2.5 [--gap:1.5rem] [gap:var(--gap)] flex-row w-full select-none"
      style={{ "--duration": duration }}
    >
      {/* Primary Track */}
      <div
        className={`flex shrink-0 items-stretch justify-around [gap:var(--gap)] flex-row ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused] will-change-transform`}
      >
        {trackItems.map((testimonial, i) => (
          <TestimonialCard key={`track1-${i}`} {...testimonial} />
        ))}
      </div>

      {/* Secondary Track for 100% seamless infinite looping without glitch or snapping */}
      <div
        aria-hidden="true"
        className={`flex shrink-0 items-stretch justify-around [gap:var(--gap)] flex-row ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused] will-change-transform`}
      >
        {trackItems.map((testimonial, i) => (
          <TestimonialCard key={`track2-${i}`} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

/**
 * Seamless Infinite Marquee Testimonials Section with CSS Alpha Edge Masking
 */
export function TestimonialsSection({
  tag = "Epicurean Community",
  title = "DISHES PRAISED BY",
  highlight = "DINERS across town.",
  description = "Join thousands of genuine food enthusiasts uncovering authentic heirloom kitchens, hidden street gems, and iconic heritage tables.",
  testimonials = defaultTestimonials,
  className = "",
}) {
  // Split into two organic rows: row 1 moves left, row 2 moves right
  const row1 = testimonials.filter((_, i) => i % 2 === 0);
  const row2 = testimonials.filter((_, i) => i % 2 !== 0);

  return (
    <section
      className={`relative z-10 w-full bg-transparent py-12 sm:py-16 text-cream ${className}`}
    >
      <div className="mx-auto flex max-w-350 flex-col items-center gap-8 text-center sm:gap-12 px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-3 max-w-2xl text-center">
          {tag && (
           <Tag title={tag}/>
          )}

          <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl text-cream">
            {title}{" "}
            {highlight && (
              <span className="italic font-serif font-normal text-sage block sm:inline">
                {highlight}
              </span>
            )}
          </h2>

          {description && (
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-cream/70 max-w-xl">
              {description}
            </p>
          )}
        </div>

        {/* Marquee Track with CSS Alpha Masking: eliminates harsh solid edges */}
        <div
          className="relative flex w-full flex-col items-center justify-center overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {/* Row 1: Leftward moving infinite marquee */}
          <MarqueeRow items={row1.length > 0 ? row1 : testimonials} reverse={false} duration="36s" />

          {/* Row 2: Rightward moving reverse infinite marquee */}
          {row2.length > 0 && (
            <MarqueeRow items={row2} reverse={true} duration="42s" />
          )}
        </div>
      </div>
    </section>
  );
}

export const defaultTestimonials = [
  {
    author: {
      name: "Siddharth Bose",
      handle: "@sidbose",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    restaurant: "Chinatown Dim Sums",
    dish: "Prawn Har Gow",
    text: "Finding early morning Tiretti Bazaar stalls made effortless. The verified visitor badge gives absolute peace of mind.",
    href: "#",
  },
  {
    author: {
      name: "Riya Sen",
      handle: "@riyacooks",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    restaurant: "Kasundi Kitchen",
    dish: "Royal Kosha Mangsho",
    text: "The slow-simmered mangsho had genuine mustard fire and melted tenderly. Unfiltered food curation done right!",
    href: "#",
  },
  {
    author: {
      name: "Arjun Mukherjee",
      handle: "@arjunfoodie",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    restaurant: "The Dosa Counter",
    dish: "Crisp Ghee Podi Roast",
    text: "That aroma of A2 ghee podi hits you the moment you arrive. Honest taste audits without sponsored bias.",
    href: "#",
  },
  {
    author: {
      name: "Neha Kapoor",
      handle: "@nehawanders",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    restaurant: "Forno & Flour",
    dish: "Margherita Verace",
    text: "The 72-hour sourdough crust has magnificent air pockets. Bhoj has become my personal culinary compass in this city.",
    href: "#",
  },
  {
    author: {
      name: "Kabir Mehta",
      handle: "@kabir.eats",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    },
    restaurant: "Purani Dilli Flavours",
    dish: "Braised Mutton Nihari",
    text: "The 8-hour braised gravy with fragrant bone marrow is pure nostalgia. Truly captures the soul of Old Delhi culinary craft.",
    href: "#",
  },
  {
    author: {
      name: "Ananya Roy",
      handle: "@ananya_traveller",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
    restaurant: "Glenary's Heritage",
    dish: "Darjeeling Tea & Strudel",
    text: "Sitting by the colonial arched window with warm strudel and Muscatel tea. Bhoj guided us to the authentic secret spots.",
    href: "#",
  },
  {
    author: {
      name: "Devendra Joshi",
      handle: "@dev_foodtrail",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    },
    restaurant: "Kathiyawadi Rasoi",
    dish: "Ringna No Oro & Rotla",
    text: "Charred smoked eggplant with white butter and jaggery made straight over woodfire. Unpretentious village flavours at their finest.",
    href: "#",
  },
  {
    author: {
      name: "Meera Nambiar",
      handle: "@meera.culinary",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    restaurant: "Malabar Express",
    dish: "Alleppey Fish Curry",
    text: "Tangy raw mango, creamy coconut milk, and fresh sea bass with red rice. Every recommendation here is vetted with real devotion.",
    href: "#",
  },
];

export default TestimonialsSection;
