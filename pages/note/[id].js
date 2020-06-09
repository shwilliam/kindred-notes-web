import {useMutation, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {withApollo} from '../../apollo/client'
import {Field, Layout, Note} from '../../components'
import {getErrorMessage} from '../../lib/form'

const NoteQuery = gql`
  query NoteQuery($id: String!) {
    viewer {
      bookmarks
    }
    note(id: $id) {
      id
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
      <Layout>
        <header className="header">Note</header>
        <p>loading...</p>
      </Layout>
    )

  const {note, viewer} = data
  const isBookmarked = viewer.bookmarks.includes(note.id)
  return (
    <Layout>
      <header className="header">
        <h1>Note</h1>
      </header>
      <Note color={note.color} style={note.style} font={note.font} full>
        <button
          type="button"
          onClick={isBookmarked ? onUnbookmark : onBookmark}
        >
          {isBookmarked && 'un'}bookmark
        </button>
        {note.content}
      </Note>

      {note.replies && (
        <ul>
          {note.replies?.map(({id, content}) => (
            <li key={id}>{content}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="wrapper">
        {errorMsg && <p>{errorMsg}</p>}
        {loading && <p>loading...</p>}
        <Field
          className="note__input"
          name="content"
          type="text"
          required
          label="Reply"
          placeholder="Write a response"
          floating
          center
        />
        <button className="button -full" type="submit">
          Send
        </button>
      </form>
    </Layout>
  )
}

export default withApollo(NotePage)
