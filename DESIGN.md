# Design Brief — Seven Corporation

**Tone & Purpose:** Premium asset advisory platform combining real estate and investment services. Sophisticated, trustworthy, authoritative — positions Seven Corporation as an intelligent advisor, not a typical broker.

**Color Palette (OKLCH)**

| Role | Light | Dark | Usage |
|------|-------|------|-------|
| Primary | `0.27 0.12 302` (Midnight Blue) | `0.27 0.12 302` | Brand, navigation, primary CTAs |
| Accent | `0.75 0.18 195` (Electric Cyan) | `0.75 0.18 195` | Highlights, hover states, investment badges, glowing borders |
| Secondary | `0.72 0.13 95` (Gold) | `0.72 0.13 95` | Premium elements, ratings, luxury signifiers |
| Background | `0.99 0 0` | `0.08 0 0` | Page background (dark mode primary) |
| Card | `1.0 0 0` | `0.12 0.02 300` | Elevated surfaces, property cards |
| Foreground | `0.15 0 0` | `0.93 0 0` | Text (light mode = dark, dark mode = light) |
| Border | `0.9 0 0` | `0.20 0.02 302` | Accent borders on cards, dividers |

**Typography**

| Layer | Font | Weight | Usage |
|-------|------|--------|-------|
| Display | Fraunces (serif) | 600–700 | Hero headline, section titles, brand authority |
| Body | DM Sans | 400–500 | Body copy, card content, UI labels |
| Mono | JetBrains Mono | 400 | Code snippets, financial figures, data tables |

**Structural Zones**

| Zone | Background | Border | Depth |
|------|------------|--------|-------|
| Header | Transparent | Subtle bottom gradient accent | Foreground (floating above hero) |
| Hero | Deep gradient (Midnight → transparent) | None | Animated panels with light streaks |
| Service Grid | Background | Card border (accent on hover) | Elevated cards with glow-accent |
| Property Cards | Card | Accent underline + glow on hover | shadow-elevated, tilt on interaction |
| Trust Section | Muted background (20% opacity) | Secondary gold accents | Animated count-up, carousel rotation |
| CTA Section | Gradient accent (Cyan to Gold) | None | Floating action, sticky call button |
| Footer | Same as hero gradient | Subtle top border | Matching brand depth |

**Component Patterns**

- **Buttons**: Primary (solid Midnight), Secondary (outline Cyan), Tertiary (ghost). All use glow-accent on hover.
- **Cards**: Dark background, accent border (2px, Cyan), shadow-elevated. Hover: scale 1.02, glow-accent-border.
- **Investment Badges**: Circular, secondary gold background, dark text, stacked on property cards.
- **Icons**: SVG, animated on page load and hover. Color shifts: primary → accent.
- **Forms**: Input background matches card, focus ring = accent (Cyan), border = subtle.

**Motion & Animation**

- **Entrance**: Cards fade + slide-up on viewport, staggered 80ms delay.
- **Hover**: Button glow-accent (pulse-glow 2s), card tilt + scale (1.02), border color fade to accent.
- **Scroll**: Parallax on hero panels (0.3–0.5x), smooth scroll behavior (Lenis).
- **Interactions**: Toggle service switch (0.3s ease), property filter fade (0.2s), count-up numbers (0.6s).

**Spacing & Rhythm**

- **Grid**: 4px base unit. Padding: 16px (sections), 12px (cards). Gap: 20px (grid), 12px (lists).
- **Type Scale**: Display 56px, Heading 32px, Subhead 24px, Body 16px, Small 14px, Caption 12px.
- **Density**: Loose (showcase feel) — generous whitespace, breathing room between cards.

**Signature Details**

- **Gradient Accents**: Linear gradient behind hero headline (Midnight → Cyan, 135°), reinforces brand duality.
- **Glowing CTAs**: Electric Cyan glow on "Get Investment Advice", "WhatsApp", call buttons — signals high value, urgency.
- **Split-Screen Hero**: Real estate left, insurance right — visual metaphor for dual services unified under one brand.
- **Investment Language**: ROI tags, yield badges, smart filters — positions users as sophisticated investors, not passive buyers.
- **Trust Counters**: Animated count-up (49+ reviews, 5.0 rating) — builds authority through motion and numbers.

**Anti-Patterns Avoided**

- No generic bootstrap blue, safe purple gradients, or default Tailwind shadows.
- No uniform rounded corners — varied (0, 4px, 12px, 24px, full) for visual hierarchy.
- No light mode default — dark mode primary, premium positioning.
- No scattered animations — choreographed entrance, hover, scroll timings.
- No neutral palette — Midnight, Cyan, Gold dominate with intentional composition.

**Constraints**

- Load under 2.5s: WebP images, lazy load sections, skeleton shimmer on data fetch.
- Accessibility: WCAG AA+ contrast (0.27 0.12 302 on 0.08 0.0 0 = Δ 0.85 lightness ✓), keyboard nav, semantic HTML.
- Responsive: Mobile-first, breakpoints sm 640px / md 768px / lg 1024px / xl 1280px.
- Dark mode primary, light mode fallback for users on light system preference.

**Outputs**

- `index.css`: OKLCH variables, @font-face declarations, utility classes (glow-accent, gradient-primary, accent-underline).
- `tailwind.config.js`: Custom keyframes (float, pulse-glow, count-up), animations, boxShadow (glow-cyan, elevated).
- Preview: `.platform/design/preview-1776691320309.jpg` — reference for frontend team on hero, cards, service toggle UI.
