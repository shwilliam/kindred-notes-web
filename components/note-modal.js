import Link from 'next/link'
import {useReducer} from 'react'
import {useMount} from 'react-use'
import {
  FadeIn,
  Modal,
  Note,
  NoteBookmark,
  NoteOpeningAnimation,
  ReplyForm,
  ReplyList,
  Spinner,
} from '../components'
import {useNote, useProfile} from '../hooks'

export const NoteModal = ({id, viewerId, onDismiss, animate = false}) => {
  const note = useNote(id)
  const profile = useProfile()
  const isOwn = viewerId === note?.data?.note.authorId

  const [
    noteOpeningAnimationState,
    dispatchNoteOpeningAnimationChange,
  ] = useReducer((state, action) => {
    switch (action.type) {
      case 'CLOSED':
      case 'OPENING':
      case 'OPEN':
      case 'EXPANDED':
      case 'REMOVED':
        return action.type
      default:
        return state
    }
  }, 'CLOSED')

  useMount(() => {
    if (!animate) return

    setTimeout(() => {
      dispatchNoteOpeningAnimationChange({type: 'OPENING'})
      setTimeout(() => {
        dispatchNoteOpeningAnimationChange({type: 'OPEN'})
        setTimeout(() => {
          dispatchNoteOpeningAnimationChange({type: 'EXPANDED'})
          setTimeout(() => {
            dispatchNoteOpeningAnimationChange({type: 'REMOVED'})
          }, 400)
        }, 600)
      }, 600)
    }, 300)
  })

  return (
    <>
      {animate && noteOpeningAnimationState !== 'REMOVED' && (
        <NoteOpeningAnimation state={noteOpeningAnimationState} />
      )}

      {(!animate ||
        ['EXPANDED', 'REMOVED'].includes(noteOpeningAnimationState)) && (
        <Modal onDismiss={onDismiss}>
          <FadeIn>
            {note.status === 'loading' ? (
              <Spinner />
            ) : note.status === 'error' ? (
              <p className="error">
                An unexpected error occurred. Please refresh the page to try
                again.
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

                  <p className={isOwn ? 'pad--top' : 'pad--vertical'}>
                    {note.data.note.content}
                  </p>

                  {isOwn && (
                    <Link href={`/note/map/${id}`}>
                      <a
                        className={`button -full ${
                          note.data.note.style === 'FILL' ? '-invert' : ''
                        }`}
                      >
                        See who received this note
                      </a>
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
      )}
    </>
  )
}
