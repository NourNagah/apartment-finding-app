# Apartments Frontend (Next.js)

## Overview
Next.js Pages Router app with Tailwind CSS. Global layout has sticky header and footer, responsive body, and a unified font scale. Routing lives exclusively in `src/pages`.

## Key Features
- Reusable search input with SVG icon
- Sell form with validation, responsive selects, Egypt-only phone
- Infinite scroll on search (loads 20 at a time, cached in-memory)
- Local SVG placeholders for all images (no external image fetches)
- Root redirect to `/home`

## Scripts
- `npm run dev` - start dev server
- `npm run build` - build production assets
- `npm start` - start production server

## Env
- `NEXT_PUBLIC_API_URL` defaults to `http://localhost:4000`

## Structure
- `src/pages` - Pages Router (`home`, `search`, `sell`)
- `src/components` - UI components (`layout`, `search`)
- `src/assets` - Local SVG icons and logo
- `src/styles/globals.css` - Tailwind base and custom scrollbar styles
- `src/utils` - API client, caching, helpers

## Notes
- Only one `pages` directory is used. App Router has been removed.
- Images are SVG components under `src/assets`; cards and grids render icons instead of external images.