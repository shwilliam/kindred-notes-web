import Link from 'next/link'
import {FadeIn, Head, Header} from '../components'

const Error = ({statusCode}) => (
  <main>
    <Head title="Not found" />
    <h1 className="sr-only">{statusCode}</h1>
    <Header />

    <FadeIn>
      <article className="wrapper">
        <h2 className="title">That wasn&apos;t supposed to happen...</h2>

        <p className="paragraph">
          {statusCode
            ? `An error ${statusCode} occurred on server. `
            : 'An error occurred on client. '}
          Sorry about that. Please report the error in the{' '}
          <a
            href="https://github.com/shwilliam/kindred-notes-web/issues/new"
            target="_blank"
            rel="noreferrer noopener"
            className="link"
          >
            GitHub issues
          </a>{' '}
          so that we can try to fix it.
        </p>

        <Link href="/">
          <a className="link">Back to safety</a>
        </Link>
      </article>
    </FadeIn>
  </main>
)

Error.getInitialProps = ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return {statusCode}
}

export default Error
