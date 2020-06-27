import {FadeIn, Modal, Note, ReplyForm, ReplyList, Spinner} from '../components'
import {useNote, useViewer} from '../hooks'

export const NoteModal = ({id, onDismiss}) => {
  const viewer = useViewer()
  const note = useNote(id)

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
              {note.data.note.content}
            </Note>
            {!['loading', 'error'].includes(viewer.status) &&
            viewer.data.id === note.data.note.authorId ? (
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
