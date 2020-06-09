import {FadeIn, Footer, Header} from '../components'

// FIXME: hide footer
// TODO: link to sign up

const About = () => {
  return (
    <>
      <h1 className="sr-only">About</h1>
      <Header />

      <FadeIn>
        <h2>Why KindredNotes?</h2>

        <p>
          Kindrednotes is a social enterprise dedicated to encouraging and
          inspiring kindness and empathy through kind notes.
        </p>

        <h2>What is a KindredNote?</h2>

        <p>
          A Kindrednote is just what it sounds like, a kind note. It could be a
          simple note to say something kind or a quote that’s had a positive
          impact. It could be a story, an experience or a thought. Our intention
          is to spread kindness and increase empathy by demonstrating that
          despite our many differences in perspectives, beliefs and values, that
          at the core, we are all the same.
        </p>
      </FadeIn>
      <Footer />
    </>
  )
}

export default About
