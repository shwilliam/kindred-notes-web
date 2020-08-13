import Link from 'next/link'
import {FadeIn, Footer, Head, Header, NotesSearch} from '../components'
import {validateHeaderToken} from '../lib'

const AboutPage = ({viewerId}) => (
  <main className="footer-pad">
    <Head title="About kindrednotes" description="Connected Kindness" />
    <Header viewerId={viewerId}>
      {!viewerId ? (
        <Link href="/signin">
          <a className="link">Sign in</a>
        </Link>
      ) : (
        <NotesSearch />
      )}
    </Header>

    <FadeIn className="pad--bottom">
      <section className="wrapper">
        <h1 className="title -center">About</h1>
        <p className="paragraph">
          Hello! I’m Shelley, the founder of kindrednotes. Thank you for
          stopping by to learn more about kindrednotes.
        </p>
        <p className="title -small">Let me ask you something...</p>
        <ul className="check-list">
          <li>Have you ever been the recipient of an act of kindness?</li>
          <li>
            Maybe a neighbour picked up your mail while you were away, or a
            friend brought you flowers.
          </li>
          <li>
            Perhaps a complete stranger bought you a cup of coffee or let you go
            ahead in a long line up.
          </li>
          <li>
            Maybe you’ve also done acts of kindness, like paying for someone’s
            lunch, walking a neighbour’s dog, holding the elevator door or
            complimenting a stranger.
          </li>
        </ul>

        <p className="paragraph">
          Sometimes we can get caught up in our own busy lives and forget that
          the simplest things can have a large positive impact on others and
          ourselves.
        </p>

        <p className="title -small -center -blue">
          These seemingly small acts, matter ❤️
        </p>

        <p className="paragraph">
          After working and traveling in over 50 countries, I've had the
          opportunity to meet many people from all over the world and experience
          the power of kindness. It's shown me that at the core, we all want the
          same things: to be seen, to be heard and to be loved.
        </p>

        <br />

        <p className="paragraph">
          This is where the idea for kindrednotes was born.
        </p>

        <p className="title -small -center">
          Our intention at kindrednotes is to connect people through kindness.
          To demonstrate that despite our many differences in perspectives,
          beliefs and values, at the core, we are all the same.
        </p>

        <p className="title -small -center -blue">Connected Kindness.</p>
      </section>
    </FadeIn>

    {!viewerId && (
      <div className="wrapper">
        <Link href="/signup">
          <a className="button -full">Join the movement</a>
        </Link>
      </div>
    )}

    <Footer />
  </main>
)

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)
  const viewerId = token ? token.id : null

  return {props: {viewerId}}
}

export default AboutPage
