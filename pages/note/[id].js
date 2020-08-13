import Link from 'next/link'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {
  FadeIn,
  Footer,
  Head,
  Header,
  Note,
  NoteBookmark,
  ReplyForm,
  ReplyList,
  ShareActions,
  Spinner,
} from '../../components'
import {useNote, useProfile, useViewNote} from '../../hooks'
import {validateHeaderToken} from '../../lib'

const NotePage = ({viewerId}) => {
  const router = useRouter()
  const {id} = router.query
  const profile = useProfile()
  const note = useNote(id)
  const {viewNote, viewReplies} = useViewNote()

  useEffect(() => {
    // TODO: avoid calling if already viewed
    if (id) {
      viewNote({id})
      viewReplies({id})
    }
  }, [id])

  if (note.status === 'loading')
    return (
      <main>
        <h1 className="sr-only">Note</h1>
        <Header viewerId={viewerId} />
        <Spinner />
      </main>
    )

  if (note.status === 'error')
    return (
      <main>
        <h1 className="sr-only">Note</h1>
        <Header viewerId={viewerId} />
        <p>Uh oh.. Something went wrong.</p>
      </main>
    )

  const {
    id: noteId,
    content,
    authorId,
    color,
    font,
    style,
    replies,
  } = note.data.note
  const isOwn = authorId === viewerId

  return (
    <main>
      <Head title="kindrednotes" description="Connected Kindness" />
      <h1 className="sr-only">Note</h1>
      <Header viewerId={viewerId} />

      <FadeIn className="footer-pad">
        <Note color={color} style={style} font={font} full>
          <>
            {viewerId && profile.status === 'success' && (
              <NoteBookmark
                id={noteId}
                bordered={style === 'BORDER'}
                bookmarks={profile.data.user?.bookmarks}
              />
            )}

            <p className={isOwn ? 'pad--top' : 'pad--vertical'}>{content}</p>

            {isOwn && (
              <Link href={`/note/map/${noteId}`}>
                <a
                  className={`button -full ${
                    style === 'FILL' ? '-invert' : ''
                  }`}
                >
                  See who received this note
                </a>
              </Link>
            )}
          </>
        </Note>

        <ReplyList replies={replies || []} />

        {!isOwn &&
          (viewerId ? (
            <ReplyForm id={noteId} onSubmit={router.reload} />
          ) : (
            <div className="wrapper">
              <Link href="/signup">
                <a className="button -full">Sign in to leave a comment</a>
              </Link>
            </div>
          ))}

        <ShareActions content={content} url={window?.location?.href} />
      </FadeIn>

      <Footer />
    </main>
  )
}

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)

  return {props: {viewerId: token?.id ?? null}}
}

export default NotePage
