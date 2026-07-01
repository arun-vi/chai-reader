# ChaiReader - Premium Tech & Gadgets Store

A modern, responsive e-commerce frontend built with **Next.js 15**, **TypeScript**, and **CSS Modules**. This project is designed as a frontend implementation assessment demonstrating production-quality code structure, reusable components, responsive design, and polished UX.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Icons:** react-icons
- **Animations:** CSS animations & Framer Motion-ready structure
- **Fonts:** Next.js font optimization (Poppins via Google Fonts)

## Features

- ✅ **Pixel-perfect responsive design** (Desktop, Tablet, Mobile)
- ✅ **Reusable component architecture** with CSS Modules
- ✅ **Loading states** with skeleton/spinner loaders
- ✅ **Search & filter products** by category, price, rating
- ✅ **Grid/List view toggle** for products
- ✅ **Interactive testimonial carousel**
- ✅ **Contact form** with validation
- ✅ **Newsletter subscription** section
- ✅ **Sticky header** with scroll-aware styling
- ✅ **Mobile hamburger menu** with overlay
- ✅ **Smooth transitions & hover effects**
- ✅ **SEO metadata** via Next.js Metadata API
- ✅ **Accessibility** (ARIA labels, keyboard navigation, semantic HTML)

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ailaysa-assessment.git

# Navigate to project
cd ailaysa-assessment

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
ailaysa-assessment/
├── public/
│   ├── images/          # Product and hero images
│   ├── icons/           # Custom icons
│   ├── logo.svg         # Site logo
│   └── favicon.ico      # Favicon
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (Header + Footer)
│   │   ├── page.tsx             # Home page
│   │   ├── page.module.css      # Home styles
│   │   ├── globals.css          # Global styles + CSS variables
│   │   ├── loading.tsx          # App-level loading state
│   │   ├── about/page.tsx       # About page
│   │   ├── products/page.tsx    # Products listing with filters
│   │   └── contact/page.tsx     # Contact page with form
│   │
│   ├── components/
│   │   ├── Button/        # Reusable button (primary/secondary/outline/ghost)
│   │   ├── Card/          # Product card (default/compact/horizontal)
│   │   ├── Footer/        # Site footer with links & contact
│   │   ├── Header/        # Sticky header with navigation
│   │   ├── Hero/          # Hero section component
│   │   ├── Loader/        # Loading spinner/dots/pulse
│   │   └── Modal/         # Overlay modal with escape handling
│   │
│   ├── data/
│   │   ├── products.ts       # Mock product data
│   │   ├── categories.ts     # Product categories
│   │   └── testimonials.ts   # Customer testimonials
│   │
│   ├── hooks/
│   │   └── useToggle.ts      # Generic open/close/toggle hook
│   │
│   ├── lib/
│   │   └── constants.ts      # Site-wide constants & links
│   │
│   ├── styles/
│   │   └── variables.css     # CSS custom properties (colors, spacing, etc.)
│   │
│   ├── types/
│   │   └── product.ts        # TypeScript interfaces
│   │
│   └── utils/
│       └── helpers.ts        # Utility functions (formatPrice, etc.)
│
├── package.json
├── tsconfig.json
└── README.md
```

## Component Architecture

Every component follows the same pattern:

```
Component/
├── Component.tsx        # Component logic & markup
└── Component.module.css # Scoped styles
```

This ensures styles don't leak and components remain completely self-contained.

## Design Decisions

### CSS Variables
All design tokens (colors, spacing, typography, shadows, breakpoints) are defined as CSS custom properties in `src/styles/variables.css` for consistent theming.

### Responsive Strategy
- **Desktop-first** approach
- Breakpoints: 1200px → 992px → 768px → 480px
- Media queries inside each component's CSS Module

### Loading States
- Simulated loading delay on each page (500-600ms) to demonstrate loading UX
- Multiple loader variants: spinner, dots, pulse
- Full-page loader component for initial loads

### Data
All product data is static mock data (no API needed per assessment requirements). The data layer is structured so swapping to real API calls requires only changing the data files.

## Assumptions

- No backend or API integration required (per assessment)
- Images use placeholder paths (`/images/product-1.jpg`, etc.) — real images would be added to `public/images/`
- Product data is static — easily replaceable with API calls
- No authentication, cart functionality, or checkout flow needed

## Improvements With More Time

1. **Image Placeholder Generation** — Add SVG placeholder images or use a service like picsum.photos for demo content
2. **Dark Mode** — Implement theme toggle with CSS custom properties
3. **Framer Motion Animations** — Add page transitions, staggered list animations, and micro-interactions
4. **Product Detail Page** — Create `/products/[id]` dynamic route with full product view
5. **Cart Functionality** — Implement add-to-cart with local storage persistence
6. **Infinite Scroll / Pagination** — For the products listing page
7. **Unit Tests** — Add Jest + React Testing Library tests for components
8. **Accessibility Audit** — Run axe-core audit and refine ARIA attributes
9. **Performance Optimization** — Add image lazy loading, bundle analysis, and Lighthouse optimization
10. **Storybook** — Component documentation and visual regression testing

## Libraries Used

| Library | Purpose |
|---------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [react-icons](https://react-icons.github.io/react-icons/) | Icon library (Feather Icons) |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped styling |
| [Google Fonts (Poppins)](https://fonts.google.com/specimen/Poppins) | Typography |

## Author

**ChaiReader** — Frontend Implementation Assessment

---

Built with ❤️ using Next.js 15 + TypeScript