import {IconLogo, Nav} from './index'

export const Header = ({viewerId, children}) => (
  <div className="header" aria-hidden>
    <IconLogo className="header__logo" />
    <div className="header__action">{children}</div>
    {viewerId ? <Nav viewerId={viewerId} /> : null}
  </div>
)
