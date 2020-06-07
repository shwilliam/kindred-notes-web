import {useMutation, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {useState} from 'react'
import TagsInput from 'react-tagsinput'
import {withApollo} from '../apollo/client'
import Field from '../components/field'
import Layout from '../components/layout'
import Note from '../components/note'
import {getErrorMessage} from '../lib/form'

const CreateNoteMutation = gql`
  mutation CreateNoteMutation(
    $content: String!
    $tags: [String]!
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
  const [tags, setTags] = useState([])
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()
  const {data, loading} = useQuery(ViewerQuery)

  async function handleSubmit(event) {
    event.preventDefault()
    const contentElement = event.currentTarget.elements.content

    try {
      await createNote({
        variables: {
          content: contentElement.value,
          tags,
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
        <form onSubmit={handleSubmit}>
          {errorMsg && <p>{errorMsg}</p>}
          {loading && <p>loading...</p>}
          <Note color={colorVal} style={styleVal} font={fontVal}>
            <Field
              name="content"
              type="text"
              required
              label="Note"
              placeholder="Write a kind note"
              floating
              center
            />
          </Note>
          <label>Tag related topics</label>
          <TagsInput value={tags} onChange={setTags} />
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
      </Layout>
    )
  }

  return <p>Loading...</p>
}

export default withApollo(New)
