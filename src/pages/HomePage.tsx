import { MonthView } from '@/components/MonthView'
import { TodayCard } from '@/components/TodayCard'
import { useTemporalDashboard } from '@/hooks/useTemporalDashboard'
import '@/styles/app.css'

export function HomePage() {
  const { today, month, loading, error } = useTemporalDashboard()

  return (
    <div className="shell">
      <div className="shell__glow shell__glow--one" aria-hidden="true" />
      <div className="shell__glow shell__glow--two" aria-hidden="true" />

      <header className="hero">
        <div className="hero__copy">
          <p className="eyebrow">DinPatra</p>
          <h1>Today&apos;s Card and the current month, powered by the Temporal Engine.</h1>
          <p className="lede">
            This slice proves the architecture by flowing data from the runtime
            JSON dataset through the domain engine and into the screen layer
            without letting the UI touch the data file directly.
          </p>
        </div>

        <aside className="hero__status" aria-label="Runtime slice status">
          <p className="hero__status-label">MVP slice</p>
          <ul className="hero__status-list">
            <li>Temporal Engine is active</li>
            <li>Runtime JSON loads through the repository layer</li>
            <li>React components remain data agnostic</li>
          </ul>
        </aside>
      </header>

      <main className="content">
        {error ? <div className="panel panel--error">{error}</div> : null}

        <section className="section" aria-labelledby="today-title">
          <div className="section__header">
            <div>
              <p className="section__kicker">Today&apos;s Card</p>
              <h2 id="today-title" className="section__title">
                Current local time, observances, and astronomy details.
              </h2>
            </div>
          </div>

          {loading || !today ? (
            <div className="panel panel--placeholder">Loading today&apos;s data...</div>
          ) : (
            <TodayCard day={today} />
          )}
        </section>

        <section className="section" aria-labelledby="month-title">
          <div className="section__header">
            <div>
              <p className="section__kicker">Current Month View</p>
              <h2 id="month-title" className="section__title">
                The visible calendar grid is generated from the engine.
              </h2>
            </div>
          </div>

          {loading || !month ? (
            <div className="panel panel--placeholder">Loading month data...</div>
          ) : (
            <MonthView month={month} />
          )}
        </section>
      </main>
    </div>
  )
}
