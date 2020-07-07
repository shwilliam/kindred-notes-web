import {useRouter} from 'next/router'
import {useState} from 'react'
import {queryCache, useMutation} from 'react-query'
import {
  FadeIn,
  Field,
  Head,
  Header,
  IconFont,
  IconPalette,
  IconSquare,
  Note,
  Tag,
  TagsInput,
} from '../components'
import {useArrayIterator} from '../hooks'
import {validateHeaderToken} from '../lib'

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

export default ({viewerId}) => {
  const router = useRouter()
  const [createNote] = useMutation(createNoteRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries('notesOutbox')
    },
  })
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
        setErrorMsg(error.message)
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
      <Header viewerId={viewerId} />

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
                  <Tag
                    topic={topic}
                    selected={topicsVal.includes(topic)}
                    onClick={handleTagClick}
                  />
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
    </main>
  )
}

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)
  const viewerId = token ? token.id : null

  if (!token)
    ctx.res
      .writeHead(301, {
        Location: '/signin',
      })
      .end()

  return {props: {viewerId}}
}
