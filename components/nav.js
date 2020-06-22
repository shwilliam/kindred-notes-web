import Link from 'next/link'
import {useRouter} from 'next/router'
import {IconHome, IconNote, IconPen, IconProfile} from './index'

export const Nav = () => {
  const router = useRouter()

  return (
    <nav className="nav">
      <Link href="/">
        <a className="nav__link">
          <span className="sr-only">Home</span>
          <IconHome
            className="nav__icon"
            fill={router.pathname === '/'}
            aria-hidden
          />
        </a>
      </Link>
      <Link href="/notes">
        <a className="nav__link">
          <span className="sr-only">Notes</span>
          <IconNote
            className="nav__icon"
            fill={router.pathname === '/notes'}
            aria-hidden
          />
        </a>
      </Link>
      <Link href="/new">
        <a className="nav__link">
          <span className="sr-only">Write</span>
          <IconPen
            className="nav__icon"
            fill={router.pathname === '/new'}
            aria-hidden
          />
        </a>
      </Link>
      <Link href="/profile">
        <a className="nav__link">
          <span className="sr-only">Profile</span>
          <IconProfile
            className="nav__icon"
            fill={router.pathname === '/profile'}
            aria-hidden
          />
        </a>
      </Link>
    </nav>
  )
}
