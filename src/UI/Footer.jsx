import * as React from "react";
import gsap from "gsap";

// Halftone Wordmark Footer — customized for Bhoj Culinary Guide
// Features interactive spring-physics halftone dots, custom branding, and responsive layout.

export const PRESETS = {
  bhoj: { background: "#0a1f13", ink: "#f7f4ea", warm: "#e2ab35" },
  forest: { background: "#0f2a1b", ink: "#cbd9a8", warm: "#e2ab35" },
  cream: { background: "#f7f4ea", ink: "#0f2a1b", warm: "#e2ab35" },
  night: { background: "#0c0c0b", ink: "#e9e4da", warm: "#e9762b" },
  paper: { background: "#efebe3", ink: "#17150f", warm: "#c2361c" },
  ember: { background: "#160a06", ink: "#f2c48c", warm: "#ff5a1f" },
  cobalt: { background: "#0d1b4d", ink: "#dfe7ff", warm: "#ffcd3c" },
};

export const DEFAULT_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Curated Dishes", href: "/dishes" },
      { label: "Top Restaurants", href: "/restaurants" },
      { label: "Heritage Categories", href: "/categories" },
      { label: "Verified Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Cuisines",
    links: [
      { label: "Bengali Heirloom", href: "/categories" },
      { label: "Awadhi & Mughlai", href: "/categories" },
      { label: "South Indian Tiffin", href: "/categories" },
      { label: "Artisanal Wood-Fired", href: "/categories" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "hello@bhoj.guide", href: "mailto:hello@bhoj.guide" },
      { label: "+91 98300 12345", href: "tel:+919830012345" },
      { label: "Submit Secret Gem", href: "#" },
      { label: "Taste Guidelines", href: "#" },
    ],
  },
];

const SANS_STACK = "'Syne', sans-serif";
const MONO_STACK = "'Instrument Sans', sans-serif";

/** Hex → [r, g, b] in 0–255 */
export function hwfHex(hex) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((hex || "").trim());
  if (!m) return null;
  const h =
    m[1].length === 3
      ? m[1]
          .split("")
          .map((c) => c + c)
          .join("")
      : m[1];
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/** Dot radius for a cell coverage in [0, 1] */
export function hwfRadius(coverage, gap) {
  const c = coverage < 0 ? 0 : coverage > 1 ? 1 : coverage;
  return Math.sqrt(c) * gap * 0.56;
}

/**
 * One step of a dot's spring back to home, plus push from pointer
 */
export function hwfStep(x, y, vx, vy, hx, hy, px, py, r) {
  const dx = x - px;
  const dy = y - py;
  const d2 = dx * dx + dy * dy;
  if (r > 0 && d2 < r * r) {
    const d = Math.sqrt(d2) + 0.001;
    const f = (1 - d / r) * 2.6;
    vx += (dx / d) * f;
    vy += (dy / d) * f;
  }
  vx = (vx + (hx - x) * 0.05) * 0.84;
  vy = (vy + (hy - y) * 0.05) * 0.84;
  return [x + vx, y + vy, vx, vy];
}

/** Warmth factor: 0 at home, 1 when displaced */
export function hwfWarmth(x, y, hx, hy, span) {
  const d = Math.hypot(x - hx, y - hy);
  return span > 0 ? Math.min(1, d / span) : 0;
}

/** Font size helper */
export function hwfFitSize(measured, width) {
  return measured > 0 ? (width / measured) * 100 : 0;
}

const HWF_CSS = `
.hwf-root {
  position: relative; width: 100%; overflow: hidden; isolation: isolate;
  background: var(--hwf-bg); color: var(--hwf-ink); -webkit-font-smoothing: antialiased;
}
.hwf-root canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; max-width: none; cursor: none; }
.hwf-top {
  position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1.35fr) repeat(3, minmax(0, 1fr));
  gap: 28px; padding: clamp(28px, 4vw, 48px) clamp(20px, 4vw, 56px) 0;
  font-family: var(--hwf-mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; line-height: 1.8;
  cursor: default;
}
.hwf-brand strong { display: block; font-family: var(--hwf-font); font-size: 26px; font-weight: 900; letter-spacing: -0.02em; text-transform: lowercase; line-height: 1.2; color: var(--hwf-ink); }
.hwf-brand strong span { color: #e2ab35; }
.hwf-brand p { opacity: .65; font-size: 11.5px; letter-spacing: .08em; text-transform: none; margin-top: 6px; line-height: 1.5; font-family: var(--hwf-mono); max-width: 280px; }
.hwf-col h3 { margin: 0 0 12px 0; font: inherit; opacity: .55; font-weight: 700; color: #cbd9a8; letter-spacing: .16em; }
.hwf-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.hwf-col a {
  color: inherit; text-decoration: none; opacity: .8; background: none; border: 0; padding: 0;
  font: inherit; letter-spacing: inherit; text-transform: inherit; cursor: pointer;
  background-image: linear-gradient(#e2ab35, #e2ab35); background-size: 0% 1px;
  background-repeat: no-repeat; background-position: 0 100%; transition: opacity .25s ease, color .25s ease, background-size .35s cubic-bezier(.2,.7,.1,1);
}
.hwf-col a:hover { opacity: 1; color: #e2ab35; background-size: 100% 1px; }
.hwf-col a:focus-visible { outline: 1px solid currentColor; outline-offset: 3px; opacity: 1; }
.hwf-rule {
  position: relative; z-index: 10; display: flex; justify-content: flex-end; align-items: center; gap: 16px;
  margin: clamp(20px, 3vw, 36px) clamp(20px, 4vw, 56px) 0; padding-top: 14px;
  border-top: 1px solid color-mix(in srgb, var(--hwf-ink) 14%, transparent);
  font-family: var(--hwf-mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  cursor: default;
}
.hwf-up {
  position: relative; z-index: 25;
  display: inline-flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; border-radius: 9999px;
  color: var(--hwf-ink); text-decoration: none; cursor: pointer;
  background: rgba(247, 244, 234, 0.08); border: 1px solid rgba(247, 244, 234, 0.22);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  transition: border-color .25s ease, background-color .25s ease, color .25s ease, box-shadow .25s ease;
  will-change: transform;
}
.hwf-up:hover {
  background: rgba(226, 171, 53, 0.16);
  border-color: #e2ab35;
  color: #e2ab35;
  box-shadow: 0 0 25px rgba(226, 171, 53, 0.35);
}
.hwf-up:focus-visible { outline: 1px solid #e2ab35; outline-offset: 3px; }
.hwf-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (max-width: 820px) {
  .hwf-top { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); row-gap: 28px; }
  .hwf-brand { grid-column: 1 / -1; }
}
@media (max-width: 500px) {
  .hwf-top { grid-template-columns: minmax(0, 1fr); row-gap: 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .hwf-col a, .hwf-up { transition: none; }
}
`;

function BackToTopButton({ onClick }) {
  const btnRef = React.useRef(null);
  const iconRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;

    // Smooth magnetic displacement following cursor
    gsap.to(btnRef.current, {
      x: relX * 0.35,
      y: relY * 0.35,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: relX * 0.18,
        y: relY * 0.18 - 2,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    // Elastic spring back to home position
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.65,
      ease: "elastic.out(1.15, 0.4)",
      overwrite: "auto",
    });

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "elastic.out(1.15, 0.4)",
        overwrite: "auto",
      });
    }
  };

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.08,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseDown = () => {
    gsap.to(btnRef.current, {
      scale: 0.92,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  const handleMouseUp = () => {
    gsap.to(btnRef.current, {
      scale: 1.08,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      aria-label="Back to top"
      className="hwf-up"
    >
      <span ref={iconRef} className="flex items-center justify-center pointer-events-none">
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          className="stroke-current will-change-transform"
        >
          <path
            d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

export function Footer({
  wordmark = "bhoj.",
  label = "bhoj.",
  meta = "Curated Culinary Guide & Epicurean Directory across authentic kitchens.",
  columns = DEFAULT_COLUMNS,
  backToTop = true,
  preset = "bhoj",
  palette,
  dotGap = 6,
  radius = 85,
  crop = 0.2,
  grain = 0.45,
  interactive = true,
  fontFamily = SANS_STACK,
  fontWeight = 800,
  monoFamily = MONO_STACK,
  height = "580px",
  className = "",
}) {
  const colors = { ...(PRESETS[preset] || PRESETS.bhoj), ...(palette || {}) };
  const rootRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const opts = React.useRef({
    colors,
    dotGap,
    radius,
    crop,
    grain,
    interactive,
    fontFamily,
    fontWeight,
    wordmark,
  });
  opts.current = {
    colors,
    dotGap,
    radius,
    crop,
    grain,
    interactive,
    fontFamily,
    fontWeight,
    wordmark,
  };
  const key = [
    wordmark,
    dotGap,
    crop,
    grain,
    fontFamily,
    fontWeight,
    colors.background,
    colors.ink,
    colors.warm,
  ].join("|");

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let px = -1e5;
    let py = -1e5;
    let raf = 0;
    let visible = true;
    let awake = true;
    let ring = { x: 0, y: 0, t: -1 };
    let dots = new Float32Array(0);
    let count = 0;
    let grainTile = null;
    let minDotY = 220;
    const ink = hwfHex(opts.current.colors.ink) || [247, 244, 234];
    const warm = hwfHex(opts.current.colors.warm) || [226, 171, 53];

    const layout = () => {
      const o = opts.current;
      const rect = root.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      // Set wordmark on a 1x mask canvas
      const mask = document.createElement("canvas");
      mask.width = w;
      mask.height = h;
      const m = mask.getContext("2d", { willReadFrequently: true });
      if (!m) return;
      const face = o.fontWeight + " 100px " + o.fontFamily;
      m.font = face;
      const word = o.wordmark || " ";

      // Find bottom of rule / back-to-top button to guarantee zero overlap
      const ruleEl = root.querySelector(".hwf-rule");
      const ruleBottom = ruleEl
        ? ruleEl.getBoundingClientRect().bottom - rect.top
        : 210;
      const c = Math.max(0, Math.min(0.6, o.crop));

      // Calculate fit: scale by width, but clamp so wordmark stays comfortably below the rule line
      const availableH = Math.max(140, h - ruleBottom - 28);
      const widthFit = hwfFitSize(m.measureText(word).width, w * 1.02);
      const maxAllowedFit = availableH / (1 - c * 0.45) / 0.72;
      const fit = Math.min(widthFit, Math.max(80, maxAllowedFit));

      m.font = o.fontWeight + " " + fit + "px " + o.fontFamily;
      const box = m.measureText(word);
      const cap = box.actualBoundingBoxAscent || fit * 0.72;

      // Position baseline so the top of the wordmark starts safely below the rule line
      const safeBaseline = Math.max(h + cap * c, ruleBottom + cap + 28);
      m.fillStyle = "#000";
      m.textBaseline = "alphabetic";
      m.fillText(word, (w - box.width) / 2, safeBaseline);
      const img = m.getImageData(0, 0, w, h).data;

      const gap = Math.max(3, o.dotGap);
      const cols = Math.ceil(w / gap);
      const rows = Math.ceil(h / gap);
      minDotY = ruleBottom + 12;
      const tmp = [];
      for (let gy = 0; gy < rows; gy++) {
        const hy = gy * gap + gap / 2;
        // Strict boundary: Never spawn dots above or across the rule line / button area
        if (hy < minDotY) continue;
        for (let gx = 0; gx < cols; gx++) {
          let sum = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(
                w - 1,
                Math.floor(gx * gap + ((sx + 0.5) * gap) / 3),
              );
              const y = Math.min(
                h - 1,
                Math.floor(gy * gap + ((sy + 0.5) * gap) / 3),
              );
              sum += img[(y * w + x) * 4 + 3];
            }
          }
          const cov = sum / (9 * 255);
          if (cov < 0.06) continue;
          const hx = gx * gap + gap / 2;
          tmp.push(hx, hy, 0, 0, hx, hy, hwfRadius(cov, gap));
        }
      }
      dots = new Float32Array(tmp);
      count = tmp.length / 7;

      // Fine grain tile
      grainTile = document.createElement("canvas");
      grainTile.width = 256;
      grainTile.height = 256;
      const g = grainTile.getContext("2d");
      if (g) {
        const id = g.createImageData(256, 256);
        for (let i = 0; i < id.data.length; i += 4) {
          const v = Math.random() * 255;
          id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
          id.data[i + 3] = Math.random() < 0.5 ? 0 : 255;
        }
        g.putImageData(id, 0, 0);
      }
      awake = true;
    };

    const draw = (now) => {
      const o = opts.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = o.colors.background;
      ctx.fillRect(0, 0, w, h);

      const r = o.interactive && !reduced ? Math.max(0, o.radius) : 0;
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t;
      const ringR = ringAge * 0.9;
      let moving = false;
      for (let i = 0; i < count; i++) {
        const j = i * 7;
        let x = dots[j];
        let y = dots[j + 1];
        let vx = dots[j + 2];
        let vy = dots[j + 3];
        const hx = dots[j + 4];
        const hy = dots[j + 5];
        if (!reduced) {
          if (ringAge < 900) {
            const dx = hx - ring.x;
            const dy = hy - ring.y;
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
            const band = 1 - Math.min(1, Math.abs(d - ringR) / 26);
            if (band > 0) {
              const f = band * 3.2 * (1 - ringAge / 900);
              vx += (dx / d) * f;
              vy += (dy / d) * f;
            }
          }
          const s = hwfStep(x, y, vx, vy, hx, hy, px, py, r);
          x = s[0];
          y = s[1];
          vx = s[2];
          vy = s[3];
          if (
            Math.abs(vx) + Math.abs(vy) > 0.02 ||
            Math.abs(x - hx) + Math.abs(y - hy) > 0.05
          )
            moving = true;
          else {
            x = hx;
            y = hy;
            vx = 0;
            vy = 0;
          }
          dots[j] = x;
          dots[j + 1] = y;
          dots[j + 2] = vx;
          dots[j + 3] = vy;
        }
        const k = hwfWarmth(x, y, hx, hy, 28);
        ctx.fillStyle =
          k > 0.02
            ? "rgb(" +
              Math.round(ink[0] + (warm[0] - ink[0]) * k) +
              "," +
              Math.round(ink[1] + (warm[1] - ink[1]) * k) +
              "," +
              Math.round(ink[2] + (warm[2] - ink[2]) * k) +
              ")"
            : o.colors.ink;
        ctx.beginPath();
        ctx.arc(x, y, dots[j + 6], 0, 6.2832);
        ctx.fill();
      }

      if (grainTile && o.grain > 0) {
        ctx.globalAlpha = Math.min(1, o.grain) * 0.09;
        ctx.globalCompositeOperation = "overlay";
        const pattern = ctx.createPattern(grainTile, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
      awake = moving || ringAge < 900 || px > -1e4;
    };

    const loop = (now) => {
      raf = 0;
      if (!visible) return;
      draw(now);
      if (awake) raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      awake = true;
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const toLocal = (e) => {
      const b = canvas.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    };
    const onMove = (e) => {
      if (!opts.current.interactive) return;
      const p = toLocal(e);
      px = p[0];
      py = p[1];

      // Hide cursor when hovering over the "bhoj" halftone wordmark area
      const isInteractive = Boolean(
        e.target.closest("a, button, input, .hwf-brand"),
      );
      if (!isInteractive && py >= minDotY - 15) {
        root.style.cursor = "none";
      } else {
        root.style.cursor = "auto";
      }

      wake();
    };
    const onLeave = () => {
      px = -1e5;
      py = -1e5;
      root.style.cursor = "auto";
      wake();
    };
    const onDown = (e) => {
      if (!opts.current.interactive || reduced) return;
      if (e.target.closest("a,button")) return;
      const p = toLocal(e);
      ring = { x: p[0], y: p[1], t: performance.now() };
      wake();
    };

    layout();
    draw(performance.now());
    wake();

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    const ro = new ResizeObserver(() => {
      layout();
      wake();
    });
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true;
      if (visible) wake();
    });
    io.observe(root);

    let alive = true;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!alive) return;
        layout();
        wake();
      });
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
    };
  }, [key]);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={rootRef}
      className={"hwf-root " + className}
      style={{
        height,
        "--hwf-bg": colors.background,
        "--hwf-ink": colors.ink,
        "--hwf-mono": monoFamily,
        "--hwf-font": fontFamily,
      }}
    >
      <style>{HWF_CSS}</style>
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="hwf-sr">{wordmark}</span>
      <div className="hwf-top">
        <div className="hwf-brand">
          <strong>
            bhoj<span>.</span>
          </strong>
          <p>{meta}</p>
        </div>
        {columns.map((col) => (
          <nav className="hwf-col" key={col.title} aria-label={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href || "#"}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="hwf-rule">
        {backToTop ? <BackToTopButton onClick={toTop} /> : null}
      </div>
    </footer>
  );
}

export default Footer;
