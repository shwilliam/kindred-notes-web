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
  IconBookmark,
  Note,
} from '../../components'
import {getErrorMessage} from '../../lib/form'

const NoteQuery = gql`
  query NoteQuery($id: String!) {
    viewer {
      id
      bookmarks
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
      }
    }
  }
`

const CreateReplyMutation = gql`
  mutation CreateReplyMutation($content: String!, $noteId: String!) {
    createReply(input: {content: $content, noteId: $noteId}) {
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

const NotePage = () => {
  const [createReply] = useMutation(CreateReplyMutation)
  const [bookmarkNote] = useMutation(BookmarkNoteMutation)
  const [unbookmarkNote] = useMutation(UnbookmarkNoteMutation)
  const router = useRouter()
  const {id} = router.query
  const {loading, error, data} = useQuery(NoteQuery, {variables: {id}})
  const [errorMsg, setErrorMsg] = useState()

  const handleSubmit = async event => {
    event.preventDefault()
    const contentElement = event.currentTarget.elements.content

    try {
      await createReply({
        variables: {
          content: contentElement.value,
          noteId: id,
        },
      })
      router.reload()
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  const onBookmark = () => {
    bookmarkNote({variables: {noteId: id}})
  }

  const onUnbookmark = () => {
    unbookmarkNote({variables: {noteId: id}})
  }

  if (error) return <p>oops</p>
  if (loading)
    return (
      <FadeIn>
        <h1 className="sr-only">Note</h1>
        <p>loading...</p>
      </FadeIn>
    )

  const {note, viewer} = data
  const isBookmarked = viewer.bookmarks?.includes(note.id)
  const isOwn = note.author === viewer.id
  return (
    <>
      <h1 className="sr-only">Note</h1>
      <Header />

      <FadeIn className="footer-pad">
        <Note color={note.color} style={note.style} font={note.font} full>
          <button
            type="button"
            className="button -floating note__bookmark"
            onClick={isBookmarked ? onUnbookmark : onBookmark}
          >
            <span className="sr-only">{isBookmarked && 'un'}bookmark</span>
            <IconBookmark fill={isBookmarked} />
          </button>
          {note.content}
        </Note>

        {isOwn && note?.replies.length > 0 && (
          <section className="wrapper">
            <h2 className="title">Who appreciated your note</h2>
            <ul>
              {note.replies?.map(({id, content}) => (
                <li key={id}>{content}</li>
              ))}
            </ul>
          </section>
        )}

        {!isOwn && (
          <form onSubmit={handleSubmit} className="wrapper">
            {errorMsg && <p>{errorMsg}</p>}
            {loading && <p>loading...</p>}
            <Field
              className="input"
              name="content"
              type="text"
              required
              label="Reply"
              placeholder="Write a response"
              floating
            />
            <button className="button -full" type="submit">
              Send
            </button>
          </form>
        )}
      </FadeIn>
      <Footer />
    </>
  )
}

export default withApollo(NotePage)
