# Design Guidelines: Digital Humanities Dictionary

## Design Approach: Material Design System
**Rationale**: Information-dense academic tool requiring excellent typography, clear hierarchy, and proven patterns for search, filtering, and content display.

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 210 85% 45% (Deep academic blue)
- Background: 0 0% 98% (Off-white for reduced eye strain)
- Surface: 0 0% 100% (Pure white cards)
- Text Primary: 220 15% 15%
- Text Secondary: 220 10% 45%
- Border: 220 15% 88%
- Accent: 25 95% 55% (Warm orange for highlights/links)

**Dark Mode:**
- Primary: 210 75% 65% (Lighter blue)
- Background: 220 15% 10%
- Surface: 220 12% 14%
- Text Primary: 210 15% 92%
- Text Secondary: 210 10% 70%
- Border: 220 15% 25%
- Accent: 25 85% 65%

### B. Typography

**Font Stack:**
- Primary (Cyrillic + Latin): Inter via Google Fonts
- Monospace (sources/references): JetBrains Mono via Google Fonts

**Hierarchy:**
- Page titles: text-3xl md:text-4xl font-bold
- Term headings: text-2xl md:text-3xl font-semibold
- Section labels: text-sm font-medium uppercase tracking-wide
- Body text: text-base leading-relaxed
- Definitions: text-lg leading-loose
- Meta information: text-sm text-secondary

### C. Layout System

**Spacing Primitives**: Use 2, 4, 6, 8, 12, 16 units consistently
- Component padding: p-4 md:p-6
- Card spacing: gap-4
- Section margins: mb-8 md:mb-12
- Page padding: px-4 md:px-8

**Grid Structure:**
- Max width: max-w-7xl mx-auto
- Two-column layout: Filters sidebar (w-80) + Main content (flex-1)
- Mobile: Stack vertically

### D. Component Library

**Navigation:**
- Fixed header with search bar, alphabet filter, language toggle
- Sticky filters sidebar (desktop) / collapsible drawer (mobile)
- Breadcrumbs for navigation context

**Search & Filters:**
- Prominent search input with Russian keyboard support
- Alphabet navigation bar (А-Я + A-Z)
- Section filter chips with multi-select
- Active filter badges with clear-all option

**Content Display:**
- Dictionary cards with subtle shadows and hover states
- Term detail view: Stacked layout with clear section dividers
- Related terms as interactive tags/chips
- Collapsible example sections

**Data Tables:**
- Excel upload interface with drag-drop zone
- Progress indicators for data import
- Preview table before confirming import

**Interactive Elements:**
- Icons: Heroicons via CDN
- Buttons: Solid primary, outline secondary
- Chips/Tags: Rounded with soft backgrounds
- Links: Underline on hover, accent color

### E. Page Layouts

**Homepage:**
- Hero section (h-64): Gradient background (primary to darker shade), centered title "Словарь терминов цифровой гуманитаристики", prominent search bar
- Quick stats: Total terms, sections count, languages (3-column grid)
- Featured sections: Grid of section cards with term counts
- Recent additions: List of 5-6 newest terms

**Dictionary View:**
- Left sidebar: Filters (sections, alphabet)
- Main area: Search results / browsing list (masonry grid of term cards)
- Each card: Term (bold), section badge, definition preview (2 lines), English equivalent

**Term Detail:**
- Full-width content area (max-w-4xl)
- Term header with section badge
- Definition section (prominent)
- Usage example (italic, indented, bg-surface)
- English equivalent (with flag icon)
- Related terms (interactive chips)
- Source reference (small text, bottom)

### F. Special Features

**Bilingual Support:**
- Language toggle (RU/EN) in header
- Cyrillic-first alphabetical sorting
- RTL-aware spacing (though Russian is LTR)

**Academic References:**
- Footnote-style source citations
- Hover tooltips for quick source preview
- External link indicators for sources

**Accessibility:**
- High contrast in dark mode (WCAG AAA where possible)
- Keyboard navigation for all interactions
- ARIA labels for Russian screen readers
- Focus indicators: 2px accent color ring

### G. Animations

**Minimal & Purposeful:**
- Fade-in for search results: duration-200
- Slide-in for filter sidebar: duration-300
- Smooth scroll to term details
- NO decorative animations, focus on performance

---

## Images

**Hero Section:**
- Abstract geometric pattern or subtle texture suggesting digital/humanities intersection
- Low opacity overlay (20-30%) to ensure text readability
- Alternatively: Typographic composition with Cyrillic and Latin characters

**No additional images required** - content-focused interface prioritizes text clarity over visual embellishment.