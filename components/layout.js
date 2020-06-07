import Nav from './nav'

export default function Layout({children}) {
  return (
    <div>
      <main>{children}</main>

      <footer>
        <Nav />
      </footer>
    </div>
  )
}
