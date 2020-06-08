import Link from 'next/link'
import IconNote from './icons/note'
import IconPen from './icons/pen'
import IconProfile from './icons/profile'

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/">
        <a className="nav__link">
          <span className="sr-only">notes</span>
          <IconNote className="nav__icon" />
        </a>
      </Link>
      <Link href="/new">
        <a className="nav__link">
          <span className="sr-only">write</span>
          <IconPen className="nav__icon" />
        </a>
      </Link>
      <Link href="/profile">
        <a className="nav__link">
          <span className="sr-only">profile</span>
          <IconProfile className="nav__icon" />
        </a>
      </Link>
    </nav>
  )
}
