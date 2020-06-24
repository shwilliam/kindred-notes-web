import {FadeIn, Modal, Note, ReplyForm, ReplyList, Spinner} from '../components'

export const NoteModal = ({
  id,
  color,
  style,
  font,
  content,
  replies = null,
  avatar,
  nickname,
  onDismiss,
  isOwn = false,
  loading = false,
  viewerLocation,
}) => {
  return (
    <Modal onDismiss={onDismiss}>
      <FadeIn>
        {loading ? (
          <FadeIn>
            <Note color={color} style={style} font={font} full>
              {content}
            </Note>
            {isOwn ? (
              <ReplyList replies={replies} />
            ) : (
              <ReplyForm
                id={id}
                avatar={avatar}
                nickname={nickname}
                onSubmit={onDismiss}
                viewerLocation={viewerLocation}
              />
            )}
          </FadeIn>
        ) : (
          <Spinner />
        )}
      </FadeIn>
    </Modal>
  )
}
