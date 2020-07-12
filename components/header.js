import {IconLogo, Nav} from './index'
import Link from 'next/link'

export const Header = ({viewerId, children}) => (
  <div className="header">
    <Link href="/">
      <a className="nav__link">
        <span className="sr-only">Home</span>
        <IconLogo className="header__logo" aria-hidden />
      </a>
    </Link>

    <div className="header__action">{children}</div>
    {viewerId ? <Nav viewerId={viewerId} /> : null}
  </div>
)
