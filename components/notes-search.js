import {useRef, useState} from 'react'
import {Field, IconSearch} from './index'

export const NotesSearch = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = () => setIsOpen(s => !s)
  const [inputValue, setInputValue] = useState('')
  const toggleRef = useRef()
  const inputRef = useRef()

  const handleInputChange = e => setInputValue(e.target.value)

  const handleBlur = () => {
    if (!inputRef.current?.value?.length) {
      setIsOpen(false)
      toggleRef.current?.focus()
    }
  }

  const handleToggle = () => {
    toggleIsOpen()
    inputRef.current?.focus()
  }

  return (
    <section className="notes-search">
      <form
        className={`notes-search__form ${isOpen ? '-open' : ''}`}
        action="/search"
        method="GET"
      >
        <Field
          name="query"
          type="search"
          placeholder="Find a note..."
          label="Notes search"
          className="notes-search__input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          ref={inputRef}
          required
        />

        <button className="button -floating notes-search__submit" type="submit">
          <span className="sr-only">Search</span>
          <IconSearch className="icon -blue" aria-hidden />
        </button>
      </form>

      <button
        onClick={handleToggle}
        className={`button -floating notes-search__toggle ${
          isOpen ? '-hidden' : ''
        }`}
        type="button"
        aria-hidden
        ref={toggleRef}
      >
        <IconSearch className="icon -blue" />
      </button>
    </section>
  )
}
