import Link from 'next/link'
import Layout from '../components/layout'

export default function About() {
  return (
    <Layout>
      This is a static page goto{' '}
      <Link href="/">
        <a>dynamic</a>
      </Link>{' '}
      page.
    </Layout>
  )
}
