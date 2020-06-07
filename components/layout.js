import Nav from './nav'

export default function Layout({children}) {
  return (
    <div className="layout">
      <main className="main">{children}</main>

      <footer className="footer">
        <Nav />
      </footer>
    </div>
  )
}
