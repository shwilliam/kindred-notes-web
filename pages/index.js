import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import {withApollo} from '../apollo/client'
import {FadeIn, Footer, Head, Header, Note, Spinner} from '../components'

const Index = () => {
  const {data, loading} = useQuery(HomeQuery)

  return (
    <main>
      <Head title="Kindred Notes" description="Kindred Notes" />
      <h1 className="sr-only">Kindred Notes</h1>
      <Header>
        {!loading && !data?.viewer && (
          <Link href="/signin">
            <a className="link -no-ul">Sign in</a>
          </Link>
        )}
      </Header>

      {!loading && data ? (
        <FadeIn className="footer-pad">
          <section className="wrapper">
            <h2 className="sr-only">Overview</h2>
            <ul className="overview-stats">
              <li>
                <p className="overview-stats__item">
                  <span className="overview-stats__data">
                    {data.aggregateStatistics.totalUsers}
                  </span>
                  <span className="overview-stats__label">Users</span>
                </p>
              </li>
              <li>
                <p className="overview-stats__item">
                  <span className="overview-stats__data">
                    {data.aggregateStatistics.totalCountries}
                  </span>
                  <span className="overview-stats__label">Countries</span>
                </p>
              </li>
              <li>
                <p className="overview-stats__item">
                  <span className="overview-stats__data">
                    {data.aggregateStatistics.totalOpenedNotes}
                  </span>
                  <span className="overview-stats__label">Connections</span>
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="title -center">Recent Notes</h2>
            <ul className="note-grid">
              {data.recentNotes?.map(({id, content, color, style, font}) => (
                <li className="note-grid__cell" key={id}>
                  <Link href={`/note/${id}`}>
                    <a className="link -no-ul">
                      <Note color={color} style={style} font={font}>
                        {content}
                      </Note>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>
      ) : (
        <Spinner full />
      )}
      {!loading && data?.viewer && <Footer />}
    </main>
  )
}

const HomeQuery = gql`
  query HomeQuery {
    viewer {
      id
    }
    recentNotes {
      id
      content
      color
      font
      style
    }
    aggregateStatistics {
      totalUsers
      totalCountries
      totalOpenedNotes
    }
  }
`

export default withApollo(Index)
