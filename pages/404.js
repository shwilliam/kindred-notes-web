import Link from 'next/link'
import {FadeIn, Head, Header} from '../components'

const FourOhFour = () => (
  <main>
    <Head title="Not found" />
    <h1 className="sr-only">404</h1>
    <Header />

    <FadeIn>
      <article className="wrapper">
        <h2 className="title">Page not found</h2>

        <Link href="/">
          <a className="link">Back to safety</a>
        </Link>
      </article>
    </FadeIn>
  </main>
)

export default FourOhFour
