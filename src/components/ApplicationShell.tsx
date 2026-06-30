import { MonthView } from '@/components/MonthView'
import { TodayCard } from '@/components/TodayCard'
import { ViewPlaceholder } from '@/components/ViewPlaceholder'
import { useApplicationShell } from '@/hooks/useApplicationShell'
import type { ReactNode } from 'react'
import type { ViewMode } from '@/models'
import '@/styles/app.css'

const VIEW_LABELS: Record<ViewMode, string> = {
  day: 'Day',
  week: 'Week',
  month: 'Month',
  '3-month': '3 Month',
  '6-month': '6 Month',
  year: 'Year',
}

const VIEW_ORDER: readonly ViewMode[] = ['day', 'week', 'month', '3-month', '6-month', 'year']

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Z" />
      <path d="m19 12-1.8.9.2 2-1.7 1-1.6-1.2-1.9.8-.8 1.9h-2l-.8-1.9-1.9-.8-1.6 1.2-1.7-1 .2-2L5 12l1.8-.9-.2-2 1.7-1 1.6 1.2 1.9-.8.8-1.9h2l.8 1.9 1.9.8 1.6-1.2 1.7 1-.2 2Z" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m14 6-6 6 6 6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m10 6 6 6-6 6" />
    </svg>
  )
}

function TodayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4v3" />
      <path d="M17 4v3" />
      <path d="M5 7h14" />
      <path d="M6 9h12v9H6z" />
      <path d="M9 12h6" />
      <path d="M9 15h4" />
    </svg>
  )
}

type ControlButtonProps = {
  label: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
  icon?: ReactNode
  title?: string
}

function ControlButton({ label, onClick, disabled, active, icon, title }: ControlButtonProps) {
  return (
    <button
      className={['shell-control', active ? 'shell-control--active' : '']
        .filter(Boolean)
        .join(' ')}
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title ?? label}
    >
      {icon ? <span className="shell-control__icon">{icon}</span> : null}
      <span>{label}</span>
    </button>
  )
}

const noop = () => {}

export function ApplicationShell() {
  const {
    selectedDay,
    visibleMonth,
    viewMode,
    loading,
    error,
    setViewMode,
    goToday,
    goPrevious,
    goNext,
    selectDay,
  } = useApplicationShell()

  const monthLabel = visibleMonth?.label ?? 'Month'

  return (
    <div className="shell">
      <header className="app-shell">
        <div className="app-shell__brand">
          <p className="app-shell__title">DinPatra</p>
          <p className="app-shell__subtitle">{monthLabel}</p>
        </div>

        <div className="app-shell__controls" aria-label="Calendar navigation">
          <ControlButton label="Today" onClick={() => void goToday()} icon={<TodayIcon />} />
          <div className="app-shell__nav-group" aria-label="Month navigation">
            <ControlButton
              label="Previous"
              onClick={() => void goPrevious()}
              icon={<ChevronLeftIcon />}
              disabled={loading}
            />
            <ControlButton
              label="Next"
              onClick={() => void goNext()}
              icon={<ChevronRightIcon />}
              disabled={loading}
            />
          </div>

          <div className="app-shell__view-selector" aria-label="View selection">
            {VIEW_ORDER.map((mode) => (
              <button
                className={['view-chip', viewMode === mode ? 'view-chip--active' : '']
                  .filter(Boolean)
                  .join(' ')}
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                aria-pressed={viewMode === mode}
              >
                {VIEW_LABELS[mode]}
              </button>
            ))}
          </div>

          <ControlButton
            label="Settings"
            onClick={noop}
            icon={<SettingsIcon />}
            title="Settings coming soon"
            disabled
          />
        </div>
      </header>

      <main className="app-shell__content">
        {error ? <div className="panel panel--error">{error}</div> : null}

        {loading ? (
          <div className="panel panel--placeholder">Loading calendar data...</div>
        ) : viewMode === 'day' ? (
          selectedDay ? (
            <TodayCard day={selectedDay} />
          ) : null
        ) : viewMode === 'month' ? (
          selectedDay && visibleMonth ? (
            <MonthView month={visibleMonth} selectedIso={selectedDay.gregorian.iso} onSelectDay={selectDay} />
          ) : null
        ) : (
          <ViewPlaceholder
            title={VIEW_LABELS[viewMode]}
            description="This view is being prepared for a future sprint."
          />
        )}
      </main>
    </div>
  )
}
