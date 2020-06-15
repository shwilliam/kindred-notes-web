import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {withApollo} from '../../apollo/client'
import {
  FadeIn,
  Footer,
  Header,
  Note,
  NoteBookmark,
  ReplyForm,
  ReplyList,
} from '../../components'

const NotePage = () => {
  const router = useRouter()
  const {id} = router.query
  const {loading, error, data} = useQuery(NoteQuery, {variables: {id}})

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
  const isOwn = note.author === viewer.id
  return (
    <>
      <h1 className="sr-only">Note</h1>
      <Header />

      <FadeIn className="footer-pad">
        <Note color={note.color} style={note.style} font={note.font} full>
          <NoteBookmark
            id={note.id}
            bordered={note.style === 'BORDER'}
            bookmarks={viewer.bookmarks}
          />
          {note.content}
        </Note>

        {isOwn && <ReplyList replies={note?.replies} />}

        {!isOwn && (
          <ReplyForm
            id={id}
            avatar={data?.viewer?.avatar}
            onSubmit={router.reload}
          />
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

export default withApollo(NotePage)
