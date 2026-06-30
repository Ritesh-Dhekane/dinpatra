export interface Observance {
  readonly id: string
  readonly title: string
  readonly kind: 'festival' | 'holiday' | 'observance' | 'event'
  readonly dateISO: string
}

export interface CalendarDay {
  readonly dateISO: string
  readonly label: string
  readonly isToday: boolean
  readonly observances: readonly Observance[]
}
