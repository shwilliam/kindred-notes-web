import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {withApollo} from '../../apollo/client'
import Layout from '../../components/layout'

const NoteQuery = gql`
  query NoteQuery($id: String!) {
    note(id: $id) {
      id
      content
    }
  }
`

function Note() {
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
      <p className="note">{note.content}</p>
    </Layout>
  )
}

export default withApollo(Note)
