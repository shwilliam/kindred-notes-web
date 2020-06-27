import Link from 'next/link'
import {
  FadeIn,
  Footer,
  Head,
  Header,
  Note,
  NotesSearch,
  Spinner,
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

  return (
    <main>
      <Head title="Kindred Notes" description="Kindred Notes" />
      <h1 className="sr-only">Kindred Notes</h1>
      <Header>
        {viewer.status === 'success' && !viewer.data ? (
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

        <section>
          <h2 className="title -center">Recent Notes</h2>
          <ul className="note-grid">
            {recentNotes.status === 'loading' ? (
              <Spinner full />
            ) : recentNotes.status === 'error' ? (
              <p className="error">
                An unexpected error occurred. Refresh the page to try again.
              </p>
            ) : (
              recentNotes.data?.notes?.map(
                ({id, content, color, style, font}) => (
                  <li className="note-grid__cell" key={id}>
                    <Link href={`/note/${id}`}>
                      <a className="link -no-ul">
                        <Note color={color} style={style} font={font}>
                          {content}
                        </Note>
                      </a>
                    </Link>
                  </li>
                ),
              )
            )}
          </ul>
        </section>
      </FadeIn>

      {viewer.status === 'success' && !viewer.data.id && (
        <Link href="/signup">
          <a className="button -full">Sign in</a>
        </Link>
      )}

      {viewer.status === 'success' && !!viewer.data.id && <Footer />}
    </main>
  )
}
