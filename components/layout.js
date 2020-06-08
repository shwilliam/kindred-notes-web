import Nav from './nav'

export default function Layout({children}) {
  return (
    <div className="layout">
      {children}

      <footer className="footer">
        <Nav />
      </footer>
    </div>
  )
}
