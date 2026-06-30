# DinPatra

DinPatra is an offline-first Progressive Web App for Indian calendar workflows and daily operating system tasks.

## Current architecture

- `src/pages` contains screen-level composition
- `src/components` contains reusable UI primitives
- `src/data` contains page content and static data contracts
- `src/models` contains shared domain contracts only
- `src/core/services` contains placeholder service boundaries
- `src/db` contains the Dexie database entry point
- `src/styles` contains global and application styling
- `src/calendar`, `src/astronomy`, `src/notification`, `src/storage`, `src/localization`, `src/builder`, `src/hooks`, and `src/utils` are reserved placeholders with folder-level documentation

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

This sprint intentionally stops at architecture. Calendar logic, runtime-data parsing, notification behavior, and storage schemas are still deferred to the next implementation phase.
