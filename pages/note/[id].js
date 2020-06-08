import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {withApollo} from '../../apollo/client'
import {Layout, Note} from '../../components'

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

const NotePage = () => {
  const router = useRouter()
  const {id} = router.query
  const {loading, error, data} = useQuery(NoteQuery, {variables: {id}})

  if (error) return <p>oops</p>
  if (loading)
    return (
      <Layout>
        <header className="header">Note</header>
        <p>loading...</p>
      </Layout>
    )

  const {note} = data
  return (
    <Layout>
      <header className="header">
        <h1>Note</h1>
      </header>
      <Note color={note.color} style={note.style} font={note.font} full>
        {note.content}
      </Note>
    </Layout>
  )
}

export default withApollo(NotePage)
