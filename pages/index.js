import Link from 'next/link'
import {FadeIn, Footer, Head, Header, Note, Spinner} from '../components'
import {useRecentNotes, useViewer} from '../hooks'

export default () => {
  const viewer = useViewer()
  const recentNotes = useRecentNotes()

  return (
    <main>
      <Head title="Kindred Notes" description="Kindred Notes" />
      <h1 className="sr-only">Kindred Notes</h1>
      <Header>
        {!viewer.loading && !viewer.data && (
          <Link href="/signin">
            <a className="link -no-ul">Sign in</a>
          </Link>
        )}
      </Header>

      <FadeIn className="footer-pad">
        <section className="wrapper">
          <h2 className="sr-only">Overview</h2>
          <ul className="overview-stats">
            <li>
              <p className="overview-stats__item">
                <span className="overview-stats__data">??</span>
                <span className="overview-stats__label">Users</span>
              </p>
            </li>
            <li>
              <p className="overview-stats__item">
                <span className="overview-stats__data">??</span>
                <span className="overview-stats__label">Countries</span>
              </p>
            </li>
            <li>
              <p className="overview-stats__item">
                <span className="overview-stats__data">??</span>
                <span className="overview-stats__label">Connections</span>
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="title -center">Recent Notes</h2>
          <ul className="note-grid">
            {recentNotes.loading ? (
              <Spinner full />
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

      {!viewer.loading && !viewer.data.id && (
        <Link href="/signup">
          <a className="button -full">Create an account</a>
        </Link>
      )}

      {!viewer.loading && !!viewer.data.id && <Footer />}
    </main>
  )
}
