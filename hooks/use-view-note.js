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

const viewRepliesRequest = async data => {
  const response = await fetch(`/api/notes/reply/view`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.replies
}

export const useViewNote = () => {
  const [viewNote] = useMutation(viewNoteRequest)
  const [viewReplies] = useMutation(viewRepliesRequest)

  return {viewNote, viewReplies}
}
