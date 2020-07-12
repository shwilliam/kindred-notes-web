import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {useNotesInbox} from './index'

const unreadRepliesRequest = async () => {
  const response = await fetch('/api/notes/reply/notifications')
  const responseJson = await response.json()

  return responseJson
}

export const useNotifications = viewerId => {
  const [notifications, setNotifications] = useState()
  const replyNotificationsResponse = useQuery(
    'replyNotifications',
    unreadRepliesRequest,
  )
  const inboxResponse = useNotesInbox()

  useEffect(() => {
    if (
      !notifications?.length &&
      replyNotificationsResponse?.data?.replies &&
      inboxResponse?.data?.notes
    ) {
      const unreadNotesInbox =
        inboxResponse?.data?.notes.filter(({viewers}) =>
          viewers.every(({id}) => id !== viewerId),
        ) ?? []

      setNotifications([
        ...(replyNotificationsResponse?.data?.replies ?? []),
        ...unreadNotesInbox,
      ])
    }
  }, [viewerId])

  return notifications
}
