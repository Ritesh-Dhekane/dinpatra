export type ViewMode = 'day' | 'week' | 'month' | '3-month' | '6-month' | 'year'

export type ThemePreference = 'system' | 'light' | 'dark'

export interface UserPreferences {
  readonly viewMode: ViewMode
  readonly theme: ThemePreference
  readonly language: string
}
