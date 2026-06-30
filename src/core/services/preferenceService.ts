import type { ThemePreference, UserPreferences, ViewMode } from '@/models'

const STORAGE_KEY = 'dinpatra.preferences'

const DEFAULT_PREFERENCES: UserPreferences = {
  viewMode: 'month',
  theme: 'system',
  language: 'en-IN',
}

const VIEW_MODES: readonly ViewMode[] = ['day', 'week', 'month', '3-month', '6-month', 'year']
const THEMES: readonly ThemePreference[] = ['system', 'light', 'dark']

export interface PreferenceService {
  loadPreferences(): UserPreferences
  savePreferences(preferences: Partial<UserPreferences>): UserPreferences
  resetPreferences(): UserPreferences
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isViewMode(value: unknown): value is ViewMode {
  return typeof value === 'string' && VIEW_MODES.includes(value as ViewMode)
}

function isThemePreference(value: unknown): value is ThemePreference {
  return typeof value === 'string' && THEMES.includes(value as ThemePreference)
}

function normalizePreferences(input: unknown): UserPreferences {
  if (!isRecord(input)) {
    return DEFAULT_PREFERENCES
  }

  const preferences: UserPreferences = {
    viewMode: isViewMode(input.viewMode) ? input.viewMode : DEFAULT_PREFERENCES.viewMode,
    theme: isThemePreference(input.theme) ? input.theme : DEFAULT_PREFERENCES.theme,
    language:
      typeof input.language === 'string' && input.language.trim().length > 0
        ? input.language
        : DEFAULT_PREFERENCES.language,
  }

  return preferences
}

function readStorage(): UserPreferences {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return DEFAULT_PREFERENCES
    }

    return normalizePreferences(JSON.parse(raw))
  } catch {
    return DEFAULT_PREFERENCES
  }
}

function writeStorage(preferences: UserPreferences) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
}

export function createPreferenceService(): PreferenceService {
  return {
    loadPreferences() {
      return readStorage()
    },
    savePreferences(preferences) {
      const nextPreferences = normalizePreferences({
        ...readStorage(),
        ...preferences,
      })
      writeStorage(nextPreferences)
      return nextPreferences
    },
    resetPreferences() {
      writeStorage(DEFAULT_PREFERENCES)
      return DEFAULT_PREFERENCES
    },
  }
}
