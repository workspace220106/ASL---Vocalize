# Design Specification: Visionary Portfolio - About & Contact Sections
Date: 2026-05-10
Project: nexus-portfolio
Persona: The Visionary Innovator (Researcher-Developer Hybrid)

## 1. Overview
The goal is to transform the About and Contact sections of the portfolio into a high-conversion, storytelling experience. The design leverages a "Narrative Flow" to position Rajiv Agarwal not just as a developer, but as an architect of AI-driven solutions.

## 2. About Section: "The Visionary Split"

### 2.1 Visual Layout
- **Structure:** Split-screen design.
- **Left Column (Static/Sticky):** 
    - High-impact bold typography.
    - **Copy:** "Architecting the bridge between academic AI research and scalable production software."
    - **Style:** Deep black background, indigo-to-cyan gradient glow, high-contrast sans-serif font.
- **Right Column (Scrollable):** 
    - A narrative journey told through three glassmorphic cards.
    - **Card 1: The Foundation (Research):** Focuses on academic rigor and IEEE publications.
    - **Card 2: The Catalyst (Innovation):** Focuses on hackathon wins and rapid prototyping.
    - **Card 3: The Execution (Production):** Focuses on scaling AI into products (e.g., PacPay).
- **Footer (Core Pillars):**
    - A 3-column grid of pillars: `AI Research`, `Scalable Dev`, `Innovation Catalyst`.
    - Each pillar contains a short descriptive sentence.

### 2.2 Interaction & Aesthetics
- **Glassmorphism:** Background blur, subtle white borders, and low-opacity fills for the story cards.
- **Parallax:** Subtle vertical movement of cards during scroll.
- **Color Palette:** Deep Blacks, Indigo (#4B0082), Cyan (#00FFFF).

---

## 3. Contact Section: "The Innovation Portal"

### 3.1 Visual Layout
- **Header:** Centered, high-impact call to action.
    - **Heading:** "The next breakthrough starts with a conversation."
    - **Sub-text:** "Whether it's a research collaboration, a complex engineering challenge, or a visionary idea—let's build it together."
- **Main Grid (Two-Column):**
    - **Left (Direct Access):** A stack of "Command Cards" for:
        - GitHub (Link to profile)
        - LinkedIn (Link to profile)
        - Email (Mailto link)
        - Resume (Download link to `Rajiv_Agarwal_Resume.pdf`)
    - **Right (Intake Form):** 
        - Glassmorphic form container.
        - Fields: `Name`, `Email`, `Subject`, `Project Vision` (Textarea).
        - Submit Button: Neon pulse animation.

### 3.2 Interaction & Aesthetics
- **Atmosphere:** Deep-space background with slow-moving "nebula" glow in the corners.
- **Hover States:** Command cards lift and glow on hover.
- **Form UX:** Floating labels and seamless validation.

## 4. Technical Constraints
- **Responsiveness:** On mobile, the "Visionary Split" collapses into a single vertical stack (Hook $\rightarrow$ Story $\rightarrow$ Pillars).
- **Performance:** Use CSS transforms for parallax and animations to ensure 60fps.
- **Assets:** Resume PDF must be served from the `public` directory.
