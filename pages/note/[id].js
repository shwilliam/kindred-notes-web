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
} from '../../components'
import {useNote, useProfile, useViewer, useViewNote} from '../../hooks'

export default () => {
  const router = useRouter()
  const {id} = router.query
  const viewer = useViewer()
  const profile = useProfile()
  const note = useNote(id)
  const viewNote = useViewNote()

  useEffect(() => {
    if (id) viewNote({id})
  }, [id])

  if (note?.error)
    return (
      <>
        <h1 className="sr-only">Note</h1>
        <Header />
        <p>Uh oh.. Something went wrong.</p>
      </>
    )

  if (viewer.loading || note.loading)
    return (
      <>
        <h1 className="sr-only">Note</h1>
        <Header />
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
          {!profile.loading && (
            <NoteBookmark
              id={noteId}
              bordered={style === 'BORDER'}
              bookmarks={profile?.data.user?.bookmarks}
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
