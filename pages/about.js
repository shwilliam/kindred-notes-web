import Link from 'next/link'
import {FadeIn, Footer, Head, Header} from '../components'
import {useViewer} from '../hooks'

export default () => {
  const viewer = useViewer()
  const isAuthenticated =
    !['loading', 'error'].includes(viewer.status) && !!viewer.data

  return (
    <main>
      <Head title="About" description="Read about Kindred Notes" />
      <h1 className="sr-only">About</h1>
      <Header />

      <FadeIn>
        <article className="wrapper">
          <h2 className="title">Why KindredNotes?</h2>

          <p className="paragraph">
            Kindrednotes is a social enterprise dedicated to encouraging and
            inspiring kindness and empathy through kind notes.
          </p>

          <h2 className="title">What is a KindredNote?</h2>

          <p className="paragraph">
            A Kindrednote is just what it sounds like, a kind note. It could be
            a simple note to say something kind or a quote that’s had a positive
            impact. It could be a story, an experience or a thought. Our
            intention is to spread kindness and increase empathy by
            demonstrating that despite our many differences in perspectives,
            beliefs and values, that at the core, we are all the same.
          </p>

          {!isAuthenticated && (
            <Link href="/signup">
              <a className="button -full">Get started</a>
            </Link>
          )}
        </article>
      </FadeIn>
      {isAuthenticated && <Footer />}
    </main>
  )
}
