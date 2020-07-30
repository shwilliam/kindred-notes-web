import {useQuery} from 'react-query'

const notesSearchRequest = async query => {
  if (!query) return {notes: []}

  const response = await fetch(`/api/notes/all?search=${query}`)
  const responseJson = await response.json()

  return responseJson
}

const makeNotesSearchRequest = query => () => notesSearchRequest(query)

export const useNotesSearch = query =>
  useQuery(`notesSearch-${query}`, makeNotesSearchRequest(query))
