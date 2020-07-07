import Link from 'next/link'
import {FadeIn, Head, Header, NoteGrid, NotesSearch} from '../components'
import {
  useConnectionsCount,
  useCountriesCount,
  useNotesCount,
  useRecentNotes,
} from '../hooks'
import {validateHeaderToken} from '../lib'

export default ({viewerId}) => {
  const recentNotes = useRecentNotes()
  const notesCount = useNotesCount()
  const countriesCount = useCountriesCount()
  const connectionsCount = useConnectionsCount()

  return (
    <main>
      <Head title="Kindred Notes" description="Kindred Notes" />
      <h1 className="sr-only">Kindred Notes</h1>
      <Header viewerId={viewerId}>
        {!viewerId ? (
          <Link href="/signin">
            <a className="link">Sign in</a>
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

        {!viewerId && (
          <section className="wrapper">
            <h2 className="title -center">
              Welcome!{' '}
              <span role="img" aria-label="waving hand">
                👋
              </span>
            </h2>

            <p className="paragraph">
              KindredNotes is a social enterprise dedicated to encouraging and
              inspiring kindness and empathy through kind notes.
            </p>

            <h2 className="title -center">What is a KindredNote?</h2>

            <p className="paragraph">
              A KindredNote is just what it sounds like, a kind note. It could
              be a simple note to say something kind or a quote that’s had a
              positive impact. It could be a story, an experience or a thought.
              Our intention is to spread kindness and increase empathy by
              demonstrating that despite our many differences in perspectives,
              beliefs and values, that at the core, we are all the same.
            </p>
          </section>
        )}

        <NoteGrid
          title="Recent notes"
          loading={recentNotes.status === 'loading'}
          error={recentNotes.status === 'error'}
          notes={recentNotes?.data?.notes}
        />
      </FadeIn>

      <div className="wrapper">
        {!viewerId && (
          <Link href="/signup">
            <a className="button -full">Get started</a>
          </Link>
        )}
      </div>
    </main>
  )
}

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)
  const viewerId = token ? token.id : null

  return {props: {viewerId}}
}
