# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## TOOV Games Website (artifacts/toov-games)

One-page cinematic website for TOOV Games — a 2D indie game studio.

### Features
- Bilingual EN/TR with language toggle (proper Unicode: ş, ç, ğ, ı, ö, ü, İ)
- Lottie preloader (white bg, mascot animation, plays once)
- Dark neon aesthetic with scroll-triggered GSAP animations
- "NEON EDGE" game showcase with phone mockups and Play Store badge
- Framer Motion entrance animations + GSAP floating on Hero mascot

### Key Architecture Notes
- **Hero mascot**: Framer Motion on wrapper `<div>` (scale/opacity), GSAP on `<img ref>` (floating). Never combine on same element.
- **SVG assets**: `mascot-color.svg` (Hero), `mascot-white.svg` (About + FutureTeaser), `logo-horizontal-white.svg` (Navbar + Footer)
- **@assets/ alias** → `attached_assets/` (vite.config.ts)
- **Favicon**: `public/favicon.png` (mascot head PNG)
- **CSS custom properties**: space-separated HSL, no `hsl()` wrapper
- **Social**: Instagram only (`https://instagram.com/toov.games`), no Twitter/X
- **GameShowcase**: GSAP ScrollTrigger stagger for NEON EDGE letters, Play Store "Coming soon" badge
