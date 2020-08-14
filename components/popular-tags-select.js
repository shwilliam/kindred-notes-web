import {useEffect, useState, useRef} from 'react'
import {usePopularTags} from '../hooks'

export const PopularTagsSelect = ({
  onChange,
  tags = [],
  title,
  onSelect,
  onRemove,
}) => {
  const fieldsetRef = useRef()
  const popularTags = usePopularTags()
  const [selectedTags, setSelectedTags] = useState(tags)

  useEffect(() => {
    onChange && onChange(selectedTags)
  }, [selectedTags])

  const handleChange = event => {
    event.persist()
    const tagValue = event.target.value

    if (event.target.checked) {
      setSelectedTags(s => [...s, tagValue])
      onSelect && onSelect({title: tagValue})
    } else {
      onRemove && onRemove({title: tagValue})
      setSelectedTags(s => {
        const selectedTagsCopy = [...s]
        const titleIdx = s.findIndex(title => title === tagValue)
        selectedTagsCopy.splice(titleIdx, 1)

        return selectedTagsCopy
      })
    }
  }

  return (
    <fieldset ref={fieldsetRef} className="tags">
      {title ? (
        <legend className="title -small -center">{title}</legend>
      ) : (
        <legend className="sr-only">Choose from popular tags</legend>
      )}

      {popularTags.status === 'loading' && <p>Loading...</p>}

      {popularTags.status === 'error' && (
        <p className="error">Error fetching popular tags</p>
      )}

      {popularTags.status === 'success' &&
        popularTags.data?.tags?.map(({title}) => (
          <label
            key={title}
            htmlFor={title}
            className={`button tag ${
              selectedTags.includes(title) ? '-selected' : ''
            }`}
          >
            {title}
            <input
              onChange={handleChange}
              type="checkbox"
              name="popular-tag"
              id={title}
              value={title}
              className="sr-only"
            />
          </label>
        ))}
    </fieldset>
  )
}
