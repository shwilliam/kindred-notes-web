import {useNotifications} from '../hooks'

export const NotificationCount = ({viewerId}) => {
  const notifications = useNotifications(viewerId)

  if (!viewerId) return null

  const notificationCount =
    notifications?.length > 9 ? '+' : notifications?.length ?? 0

  return notificationCount ? (
    <p className="notification-count">{notificationCount}</p>
  ) : null
}
