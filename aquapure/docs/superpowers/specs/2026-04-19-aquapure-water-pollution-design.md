# AquaPure — Water Pollution Awareness Platform

**Design Spec** | Created: 2026-04-19

---

## Overview

**Name:** AquaPure

**Tagline:** "See the problem. Be the solution."

**Core Purpose:** An interactive web platform that educates users about water pollution through immersive 3D visualizations, real-time water quality data from global APIs, comprehensive information on waterborne diseases, and actionable prevention strategies.

**Target Users:**
- **Students/Educators** — Learning modules, interactive quizzes, disease case studies
- **General Public** — Local water quality checker, health risks, prevention tips
- **Policy Makers** — Data dashboards, disease outbreak patterns, impact statistics

**Key Value:** Users can see water quality through color-coded 3D visuals, understand which diseases are caused by polluted water, and learn how to prevent contamination.

---

## Tech Stack

### Frontend
- **Next.js 14** — App Router, SSR/SSG, built-in optimization
- **React Three Fiber (R3F)** — 3D rendering in React
- **Drei** — R3F helpers (controls, loaders, effects)
- **Three.js** — Core 3D library (via R3F)
- **Framer Motion** — Page transitions, UI animations
- **Tailwind CSS** — Nature-inspired styling
- **21st.dev Components** — Pre-built UI components via MCP integration
- **UI/UX Pro Max Skills** — Design intelligence with industry rules and styles

### Backend
- **Node.js + Express** — REST API for data aggregation
- **MongoDB** — Store cached API data, user submissions, reports
- **Mongoose** — Data modeling
- **Axios** — External API requests
- **Node-cron** — Scheduled water quality data fetching

### External APIs (Real Data)
- **USGS Water Services** — Real-time water quality data
- **WHO Global Health Observatory** — Disease statistics
- **World Bank Climate Data** — Environmental indicators

### UI Component Sources
| Source | Usage |
|--------|-------|
| **21st.dev** | Cards, buttons, forms, modals, navigation, footers |
| **UI/UX Pro Max Rules** | Layout patterns, spacing, typography hierarchy |
| **R3F + Drei** | 3D water effects, splash animations, particle systems |
| **Framer Motion** | Page transitions, scroll animations, hover effects |
| **Tailwind + Custom CSS** | Glassmorphism, water gradients, nature theme |

---

## Page Structure & Routes

### Main Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Hero: 3D flowing water animation + scroll-triggered splash effect, quick stats, CTA buttons |
| `/water-quality` | **Water Quality Explorer** | Interactive 3D water body with color-coded pollution levels, real API data |
| `/diseases` | **Disease Encyclopedia** | Waterborne diseases explorer with symptoms, causes, prevention |
| `/pollution-sources` | **Pollution Sources** | Interactive map/cards showing industrial, agricultural, domestic sources |
| `/prevention` | **Prevention Center** | Practical tips, community actions, policy recommendations |
| `/calculator` | **Water Quality Calculator** | Input parameters → get quality score with color indicator |
| `/stats` | **Impact Statistics** | Animated charts, timelines, global pollution data |

### Hero Section Details (Home Page)
- **3D Flowing Water** — Continuous animated water stream using R3F + shader materials
- **Scroll Interaction** — On scroll, water particles/droplets splash across screen (Framer Motion + R3F)
- **Transition** — Water splash reveals next section smoothly
- **Performance** — Optimized particle count, lazy load below fold

### Shared Components
- `Navbar` — Navigation with water flow animation
- `Footer` — Resources, contact, social links
- `WaterQualityCard` — Reusable color-coded quality display
- `DiseaseCard` — Disease info with expandable details
- `StatCounter` — Animated number counters
- `WaterSplashEffect` — Reusable scroll-triggered splash animation
- `3DWaterFlow` — R3F component for flowing water background
- `GlassCard` — Glassmorphism container component
- `WaterButton` — Water-themed button component

---

## Feature Details

### Water Quality Explorer (`/water-quality`)

**3D Visualization:**
- Interactive 3D water body (lake/river model)
- Color gradient based on pollution level:
  - **Blue** → Clean (Safe)
  - **Green** → Moderate (Acceptable)
  - **Yellow** → Polluted (Caution)
  - **Orange** → Highly Polluted (Warning)
  - **Red/Brown** → Toxic (Danger)
- Hover/click to see specific metrics (pH, turbidity, contaminants)

**Real Data Integration:**
- Fetch from USGS Water Services API
- Display current readings for selected locations
- Auto-refresh every 30 minutes
- Fallback to cached data if API unavailable

### Disease Encyclopedia (`/diseases`)

**Disease Cards (Interactive):**
- **Cholera** — Bacterial infection, contaminated water source
- **Typhoid** — Salmonella typhi, poor sanitation
- **Dysentery** — Intestinal inflammation, polluted water
- **Hepatitis A/E** — Liver infection, waterborne transmission
- **Giardiasis** — Parasite infection, untreated water
- **Lead Poisoning** — Heavy metal contamination

**Each Card Shows:**
- Disease name + icon
- Cause (pollutant type)
- Symptoms list
- Affected regions
- Prevention methods
- Treatment info

**Interaction:** Expandable cards, filter by type (bacterial/viral/parasitic/chemical)

### Pollution Sources (`/pollution-sources`)

**Source Categories (Interactive Cards/Map):**

| Category | Sources | Impact |
|----------|---------|--------|
| **Industrial** | Factory waste, chemical runoff, oil spills | Heavy metals, toxins, ecosystem death |
| **Agricultural** | Fertilizers, pesticides, animal waste | Nitrate pollution, algae blooms |
| **Domestic** | Sewage, household chemicals, plastics | Bacteria, microplastics, pathogens |
| **Mining** | Acid mine drainage, sediment | Acidification, heavy metals |
| **Marine** | Oil spills, plastic dumping, ship waste | Ocean acidification, marine death |

**Visual:** Click source → see animated impact chain (source → pollutant → water → effect)

### Prevention Center (`/prevention`)

**Sections:**

1. **Individual Actions**
   - Reduce plastic use
   - Proper waste disposal
   - Water conservation tips

2. **Community Actions**
   - River cleanup drives
   - Awareness campaigns
   - Local monitoring programs

3. **Policy Recommendations**
   - Stricter regulations
   - Industrial waste treatment
   - Infrastructure investment

4. **Call-to-Action**
   - Join cleanup events (form)
   - Report pollution (submission)
   - Share knowledge (social buttons)

### Water Quality Calculator (`/calculator`)

**Inputs:**
- pH level
- Turbidity (clarity)
- Dissolved oxygen
- Nitrate level
- Temperature
- Location type (river/lake/groundwater)

**Output:**
- Quality score (0-100)
- Color indicator (matches 3D visualization colors)
- Safety recommendation
- Suggested actions if quality is poor

### Impact Statistics (`/stats`)

**Animated Visualizations:**
- Global pollution timeline (animated chart)
- Deaths per year from waterborne diseases
- Pollution growth rate
- Clean water access by region
- Before/after comparisons (clean vs polluted)

**Components:** Animated counters, progress bars, pie charts, interactive world map

---

## Data Flow & Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                           │
│  Next.js + R3F + Framer Motion + 21st.dev Components            │
│  - Glassmorphism containers                                      │
│  - Animated water-themed buttons & inputs                       │
│  - Nature-inspired color palette (blues, greens, aqua)         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS API ROUTES                            │
│  /api/water-quality    → Real-time water data                   │
│  /api/diseases         → Disease database queries               │
│  /api/calculator       → Quality score calculation             │
│  /api/reports          → User pollution reports                 │
│  /api/stats            → Aggregated statistics                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS BACKEND API                           │
│  - Water quality data aggregation                               │
│  - External API orchestration                                   │
│  - Scheduled data fetching (node-cron)                          │
│  - Report submissions                                            │
│  - Cache management                                              │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
     ┌──────────┐      ┌──────────┐      ┌──────────────┐
     │ MongoDB  │      │ External │      │ Cache Layer  │
     │ Database │      │   APIs   │      │  (In-memory) │
     └──────────┘      └──────────┘      └──────────────┘
     - Users            - USGS             - API responses
     - Reports          - WHO              - Water data
     - Cached data      - World Bank       - Statistics
     - Submissions
```

**Data Fetching Strategy:**
1. **Initial Load** — Fetch from cache (fast)
2. **Background Sync** — node-cron fetches from external APIs every 30 min
3. **Fallback** — If external API fails, use cached MongoDB data
4. **User Reports** — Stored in MongoDB, displayed on map

---

## Database Schema (MongoDB)

### `water_quality_readings`
```javascript
{
  _id: ObjectId,
  location: {
    name: String,           // "Ganges River, Varanasi"
    coordinates: { lat: Number, lng: Number },
    region: String          // "Uttar Pradesh, India"
  },
  metrics: {
    ph: Number,
    turbidity: Number,      // NTU
    dissolved_oxygen: Number,
    nitrate: Number,        // mg/L
    temperature: Number,
    contamination_level: String  // "safe" | "moderate" | "polluted" | "toxic"
  },
  quality_score: Number,    // 0-100
  source: String,           // "USGS" | "WHO" | "User Report"
  timestamp: Date,
  cached_at: Date
}
```

### `diseases`
```javascript
{
  _id: ObjectId,
  name: String,             // "Cholera"
  type: String,             // "bacterial" | "viral" | "parasitic" | "chemical"
  causes: [String],         // ["Vibrio cholerae", "contaminated water"]
  symptoms: [String],
  affected_regions: [String],
  prevention: [String],
  treatment: String,
  severity: String,         // "low" | "medium" | "high" | "critical"
  annual_cases: Number,
  annual_deaths: Number
}
```

### `pollution_reports` (User Submissions)
```javascript
{
  _id: ObjectId,
  user_id: String,
  location: {
    name: String,
    coordinates: { lat: Number, lng: Number }
  },
  pollution_type: String,   // "industrial" | "agricultural" | "domestic" | "other"
  description: String,
  images: [String],         // URLs
  status: String,          // "pending" | "verified" | "resolved"
  reported_at: Date
}
```

### `cached_api_data`
```javascript
{
  _id: ObjectId,
  api_source: String,       // "usgs" | "who" | "worldbank"
  endpoint: String,
  data: Object,             // Raw API response
  fetched_at: Date,
  expires_at: Date
}
```

---

## Project File Structure

```
aquapure/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with Navbar/Footer
│   ├── page.tsx                  # Home (Hero + 3D Water + Stats)
│   ├── water-quality/
│   │   └── page.tsx              # Water Quality Explorer
│   ├── diseases/
│   │   └── page.tsx              # Disease Encyclopedia
│   ├── pollution-sources/
│   │   └── page.tsx              # Pollution Sources
│   ├── prevention/
│   │   └── page.tsx              # Prevention Center
│   ├── calculator/
│   │   └── page.tsx              # Water Quality Calculator
│   ├── stats/
│   │   └── page.tsx              # Impact Statistics
│   └── api/                      # API Routes
│       ├── water-quality/route.ts
│       ├── diseases/route.ts
│       ├── calculator/route.ts
│       ├── reports/route.ts
│       └── stats/route.ts
│
├── components/
│   ├── ui/                       # 21st.dev + Custom UI
│   │   ├── WaterCard.tsx
│   │   ├── DiseaseCard.tsx
│   │   ├── StatCounter.tsx
│   │   ├── GlassCard.tsx
│   │   └── WaterButton.tsx
│   ├── 3d/                      # R3F Components
│   │   ├── WaterFlow.tsx        # Hero flowing water
│   │   ├── WaterSplash.tsx      # Scroll splash effect
│   │   ├── WaterBody.tsx        # Quality explorer 3D water
│   │   └── ParticleField.tsx    # Background particles
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── QuickStats.tsx
│       └── FeaturedContent.tsx
│
├── lib/
│   ├── api/                      # API utilities
│   │   ├── usgs.ts               # USGS Water API client
│   │   ├── who.ts                # WHO API client
│   │   └── worldbank.ts          # World Bank API client
│   ├── db/
│   │   ├── mongoose.ts           # MongoDB connection
│   │   └── models/
│   │       ├── WaterQuality.ts
│   │       ├── Disease.ts
│   │       └── Report.ts
│   └── utils/
│       ├── qualityCalculator.ts
│       └── colorUtils.ts         # Water quality colors
│
├── hooks/
│   ├── useScrollSplash.ts        # Scroll-triggered splash
│   ├── useWaterData.ts           # Fetch water quality
│   └── useIntersectionObserver.ts
│
├── styles/
│   └── globals.css               # Tailwind + Custom CSS
│
├── public/
│   ├── models/                   # 3D models (if any)
│   ├── textures/                 # Water textures
│   └── images/
│
├── backend/                      # Express Backend (separate)
│   ├── server.js
│   ├── routes/
│   │   ├── waterQuality.js
│   │   ├── diseases.js
│   │   └── reports.js
│   ├── services/
│   │   ├── apiAggregator.js
│   │   └── cronJobs.js
│   └── models/
│       └── (same as above)
│
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## Design System

### Color Palette (Nature-Inspired Water Theme)

| Color | Hex | Usage |
|-------|-----|-------|
| **Deep Ocean** | `#0A1628` | Primary dark background |
| **Aqua Blue** | `#0077B6` | Primary accent, clean water |
| **Teal** | `#00B4D8` | Secondary accent, links |
| **Sea Foam** | `#90E0EF` | Highlights, cards |
| **Pure White** | `#FFFFFF` | Text, contrast |
| **Nature Green** | `#2D6A4F` | Success, healthy indicators |
| **Warning Amber** | `#F4A261` | Moderate pollution |
| **Danger Red** | `#E63946` | Critical pollution, alerts |

### Water Quality Color Gradient

| Level | Color | Hex | Description |
|-------|-------|-----|-------------|
| Safe | Blue | `#0077B6` | Clean, drinkable |
| Acceptable | Green | `#2D6A4F` | Minor treatment needed |
| Caution | Yellow | `#F4A261` | Not for drinking |
| Warning | Orange | `#E76F51` | Health risk |
| Danger | Red/Brown | `#9B2226` | Toxic, avoid |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Poppins | 600-700 | 2rem - 4rem |
| Body | Inter | 400-500 | 1rem - 1.25rem |
| Stats/Numbers | Space Grotesk | 700 | 2rem - 5rem |
| Captions | Inter | 400 | 0.875rem |

### Glassmorphism Card Style
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

### Animation Principles
- **Water Flow** — Continuous, organic motion (sine waves)
- **Splash Effect** — Particle burst on scroll trigger
- **Page Transitions** — Smooth fade with water ripple overlay
- **Hover States** — Subtle scale + glow effect
- **Counters** — Animated number increments

---

## Success Criteria

- [ ] Hero section with 3D flowing water + scroll-triggered splash
- [ ] Water quality explorer with color-coded 3D visualization
- [ ] Real API data integration (USGS, WHO)
- [ ] Disease encyclopedia with 6+ diseases detailed
- [ ] Pollution sources interactive cards/map
- [ ] Prevention center with actionable tips
- [ ] Water quality calculator with score output
- [ ] Impact statistics with animated visualizations
- [ ] Responsive design (mobile + desktop)
- [ ] Performance optimized (lazy loading, caching)