import type { CalendarDay, Observance } from '@/models'

/**
 * Placeholder boundary for deterministic calendar calculations.
 * The real engine will stay pure and live outside the UI layer.
 */
export interface CalendarEngineService {
  readonly name: 'calendar-engine'
  describeDay(dateISO: string): Promise<CalendarDay>
  listObservances(dateISO: string): Promise<readonly Observance[]>
}

export function createCalendarEngineService(): CalendarEngineService {
  return {
    name: 'calendar-engine',
    async describeDay() {
      throw new Error('Calendar engine service is not implemented yet.')
    },
    async listObservances() {
      throw new Error('Calendar engine service is not implemented yet.')
    },
  }
}
