import {Head, Header} from '../components'
import {getGoogleDocCopy} from '../lib'

{
  /* SSG route
   * renders header nav; avoid linking to if not logged in
   */
}

export default ({copy}) => (
  <main>
    <Head title="Privacy Policy" description="Connected Kindness" />
    <Header viewerId={true} />

    <h1 className="title -center">Privacy Policy</h1>

    <div className="wrapper -large">
      <p>{copy.privacy_policy}</p>
    </div>
  </main>
)

export const getStaticProps = async () => {
  const copy = await getGoogleDocCopy()

  return {props: {copy}}
}
