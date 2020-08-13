import {AuthLayout, Head, SignupForm} from '../components'
import {getGoogleDocCopy} from '../lib'

const SignUpPage = ({copy}) => (
  <AuthLayout>
    <Head title="Sign up" description="Sign up for a kindrednotes account" />
    <h2 className="sr-only">Sign Up</h2>
    <SignupForm termsAndConditionsCopy={copy.terms_and_conditions} />
  </AuthLayout>
)

export const getStaticProps = async () => {
  const copy = await getGoogleDocCopy()

  return {props: {copy}}
}

export default SignUpPage
