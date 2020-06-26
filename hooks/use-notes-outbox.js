import {useQuery} from 'react-query'

const notesOutboxRequest = async () => {
  const response = await fetch('/api/notes/outbox')
  const responseJson = await response.json()

  return responseJson
}

export const useNotesOutbox = () => {
  const notesResponse = useQuery('notesOutbox', notesOutboxRequest)
  const {status, data, error, isFetching} = notesResponse

  return {loading: isFetching, data}
}
