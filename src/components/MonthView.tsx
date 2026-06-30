import type { CalendarMonth } from '@/models'

type MonthViewProps = {
  month: CalendarMonth
  selectedIso: string | null
  onSelectDay: (iso: string) => void | Promise<void>
}

function badgeLabel(type: string) {
  switch (type) {
    case 'holiday':
      return 'Holiday'
    case 'festival':
      return 'Festival'
    case 'observance':
      return 'Observance'
    case 'event':
      return 'Event'
    case 'birthday':
      return 'Birthday'
    case 'reminder':
      return 'Reminder'
    case 'habit':
      return 'Habit'
    case 'journal':
      return 'Journal'
    default:
      return 'Item'
  }
}

export function MonthView({ month, selectedIso, onSelectDay }: MonthViewProps) {
  return (
    <article className="month-view panel">
      <div className="month-view__header">
        <p className="month-view__eyebrow">Month</p>
        <h2 className="month-view__title">{month.label}</h2>
      </div>

      <div className="month-view__weekdays" aria-hidden="true">
        {month.weekdayLabels.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <div className="month-view__grid" role="grid" aria-label={month.label}>
        {month.days.map((day) => {
          const isSelected = day.gregorian.iso === selectedIso
          const firstObservance = day.observances[0]
          const cellClasses = [
            'month-view__cell',
            day.isCurrentMonth ? 'month-view__cell--current' : 'month-view__cell--adjacent',
            day.isToday ? 'month-view__cell--today' : '',
            isSelected ? 'month-view__cell--selected' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              className={cellClasses}
              key={day.gregorian.iso}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${day.weekdayLabel}, ${day.monthYearLabel}`}
              onClick={() => {
                void onSelectDay(day.gregorian.iso)
              }}
            >
              <div className="month-view__cell-top">
                <span className="month-view__day-number">{day.gregorian.day}</span>
                <div className="month-view__cell-chips">
                  {day.isToday ? <span className="month-view__today-tag">Today</span> : null}
                  {isSelected ? <span className="month-view__selected-tag">Selected</span> : null}
                </div>
              </div>

              {day.label !== 'Ordinary day' ? (
                <p className="month-view__label">{day.label}</p>
              ) : (
                <span className="month-view__spacer" aria-hidden="true" />
              )}

              {firstObservance ? (
                <div className="month-view__badges">
                  <span
                    className={`badge badge--${firstObservance.type}`}
                    title={firstObservance.title}
                  >
                    {badgeLabel(firstObservance.type)}
                  </span>
                </div>
              ) : null}
            </button>
          )
        })}
      </div>
    </article>
  )
}
