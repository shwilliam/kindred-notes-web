import {useMutation} from 'react-query'

const viewNoteRequest = async data => {
  const response = await fetch(`/api/notes/view`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.user
}

export const useViewNote = () => {
  const [viewNote] = useMutation(viewNoteRequest)

  return viewNote
}
