import Link from 'next/link'
import {FadeIn, Footer, Head, Header, Spinner} from '../components'
import {useNotifications} from '../hooks'
import {validateHeaderToken} from '../lib'

export default ({viewerId}) => {
  const notifications = useNotifications(viewerId)

  return (
    <main>
      <Head title="Notifications" />
      <h1 className="sr-only">Notifications</h1>
      <Header />

      {notifications.status === 'loading' ? (
        <Spinner full />
      ) : notifications.status === 'error' ? (
        <p className="error">Unable to fetch notifications...</p>
      ) : (
        <FadeIn className="footer-pad">
          <section className="main">
            <div className="wrapper">
              <ul>
                {notifications.map(({id, content, noteId, author, style}) => (
                  <li key={id}>
                    <Link href={`/note/${noteId || id}`}>
                      <a className="link -no-ul">
                        {!!style // is note
                          ? `New note from ${author?.nickname ?? 'anonymous'}`
                          : `${
                              author?.nickname ?? 'Anonymous'
                            } replied "${content}"`}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeIn>
      )}

      <Footer />
    </main>
  )
}

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)
  if (!token)
    ctx.res
      .writeHead(301, {
        Location: '/signin',
      })
      .end()

  return {props: {viewerId: token?.id}}
}
