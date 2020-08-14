import Link from 'next/link'

export const WelcomeText = ({viewerId}) => (
  <section className="wrapper">
    <h2 className="title -center">
      Welcome!{' '}
      <span role="img" aria-label="waving hand">
        👋
      </span>
    </h2>

    <p className="paragraph">
      kindrednotes is a social enterprise dedicated to encouraging and inspiring
      kindness and empathy through kind notes.
    </p>

    <h2 className="title -center">What is a kindrednote?</h2>

    <p className="paragraph">
      A kindrednote is just what it sounds like, a kind note. It could be a
      simple note to say something kind or a quote that’s had a positive impact.
      It could be a story, an experience or a thought. Our intention is to
      spread kindness and increase empathy by demonstrating that despite our
      many differences in perspectives, beliefs and values, that at the core, we
      are all the same.
    </p>

    <h2 className="title -center">Connecting through kindness.</h2>

    <p className="paragraph">
      We act as a catalyst to inspire and create meaningful connections and
      conversations with each other. We believe that we are all connected and
      that by helping one person, we help all. It is our “kindred” spirits that
      remind us that despite our many differences in perspectives, beliefs and
      values, that at the core, we are all the same.
    </p>

    <br />

    <p className="paragraph">
      So let’s start by sending notes to each other – all around the world –
      have conversations, share, celebrate and bring more positive energy into
      the world. It starts with You. One person at a time, one kind note at a
      time. Together let’s create a community that’s rooted in Kindness.
      Connected Kindness.
    </p>

    <br />

    <div className="wrapper">
      {!viewerId && (
        <Link href="/signup">
          <a className="button -full">Join the movement</a>
        </Link>
      )}
    </div>

    <br />

    <h2 className="title -center -blue">
      Why Now: The Importance of kindrednotes
    </h2>

    <p className="paragraph">
      <span className="bold">
        Over 3B people are on social media every day, yet we are currently
        experiencing a loneliness epidemic.
      </span>{' '}
      Mental health issues continue to increase with mental illness now being
      the single largest disabling group of disorders worldwide, affecting 1 in
      4 people.
    </p>

    <p className="title -small -center">
      Today, we have never been more connected, yet felt more disconnected.
    </p>

    <p className="paragraph">
      The pace of life is fast and only getting faster. However, there is also a
      shift for something slower, more purposeful, more intentional.
    </p>

    <p className="title -small -center">
      Kindrednotes will provide the opportunity to connect and make a positive
      impact on people around the world.
    </p>

    <ol className="fact-list">
      <li>
        <p className="title -small -blue">Fact #1: Kindness Heals.</p>
        <p className="paragraph">
          Studies have shown that kind acts can lower blood pressure, pain,
          stress and depression while increasing self-esteem and optimism.
        </p>
      </li>
      <li>
        <p className="title -small -blue">
          Fact #2: Kindness is a WIN-WIN-WIN.
        </p>
        <p className="paragraph">
          Kindness not only benefits the recipient of the kindness but also the
          person doing the kind act and the people observing the kindness.
          Studies have shown that the person giving the kindness sometimes
          benefit as much as the recipient of the good deed. Kindness is
          teachable and compassion can be cultivated when people observe acts of
          kindness.
        </p>
      </li>
      <li>
        <p className="title -small -blue">Fact #3: Kindness is Contagious.</p>
        <p className="paragraph">
          Kindness can set off a chain reaction in a “pay it forward” domino
          effect, creating a conscious social movement that inspires others to
          engage and spread kindness.  By creating and sharing kindrednotes with
          each other all around the world, we will create a kindness movement.
        </p>
      </li>
    </ol>

    <p className="title -small -center">We Believe…</p>

    <ul>
      <li>One person can make a huge difference.</li>
      <li>Change starts with each one of us.</li>
      <li>We are all connected. By helping one, we help all.</li>
      <li>
        Now more than ever we need to cultivate community, kindness and empathy.
      </li>
      <li>Kindness is the cure.</li>
    </ul>

    <p className="title -small -center -blue">Kindness starts with ONE</p>

    <p className="paragraph">
      One person at a time, one kind note at a time. Together let’s create a
      community that’s rooted in Kindness. Connected Kindness.
    </p>
  </section>
)
