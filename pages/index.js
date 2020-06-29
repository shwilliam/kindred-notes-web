import Link from 'next/link'
import {
  FadeIn,
  Footer,
  Head,
  Header,
  NoteGrid,
  NotesSearch,
} from '../components'
import {
  useConnectionsCount,
  useCountriesCount,
  useNotesCount,
  useRecentNotes,
  useViewer,
} from '../hooks'

export default () => {
  const viewer = useViewer()
  const recentNotes = useRecentNotes()
  const notesCount = useNotesCount()
  const countriesCount = useCountriesCount()
  const connectionsCount = useConnectionsCount()
  const isAuthenticated = viewer?.data && !viewer?.data?.error

  return (
    <main>
      <Head title="Kindred Notes" description="Kindred Notes" />
      <h1 className="sr-only">Kindred Notes</h1>
      <Header>
        {!isAuthenticated ? (
          <Link href="/signin">
            <a className="link -no-ul">Sign in</a>
          </Link>
        ) : (
          <NotesSearch />
        )}
      </Header>

      <FadeIn className="footer-pad">
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

        <span className="rule" />

        <NoteGrid
          title="Recent notes"
          loading={recentNotes.status === 'loading'}
          error={recentNotes.status === 'error'}
          notes={recentNotes?.data?.notes}
        />
      </FadeIn>

      {!isAuthenticated && (
        <Link href="/signup">
          <a className="button -full">Sign in</a>
        </Link>
      )}

      {isAuthenticated && <Footer />}
    </main>
  )
}
