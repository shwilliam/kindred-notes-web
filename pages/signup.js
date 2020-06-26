import {AuthLayout, Head, SignupForm} from '../components'

export default () => (
  <AuthLayout>
    <Head title="Sign up" description="Sign up for a Kindred Notes account" />
    <h2 className="sr-only">Sign Up</h2>
    <SignupForm />
  </AuthLayout>
)
