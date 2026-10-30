# 🍛 Bhoj — Curated Culinary Guide & Epicurean Directory

> **A high-performance, glassmorphic culinary discovery web application dedicated to heritage kitchens, regional Indian cuisines, and heirloom recipes.**

![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white&style=for-the-badge)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=white&style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?logo=react-router&logoColor=white&style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-v7-EC5990?logo=reacthookform&logoColor=white&style=for-the-badge)

---

## 📖 Overview

**Bhoj** is an artisanal culinary directory and recipe curation platform crafted with modern web technologies. Designed with an editorial aesthetic, deep forest glassmorphism, and fluid physics-based micro-interactions, Bhoj connects epicureans with authentic regional dining experiences—from Kolkata's slow-simmered *Kosha Mangsho* to Awadhi dum cooking, crisp coastal dosa counters, and wood-fired pizzerias.

---

## ✨ Key Features

- **🌿 Editorial Glassmorphic UI**: Signature deep forest green (`#0f2a1b`) and warm cream (`#f7f4ea`) palette with radiant gold (`#e2ab35`) accents, soft ambient glows, and multi-layered backdrop blur.
- **🧭 Scroll-Aware Floating Navbar**: Glassmorphic pill navigation with active route highlights, animated mobile drawer, and ambient backdrop blur that dynamically activates as content scrolls underneath.
- **⚡ Dual-Track Infinite Testimonial Marquee**: Seamless, zero-stutter infinite marquee carousel moving in complementary directions with pause-on-hover interaction and CSS alpha-mask edge fading.
- **🎨 Interactive Halftone Canvas Footer**: Custom HTML5 Canvas 2D spring physics simulation that renders a giant `"bhoj."` wordmark as halftone dots. Dots part on pointer proximity, warm in color, ripple on click, and feature a magnetic circular "Back to Top" button.
- **📝 Recipe Dish Portal (`/add-recipe-dish`)**: Dedicated culinary submission form powered by `react-hook-form` featuring real-time validation, custom icons, spinnerless numeric inputs, and celebratory submission feedback.
- **🪟 Modular Glassmorphic Popup (`<Popup />`)**: Reusable modal container with GSAP spring entrance/exit physics, body scroll locking, backdrop dismiss, and Escape key listener.
- **🚀 Instant Scroll Restoration**: Automatic scroll reset component (`<ScrollToTop />`) that guarantees every route navigation starts cleanly at the top of the viewport.

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core UI library & component-driven architecture |
| **Vite 8** | Next-generation fast frontend tooling and HMR |
| **Tailwind CSS v4** | Modern utility-first CSS engine with custom `@theme` tokens |
| **GSAP (GreenSock)** | Spring physics, magnetic buttons, and entrance/exit animations |
| **React Router v7** | Client-side routing, navigation, and location hooks |
| **React Hook Form** | Form state management and schema validation |
| **Lucide React** | Modern, lightweight SVG iconography |

---

## 📁 Project Structure

```
Bhoj_App/
├── public/                 # Static assets & favicon
├── src/
│   ├── assets/             # Images and local media
│   ├── components/         # Shared architectural components
│   │   ├── NavaBar.jsx     # Floating glassmorphic header with scroll-aware blur
│   │   └── ScrollToTop.jsx # Route change scroll restoration hook
│   ├── Form/               # Form pages & modules
│   │   └── RecipeDish.jsx  # Recipe submission form with react-hook-form
│   ├── pages/              # Route views
│   │   └── Home.jsx        # Landing page with hero, categories & discovery
│   ├── router/             # Routing configuration
│   │   └── MainRouter.jsx  # React Router route definitions
│   ├── UI/                 # Reusable design system primitives
│   │   ├── Btn.jsx         # Dual-theme animated pill button with expanding pill
│   │   ├── Footer.jsx      # Canvas halftone physics wordmark & magnetic button
│   │   ├── Popup.jsx       # Generic glassmorphic modal with GSAP spring
│   │   ├── Tag.jsx         # Frosted glass category badge
│   │   └── Testimonial.jsx # Seamless dual-track infinite marquee
│   ├── App.jsx             # Application root layout with ambient lighting
│   ├── index.css           # Global Tailwind tokens, keyframes & scrollbar
│   └── main.jsx            # Entry point with BrowserRouter
├── package.json
└── vite.config.js
```

---

## 🎨 Color Palette & Typography

```css
/* Forest & Emerald Shades */
--color-forest:     #0f2a1b;
--color-forest-900: #0a1f13;
--color-forest-800: #17392a;
--color-forest-700: #24543b;

/* Cream & Parchment Tones */
--color-cream:     #f7f4ea;
--color-cream-100: #fbf9f4;
--color-cream-200: #ece7d6;

/* Accent Highlights */
--color-gold:      #e2ab35; /* Signature Bhoj Mustard Gold */
--color-sage:      #cbd9a8; /* Muted botanical sage */
```

- **Headlines & Display**: `'Syne', sans-serif`
- **Body & Captions**: `'Instrument Sans', sans-serif`

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0 or newer) installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/bhoj-app.git
   cd bhoj-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173` to explore Bhoj.

### Available Scripts

- `npm run dev` — Starts Vite dev server with Hot Module Replacement (HMR).
- `npm run build` — Bundles the application for production deployment.
- `npm run preview` — Locally previews the production build.
- `npm run lint` — Runs ESLint to check code quality.

---

<div align="center">
  <sub>Crafted with passion for authentic culinary heritage by the Bhoj team.</sub>
</div>
