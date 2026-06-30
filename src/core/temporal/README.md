# Temporal Engine

The Temporal Engine is DinPatra's central time-domain abstraction.

It sits between the application layer and the runtime repository so screens can
ask for days, weeks, months, years, observances, and astronomy details without
knowing where the data comes from.

## What it solves

- Creates one canonical temporal API for the app
- Keeps calendar logic framework-independent
- Prevents UI code from talking directly to runtime JSON or persistence
- Makes future CSV, IndexedDB, and sync integrations adapter-only concerns

## Responsibilities

- `DateResolver` normalizes incoming date inputs
- `CalendarProvider` resolves resolved calendar views from runtime data
- `CalendarNavigator` moves through dates without coupling to React
- `LocalizationProvider` formats labels and clock values for display

## Current status

The engine is now connected to a mock runtime dataset through the application
layer. It still uses representative sample data only, so real CSV-backed content
can be introduced later without changing the engine contract.
