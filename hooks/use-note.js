import {useQuery} from 'react-query'

const makeNoteRequest = id => async () => {
  const response = await fetch(`/api/notes/${id}`)
  const responseJson = await response.json()

  return responseJson
}

export const useNote = id => {
  const noteRequest = makeNoteRequest(id)
  const noteResponse = useQuery(`note-${id}`, noteRequest)
  const {status, data, error, isFetching} = noteResponse

  return {loading: isFetching, error, status, data}
}
