import Link from 'next/link'
import {FadeIn, Footer, Head, Header, Spinner} from '../components'
import {useNotifications} from '../hooks'
import {validateHeaderToken} from '../lib'

export default () => {
  const notifications = useNotifications()

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
                {notifications.data?.replies.map(
                  ({id, content, noteId, author}) => (
                    <li key={id}>
                      <Link href={`/note/${noteId}`}>
                        <a>
                          {author.nickname} replied "{content}"
                        </a>
                      </Link>
                    </li>
                  ),
                )}
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

  return {props: {}}
}
