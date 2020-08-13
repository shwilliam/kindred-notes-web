import Link from 'next/link'
import {
  FadeIn,
  Footer,
  Head,
  Header,
  IconMail,
  IconMessage,
  Spinner,
} from '../components'
import {useNotifications} from '../hooks'
import {truncate, validateHeaderToken} from '../lib'

const NotificationsPage = ({viewerId}) => {
  const notifications = useNotifications(viewerId)

  return (
    <main className="footer-pad">
      <Head title="Notifications" />
      <h1 className="sr-only">Notifications</h1>
      <Header viewerId={viewerId} />

      {!notifications ? (
        <Spinner />
      ) : (
        <FadeIn>
          <section className="main">
            <div className="wrapper">
              {notifications.length ? (
                <ul className="notifications">
                  {notifications.map(({id, content, noteId, author, style}) => (
                    <li key={id} className="notifications__item">
                      <Link href={`/note/${noteId || id}`}>
                        <a className="link -no-ul notifications__item-content">
                          <div className="fade" />
                          {!!style ? ( // is note
                            <>
                              <IconMail
                                className="notifications__icon"
                                aria-hidden
                              />
                              {truncate(
                                80,
                                `New note from ${
                                  author?.nickname ?? 'anonymous'
                                }`,
                              )}
                            </>
                          ) : (
                            <>
                              <IconMessage
                                className="notifications__icon"
                                aria-hidden
                              />
                              {truncate(
                                80,
                                `${author?.nickname ?? 'Anonymous'} replied
                              "${content}`,
                              )}
                              "
                            </>
                          )}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <div className="title -center">
                    <p>You're all caught up!</p>
                    <span className="emoji" role="img" aria-label="Confetti">
                      🎉
                    </span>
                  </div>
                </>
              )}
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

  if (!token) {
    ctx.res
      .writeHead(301, {
        Location: '/signin',
      })
      .end()
    return {props: {}}
  }

  return {props: {viewerId: token.id}}
}

export default NotificationsPage
