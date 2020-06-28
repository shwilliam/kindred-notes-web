import {useQuery} from 'react-query'

const notesCountRequest = async () => {
  // const response = await fetch('/api/notes/count')
  // const responseJson = await response.json()

  // return responseJson
  return {notes: 128} // DELETEME: temporarily disabled
}

export const useNotesCount = () => useQuery('notesCount', notesCountRequest)
