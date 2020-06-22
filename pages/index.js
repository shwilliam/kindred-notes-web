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
      <Header />

      {!loading && data ? (
        <FadeIn className="footer-pad">
          <h2 className="title -center">Recent Notes</h2>
          <ul className="note-grid">
            {data?.recentNotes.map(({id, content, color, style, font}) => (
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
        </FadeIn>
      ) : (
        <Spinner full />
      )}
      <Footer />
    </main>
  )
}

const HomeQuery = gql`
  query HomeQuery {
    recentNotes {
      id
      content
      color
      font
      style
    }
  }
`

export default withApollo(Index)
