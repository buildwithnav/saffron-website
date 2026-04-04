# Saffron Indian Food & Bar — Website Project

## Business Details
- **Name:** Saffron Indian Food & Bar
- **Owner:** Nav Gill
- **Address:** 3015 Calloway Dr, Unit D2 & D3, Bakersfield, CA 93312
- **Phone:** (661) 679-4271
- **Instagram:** @saffronindiacuisine (2K+ followers)
- **Google Rating:** 5.0 stars (20 reviews)
- **Yelp:** 5.0 stars
- **Online Ordering:** DoorDash, Uber Eats
- **Concept:** Upscale casual Indian restaurant & bar. Authentic Indian cuisine, handcrafted drinks, warm stylish atmosphere. Perfect for date nights, get-togethers, and evenings out.
- **Price Range:** $10-$20 per person
- **Hours:** Mon-Thu & Sun 11 AM - 9 PM, Fri-Sat 11 AM - 10 PM. Open every day, no holiday closures.

## Tech Stack
- React (Create React App)
- Plain CSS with CSS variables
- Google Fonts (Cormorant Garamond, Jost)
- GitHub Pages via GitHub Actions (deploy.yml included)

## Design System (MUST follow)
```css
--saffron: #F4A829;          /* Primary brand / CTA color */
--saffron-dark: #C8841A;
--saffron-light: #FAD27A;
--deep: #0E0600;             /* Darkest background */
--charcoal: #1E1008;         /* Section backgrounds alternate */
--warm-dark: #2B1500;        /* Reservations section bg */
--cream: #FDF6E8;            /* Primary text */
--text-light: #C9B99A;       /* Body text */
--text-muted: #8A7560;       /* Captions, labels */
--font-display: 'Cormorant Garamond', serif;   /* Headings, weight 300-400 */
--font-body: 'Jost', sans-serif;               /* UI / body */
```

## Key Design Rules
1. **Dark theme ONLY** — deep brown/black backgrounds, never white
2. **Saffron gold** is the ONLY accent color
3. **Cormorant Garamond** for all headings — `font-weight: 300` or `400`
4. **Jost** for all body/UI text
5. **No rounded corners** except `border-radius: 2px` on buttons/inputs
6. **Section alternation**: deep → charcoal → deep → warm-dark → charcoal
7. Buttons: `.btn-primary` (saffron fill) and `.btn-ghost` (transparent outline)
8. All section titles: eyebrow (small caps, saffron) → h2 (display font, one word in `<em>` for italic gold)
9. Logo is TEXT "SAFFRON" — not the image logo (owner preference)

## File Structure
```
saffron-restaurant/
├── .github/workflows/deploy.yml
├── public/
│   ├── index.html
│   └── logo.png                    ← Logo image (available but NOT used in site — text logo preferred)
├── src/
│   ├── index.js
│   ├── index.css                   ← CSS variables / global reset / utility classes
│   ├── App.js                      ← Root component, imports all sections
│   ├── App.css
│   └── components/
│       ├── Navbar.js + Navbar.css  ← Sticky nav, top bar, mobile hamburger, scroll effect
│       ├── Hero.js + Hero.css      ← Auto-rotating 3-slide hero with CTAs
│       ├── About.js + About.css    ← Two-column layout, brand story, 3 pillar cards
│       ├── Menu.js + Menu.css      ← 7-tab menu with subcategories (REAL menu data)
│       ├── PrivateEvents.js + .css ← Full-bleed parallax events section
│       ├── Reservations.js + .css  ← Booking form with success state
│       ├── Location.js + .css      ← Google Map embed + hours
│       └── Footer.js + Footer.css  ← Newsletter, social links, sitemap
├── package.json
└── CLAUDE.md
```

## Menu
The menu in Menu.js contains the REAL Saffron menu from the PDF menus. It has 7 tabs:
- **Appetizers** — Veg & Non-Veg appetizers (16 items)
- **Tandoori Grill** — Clay oven items (10 items)
- **Entrées** — Subcategories: Vegetable, Paneer, Dal, Chicken, Lamb, Goat, Seafood (42 items)
- **Indo Chinese** — Fusion items (8 items)
- **Street Eats** — Chole Bhature, Dosa, etc. (4 items)
- **Breads & Rice** — Naan, Kulcha, Paratha, Roti, Rice, Biryani (19 items)
- **Drinks** — Lassi, Shakes, Coffee/Tea, Juices, Soups & Salad
- **Bar** — Signature & Classic Cocktails, Mocktails, Wine, Beer, Indian Beer, Spirits

Source PDFs: ~/Downloads/Food-Menu-Saffron.pdf and ~/Downloads/Bar-Menu_Saffron.pdf

## Placeholder Content Still to Replace
| Item | Current State | File |
|------|--------------|------|
| Hero photos | Unsplash URLs | Hero.js |
| About photos | Unsplash URLs | About.js |
| Events photo | Unsplash URL | PrivateEvents.js |
| Google Map embed | Generic Bakersfield coords | Location.js |
| ~~Email~~ | ~~saffronindian60@gmail.com~~ (done) | Footer.js, Location.js |

## TODO / Features to Add
- [ ] Replace placeholder images with real restaurant photos
- [ ] Get real Google Maps embed URL
- [x] Connect reservation form to a real system (Formsubmit.co → saffronindian60@gmail.com)
- [ ] Add online ordering link (DoorDash/Uber Eats)
- [ ] Deploy to GitHub Pages
- [x] Add real email address
- [ ] SEO: meta tags, Open Graph, JSON-LD Restaurant schema
- [ ] Favicon
- [ ] React Router for multi-page
- [ ] Gallery / Instagram feed section
- [ ] Scroll animations (Framer Motion or Intersection Observer)
- [ ] Mobile performance (lazy load images)
- [ ] Analytics

## How to Run
```bash
cd ~/Documents/saffron-website/saffron-restaurant
npm start
# Opens at http://localhost:3000
```
