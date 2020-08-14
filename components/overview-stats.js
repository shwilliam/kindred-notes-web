import {useConnectionsCount, useCountriesCount, useNotesCount} from '../hooks'

export const OverviewStats = () => {
  const notesCount = useNotesCount()
  const countriesCount = useCountriesCount()
  const connectionsCount = useConnectionsCount()

  return (
    <section className="wrapper">
      <h2 className="sr-only">Overview</h2>

      <ul className="overview-stats">
        <li>
          <p className="overview-stats__item">
            <span className="overview-stats__data">
              {notesCount.status === 'loading'
                ? '...'
                : notesCount.status === 'error'
                ? '?'
                : notesCount.data.notes}
            </span>
            <span className="overview-stats__label">Notes</span>
          </p>
        </li>
        <li>
          <p className="overview-stats__item">
            <span className="overview-stats__data">
              {countriesCount.status === 'loading'
                ? '...'
                : countriesCount.status === 'error'
                ? '?'
                : countriesCount.data.countries}
            </span>
            <span className="overview-stats__label">Countries</span>
          </p>
        </li>
        <li>
          <p className="overview-stats__item">
            <span className="overview-stats__data">
              {connectionsCount.status === 'loading'
                ? '...'
                : connectionsCount.status === 'error'
                ? '?'
                : connectionsCount.data.connections}
            </span>
            <span className="overview-stats__label">Connections</span>
          </p>
        </li>
      </ul>
    </section>
  )
}
