# DinPatra

DinPatra is an offline-first Progressive Web App for Indian calendar workflows and daily operating system tasks.

## Current architecture

- `src/app` contains application composition for wiring the engine to infrastructure
- `src/pages` contains screen-level composition
- `src/components` contains reusable UI primitives
- `src/hooks` contains screen data hooks
- `src/data` contains runtime repositories and static page content
- `src/models` contains shared domain contracts only
- `src/core/temporal` contains the Temporal Engine and provider interfaces
- `src/core/services` contains non-temporal placeholder service boundaries
- `src/db` contains the Dexie database entry point
- `src/styles` contains global and application styling
- `src/calendar`, `src/astronomy`, `src/notification`, `src/storage`, `src/localization`, `src/builder`, and `src/utils` are reserved for domain-adjacent helpers and documented placeholders where applicable

## MVP slice

- `TodayCard` is rendered from the Temporal Engine
- `MonthView` is rendered from the Temporal Engine
- A mock runtime JSON file lives in `public/runtime-data/calendar/2026.json`
- React components never import the JSON file directly

## Foundation goals

- Offline first
- Zero backend
- Component driven
- Data first
- Calendar engine architecture
- Strong TypeScript boundaries

## Tooling

- React 19
- Vite
- TypeScript in strict mode
- Path aliases via `@/*`
- Dexie prepared for IndexedDB persistence

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## Notes

This sprint intentionally stops at the first working vertical slice. CSV parsing, runtime JSON generation, notification behavior, and storage schemas are still deferred to later phases.
