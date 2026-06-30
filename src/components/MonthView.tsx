import type { CalendarMonth } from '@/models'

type MonthViewProps = {
  month: CalendarMonth
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

export function MonthView({ month }: MonthViewProps) {
  return (
    <article className="month-view panel">
      <div className="month-view__header">
        <div>
          <p className="today-card__eyebrow">Current Month</p>
          <h3 className="month-view__title">{month.label}</h3>
        </div>
      </div>

      <div className="month-view__weekdays" aria-hidden="true">
        {month.weekdayLabels.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <div className="month-view__grid">
        {month.days.map((day) => (
          <div
            className={[
              'month-view__cell',
              day.isCurrentMonth ? 'month-view__cell--current' : 'month-view__cell--adjacent',
              day.isToday ? 'month-view__cell--today' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            key={day.gregorian.iso}
            aria-label={`${day.weekdayLabel}, ${day.monthYearLabel}`}
          >
            <div className="month-view__cell-top">
              <span className="month-view__day-number">{day.gregorian.day}</span>
              {day.isToday ? <span className="month-view__today-tag">Today</span> : null}
            </div>

            {day.label !== 'Ordinary day' ? (
              <p className="month-view__label">{day.label}</p>
            ) : null}

            {day.observances.length > 0 ? (
              <div className="month-view__badges">
                {day.observances.slice(0, 2).map((observance) => (
                  <span
                    className={`badge badge--${observance.type}`}
                    key={observance.id}
                    title={observance.title}
                  >
                    {badgeLabel(observance.type)}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  )
}
