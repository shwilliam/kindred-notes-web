import {useQuery} from 'react-query'

const notesCountRequest = async () => {
  const response = await fetch('/api/notes/count')
  const responseJson = await response.json()

  return responseJson
}

export const useNotesCount = () => useQuery('notesCount', notesCountRequest)
