import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {useNotesInbox} from './index'
import {useMount} from 'react-use'

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

  useMount(() => {
    if (
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
  })

  useEffect(() => {
    if (
      replyNotificationsResponse?.data?.replies &&
      inboxResponse?.data?.notes
    ) {
      const unreadNotesInbox =
        inboxResponse?.data?.notes.filter(({viewers}) =>
          viewers.every(({id}) => id !== viewerId),
        ) ?? []

      if (unreadNotesInbox.length !== notifications?.length)
        setNotifications([
          ...(replyNotificationsResponse?.data?.replies ?? []),
          ...unreadNotesInbox,
        ])
    }
  }, [viewerId, inboxResponse.data])

  return notifications
}
