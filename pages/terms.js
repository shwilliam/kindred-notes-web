import {Head, Header} from '../components'
import {getGoogleDocCopy} from '../lib'

{
  /* SSG route
   * renders header nav; avoid linking to if not logged in
   */
}

const TermsPage = ({copy}) => (
  <main>
    <Head title="Terms and Conditions" description="Connected Kindness" />
    <Header viewerId={true} />

    <h1 className="title -center">Terms and Conditions</h1>

    <div className="wrapper -large">
      <p>{copy.terms_and_conditions}</p>
    </div>
  </main>
)

export const getStaticProps = async () => {
  const copy = await getGoogleDocCopy()

  return {props: {copy}}
}

export default TermsPage
