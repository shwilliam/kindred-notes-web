import {IconLogo, Nav} from './index'

export const Header = ({isAuthenticated = true, children}) => (
  <div className="header" aria-hidden>
    <IconLogo className="header__logo" />
    <div className="header__action">{children}</div>
    {isAuthenticated && <Nav />}
  </div>
)
