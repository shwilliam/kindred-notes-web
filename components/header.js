import {IconLogo} from './index'

export const Header = ({children}) => (
  <div className="header" aria-hidden>
    <IconLogo className="header__logo" />
    <div className="header__action">{children}</div>
  </div>
)
