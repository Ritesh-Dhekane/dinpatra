import type {
  AstronomyData,
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
  CalendarYear,
  GregorianDate,
  IndianDate,
  MoonData,
  Observance,
} from '@/models'

/**
 * Converts between the engine's date shapes without depending on storage or UI.
 */
export interface DateResolver {
  resolveGregorianDate(input: GregorianDate | IndianDate | string): GregorianDate
  resolveIndianDate(input: GregorianDate | IndianDate | string): IndianDate | null
}

/**
 * Produces calendar projections for a given date range.
 */
export interface CalendarProvider {
  getDay(date: GregorianDate): Promise<CalendarDay>
  getMonth(year: number, month: number): Promise<CalendarMonth>
  getWeek(date: GregorianDate): Promise<CalendarWeek>
  getYear(year: number): Promise<CalendarYear>
}

/**
 * Produces astronomy data for the engine's current date context.
 */
export interface AstronomyProvider {
  getAstronomy(date: GregorianDate): Promise<AstronomyData>
}

/**
 * Produces lunar data independently from the rest of astronomy.
 */
export interface MoonProvider {
  getMoon(date: GregorianDate): Promise<MoonData>
}

/**
 * Resolves observances without the engine knowing where they come from.
 */
export interface ObservanceProvider {
  listObservances(date: GregorianDate): Promise<readonly Observance[]>
}

/**
 * Formats dates and labels for the user's locale.
 */
export interface LocalizationProvider {
  formatDate(date: GregorianDate): string
  formatMonth(year: number, month: number): string
  formatWeek(year: number, week: number): string
}

/**
 * Moves the engine focus through time without binding it to a UI framework.
 */
export interface CalendarNavigator {
  nextDay(date: GregorianDate): GregorianDate
  previousDay(date: GregorianDate): GregorianDate
  nextMonth(year: number, month: number): { year: number; month: number }
  previousMonth(year: number, month: number): { year: number; month: number }
}

/**
 * Builds human-readable text for the engine's current temporal scope.
 */
export interface CalendarFormatter {
  formatDay(day: CalendarDay): string
  formatMonth(month: CalendarMonth): string
  formatWeek(week: CalendarWeek): string
  formatYear(year: CalendarYear): string
}
