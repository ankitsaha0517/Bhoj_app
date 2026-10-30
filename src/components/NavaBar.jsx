import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import gsap from "gsap";
import { Btn } from "../UI/Btn";



const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/restaurants", label: "Restaurants" },
  { to: "/all-dishs", label: "Curated Dishes" },
  { to: "/reviews", label: "Reviews" },
];

const NavaBar = ({ onWriteReview }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleWriteReview = () => {
    setMobileMenuOpen(false);
    if (onWriteReview) {
      onWriteReview();
    } else {
      window.dispatchEvent(new CustomEvent("open-review-modal"));
    }
  };

  return (
    <header className="sticky top-0 z-50 h-[20vh] w-full px-4 sm:px-8 flex items-center">
      {/* Blurred glass backdrop for the header area & top gap when content scrolls underneath */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-full -z-10 bg-[#0c2417]/80 backdrop-blur-xl transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
        }}
      />

      <div
        ref={navRef}
        className="relative z-10 mx-auto w-full max-w-350 rounded-[2rem] bg-linear-to-b from-[#f7f4ea] to-[#ece7d6] px-6 py-3.5 text-forest shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/20 backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-2 focus:outline-none"
          >
            <span className="font-display text-3xl font-black tracking-tight text-forest transition-transform duration-300 group-hover:scale-105">
              bhoj
              <span className="text-[#e2ab35] transition-colors duration-300 group-hover:text-forest-700">
                .
              </span>
            </span>
            <span className="hidden sm:inline-block rounded-full bg-forest/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-800">
              Culinary Guide
            </span>
          </Link>

          {/* Central Glassmorphic Floating Tab Nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-[#0f2a1b] px-1 py-1 shadow-inner">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-[#f7f4ea] text-[#0f2a1b] shadow-sm"
                      : "text-[#f7f4ea]/85 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action: Write Review & Mobile Toggle */}
          <div className="flex items-center gap-3">
            
            <Btn
              title={"Add Recipe Dish"}
              theme={1}
              to={"/add-recipe-dish"}
              />
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest md:hidden cursor-pointer hover:bg-forest/10 transition-colors"
              aria-label="Toggle navigation"
            >
              <i
                className={`${
                  mobileMenuOpen ? "ri-close-line" : "ri-menu-line"
                } text-xl`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="mt-3 border-t border-forest/15 pt-3 md:hidden">
            <div className="flex flex-col gap-1.5 font-display text-sm font-semibold text-forest">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2.5 transition-colors ${
                      isActive
                        ? "bg-forest/15 font-bold text-forest"
                        : "hover:bg-forest/5 text-forest/90"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <button
                onClick={handleWriteReview}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-xs font-bold uppercase tracking-wider text-cream cursor-pointer"
              >
                <i className="ri-quill-pen-line text-[#e2ab35] text-sm" />
                <span>Write a review</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavaBar;
