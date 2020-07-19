import {
  FadeIn,
  Modal,
  Note,
  NoteBookmark,
  ReplyForm,
  ReplyList,
  Spinner,
} from '../components'
import {useNote, useProfile} from '../hooks'

export const NoteModal = ({id, viewerId, onDismiss}) => {
  const note = useNote(id)
  const profile = useProfile()
  const isOwn = viewerId === note?.data?.note.authorId

  return (
    <Modal onDismiss={onDismiss}>
      <FadeIn>
        {note.status === 'loading' ? (
          <Spinner />
        ) : note.status === 'error' ? (
          <p className="error">
            An unexpected error occurred. Please refresh the page to try again.
          </p>
        ) : (
          <FadeIn>
            <Note
              color={note.data.note.color}
              style={note.data.note.style}
              font={note.data.note.font}
              full
            >
              {profile.status === 'success' && (
                <NoteBookmark
                  id={id}
                  bordered={note.data.note.style === 'BORDER'}
                  bookmarks={profile.data.user?.bookmarks}
                />
              )}

              <p className="pad -vertical">{note.data.note.content}</p>

              {isOwn && (
                <Link href={`/note/map/${id}`}>
                  <a className="button -full">See who received this note</a>
                </Link>
              )}
            </Note>
            {isOwn ? (
              <ReplyList replies={note.data.note?.replies} />
            ) : (
              <ReplyForm id={id} onSubmit={onDismiss} />
            )}
          </FadeIn>
        )}
      </FadeIn>
    </Modal>
  )
}
