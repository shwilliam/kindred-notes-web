import Link from 'next/link'
import {useRouter} from 'next/router'
import {
  IconBell,
  IconHome,
  IconNote,
  IconPen,
  IconProfile,
  IconSearch,
  NotificationCount,
} from './index'

export const Nav = ({viewerId}) => {
  const router = useRouter()

  return (
    <div className="nav__wrapper">
      <nav className="nav">
        <Link href="/">
          <a className="nav__link">
            <span className="sr-only">Home</span>
            <IconHome
              className="nav__icon hide-desktop"
              fill={router.pathname === '/'}
              aria-hidden
            />
          </a>
        </Link>
        <Link href="/notes">
          <a className="nav__link">
            <span className="hide-mobile">Notes</span>
            <IconNote
              className="nav__icon hide-desktop"
              fill={router.pathname === '/notes'}
              aria-hidden
            />
          </a>
        </Link>
        <Link href="/new">
          <a className="nav__link">
            <span className="hide-mobile">Write</span>
            <IconPen
              className="nav__icon hide-desktop"
              fill={router.pathname === '/new'}
              aria-hidden
            />
          </a>
        </Link>
        <Link href="/notifications">
          <a className="nav__link">
            <NotificationCount viewerId={viewerId} />
            <span className="hide-mobile">Notifications</span>
            <IconBell
              className="nav__icon hide-desktop"
              fill={router.pathname === '/notifications'}
              aria-hidden
            />
          </a>
        </Link>
        <Link href="/search">
          <a className="nav__link">
            <span className="hide-mobile">Search</span>
            <IconSearch
              className="nav__icon hide-desktop"
              aria-hidden
            />
          </a>
        </Link>
        <Link href="/profile">
          <a className="nav__link">
            <span className="hide-mobile">Profile</span>
            <IconProfile
              className="nav__icon hide-desktop"
              fill={router.pathname === '/profile'}
              aria-hidden
            />
          </a>
        </Link>
      </nav>
    </div>
  )
}
