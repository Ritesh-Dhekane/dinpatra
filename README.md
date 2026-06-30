# DinPatra

DinPatra is an offline-first Indian calendar PWA.

## Current app

- Opens directly into the calendar shell
- Supports Day and Month views
- Remembers the last selected view
- Always starts on today’s date
- Keeps calendar data behind the Temporal Engine
- Uses a mock runtime JSON file in `public/runtime-data/calendar/2026.json`

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
