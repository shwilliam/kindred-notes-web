import {useQuery} from 'react-query'

const recentNotesRequest = async () => {
  const response = await fetch('/api/notes/recent')
  const responseJson = await response.json()

  return responseJson
}

export const useRecentNotes = () => useQuery('recentNotes', recentNotesRequest)
