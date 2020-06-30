import {AuthLayout, Head, SignupForm} from '../components'
import {getGoogleDocCopy} from '../lib'

export default ({copy}) => (
  <AuthLayout>
    <Head title="Sign up" description="Sign up for a Kindred Notes account" />
    <h2 className="sr-only">Sign Up</h2>
    <SignupForm termsAndConditionsCopy={copy.terms_and_conditions} />
  </AuthLayout>
)

export const getStaticProps = async () => {
  const copy = await getGoogleDocCopy()

  return {props: {copy}}
}
