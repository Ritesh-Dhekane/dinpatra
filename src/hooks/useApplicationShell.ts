import { useEffect, useRef, useState } from 'react'
import { temporalEngine } from '@/app/temporal'
import { createPreferenceService } from '@/core/services'
import type { CalendarDay, CalendarMonth, GregorianDate, ViewMode } from '@/models'

const preferenceService = createPreferenceService()

type ApplicationShellState = {
  selectedDay: CalendarDay | null
  visibleMonth: CalendarMonth | null
  viewMode: ViewMode
  loading: boolean
  error: string | null
  setViewMode: (viewMode: ViewMode) => void
  goToday: () => Promise<void>
  goPrevious: () => Promise<void>
  goNext: () => Promise<void>
  selectDay: (date: GregorianDate | string) => Promise<void>
}

function firstCurrentMonthDay(month: CalendarMonth) {
  return (
    month.days.find((day) => day.isCurrentMonth && day.gregorian.day === 1) ??
    month.days.find((day) => day.isCurrentMonth) ??
    month.days[0]
  )
}

export function useApplicationShell(): ApplicationShellState {
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
  const [visibleMonth, setVisibleMonth] = useState<CalendarMonth | null>(null)
  const [viewMode, setViewModeState] = useState<ViewMode>('month')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMountedRef = useRef(true)

  async function syncDay(date: GregorianDate | string) {
    const nextDay = await temporalEngine.getDate(date)
    const nextMonth = await temporalEngine.getMonth(nextDay.gregorian.year, nextDay.gregorian.month)

    if (!isMountedRef.current) {
      return
    }

    setSelectedDay(nextDay)
    setVisibleMonth(nextMonth)
    setError(null)
  }

  async function syncToday() {
    const today = await temporalEngine.getToday()
    const currentMonth = await temporalEngine.getMonth(today.gregorian.year, today.gregorian.month)

    if (!isMountedRef.current) {
      return
    }

    setSelectedDay(today)
    setVisibleMonth(currentMonth)
    setError(null)
  }

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const [preferences, today] = await Promise.all([
          Promise.resolve(preferenceService.loadPreferences()),
          temporalEngine.getToday(),
        ])

        const currentMonth = await temporalEngine.getMonth(today.gregorian.year, today.gregorian.month)

        if (!active) {
          return
        }

        setViewModeState(preferences.viewMode)
        setSelectedDay(today)
        setVisibleMonth(currentMonth)
        setError(null)
      } catch (loadError) {
        if (!active) {
          return
        }

        setError(loadError instanceof Error ? loadError.message : 'Unable to load calendar data.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      active = false
      isMountedRef.current = false
    }
  }, [])

  function setViewMode(viewModeNext: ViewMode) {
    setViewModeState(viewModeNext)
    preferenceService.savePreferences({ viewMode: viewModeNext })
  }

  async function goToday() {
    await syncToday()
  }

  async function goPrevious() {
    if (!selectedDay) {
      return
    }

    if (viewMode === 'day') {
      const previousDay = await temporalEngine.previousDay(selectedDay.gregorian.iso)
      const previousMonth = await temporalEngine.getMonth(
        previousDay.gregorian.year,
        previousDay.gregorian.month,
      )

      if (!isMountedRef.current) {
        return
      }

      setSelectedDay(previousDay)
      setVisibleMonth(previousMonth)
      setError(null)
      return
    }

    const currentMonth = visibleMonth ?? (await temporalEngine.getMonth(selectedDay.gregorian.year, selectedDay.gregorian.month))
    const previousMonth = await temporalEngine.previousMonth(currentMonth.year, currentMonth.month)

    if (!isMountedRef.current) {
      return
    }

    setVisibleMonth(previousMonth)
    setSelectedDay(firstCurrentMonthDay(previousMonth))
    setError(null)
  }

  async function goNext() {
    if (!selectedDay) {
      return
    }

    if (viewMode === 'day') {
      const nextDay = await temporalEngine.nextDay(selectedDay.gregorian.iso)
      const nextMonth = await temporalEngine.getMonth(nextDay.gregorian.year, nextDay.gregorian.month)

      if (!isMountedRef.current) {
        return
      }

      setSelectedDay(nextDay)
      setVisibleMonth(nextMonth)
      setError(null)
      return
    }

    const currentMonth = visibleMonth ?? (await temporalEngine.getMonth(selectedDay.gregorian.year, selectedDay.gregorian.month))
    const nextMonth = await temporalEngine.nextMonth(currentMonth.year, currentMonth.month)

    if (!isMountedRef.current) {
      return
    }

    setVisibleMonth(nextMonth)
    setSelectedDay(firstCurrentMonthDay(nextMonth))
    setError(null)
  }

  async function selectDay(date: GregorianDate | string) {
    await syncDay(date)
  }

  return {
    selectedDay,
    visibleMonth,
    viewMode,
    loading,
    error,
    setViewMode,
    goToday,
    goPrevious,
    goNext,
    selectDay,
  }
}
