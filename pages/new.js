import {useMutation, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {withApollo} from '../apollo/client'
import Field from '../components/field'
import Layout from '../components/layout'
import {getErrorMessage} from '../lib/form'

const CreateNoteMutation = gql`
  mutation CreateNoteMutation($content: String!, $tags: String!) {
    createNote(input: {content: $content, tags: $tags}) {
      note {
        id
      }
    }
  }
`

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`

const New = () => {
  const [createNote] = useMutation(CreateNoteMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()
  const {data, loading} = useQuery(ViewerQuery)

  async function handleSubmit(event) {
    event.preventDefault()
    const contentElement = event.currentTarget.elements.content
    const tagsElement = event.currentTarget.elements.tags

    try {
      await createNote({
        variables: {
          content: contentElement.value,
          tags: tagsElement.value,
        },
      })
      router.push('/')
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  if (
    loading === false &&
    data.viewer === null &&
    typeof window !== 'undefined'
  ) {
    router.push('/signin')
  }

  if (data && data.viewer) {
    return (
      <Layout>
        <form onSubmit={handleSubmit}>
          {errorMsg && <p>{errorMsg}</p>}
          {loading && <p>loading...</p>}
          <Field name="content" type="text" required label="Note" />
          <Field name="tags" type="text" required label="Tags" />
          <button disabled={loading} type="submit">
            Send
          </button>
        </form>
      </Layout>
    )
  }

  return <p>Loading...</p>
}

export default withApollo(New)
