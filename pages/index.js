import Link from 'next/link'
import {
  Footer,
  FadeIn,
  Head,
  Header,
  NoteGrid,
  NotesSearch,
  MapView,
} from '../components'
import {
  useConnectionsCount,
  useCountriesCount,
  useNotesCount,
  useRecentNotes,
  useNotesOutbox,
} from '../hooks'
import {validateHeaderToken, reduceViewerToFeature} from '../lib'

export default ({viewerId}) => {
  const recentNotes = useRecentNotes()
  const notesCount = useNotesCount()
  const countriesCount = useCountriesCount()
  const connectionsCount = useConnectionsCount()
  const notesOutbox = useNotesOutbox()

  const outboxViewers = notesOutbox?.data?.notes?.reduce(
    (viewers, val) => [...viewers, ...val.viewers],
    [],
  )
  const outboxViewersJson = outboxViewers && {
    type: 'FeatureCollection',
    features: outboxViewers?.reduce(reduceViewerToFeature, []),
  }

  return (
    <main className="footer-pad">
      <Head title="kindrednotes" description="Connected Kindness" />
      <h1 className="sr-only">kindrednotes</h1>

      <Header viewerId={viewerId}>
        {!viewerId ? (
          <Link href="/signin">
            <a className="link">Sign in</a>
          </Link>
        ) : (
          <NotesSearch />
        )}
      </Header>

      <FadeIn className="pad -bottom">
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

        {viewerId && outboxViewers && (
          <section className="wrapper -large">
            <h2 className="title -center">Your Connections</h2>
            <MapView markers={outboxViewersJson} />
          </section>
        )}

        {!viewerId && (
          <section className="wrapper">
            <h2 className="title -center">
              Welcome!{' '}
              <span role="img" aria-label="waving hand">
                👋
              </span>
            </h2>

            <p className="paragraph">
              kindrednotes is a social enterprise dedicated to encouraging and
              inspiring kindness and empathy through kind notes.
            </p>

            <h2 className="title -center">What is a kindrednote?</h2>

            <p className="paragraph">
              A kindrednote is just what it sounds like, a kind note. It could
              be a simple note to say something kind or a quote that’s had a
              positive impact. It could be a story, an experience or a thought.
              Our intention is to spread kindness and increase empathy by
              demonstrating that despite our many differences in perspectives,
              beliefs and values, that at the core, we are all the same.
            </p>
          </section>
        )}

        {recentNotes?.data?.notes && (
          <NoteGrid
            title="Recent notes"
            notes={recentNotes?.data?.notes}
            // not rendered if loading or error
            loading={false}
            error={false}
          />
        )}
      </FadeIn>

      <div className="wrapper">
        {!viewerId && (
          <Link href="/signup">
            <a className="button -full">Join the movement</a>
          </Link>
        )}
      </div>

      <Footer />
    </main>
  )
}

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)
  const viewerId = token ? token.id : null

  return {props: {viewerId}}
}
