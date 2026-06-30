import type { AstronomyData } from './astronomy'

export type GregorianDate = Readonly<{
  year: number
  month: number
  day: number
  iso: string
}>

export type IndianCalendarSystem = 'saka' | 'vikram-samvat'

export type IndianDate = Readonly<{
  year: number
  month: number
  day: number
  system: IndianCalendarSystem
  iso: string
}>

export type ObservanceType =
  | 'festival'
  | 'holiday'
  | 'observance'
  | 'event'
  | 'birthday'
  | 'reminder'
  | 'habit'
  | 'journal'

export type Observance = Readonly<{
  id: string
  title: string
  type: ObservanceType
  date: GregorianDate
}>

export type CalendarDay = Readonly<{
  gregorian: GregorianDate
  indian: IndianDate | null
  isToday: boolean
  isCurrentMonth: boolean
  label: string
  weekdayLabel: string
  monthYearLabel: string
  highlightBanner: string | null
  observances: readonly Observance[]
  astronomy: AstronomyData | null
}>

export type CalendarMonth = Readonly<{
  year: number
  month: number
  label: string
  weekdayLabels: readonly string[]
  days: readonly CalendarDay[]
}>

export type CalendarWeek = Readonly<{
  year: number
  week: number
  label: string
  days: readonly CalendarDay[]
}>

export type CalendarYear = Readonly<{
  year: number
  label: string
  months: readonly CalendarMonth[]
}>
