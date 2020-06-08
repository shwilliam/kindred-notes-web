import Link from 'next/link'
import {IconNote, IconPen, IconProfile} from './index'

export const Nav = () => (
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
