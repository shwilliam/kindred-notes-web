import {withApollo} from '../apollo/client'
import {AuthLayout, Head, SignupForm} from '../components'

const Signup = () => (
  <AuthLayout>
    <Head title="Sign up" description="Sign up for a Kindred Notes account" />
    <h2 className="sr-only">Sign Up</h2>
    <SignupForm />
  </AuthLayout>
)

export default withApollo(Signup)
