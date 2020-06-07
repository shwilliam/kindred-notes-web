import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {withApollo} from '../../apollo/client'
import Layout from '../../components/layout'
import Note from '../../components/note'

const NoteQuery = gql`
  query NoteQuery($id: String!) {
    note(id: $id) {
      id
      content
      color
      style
      font
    }
  }
`

function NotePage() {
  const router = useRouter()
  const {id} = router.query
  const {loading, error, data} = useQuery(NoteQuery, {variables: {id}})

  if (error) return <p>oops</p>
  if (loading)
    return (
      <Layout>
        <p>loading...</p>
      </Layout>
    )

  const {note} = data
  return (
    <Layout>
      <Note color={note.color} style={note.style} font={note.font}>
        {note.content}
      </Note>
    </Layout>
  )
}

export default withApollo(NotePage)
