import {useQuery} from 'react-query'

const notesInboxRequest = async () => {
  const response = await fetch('/api/notes/inbox')
  const responseJson = await response.json()

  return responseJson
}

export const useNotesInbox = () => useQuery('notesInbox', notesInboxRequest)
