import { FeatureCard } from '@/components/FeatureCard'
import {
  corePillars,
  heroStats,
  migrationPhases,
  principles,
} from '@/data/projectContent'
import '@/styles/app.css'

export function HomePage() {
  return (
    <div className="shell">
      <div className="shell__glow shell__glow--one" aria-hidden="true" />
      <div className="shell__glow shell__glow--two" aria-hidden="true" />

      <header className="hero">
        <div className="hero__copy">
          <p className="eyebrow">DinPatra</p>
          <h1>Offline-first calendar and personal operating system for Indian life.</h1>
          <p className="lede">
            The starter template has been replaced with a product scaffold that
            keeps logic out of the UI, sets up clear feature boundaries, and
            prepares the app for local-first calendar data.
          </p>
        </div>

        <aside className="hero__status" aria-label="Project foundation">
          <p className="hero__status-label">Phase 1 foundation</p>
          <ul className="hero__status-list">
            <li>React + Vite + TypeScript base</li>
            <li>Component-driven layout structure</li>
            <li>PWA metadata scaffold</li>
          </ul>
        </aside>
      </header>

      <main className="content">
        <section className="section" aria-labelledby="foundation-title">
          <div className="section__header">
            <div>
              <p className="section__kicker">Architecture principles</p>
              <h2 id="foundation-title" className="section__title">
                The current scaffold is shaped around the intended platform
                rules.
              </h2>
            </div>
          </div>

          <div className="hero__stats" aria-label="Project rules">
            {heroStats.map((stat) => (
              <div className="stat" key={stat.id}>
                <span className="stat__value">{stat.value}</span>
                <span className="stat__label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="principles">
            {principles.map((principle) => (
              <span className="principles__item" key={principle}>
                {principle}
              </span>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="pillars-title">
          <div className="section__header">
            <div>
              <p className="section__kicker">Core areas</p>
              <h2 id="pillars-title" className="section__title">
                The next layers should map directly to product domains.
              </h2>
            </div>
          </div>

          <div className="card-grid">
            {corePillars.map((pillar) => (
              <FeatureCard
                key={pillar.id}
                eyebrow={pillar.eyebrow}
                title={pillar.title}
                description={pillar.description}
                bullets={pillar.bullets}
              />
            ))}
          </div>
        </section>

        <section className="section split-grid" aria-labelledby="roadmap-title">
          <article className="panel">
            <p className="section__kicker">Migration plan</p>
            <h2 id="roadmap-title" className="section__title">
              Phase 1 is now a real foundation instead of a starter template.
            </h2>
            <ol className="phase-list">
              {migrationPhases.map((phase, index) => (
                <li className="phase" key={phase.id}>
                  <span className="phase__index">{index + 1}</span>
                  <div>
                    <h3 className="phase__title">{phase.title}</h3>
                    <p className="phase__description">{phase.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <aside className="panel panel--accent" aria-label="Current gaps">
            <p className="section__kicker">Still pending</p>
            <h2 className="section__title">What remains outside this pass</h2>
            <ul className="gap-list">
              <li>Routing and screen-level navigation</li>
              <li>IndexedDB and Dexie data access layer</li>
              <li>CSV-to-runtime-JSON build pipeline</li>
              <li>Service worker caching and offline sync strategy</li>
              <li>Calendar engine domain model and recurrence logic</li>
            </ul>
          </aside>
        </section>
      </main>
    </div>
  )
}
