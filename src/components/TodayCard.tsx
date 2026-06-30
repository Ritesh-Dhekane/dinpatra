import type { CalendarDay } from '@/models'
import { formatClockTime } from '@/utils/time'

type TodayCardProps = {
  day: CalendarDay
}

function formatIndianDate(day: CalendarDay) {
  if (!day.indian) {
    return 'Indian date unavailable'
  }

  return `${day.indian.system.replace('-', ' ')} ${day.indian.day}/${day.indian.month}/${day.indian.year}`
}

export function TodayCard({ day }: TodayCardProps) {
  return (
    <article className="today-card panel">
      <div className="today-card__top">
        <div>
          <p className="today-card__eyebrow">{day.isToday ? 'Today' : 'Selected day'}</p>
          <h3 className="today-card__date">{day.gregorian.day}</h3>
        </div>
        <div className="today-card__meta">
          <p className="today-card__weekday">{day.weekdayLabel}</p>
          <p className="today-card__month">{day.monthYearLabel}</p>
        </div>
      </div>

      <div className="today-card__summary">
        <p className="today-card__label">{day.label}</p>
        <p className="today-card__indian">{formatIndianDate(day)}</p>
      </div>

      <div className="today-card__banner">
        <span className="today-card__banner-kicker">Highlight Banner</span>
        <p>{day.highlightBanner ?? 'No highlight recorded for this day.'}</p>
      </div>

      <div className="today-card__astronomy">
        <div>
          <span className="today-card__field-label">Sunrise</span>
          <strong>
            {day.astronomy ? formatClockTime(day.astronomy.sun.sunriseISO) : '-'}
          </strong>
        </div>
        <div>
          <span className="today-card__field-label">Sunset</span>
          <strong>
            {day.astronomy ? formatClockTime(day.astronomy.sun.sunsetISO) : '-'}
          </strong>
        </div>
        <div>
          <span className="today-card__field-label">Moonrise</span>
          <strong>
            {day.astronomy ? formatClockTime(day.astronomy.moon.moonriseISO) : '-'}
          </strong>
        </div>
        <div>
          <span className="today-card__field-label">Moonset</span>
          <strong>
            {day.astronomy ? formatClockTime(day.astronomy.moon.moonsetISO) : '-'}
          </strong>
        </div>
      </div>

      {day.observances.length > 0 ? (
        <div className="today-card__observances">
          {day.observances.map((observance) => (
            <span className={`badge badge--${observance.type}`} key={observance.id}>
              {observance.title}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  )
}
