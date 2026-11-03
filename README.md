# EMBER & OAK — Specialty Coffee Roastery

> *"Coffee, slowly made. The journey from fire to table."*

EMBER & OAK is a cinematic, editorial, full-stack specialty coffee roastery web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **GSAP & ScrollTrigger**, and an automated backend layer powered by **n8n** and **Google Gemini AI**.

---

## 1. Brand Concept & Visual Identity

- **EMBER**: The heat, kinetic fire, and thermodynamic precision of 12kg cast-iron micro-batch roasting.
- **OAK**: Patience, slow maturation, and the quiet warmth of 72 hours resting inside charred French Oak barrels.
- **Narrative Journey**: As visitors scroll, lighting and tones evolve from ember-orange firelight into amber cellar oak, resolving into the warm cream of the morning coffee tasting room.

### Exact Brand Palette
- **Deep Espresso**: `#17120F` *(Dominates ~70% of UI)*
- **Warm Cream**: `#F3EBDD` *(Used in exactly two focal sections: Menu & Reservations)*
- **Burnt Copper**: `#B97845` *(Accents, highlights, and borders)*
- **Muted Olive**: `#77735B` *(Oak chapter accents)*
- **Char**: `#0E0B09` *(Subterranean and footer surfaces)*
- **Oak Brown**: `#231C16` *(Secondary dark panels & solid navigation state)*
- **Deep Olive**: `#3B3A2D` *(Oak maturation chapter full-width background)*
- **Ash**: `rgba(243, 235, 221, 0.68)` *(Secondary editorial typography)*

### Typography
- **Display Headings**: `Instrument Serif` (Google Fonts)
- **Body & Navigation**: `Hanken Grotesk` (Google Fonts)

---

## 2. Homepage Architecture (8 Cinematic Chapters)

1. **Chapter I — The Ember (Hero)**: Full-screen opening sequence featuring original `hero-roaster.mp4`, dynamic transparent-to-solid navigation transition, and cinematic editorial reveals.
2. **Chapter II — The Slow Statement**: The roasting philosophy: *"We do not rush what fire must teach, nor shorten what oak must finish."* Three pillars and micro-batch metrics.
3. **Chapter III — The Roast**: GSAP ScrollTrigger pinned animation showcasing `roast-process.mp4`. Synchronized scrub through *Green & Patient*, *Gold & Sweet*, and *Dark Enough to Sing*.
4. **Chapter IV — The Oak**: Full-width Deep Olive section featuring `oak-cellar.mp4`, exploring the science of 72-hour carbon discharge and oak tannin absorption.
5. **Chapter V — The Menu**: First Warm Cream section featuring `milk-pour.mp4`, editorial specialty menu layouts, tasting notes, and origins.
6. **Chapter VI — The Room**: Interactive spatial architectural showcase of the zinc brew bar, mezzanine roastery, reading library, and barrel cellar.
7. **Chapter VII — Evenings & Gatherings**: Program guide for Saturday origin cuppings, Oak Hour analog vinyl nights, and masterclasses.
8. **Chapter VIII — Reserve & Visit**: Second Warm Cream section with interactive table reservation booking form, Foundry Quarter location, and transit instructions.

---

## 3. Dedicated Website Routes

- `/` — Complete 8-chapter cinematic storytelling homepage
- `/menu` — Comprehensive specialty coffee menu, tasting note search, terroir specs, and whole-bean retail catalog
- `/story` — The founders' journey, 12kg cast-iron roasting drum, 72h oak aging, and direct trade contracts
- `/reservations` — Dedicated table and public cupping reservation booking portal
- `/events` — Public cupping calendar, vinyl evenings, and private hire inquiry portal
- `/contact` — Direct inquiry forms, transit directions, and specialty wholesale roastery partnerships

---

## 4. Full-Stack API & Automation Architecture

### Server API Endpoints
- `POST /api/reservations` — Validates reservation data and forwards to n8n reservation webhook.
- `POST /api/contact` — Validates customer messages and dispatches to n8n contact webhook.
- `POST /api/events` — Validates private event specifications and forwards to n8n events webhook.
- `POST /api/faq` — Secure concierge API combining Gemini 1.5 Flash, n8n webhook, and local grounded knowledge base.

### n8n Workflows Included (`/n8n`)
- `reservation-workflow.json` — Receives booking, appends to Google Sheets, sends guest confirmation email via Gmail, and alerts the roastery floor manager.
- `contact-workflow.json` — Logs inquiries to Google Sheets and dispatches Gmail alert to staff.
- `event-workflow.json` — Evaluates private hire parameters, updates Google Sheets roster, and alerts the hospitality director.
- `faq-workflow.json` — Handles live questions from the floating AI Roastery Concierge.

See [n8n/README.md](./n8n/README.md) for full Docker and Cloudflare Tunnel integration instructions.

---

## 5. Development & Production Build

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm or pnpm

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Gauravi004/ember-and-oak-cafe.git
cd ember-and-oak-cafe

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### Production Build Verification
```bash
npm run build
npm run start
```

---

## 6. Performance, Accessibility & Reduced Motion

- **Single-Playback Video Engine**: Videos utilize IntersectionObserver so only visible media actively renders frames, conserving GPU and mobile battery life.
- **Preload & Posters**: High-resolution `hero-poster.webp` serves as video preloader and static fallback.
- **prefers-reduced-motion**: Respects user operating system preferences by substituting pinned scroll scrubbing with accessible static step transitions.
- **Semantic HTML & Contrast**: Accessible form labels, ARIA landmarks, WCAG AA compliant contrast ratios across dark and cream sections.
- **Zero Hallucination AI Grounding**: The AI FAQ concierge is strictly constrained to verified Ember & Oak cafe facts.
