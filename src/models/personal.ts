export interface Reminder {
  readonly id: string
  readonly title: string
  readonly dueAtISO: string
  readonly completed: boolean
}

export interface Birthday {
  readonly id: string
  readonly contactId: string
  readonly dateISO: string
  readonly label: string
}

export interface Habit {
  readonly id: string
  readonly title: string
  readonly streak: number
  readonly active: boolean
}

export interface Journal {
  readonly id: string
  readonly dateISO: string
  readonly body: string
}

export interface Settings {
  readonly locale: string
  readonly timeZone: string
  readonly useDarkMode: boolean
}
