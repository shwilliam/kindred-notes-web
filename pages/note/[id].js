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
  Spinner,
} from '../../components'
import {useNote, useProfile, useViewNote} from '../../hooks'
import {validateHeaderToken} from '../../lib'

export default ({viewerId}) => {
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
      <>
        <h1 className="sr-only">Note</h1>
        <Header />
        <Spinner />
      </>
    )

  if (note.status === 'error')
    return (
      <>
        <h1 className="sr-only">Note</h1>
        <Header />
        <p>Uh oh.. Something went wrong.</p>
      </>
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
      <Head title="Kindred Notes" />
      <h1 className="sr-only">Note</h1>
      <Header />

      <FadeIn className="footer-pad">
        <Note color={color} style={style} font={font} full>
          {profile.status === 'success' && (
            <NoteBookmark
              id={noteId}
              bordered={style === 'BORDER'}
              bookmarks={profile.data.user?.bookmarks}
            />
          )}
          {content}
        </Note>

        {isOwn && <ReplyList replies={replies || []} />}

        {isOwn && (
          <Link href={`/note/map/${noteId}`}>
            <a>Map</a>
          </Link>
        )}

        {!isOwn && <ReplyForm id={noteId} onSubmit={router.reload} />}
      </FadeIn>
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
