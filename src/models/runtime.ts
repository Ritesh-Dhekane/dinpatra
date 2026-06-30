import type { AstronomyData } from './astronomy'
import type { GregorianDate, IndianDate, Observance } from './temporal'

export interface RuntimeCalendarDayRecord {
  readonly gregorian: GregorianDate
  readonly indian: IndianDate | null
  readonly label: string
  readonly highlightBanner: string | null
  readonly observances: readonly Observance[]
  readonly astronomy: AstronomyData | null
}

export interface RuntimeCalendarYearDocument {
  readonly year: number
  readonly timezone: string
  readonly days: Record<string, RuntimeCalendarDayRecord>
}
