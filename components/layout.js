import {Nav} from './index'

export const Layout = ({children}) => (
  <div className="layout">
    {children}

    <footer className="footer">
      <Nav />
    </footer>
  </div>
)
