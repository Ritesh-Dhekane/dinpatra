# Temporal Engine

The Temporal Engine is DinPatra's central time-domain abstraction.

It sits between application screens and infrastructure so future features can ask
for days, weeks, months, years, observances, astronomy, or navigation without
knowing where the underlying data comes from.

## What it solves

- Creates one canonical temporal API for the app
- Keeps calendar logic framework-independent
- Prevents UI code from talking directly to storage or generated data
- Makes future CSV, JSON, and IndexedDB integrations adapters instead of core dependencies

## Dependencies

The engine depends only on provider interfaces:

- `DateResolver`
- `CalendarProvider`
- `AstronomyProvider`
- `MoonProvider`
- `ObservanceProvider`
- `LocalizationProvider`
- `CalendarNavigator`
- `CalendarFormatter`

Those interfaces are intentionally minimal so infrastructure can evolve without
forcing a rewrite of the domain layer.

## Current status

The engine is a placeholder foundation. It returns deterministic placeholder
structures while the real calendar data pipeline is still being designed.
