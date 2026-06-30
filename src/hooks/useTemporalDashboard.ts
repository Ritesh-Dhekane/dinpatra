import { useEffect, useState } from 'react'
import type { CalendarDay, CalendarMonth } from '@/models'
import { temporalEngine } from '@/app/temporal'

type TemporalDashboardState = {
  today: CalendarDay | null
  month: CalendarMonth | null
  loading: boolean
  error: string | null
}

const initialState: TemporalDashboardState = {
  today: null,
  month: null,
  loading: true,
  error: null,
}

export function useTemporalDashboard(): TemporalDashboardState {
  const [state, setState] = useState<TemporalDashboardState>(initialState)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const today = await temporalEngine.getToday()
        const month = await temporalEngine.getMonth(
          today.gregorian.year,
          today.gregorian.month,
        )

        if (!active) {
          return
        }

        setState({
          today,
          month,
          loading: false,
          error: null,
        })
      } catch (error) {
        if (!active) {
          return
        }

        setState({
          today: null,
          month: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unable to load calendar data.',
        })
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  return state
}
