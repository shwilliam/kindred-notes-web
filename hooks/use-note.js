import {useQuery} from 'react-query'

const makeNoteRequest = id => async () => {
  const response = await fetch(`/api/notes/${id}`)
  const responseJson = await response.json()

  return responseJson
}

export const useNote = id => {
  const noteRequest = makeNoteRequest(id)
  return useQuery(`note-${id}`, noteRequest)
}
