import type {
  CalendarDay,
  CalendarMonth,
  GregorianDate,
  RuntimeCalendarDayRecord,
  RuntimeCalendarYearDocument,
} from '@/models'
import type {
  CalendarProvider,
  CalendarNavigator,
  DateResolver,
  LocalizationProvider,
} from '@/core/temporal'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

const runtimeYearCache = new Map<number, Promise<RuntimeCalendarYearDocument>>()

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function toIsoDate(date: GregorianDate): string {
  return `${date.year}-${pad(date.month)}-${pad(date.day)}`
}

function toGregorianDate(input: Date | GregorianDate): GregorianDate {
  if (input instanceof Date) {
    return {
      year: input.getFullYear(),
      month: input.getMonth() + 1,
      day: input.getDate(),
      iso: input.toISOString().slice(0, 10),
    }
  }

  return input
}

function currentIsoDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  return `${year}-${pad(month)}-${pad(day)}`
}

function fromIsoDate(iso: string): GregorianDate {
  const [year, month, day] = iso.split('-').map(Number)
  return {
    year,
    month,
    day,
    iso,
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

function startOfMonth(date: GregorianDate): GregorianDate {
  return {
    year: date.year,
    month: date.month,
    day: 1,
    iso: `${date.year}-${pad(date.month)}-01`,
  }
}

function startOfWeek(date: GregorianDate): GregorianDate {
  const native = new Date(Date.UTC(date.year, date.month - 1, date.day))
  const diff = native.getUTCDay()
  native.setUTCDate(native.getUTCDate() - diff)
  return {
    year: native.getUTCFullYear(),
    month: native.getUTCMonth() + 1,
    day: native.getUTCDate(),
    iso: native.toISOString().slice(0, 10),
  }
}

function monthYearLabel(date: GregorianDate, localizationProvider: LocalizationProvider) {
  return localizationProvider.formatMonthYear(date)
}

async function loadRuntimeYear(
  year: number,
): Promise<RuntimeCalendarYearDocument> {
  if (!runtimeYearCache.has(year)) {
    const load = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}runtime-data/calendar/${year}.json`,
        )

        if (!response.ok) {
          throw new Error(`Calendar data for ${year} is not available yet.`)
        }

        return (await response.json()) as RuntimeCalendarYearDocument
      } catch (error) {
        runtimeYearCache.delete(year)

        if (error instanceof Error && error.message.includes('not available yet')) {
          throw error
        }

        throw new Error(
          'Calendar data could not be loaded right now. Please check your connection and try again.',
        )
      }
    }

    runtimeYearCache.set(year, load())
  }

  return runtimeYearCache.get(year) as Promise<RuntimeCalendarYearDocument>
}

function pickDayRecord(
  yearDocument: RuntimeCalendarYearDocument,
  date: GregorianDate,
): RuntimeCalendarDayRecord | null {
  return yearDocument.days[toIsoDate(date)] ?? null
}

function resolveRecord(
  date: GregorianDate,
  yearDocument: RuntimeCalendarYearDocument,
  localizationProvider: LocalizationProvider,
  isToday: boolean,
  isCurrentMonth: boolean,
): CalendarDay {
  const record = pickDayRecord(yearDocument, date)
  const label = record?.label ?? 'Ordinary day'

  return {
    gregorian: date,
    indian: record?.indian ?? null,
    isToday,
    isCurrentMonth,
    label,
    weekdayLabel: localizationProvider.formatWeekday(date),
    monthYearLabel: monthYearLabel(date, localizationProvider),
    highlightBanner: record?.highlightBanner ?? null,
    observances: record?.observances ?? [],
    astronomy: record?.astronomy ?? null,
  }
}

async function buildMonth(
  repository: RuntimeTemporalRepository,
  localizationProvider: LocalizationProvider,
  year: number,
  month: number,
): Promise<CalendarMonth> {
  const yearDocument = await repository.getYear(year)
  const firstOfMonth = startOfMonth({
    year,
    month,
    day: 1,
    iso: `${year}-${pad(month)}-01`,
  })
  const startDate = startOfWeek(firstOfMonth)
  const totalDays = 42
  const todayIso = currentIsoDate()
  const days: CalendarDay[] = []

  for (let index = 0; index < totalDays; index += 1) {
    const current = addDays(startDate, index)
    days.push(
      resolveRecord(
        current,
        yearDocument,
        localizationProvider,
        current.iso === todayIso,
        current.month === month,
      ),
    )
  }

  return {
    year,
    month,
    label: localizationProvider.formatMonth(year, month),
    weekdayLabels: WEEKDAY_LABELS,
    days,
  }
}

export interface RuntimeTemporalRepository {
  getYear(year: number): Promise<RuntimeCalendarYearDocument>
}

export function createRuntimeTemporalRepository(): RuntimeTemporalRepository {
  return {
    getYear(year: number) {
      return loadRuntimeYear(year)
    },
  }
}

export function createRuntimeDateResolver(): DateResolver {
  return {
    resolveGregorianDate(input) {
      if (typeof input === 'string') {
        return fromIsoDate(input)
      }

      return toGregorianDate(input)
    },
    resolveIndianDate(input) {
      if (typeof input === 'string') {
        return null
      }

      if ('system' in input) {
        return input
      }

      return null
    },
  }
}

export function createRuntimeLocalizationProvider(
  locale = 'en-IN',
  timeZone = 'Asia/Kolkata',
): LocalizationProvider {
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeZone,
  })
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
  })
  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone,
  })
  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    timeZone,
  })
  const shortMonthFormatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
    timeZone,
  })
  const weekFormatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    timeZone,
  })

  return {
    formatDate(date) {
      return dateFormatter.format(
        new Date(Date.UTC(date.year, date.month - 1, date.day)),
      )
    },
    formatTime(iso) {
      return timeFormatter.format(new Date(iso))
    },
    formatMonthYear(date) {
      return monthFormatter.format(
        new Date(Date.UTC(date.year, date.month - 1, date.day)),
      )
    },
    formatMonth(year, month) {
      return shortMonthFormatter.format(new Date(Date.UTC(year, month - 1, 1)))
    },
    formatWeekday(date) {
      return weekdayFormatter.format(
        new Date(Date.UTC(date.year, date.month - 1, date.day)),
      )
    },
    formatWeek(year, week) {
      const anchor = new Date(Date.UTC(year, 0, 1))
      anchor.setUTCDate(anchor.getUTCDate() + (week - 1) * 7)
      return weekFormatter.format(anchor)
    },
  }
}

export function createRuntimeCalendarNavigator(): CalendarNavigator {
  return {
    nextDay(date) {
      return addDays(date, 1)
    },
    previousDay(date) {
      return addDays(date, -1)
    },
    nextMonth(year, month) {
      return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 }
    },
    previousMonth(year, month) {
      return month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 }
    },
  }
}

export function createRuntimeCalendarProvider(
  repository: RuntimeTemporalRepository,
  localizationProvider: LocalizationProvider,
): CalendarProvider {
  return {
    async getDay(date) {
      const yearDocument = await repository.getYear(date.year)
      const resolved = toGregorianDate(date)
      return resolveRecord(
        resolved,
        yearDocument,
        localizationProvider,
        resolved.iso === currentIsoDate(),
        true,
      )
    },
    async getMonth(year, month) {
      return buildMonth(repository, localizationProvider, year, month)
    },
    async getWeek(date) {
      const yearDocument = await repository.getYear(date.year)
      const startDate = startOfWeek(date)
      const todayIso = currentIsoDate()
      const days: CalendarDay[] = []

      for (let index = 0; index < 7; index += 1) {
        const current = addDays(startDate, index)
        days.push(
          resolveRecord(
            current,
            yearDocument,
            localizationProvider,
            current.iso === todayIso,
            true,
          ),
        )
      }

      return {
        year: date.year,
        week: 1,
        label: localizationProvider.formatWeek(date.year, 1),
        days,
      }
    },
    async getYear(year) {
      const months: CalendarMonth[] = []
      for (let month = 1; month <= 12; month += 1) {
        months.push(await buildMonth(repository, localizationProvider, year, month))
      }

      return {
        year,
        label: String(year),
        months,
      }
    },
  }
}
