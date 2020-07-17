import Link from 'next/link'
import {
  FadeIn,
  Head,
  Header,
  IconMail,
  Spinner,
  IconMessage,
} from '../components'
import {useNotifications} from '../hooks'
import {validateHeaderToken, truncate} from '../lib'

export default ({viewerId}) => {
  const notifications = useNotifications(viewerId)

  return (
    <main>
      <Head title="Notifications" />
      <h1 className="sr-only">Notifications</h1>
      <Header viewerId={viewerId} />

      {!notifications ? (
        <Spinner />
      ) : (
        <FadeIn className="footer-pad">
          <section className="main">
            <div className="wrapper">
              {notifications.length ? (
                <ul className="notifications">
                  {notifications.map(({id, content, noteId, author, style}) => (
                    <li key={id} className="notifications__item">
                      <Link href={`/note/${noteId || id}`}>
                        <a className="link -no-ul notifications__item-content">
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
                <p className="title -center">
                  You're all caught up!&nbsp;&nbsp;&nbsp;🎉
                </p>
              )}
            </div>
          </section>
        </FadeIn>
      )}
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
