import {useState} from 'react'

const formatTagInput = tag => tag.trim()

export const TagsInput = ({
  value,
  onChange,
  placeholder,
  name = 'tags',
  ...props
}) => {
  const [tagInput, setTagInput] = useState('')

  // TODO: validate tag on input (eg. no duplicates, max length, max tags amount)
  // TODO: split on <CR>

  const handleChange = ({target}) => {
    const input = target.value

    if (input === ' ' && tagInput === '') {
      return
    }

    const lastInput = input[input.length - 1]

    if (lastInput === ' ') {
      onChange([formatTagInput(input), ...value])
      setTagInput('')
    } else if (lastInput === ',' && input !== ',') {
      onChange([formatTagInput(input.slice(0, -1)), ...value])
      setTagInput('')
    } else {
      setTagInput(input)
    }
  }

  return (
    <input
      value={tagInput}
      onChange={handleChange}
      type="text"
      placeholder={placeholder}
      name={name}
      {...props}
    />
  )
}
