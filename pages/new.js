import {useRouter} from 'next/router'
import {useState} from 'react'
import {queryCache, useMutation} from 'react-query'
import {
  FadeIn,
  Field,
  Footer,
  Head,
  Header,
  IconFont,
  IconPalette,
  IconSquare,
  Note,
  Tag,
  TagsInput,
  Spinner,
} from '../components'
import {useArrayIterator, useViewer} from '../hooks'
import {getErrorMessage, protectRoute} from '../lib'

const NOTE_OPTIONS = {
  color: ['BLUE', 'GREEN', 'YELLOW'],
  style: ['BORDER', 'FILL'],
  font: ['SANS', 'HAND', 'MONO'],
}

const createNoteRequest = async data => {
  const response = await fetch('/api/notes/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.note
}

export default () => {
  const router = useRouter()
  const [createNote] = useMutation(createNoteRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries('notesOutbox')
    },
  })
  const viewer = useViewer()
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
          content: contentValue,
          tags: topicsVal,
          color: colorVal,
          style: styleVal,
          font: fontVal,
        })
        router.push('/')
      } catch (error) {
        setErrorMsg(getErrorMessage(error))
      }
    }

    setIsSubmitting(false)
  }

  const handleTagClick = idx => {
    setTopicsVal(s => {
      const topics = [...s]
      topics.splice(idx, 1)
      return topics
    })
  }

  return (
    <main>
      <Head title="New note" description="Write a kind notes" />
      <h1 className="sr-only">New note</h1>
      <Header />

      {viewer.status === 'loading' ? (
        <Spinner full />
      ) : viewer.status === 'error' ? (
        <p className="error">
          An unexpected error occurred. Please refresh the page to try again.
        </p>
      ) : (
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
                  {/*
                   * FIXME: fix sr output
                   * - announce value on change
                   * - better toggle label
                   */}
                  <span className="sr-only">{colorVal}</span>
                  <IconPalette
                    className={`icon -${colorVal.toLowerCase()} -${styleVal.toLowerCase()}`}
                    aria-hidden
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
                    aria-hidden
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
                    aria-hidden
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
                />
              </label>

              <ul className="tags">
                {topicsVal?.map((topic, idx) => (
                  <li key={idx}>
                    <Tag idx={idx} topic={topic} onClick={handleTagClick} />
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
      )}

      <Footer />
    </main>
  )
}

export const getServerSideProps = ctx => {
  protectRoute(ctx)
  return {props: {}}
}
