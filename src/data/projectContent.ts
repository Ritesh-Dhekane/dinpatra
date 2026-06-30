export type HeroStat = {
  id: string
  value: string
  label: string
}

export type CorePillar = {
  id: string
  eyebrow: string
  title: string
  description: string
  bullets: readonly string[]
}

export type MigrationPhase = {
  id: string
  title: string
  description: string
}

export const heroStats: HeroStat[] = [
  {
    id: 'offline-first',
    value: 'Offline-first',
    label: 'Local data should remain the primary source of truth.',
  },
  {
    id: 'zero-backend',
    value: 'Zero backend',
    label: 'The product should work without a server dependency.',
  },
  {
    id: 'calendar-engine',
    value: 'Calendar engine',
    label: 'Rules, recurrence, and data transformations belong in domain code.',
  },
]

export const principles = [
  'React',
  'Vite',
  'TypeScript',
  'Tailwind-ready',
  'PWA-ready',
  'IndexedDB-first',
  'CSV to runtime JSON',
] as const

export const corePillars: CorePillar[] = [
  {
    id: 'data-layer',
    eyebrow: 'Data first',
    title: 'The storage layer should be explicit and local.',
    description:
      'IndexedDB, schema versioning, and typed repositories belong below the UI so every screen reads the same state.',
    bullets: [
      'Dexie should own the persistence boundary.',
      'Feature code should never read raw storage directly.',
      'Mutations should go through typed commands or repositories.',
    ],
  },
  {
    id: 'calendar-engine',
    eyebrow: 'Domain logic',
    title: 'Calendar rules should live in a dedicated engine.',
    description:
      'Recurring events, Indian calendar mapping, and date math need a dedicated module rather than ad hoc UI helpers.',
    bullets: [
      'Pure functions for date conversion and recurrence.',
      'Deterministic outputs for offline use.',
      'Reusable helpers for the whole app surface.',
    ],
  },
  {
    id: 'offline-shell',
    eyebrow: 'PWA',
    title: 'The app shell should load and stay useful offline.',
    description:
      'Navigation, metadata, and cached assets must support a dependable installable experience.',
    bullets: [
      'A manifest and service worker are required.',
      'The app should degrade gracefully without network access.',
      'Static assets should be cache-friendly and intentional.',
    ],
  },
]

export const migrationPhases: MigrationPhase[] = [
  {
    id: 'phase-1',
    title: 'Critical architecture fixes',
    description:
      'Replace starter content, establish a domain-oriented folder structure, and define the product foundation.',
  },
  {
    id: 'phase-2',
    title: 'Data layer and storage',
    description:
      'Add Dexie, repositories, and typed models for notes, calendar data, and daily operating system primitives.',
  },
  {
    id: 'phase-3',
    title: 'Calendar engine and runtime data',
    description:
      'Move calendar calculations into pure domain code and wire CSV-to-JSON generation into the build flow.',
  },
  {
    id: 'phase-4',
    title: 'PWA and offline behavior',
    description:
      'Register a service worker, define caching strategy, and make the install flow resilient.',
  },
]
