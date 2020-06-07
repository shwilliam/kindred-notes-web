import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/">
        <a>notes</a>
      </Link>
      <Link href="/new">
        <a>write</a>
      </Link>
      <Link href="/about">
        <a>about</a>
      </Link>
      <Link href="/signout">
        <a>sign out</a>
      </Link>
    </nav>
  )
}
