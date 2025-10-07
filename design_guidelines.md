# Design Guidelines: Digital Humanities Dictionary

## Design Approach: Modern Language Learning Aesthetic
**Rationale**: Drawing inspiration from Duolingo and modern linguistic platforms, combining vibrant energy with academic utility. The design balances playful linguistic elements with sophisticated information architecture for scholarly work.

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 250 75% 58% (Vibrant purple - linguistic creativity)
- Secondary: 160 70% 45% (Fresh teal - multilingual harmony)
- Background: 0 0% 99% (Bright white)
- Surface: 0 0% 100%
- Accent: 35 95% 60% (Energetic coral for CTAs/highlights)
- Text Primary: 240 15% 15%
- Text Secondary: 240 10% 50%
- Border: 240 10% 90%

**Dark Mode:**
- Primary: 250 70% 70%
- Secondary: 160 65% 55%
- Background: 240 15% 8%
- Surface: 240 12% 12%
- Accent: 35 85% 65%
- Text Primary: 240 10% 95%
- Text Secondary: 240 8% 75%
- Border: 240 15% 20%

### B. Typography

**Font Stack:**
- Display: Outfit (Google Fonts) - Modern, geometric, friendly
- Body: Inter (Google Fonts) - Excellent Cyrillic support
- Monospace: JetBrains Mono - For linguistic notation/sources

**Hierarchy:**
- Hero title: text-5xl md:text-7xl font-bold tracking-tight
- Page titles: text-3xl md:text-4xl font-bold
- Term headings: text-2xl md:text-3xl font-semibold
- Section labels: text-xs font-bold uppercase tracking-widest
- Body: text-base leading-relaxed
- Definitions: text-lg leading-loose
- Micro-copy: text-sm

### C. Layout System

**Spacing Primitives**: Use 4, 6, 8, 12, 16, 24 units
- Component padding: p-6 md:p-8
- Card gaps: gap-6
- Section spacing: py-16 md:py-24
- Container: max-w-7xl mx-auto px-6 md:px-8

### D. Component Library

**Navigation:**
- Floating header: backdrop-blur-md bg-white/80 dark:bg-surface/80
- Search bar with linguistic symbol decorations (🔍, 📚, 🌐)
- Language toggle: Pill-style animated switcher (RU ⟷ EN)
- Alphabet navigation: Colorful gradient pills (Cyrillic + Latin)

**Cards & Content:**
- Term cards: Rounded-2xl, gradient borders, hover lift effect
- Section badges: Vibrant colored pills matching primary/secondary palette
- Definition blocks: Subtle colored background (primary/10)
- Related terms: Interactive chips with gradient backgrounds

**Search & Discovery:**
- Prominent search: Large rounded input with shadow
- Filter chips: Multi-select with checkmarks, vibrant active states
- Alphabet strip: Horizontal scroll, gradient-bordered active state
- Quick stats: Animated number counters with colorful icons

**Interactive Elements:**
- Buttons: Rounded-full, gradient fills for primary actions
- Icons: Heroicons with vibrant colors
- Tags: Rounded-lg with soft gradient backgrounds
- Links: Bold accent color, no underline default

### E. Page Layouts

**Homepage:**
- Hero (h-96 md:h-[600px]): Full-width image of abstract linguistic patterns (colorful letters, phonetic symbols, multilingual typography in artistic arrangement) with gradient overlay (purple-to-teal 45deg, 60% opacity)
- Hero content: Centered title with linguistic symbol decorations, large search bar, stat chips below (terms count, sections, languages)
- Featured sections: 3-column grid with gradient-bordered cards, term counts, colorful icons
- Recent additions: Horizontal scroll carousel with term cards
- Newsletter CTA: Gradient background section with playful copy

**Dictionary Browse:**
- Sticky header with search + filters
- Masonry grid layout: Staggered term cards with varied heights
- Sidebar filters (desktop): Floating card with sections checklist, alphabet grid
- Mobile: Bottom sheet filters with smooth animations

**Term Detail:**
- Breadcrumb navigation with colorful separators
- Full-width term header: Gradient background, large title, section badge
- Two-column layout (desktop): Definition (60%) + Meta info sidebar (40%)
- Content sections: Definition (highlighted background), Usage (italic with quote marks), English equivalent (flag + text), Related terms (interactive chip grid)
- Source: Footer card with academic citation styling

**Data Management (Admin):**
- Excel upload: Gradient-bordered drag-drop zone with linguistic icons
- Preview table: Zebra striping with colorful header row
- Progress: Animated gradient progress bars

### F. Images

**Hero Section:**
Required - Full-width hero image featuring abstract linguistic artwork: colorful Cyrillic and Latin letterforms, IPA symbols, language family tree diagrams, or typographic compositions. Image should be bright, energetic, and suggest multilingual harmony. Overlay with purple-to-teal gradient at 60% opacity.

**Section Illustrations:**
Colorful vector icons for each academic section (computations, analysis, methods, etc.) using the primary/secondary palette

**No photography** - Focus on abstract linguistic graphics and typography

### G. Special Features

**Linguistic Decorations:**
- Phonetic symbol watermarks (subtle, 5% opacity)
- Language script badges (Кириллица/Latin indicators)
- Translation arrows and linguistic connectors
- Colorful etymology tree visualizations for related terms

**Bilingual Polish:**
- Split-view term comparison (RU | EN side-by-side option)
- Hover translations for quick reference
- Language detection in search with auto-suggestions

**Micro-interactions:**
- Card hover: Lift + glow effect (shadow-2xl)
- Search: Typewriter animation for placeholder text
- Filter apply: Ripple effect from selection
- Term card click: Smooth expand-to-detail transition

### H. Accessibility

- WCAG AAA contrast ratios maintained despite vibrant colors
- Keyboard navigation with visible focus rings (2px accent)
- Reduced motion respect: Disable animations when requested
- Screen reader: Russian language support, proper ARIA labels
- Color-blind safe: Use patterns + colors for distinctions

### I. Animations

**Strategic Use:**
- Hero: Subtle floating animation on linguistic elements (duration-2000)
- Cards: Stagger fade-in on load (duration-300, delay-100 increments)
- Search results: Smooth appear (duration-200)
- NO excessive animations - maintain academic professionalism

---

**Design Personality**: Scholarly meets playful. Vibrant linguistic celebration without sacrificing academic credibility. Every color choice and typographic decision reinforces the multilingual, modern nature of digital humanities.