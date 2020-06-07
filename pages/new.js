import {useMutation, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {withApollo} from '../apollo/client'
import Field from '../components/field'
import Layout from '../components/layout'
import Note from '../components/note'
import {getErrorMessage} from '../lib/form'

const CreateNoteMutation = gql`
  mutation CreateNoteMutation(
    $content: String!
    $tags: String!
    $color: String!
    $style: String!
    $font: String!
  ) {
    createNote(
      input: {
        content: $content
        tags: $tags
        color: $color
        style: $style
        font: $font
      }
    ) {
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

const NOTE_OPTIONS = {
  color: ['BLUE', 'GREEN', 'YELLOW'],
  style: ['BORDER', 'FILL'],
  font: ['SANS', 'HAND', 'MONO'],
}

const useArrayIterator = array => {
  const [value, setValue] = useState(1)
  const next = () => setValue(s => s + 1)

  return [array[value % array.length], next]
}

const New = () => {
  const [createNote] = useMutation(CreateNoteMutation)
  const [colorVal, nextColor] = useArrayIterator(NOTE_OPTIONS.color)
  const [styleVal, nextStyle] = useArrayIterator(NOTE_OPTIONS.style)
  const [fontVal, nextFont] = useArrayIterator(NOTE_OPTIONS.font)
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
          color: colorVal,
          style: styleVal,
          font: fontVal,
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
        <Note color={colorVal} style={styleVal} font={fontVal}>
          <form onSubmit={handleSubmit}>
            {errorMsg && <p>{errorMsg}</p>}
            {loading && <p>loading...</p>}
            <Field name="content" type="text" required label="Note" />
            <Field name="tags" type="text" required label="Tags" />
            <button onClick={nextColor} type="button">
              {colorVal}
            </button>
            <button onClick={nextStyle} type="button">
              {styleVal}
            </button>
            <button onClick={nextFont} type="button">
              {fontVal}
            </button>
            <button disabled={loading} type="submit">
              Send
            </button>
          </form>
        </Note>
      </Layout>
    )
  }

  return <p>Loading...</p>
}

export default withApollo(New)
