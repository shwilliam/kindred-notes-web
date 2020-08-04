import {queryCache, useMutation} from 'react-query'

const createNoteRequest = async data => {
  const response = await fetch('/api/notes/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.note
}

export const useCreateNote = () => {
  const [createNote] = useMutation(createNoteRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries('notesOutbox')
    },
  })

  return createNote
}
