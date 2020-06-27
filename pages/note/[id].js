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
import {useNote, useProfile, useViewer, useViewNote} from '../../hooks'
import {protectRoute} from '../../lib'

export default () => {
  const router = useRouter()
  const {id} = router.query
  const viewer = useViewer()
  const profile = useProfile()
  const note = useNote(id)
  const viewNote = useViewNote()

  useEffect(() => {
    // TODO: avoid calling if already viewed
    if (id) viewNote({id})
  }, [id])

  if (viewer.status === 'loading' || note.status === 'loading')
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
  const {id: viewerId} = viewer.data
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

        {viewerId && isOwn && <ReplyList replies={replies || []} />}

        {viewerId && isOwn && (
          <Link href={`/note/map/${noteId}`}>
            <a>Map</a>
          </Link>
        )}

        {viewerId && !isOwn && (
          <ReplyForm id={noteId} onSubmit={router.reload} />
        )}
      </FadeIn>
      {viewerId && <Footer />}
    </main>
  )
}

export const getServerSideProps = ctx => {
  protectRoute(ctx)
  return {props: {}}
}
