import type {
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
  CalendarYear,
  GregorianDate,
  IndianDate,
  Observance,
} from '@/models'
import type {
  AstronomyProvider,
  CalendarFormatter,
  CalendarNavigator,
  CalendarProvider,
  DateResolver,
  LocalizationProvider,
  MoonProvider,
  ObservanceProvider,
} from './providers'

export interface TemporalEngineDependencies {
  readonly dateResolver: DateResolver
  readonly calendarProvider: CalendarProvider
  readonly astronomyProvider?: AstronomyProvider
  readonly moonProvider?: MoonProvider
  readonly observanceProvider?: ObservanceProvider
  readonly localizationProvider?: LocalizationProvider
  readonly navigator?: CalendarNavigator
  readonly formatter?: CalendarFormatter
}

export interface TemporalEngine {
  getToday(): Promise<CalendarDay>
  getDate(date: GregorianDate | IndianDate | string): Promise<CalendarDay>
  getMonth(year: number, month: number): Promise<CalendarMonth>
  getWeek(date: GregorianDate | IndianDate | string): Promise<CalendarWeek>
  getYear(year: number): Promise<CalendarYear>
  nextDay(date?: GregorianDate | IndianDate | string): Promise<CalendarDay>
  previousDay(date?: GregorianDate | IndianDate | string): Promise<CalendarDay>
  nextMonth(
    year?: number,
    month?: number,
  ): Promise<CalendarMonth>
  previousMonth(
    year?: number,
    month?: number,
  ): Promise<CalendarMonth>
}

const placeholderGregorianDate: GregorianDate = {
  year: 1970,
  month: 1,
  day: 1,
  iso: '1970-01-01',
}

const placeholderIndianDate: IndianDate = {
  year: 1891,
  month: 10,
  day: 11,
  system: 'saka',
  iso: '1970-01-01',
}

const placeholderObservances: readonly Observance[] = []

function createPlaceholderDay(date: GregorianDate): CalendarDay {
  return {
    gregorian: date,
    indian: placeholderIndianDate,
    isToday: false,
    label: 'Placeholder day',
    observances: placeholderObservances,
  }
}

function createPlaceholderMonth(year: number, month: number): CalendarMonth {
  return {
    year,
    month,
    days: [createPlaceholderDay(placeholderGregorianDate)],
  }
}

function createPlaceholderWeek(date: GregorianDate): CalendarWeek {
  return {
    year: date.year,
    week: 1,
    days: [createPlaceholderDay(date)],
  }
}

function createPlaceholderYear(year: number): CalendarYear {
  return {
    year,
    months: [createPlaceholderMonth(year, 1)],
  }
}

function resolveGregorianDate(
  dateResolver: DateResolver,
  date: GregorianDate | IndianDate | string | undefined,
): GregorianDate {
  if (date == null) {
    return placeholderGregorianDate
  }

  return dateResolver.resolveGregorianDate(date)
}

export function createTemporalEngine(
  dependencies: TemporalEngineDependencies,
): TemporalEngine {
  const { calendarProvider, dateResolver } = dependencies

  return {
    async getToday() {
      return calendarProvider.getDay(placeholderGregorianDate)
    },
    async getDate(date) {
      const resolvedDate = resolveGregorianDate(dateResolver, date)
      return calendarProvider.getDay(resolvedDate)
    },
    async getMonth(year, month) {
      return calendarProvider.getMonth(year, month)
    },
    async getWeek(date) {
      const resolvedDate = resolveGregorianDate(dateResolver, date)
      return calendarProvider.getWeek(resolvedDate)
    },
    async getYear(year) {
      return calendarProvider.getYear(year)
    },
    async nextDay(date) {
      const resolvedDate = resolveGregorianDate(dateResolver, date)
      if (dependencies.navigator) {
        return calendarProvider.getDay(dependencies.navigator.nextDay(resolvedDate))
      }

      return calendarProvider.getDay(resolvedDate)
    },
    async previousDay(date) {
      const resolvedDate = resolveGregorianDate(dateResolver, date)
      if (dependencies.navigator) {
        return calendarProvider.getDay(
          dependencies.navigator.previousDay(resolvedDate),
        )
      }

      return calendarProvider.getDay(resolvedDate)
    },
    async nextMonth(year, month) {
      const monthContext = year && month ? { year, month } : { year: 1970, month: 1 }
      if (dependencies.navigator) {
        const next = dependencies.navigator.nextMonth(
          monthContext.year,
          monthContext.month,
        )
        return calendarProvider.getMonth(next.year, next.month)
      }

      return calendarProvider.getMonth(monthContext.year, monthContext.month)
    },
    async previousMonth(year, month) {
      const monthContext = year && month ? { year, month } : { year: 1970, month: 1 }
      if (dependencies.navigator) {
        const previous = dependencies.navigator.previousMonth(
          monthContext.year,
          monthContext.month,
        )
        return calendarProvider.getMonth(previous.year, previous.month)
      }

      return calendarProvider.getMonth(monthContext.year, monthContext.month)
    },
  }
}

export const temporalPlaceholders = {
  placeholderGregorianDate,
  placeholderIndianDate,
  createPlaceholderDay,
  createPlaceholderMonth,
  createPlaceholderWeek,
  createPlaceholderYear,
}
