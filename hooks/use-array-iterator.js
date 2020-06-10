import {useState} from 'react'

export const useArrayIterator = array => {
  const [value, setValue] = useState(1)
  const next = () => setValue(s => s + 1)

  return [array[value % array.length], next]
}
