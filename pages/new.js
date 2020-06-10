import {useMutation, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {withApollo} from '../apollo/client'
import {
  FadeIn,
  Field,
  Footer,
  Header,
  IconFont,
  IconPalette,
  IconSquare,
  Note,
  TagsInput,
} from '../components'
import {useArrayIterator} from '../hooks'
import {getErrorMessage} from '../lib/form'

const NOTE_OPTIONS = {
  color: ['BLUE', 'GREEN', 'YELLOW'],
  style: ['BORDER', 'FILL'],
  font: ['SANS', 'HAND', 'MONO'],
}

const New = () => {
  const router = useRouter()
  const [createNote] = useMutation(CreateNoteMutation)
  const {data, loading} = useQuery(ViewerQuery)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [colorVal, nextColor] = useArrayIterator(NOTE_OPTIONS.color)
  const [styleVal, nextStyle] = useArrayIterator(NOTE_OPTIONS.style)
  const [fontVal, nextFont] = useArrayIterator(NOTE_OPTIONS.font)
  const [topicsVal, setTopicsVal] = useState([])
  const [errorMsg, setErrorMsg] = useState()

  const handleSubmit = async event => {
    event.preventDefault()
    setIsSubmitting(true)

    const contentElement = event.currentTarget.elements.content
    const contentValue = contentElement.value.trim()
    contentElement.value = contentValue

    if (!event.currentTarget.checkValidity()) {
    } else if (!topicsVal.length) {
      setErrorMsg('Add some topics so people see your note')
    } else {
      setErrorMsg()

      try {
        await createNote({
          variables: {
            content: contentValue,
            tags: topicsVal,
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

    setIsSubmitting(false)
  }

  const handleTagClick = ({target}) => {
    setTopicsVal(s => {
      const topics = [...s]
      topics.splice(target.dataset.idx, 1)
      return topics
    })
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
      <>
        <h1 className="sr-only">New note</h1>
        <Header />

        <FadeIn className="footer-pad">
          <form onSubmit={handleSubmit}>
            <Note color={colorVal} style={styleVal} font={fontVal} full>
              <Field
                className="note__input"
                name="content"
                type="text"
                required
                label="Note"
                placeholder="Write a kind note"
                invert={styleVal === 'FILL'}
                floating
                center
              />
              <section className="note__actions">
                <button
                  className="button -floating"
                  onClick={nextColor}
                  type="button"
                >
                  <span className="sr-only">{colorVal}</span>
                  <IconPalette
                    className={`icon -${colorVal.toLowerCase()} -${styleVal.toLowerCase()}`}
                  />
                </button>
                <button
                  className="button -floating"
                  onClick={nextStyle}
                  type="button"
                >
                  <span className="sr-only">{styleVal}</span>
                  <IconSquare
                    className={`icon -${colorVal.toLowerCase()} -${styleVal.toLowerCase()}`}
                    fill={styleVal === 'FILL'}
                  />
                </button>
                <button
                  className="button -floating"
                  onClick={nextFont}
                  type="button"
                >
                  <span className="sr-only">{fontVal}</span>
                  <IconFont
                    className={`icon -${colorVal.toLowerCase()} -${styleVal.toLowerCase()}`}
                  />
                </button>
              </section>
            </Note>

            <div className="wrapper">
              <label>
                <span className="title -small">Tag related topics</span>
                <TagsInput
                  className="input note__input"
                  value={topicsVal}
                  onChange={setTopicsVal}
                  placeholder="Anxiety"
                />
              </label>

              <ul className="tags">
                {topicsVal?.map((topic, idx) => (
                  <li
                    key={idx}
                    data-idx={idx}
                    className="tag"
                    onClick={handleTagClick}
                  >
                    {topic}&nbsp;&nbsp;&nbsp;✕
                  </li>
                ))}
              </ul>

              {errorMsg && <p className="error">{errorMsg}</p>}

              <button
                className="button -full"
                disabled={isSubmitting}
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </FadeIn>
        <Footer />
      </>
    )
  }

  return (
    <>
      <h1 className="sr-only">New note</h1>
      <Header />
      <Footer />
    </>
  )
}

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

export default withApollo(New)
