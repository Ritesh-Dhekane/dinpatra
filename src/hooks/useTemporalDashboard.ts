import { useEffect, useRef, useState } from 'react'
import type { CalendarDay, CalendarMonth, GregorianDate } from '@/models'
import { temporalEngine } from '@/app/temporal'

type TemporalDashboardState = {
  day: CalendarDay | null
  month: CalendarMonth | null
  loading: boolean
  error: string | null
  selectDay: (date: GregorianDate | string) => Promise<void>
}

export function useTemporalDashboard(): TemporalDashboardState {
  const [day, setDay] = useState<CalendarDay | null>(null)
  const [month, setMonth] = useState<CalendarMonth | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const requestIdRef = useRef(0)
  const isMountedRef = useRef(true)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const today = await temporalEngine.getToday()
        const currentMonth = await temporalEngine.getMonth(
          today.gregorian.year,
          today.gregorian.month,
        )

        if (!active) {
          return
        }

        setDay(today)
        setMonth(currentMonth)
        setError(null)
      } catch (loadError) {
        if (!active) {
          return
        }

        setDay(null)
        setMonth(null)
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
    }
  }, [])

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  async function selectDay(date: GregorianDate | string) {
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId

    try {
      const selectedDay = await temporalEngine.getDate(date)

      if (!isMountedRef.current || requestId !== requestIdRef.current) {
        return
      }

      setDay(selectedDay)
      setError(null)
    } catch (selectionError) {
      if (!isMountedRef.current || requestId !== requestIdRef.current) {
        return
      }

      setError(
        selectionError instanceof Error
          ? selectionError.message
          : 'Unable to load the selected date.',
      )
    }
  }

  return { day, month, loading, error, selectDay }
}
