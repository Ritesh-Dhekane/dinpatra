import type {
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
  CalendarYear,
  GregorianDate,
  IndianDate,
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
  nextMonth(year?: number, month?: number): Promise<CalendarMonth>
  previousMonth(year?: number, month?: number): Promise<CalendarMonth>
}

function currentDate(): GregorianDate {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  return {
    year,
    month,
    day,
    iso: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
  }
}

function addDays(date: GregorianDate, amount: number): GregorianDate {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day))
  next.setUTCDate(next.getUTCDate() + amount)
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
    iso: next.toISOString().slice(0, 10),
  }
}

function addMonths(date: GregorianDate, amount: number): { year: number; month: number } {
  const next = new Date(Date.UTC(date.year, date.month - 1, 1))
  next.setUTCMonth(next.getUTCMonth() + amount)
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
  }
}

function resolveGregorianDate(
  dateResolver: DateResolver,
  date: GregorianDate | IndianDate | string | undefined,
): Promise<GregorianDate> {
  if (date == null) {
    return Promise.resolve(currentDate())
  }

  return Promise.resolve(dateResolver.resolveGregorianDate(date))
}

function resolveNavigationBase(
  dateResolver: DateResolver,
  date: GregorianDate | IndianDate | string | undefined,
): Promise<GregorianDate> {
  return resolveGregorianDate(dateResolver, date)
}

export function createTemporalEngine(
  dependencies: TemporalEngineDependencies,
): TemporalEngine {
  const { calendarProvider, dateResolver } = dependencies

  return {
    async getToday() {
      return calendarProvider.getDay(currentDate())
    },
    async getDate(date) {
      const resolvedDate = await resolveGregorianDate(dateResolver, date)
      return calendarProvider.getDay(resolvedDate)
    },
    async getMonth(year, month) {
      return calendarProvider.getMonth(year, month)
    },
    async getWeek(date) {
      const resolvedDate = await resolveGregorianDate(dateResolver, date)
      return calendarProvider.getWeek(resolvedDate)
    },
    async getYear(year) {
      return calendarProvider.getYear(year)
    },
    async nextDay(date) {
      const resolvedDate = await resolveNavigationBase(dateResolver, date)
      const nextDate = dependencies.navigator
        ? dependencies.navigator.nextDay(resolvedDate)
        : addDays(resolvedDate, 1)
      return calendarProvider.getDay(nextDate)
    },
    async previousDay(date) {
      const resolvedDate = await resolveNavigationBase(dateResolver, date)
      const previousDate = dependencies.navigator
        ? dependencies.navigator.previousDay(resolvedDate)
        : addDays(resolvedDate, -1)
      return calendarProvider.getDay(previousDate)
    },
    async nextMonth(year, month) {
      const baseDate =
        year != null && month != null
          ? ({ year, month, day: 1, iso: `${year}-${String(month).padStart(2, '0')}-01` } as GregorianDate)
          : currentDate()
      const next = dependencies.navigator
        ? dependencies.navigator.nextMonth(baseDate.year, baseDate.month)
        : addMonths(baseDate, 1)
      return calendarProvider.getMonth(next.year, next.month)
    },
    async previousMonth(year, month) {
      const baseDate =
        year != null && month != null
          ? ({ year, month, day: 1, iso: `${year}-${String(month).padStart(2, '0')}-01` } as GregorianDate)
          : currentDate()
      const previous = dependencies.navigator
        ? dependencies.navigator.previousMonth(baseDate.year, baseDate.month)
        : addMonths(baseDate, -1)
      return calendarProvider.getMonth(previous.year, previous.month)
    },
  }
}
