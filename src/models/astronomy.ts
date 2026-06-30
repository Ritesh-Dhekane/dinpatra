export interface MoonData {
  readonly phase: string
  readonly illumination: number
  readonly ageDays: number
}

export interface SunData {
  readonly sunriseISO: string
  readonly sunsetISO: string
  readonly daylightMinutes: number
}

export interface AstronomyData {
  readonly dateISO: string
  readonly moon: MoonData
  readonly sun: SunData
}
