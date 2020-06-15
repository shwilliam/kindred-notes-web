import {useMutation, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {withApollo} from '../../apollo/client'
import {
  FadeIn,
  Field,
  Footer,
  Header,
  Note,
  NoteBookmark,
  ReplyList,
} from '../../components'
import {getErrorMessage} from '../../lib/form'

const NotePage = () => {
  const router = useRouter()
  const {id} = router.query
  const {loading, error, data} = useQuery(NoteQuery, {variables: {id}})
  const [createReply] = useMutation(CreateReplyMutation)
  const [bookmarkNote] = useMutation(BookmarkNoteMutation)
  const [unbookmarkNote] = useMutation(UnbookmarkNoteMutation)
  const [isBookmarkedLocally, setIsBookmarkedLocally] = useState(undefined)
  const [errorMsg, setErrorMsg] = useState()
  const [isSubmitting, setIsSubmitting] = useState()

  const handleSubmit = async event => {
    setIsSubmitting(true)
    event.preventDefault()

    const contentElement = event.currentTarget.elements.content
    const contentValue = contentElement.value.trim()
    contentElement.value = contentValue

    if (event.currentTarget.checkValidity()) {
      try {
        setErrorMsg()
        await createReply({
          variables: {
            content: contentValue,
            noteId: id,
            avatar: data?.viewer?.avatar,
          },
        })
        router.reload()
      } catch (error) {
        setErrorMsg(getErrorMessage(error))
      }
    }

    setIsSubmitting(false)
  }

  const onBookmark = () => {
    setIsBookmarkedLocally(true)
    bookmarkNote({variables: {noteId: id}})
  }

  const onUnbookmark = () => {
    setIsBookmarkedLocally(false)
    unbookmarkNote({variables: {noteId: id}})
  }

  if (error)
    return (
      <>
        <h1 className="sr-only">Note</h1>
        <Header />
        <p>Uh oh.. Something went wrong.</p>
      </>
    )

  if (loading)
    return (
      <>
        <h1 className="sr-only">Note</h1>
        <Header />
        <Footer />
      </>
    )

  const {note, viewer} = data
  const isBookmarked =
    typeof isBookmarkedLocally === 'undefined'
      ? viewer.bookmarks?.includes(note.id)
      : isBookmarkedLocally
  const isOwn = note.author === viewer.id
  return (
    <>
      <h1 className="sr-only">Note</h1>
      <Header />

      <FadeIn className="footer-pad">
        <Note color={note.color} style={note.style} font={note.font} full>
          <NoteBookmark
            onClick={isBookmarked ? onUnbookmark : onBookmark}
            isBookmarked={isBookmarked}
            bordered={note.style === 'BORDER'}
          />
          {note.content}
        </Note>

        {isOwn && <ReplyList replies={note?.replies} />}

        {!isOwn && (
          <form onSubmit={handleSubmit} className="wrapper">
            <Field
              className="input"
              name="content"
              type="text"
              required
              label="Reply"
              placeholder="Write a response"
              floating
            />
            {errorMsg && <p className="error">{errorMsg}</p>}
            <button
              disabled={isSubmitting}
              className="button -full"
              type="submit"
            >
              Send
            </button>
          </form>
        )}
      </FadeIn>
      <Footer />
    </>
  )
}

const NoteQuery = gql`
  query NoteQuery($id: String!) {
    viewer {
      id
      bookmarks
      avatar
    }
    note(id: $id) {
      id
      author
      content
      color
      style
      font
      replies {
        id
        content
        author
        avatar
      }
    }
  }
`

const CreateReplyMutation = gql`
  mutation CreateReplyMutation(
    $content: String!
    $noteId: String!
    $avatar: Int!
  ) {
    createReply(input: {content: $content, noteId: $noteId, avatar: $avatar}) {
      reply {
        content
      }
    }
  }
`

const BookmarkNoteMutation = gql`
  mutation BookmarkNoteMutation($noteId: String!) {
    bookmarkNote(input: {noteId: $noteId}) {
      isBookmarked
    }
  }
`

const UnbookmarkNoteMutation = gql`
  mutation UnbookmarkNoteMutation($noteId: String!) {
    unbookmarkNote(input: {noteId: $noteId}) {
      isBookmarked
    }
  }
`

export default withApollo(NotePage)
