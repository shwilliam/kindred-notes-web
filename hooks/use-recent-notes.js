import {useQuery} from 'react-query'

const recentNotesRequest = async () => {
  const response = await fetch('/api/notes/recent')
  const responseJson = await response.json()

  return responseJson
}

export const useRecentNotes = () => {
  const notesResponse = useQuery('recentNotes', recentNotesRequest)
  const {status, data, error, isFetching} = notesResponse

  return {loading: isFetching, data}
}
