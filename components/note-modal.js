import {FadeIn, Modal, Note, ReplyForm, ReplyList, Spinner} from '../components'
import {useNote, useViewer} from '../hooks'

export const NoteModal = ({id, onDismiss}) => {
  const viewer = useViewer()
  const note = useNote(id)

  return (
    <Modal onDismiss={onDismiss}>
      <FadeIn>
        {!note.loading && note.data ? (
          <FadeIn>
            <Note
              color={note.data.note.color}
              style={note.data.note.style}
              font={note.data.note.font}
              full
            >
              {note.data.note.content}
            </Note>
            {!viewer.loading && viewer.data.id === note.data.note.authorId ? (
              <ReplyList replies={note.data.note?.replies} />
            ) : (
              <ReplyForm id={id} onSubmit={onDismiss} />
            )}
          </FadeIn>
        ) : (
          <Spinner />
        )}
      </FadeIn>
    </Modal>
  )
}
