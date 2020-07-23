import Link from 'next/link'
import {useRouter} from 'next/router'
import {FadeIn, Head, Header, Note, Spinner} from '../components'
import {useNotesSearch} from '../hooks'
import {validateHeaderToken} from '../lib'

export default ({viewerId}) => {
  const router = useRouter()
  const {query} = router.query
  const notesSearch = useNotesSearch(query)

  return (
    <main>
      <Head title="My notes" description="Kindred Notes" />
      <h1 className="sr-only">Kindred Notes</h1>
      <Header viewerId={viewerId} />

      {notesSearch.status === 'loading' ? (
        <Spinner />
      ) : notesSearch.status === 'error' ? (
        <p className="error">
          An unexpected error occurred. Please refresh the page to try again.
        </p>
      ) : notesSearch.data?.notes.length ? (
        <>
          <FadeIn className="footer-pad">
            <section>
              <h2 className="title -center">Search Results</h2>
              <ul className="note-grid">
                {notesSearch.data?.notes?.map(
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
                )}
              </ul>
            </section>
          </FadeIn>
        </>
      ) : (
        <h2 className="title -center">No notes found 😢</h2>
      )}
    </main>
  )
}

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)
  const viewerId = token ? token.id : null
  if (!token)
    ctx.res
      .writeHead(301, {
        Location: '/signin',
      })
      .end()

  return {props: {viewerId}}
}
