import Link from 'next/link'
import {useRouter} from 'next/router'
import {FadeIn, Field, Head, Header, Note, Spinner} from '../components'
import {useNotesSearch} from '../hooks'
import {truncate, validateHeaderToken} from '../lib'

export default ({viewerId}) => {
  const router = useRouter()
  const {query} = router.query
  const notesSearch = useNotesSearch(query)

  const handleSubmit = e => {
    e.preventDefault()

    const query = e.currentTarget.elements.query.value.trim()
    if (!query) return

    router.push(`/search?query=${query}`)
  }

  return (
    <main>
      <Head title="Search" description="Connected Kindness" />
      <h1 className="sr-only">kindrednotes</h1>
      <Header viewerId={viewerId} />

      <div className="wrapper -large">
        {query ? (
          notesSearch.status === 'loading' ? (
            <Spinner />
          ) : notesSearch.status === 'error' ? (
            <p className="error">
              An unexpected error occurred. Please refresh the page to try
              again.
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
                                {truncate(50, content)}
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
            <>
              <div className="title -center">
                <h2>No notes found</h2>
                <span className="emoji" role="img" aria-label="Crying emoji">
                  😢
                </span>
              </div>
            </>
          )
        ) : (
          <form onSubmit={handleSubmit} className="wrapper search-form">
            <Field
              name="query"
              type="search"
              placeholder="Search for a note..."
              required
            />
          </form>
        )}
      </div>
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
