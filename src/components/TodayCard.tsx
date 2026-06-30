import type { CalendarDay } from '@/models'
import { formatClockTime } from '@/utils/time'

type TodayCardProps = {
  day: CalendarDay
}

type IndianSystem = NonNullable<CalendarDay['indian']>['system']

function formatIndianSystem(system: IndianSystem) {
  return system.replace(/-/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

function SunriseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 16h14" />
      <path d="M7.5 12.5 12 8l4.5 4.5" />
      <path d="M12 4v4" />
      <path d="M9 5.5 10.8 7.3" />
      <path d="M15 5.5 13.2 7.3" />
    </svg>
  )
}

function SunsetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 16h14" />
      <path d="M7.5 11.5 12 16l4.5-4.5" />
      <path d="M12 20v-4" />
      <path d="M9 18.5 10.8 16.7" />
      <path d="M15 18.5 13.2 16.7" />
    </svg>
  )
}

function MoonriseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 16h14" />
      <path d="M8 12.5 12 8.5l4 4" />
      <path d="M12 4v4" />
      <path d="M9 6.2 10.5 7.7" />
      <path d="M15 6.2 13.5 7.7" />
      <path d="M16.5 6.5a6 6 0 1 1-3.8 10.7A7 7 0 0 0 16.5 6.5Z" />
    </svg>
  )
}

function MoonsetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 16h14" />
      <path d="M8 11.5 12 15.5l4-4" />
      <path d="M12 20v-4" />
      <path d="M9 18.3 10.5 16.8" />
      <path d="M15 18.3 13.5 16.8" />
      <path d="M16.5 6.5a6 6 0 1 1-3.8 10.7A7 7 0 0 0 16.5 6.5Z" />
    </svg>
  )
}

function bannerTitle(day: CalendarDay) {
  return day.observances[0]?.title ?? day.label
}

export function TodayCard({ day }: TodayCardProps) {
  return (
    <article className="today-card panel">
      <div className="today-card__hero">
        <div className="today-card__date-stack">
          <p className="today-card__eyebrow">{day.isToday ? 'Today' : 'Selected day'}</p>
          <h2 className="today-card__date">{day.gregorian.day}</h2>
        </div>

        <div className="today-card__calendar-meta">
          <p className="today-card__weekday">{day.weekdayLabel}</p>
          <p className="today-card__month">{day.monthYearLabel}</p>
        </div>
      </div>

      <section className="today-card__section today-card__indian" aria-label="Indian calendar date">
        <p className="today-card__section-label">Indian Calendar Date</p>
        {day.indian ? (
          <div className="today-card__indian-body">
            <p className="today-card__indian-system">{formatIndianSystem(day.indian.system)}</p>
            <p className="today-card__indian-date">
              {day.indian.day} / {day.indian.month} / {day.indian.year}
            </p>
          </div>
        ) : (
          <p className="today-card__indian-empty">Indian date unavailable for this day.</p>
        )}
      </section>

      <section className="today-card__section today-card__banner" aria-label="Highlight banner">
        <p className="today-card__section-label">Highlight</p>
        <div className="today-card__banner-body">
          <p className="today-card__banner-title">{bannerTitle(day)}</p>
          <p className="today-card__banner-text">
            {day.highlightBanner ?? 'No special highlight recorded for this date.'}
          </p>
        </div>
      </section>

      <section className="today-card__section today-card__astronomy" aria-label="Astronomy data">
        <p className="today-card__section-label">Astronomy</p>
        <div className="today-card__astronomy-grid">
          <div className="today-card__astro-tile">
            <div className="today-card__astro-heading">
              <SunriseIcon />
              <span>Sunrise</span>
            </div>
            <strong>{day.astronomy ? formatClockTime(day.astronomy.sun.sunriseISO) : '-'}</strong>
          </div>

          <div className="today-card__astro-tile">
            <div className="today-card__astro-heading">
              <SunsetIcon />
              <span>Sunset</span>
            </div>
            <strong>{day.astronomy ? formatClockTime(day.astronomy.sun.sunsetISO) : '-'}</strong>
          </div>

          <div className="today-card__astro-tile">
            <div className="today-card__astro-heading">
              <MoonriseIcon />
              <span>Moonrise</span>
            </div>
            <strong>{day.astronomy ? formatClockTime(day.astronomy.moon.moonriseISO) : '-'}</strong>
          </div>

          <div className="today-card__astro-tile">
            <div className="today-card__astro-heading">
              <MoonsetIcon />
              <span>Moonset</span>
            </div>
            <strong>{day.astronomy ? formatClockTime(day.astronomy.moon.moonsetISO) : '-'}</strong>
          </div>
        </div>
      </section>
    </article>
  )
}
