import {useEffect, useState, useRef} from 'react'
import {usePopularTags} from '../hooks'

export const PopularTagsSelect = ({onChange}) => {
  const fieldsetRef = useRef()
  const popularTags = usePopularTags()
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    onChange(selectedTags)
  }, [selectedTags])

  const handleChange = event => {
    event.persist()
    if (event.target.checked) setSelectedTags(s => [...s, event.target.value])
    else {
      setSelectedTags(s => {
        const selectedTagsCopy = [...s]
        const titleIdx = s.findIndex(title => title === event.target.value)
        selectedTagsCopy.splice(titleIdx, 1)

        return selectedTagsCopy
      })
    }
  }

  if (popularTags.status === 'loading') return null

  if (popularTags.status === 'error')
    return <p className="error">Error fetching popular tags</p>

  return (
    <fieldset ref={fieldsetRef} className="tags">
      <legend className="sr-only">Choose from popular tags</legend>

      {popularTags.data?.tags.map(({title}) => (
        <div key={title}>
          <input
            onChange={handleChange}
            type="checkbox"
            name="popular-tag"
            id={title}
            value={title}
            className="sr-only"
          />
          <label
            className={`button tag ${
              selectedTags.includes(title) ? '-selected' : ''
            }`}
            htmlFor={title}
          >
            {title}
          </label>
        </div>
      ))}
    </fieldset>
  )
}
