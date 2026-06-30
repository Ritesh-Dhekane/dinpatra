import type { GregorianDate } from './temporal'

export interface MoonData {
  readonly phase: string
  readonly illumination: number
  readonly ageDays: number
  readonly moonriseISO: string
  readonly moonsetISO: string
}

export interface SunData {
  readonly sunriseISO: string
  readonly sunsetISO: string
  readonly daylightMinutes: number
}

export interface AstronomyData {
  readonly date: GregorianDate
  readonly moon: MoonData
  readonly sun: SunData
}
