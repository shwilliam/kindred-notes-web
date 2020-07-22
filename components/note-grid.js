import Link from 'next/link'
import {useState} from 'react'
import {truncate} from '../lib'
import {Note, Spinner} from './index'

export const NoteGrid = ({
  title = 'Notes',
  loading,
  error,
  notes,
  variant = 'grid',
}) => {
  const [activeVariant, setActiveVariant] = useState(variant)
  const toggleVariant = () =>
    setActiveVariant(s => (s === 'grid' ? 'list' : 'grid'))

  return (
    <section className="wrapper -large">
      <h2 className="title -center">{title}</h2>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="error">
          An unexpected error occurred. Refresh the page to try again.
        </p>
      ) : (
        <div className="note-grid__wrapper">
          <button onClick={toggleVariant} className="link -blue" aria-hidden>
            View as {activeVariant === 'grid' ? 'list' : 'grid'}
          </button>
          <ul className={`note-grid -${activeVariant}`}>
            {notes?.map(({id, content, color, style, font}) => (
              <li className={`note-grid__cell -${activeVariant}`} key={id}>
                <Link href={`/note/${id}`}>
                  <a className="link -no-ul">
                    <Note
                      color={color}
                      style={style}
                      font={font}
                      inline={activeVariant === 'list'}
                    >
                      {activeVariant === 'grid'
                        ? truncate(50, content)
                        : content}
                    </Note>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
