import { MonthView } from '@/components/MonthView'
import { TodayCard } from '@/components/TodayCard'
import { useTemporalDashboard } from '@/hooks/useTemporalDashboard'
import '@/styles/app.css'

export function HomePage() {
  const { day, month, loading, error, selectDay } = useTemporalDashboard()

  return (
    <div className="shell">
      <header className="app-header">
        <div>
          <p className="app-header__eyebrow">Offline-first calendar</p>
          <h1 className="app-header__title">DinPatra</h1>
        </div>
        <p className="app-header__meta">Calendar and daily operating system.</p>
      </header>

      <main className="content">
        {error ? <div className="panel panel--error">{error}</div> : null}

        <section className="section" aria-labelledby="today-title">
          <h2 id="today-title" className="sr-only">
            Today&apos;s Card
          </h2>
          {loading ? (
            <div className="panel panel--placeholder">Loading today&apos;s calendar data...</div>
          ) : day ? (
            <TodayCard day={day} />
          ) : (
            null
          )}
        </section>

        <section className="section" aria-labelledby="month-title">
          <h2 id="month-title" className="sr-only">
            Current Month View
          </h2>
          {loading ? (
            <div className="panel panel--placeholder">Loading month view...</div>
          ) : month && day ? (
            <MonthView month={month} selectedIso={day.gregorian.iso} onSelectDay={selectDay} />
          ) : (
            null
          )}
        </section>
      </main>
    </div>
  )
}
