import {Field, IconSearch} from './index'

export const NotesSearch = () => (
  <form className="notes-search" action="/search" method="GET">
    <Field
      name="query"
      type="search"
      placeholder="Find a note..."
      label="Notes search"
      required
    />

    <button className="button -floating" type="submit">
      <span className="sr-only">Search</span>
      <IconSearch className="icon -blue" aria-hidden />
    </button>
  </form>
)
