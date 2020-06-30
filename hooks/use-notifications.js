import {useQuery} from 'react-query'

const unreadRepliesRequest = async () => {
  const response = await fetch('/api/notes/reply/notifications')
  const responseJson = await response.json()

  return responseJson
}

export const useNotifications = () =>
  useQuery('replyNotifications', unreadRepliesRequest)
