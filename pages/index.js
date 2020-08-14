import Link from 'next/link'
import {
  CookiesDisclaimer,
  FadeIn,
  Footer,
  Head,
  Header,
  NotesSearch,
  OverviewStats,
  RecentNoteGrid,
  ViewerMap,
  WelcomeText,
} from '../components'
import {validateHeaderToken} from '../lib'

const HomePage = ({viewerId}) => (
  <main className="footer-pad">
    <Head title="kindrednotes" description="Connected Kindness" />
    <h1 className="sr-only">kindrednotes</h1>

    <Header viewerId={viewerId}>
      {!viewerId ? (
        <Link href="/signin">
          <a className="link">Sign in</a>
        </Link>
      ) : (
        <NotesSearch />
      )}
    </Header>

    {viewerId && <CookiesDisclaimer />}

    <FadeIn className="pad--bottom">
      <OverviewStats />

      <hr className="rule" />

      <section className="wrapper -large">{viewerId && <ViewerMap />}</section>

      {!viewerId && <WelcomeText viewerId={viewerId} />}

      <RecentNoteGrid />
    </FadeIn>

    <Footer />
  </main>
)

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)
  const viewerId = token ? token.id : null

  return {props: {viewerId}}
}

export default HomePage
