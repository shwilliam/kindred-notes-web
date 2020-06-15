import {useApolloClient, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {withApollo} from '../apollo/client'
import {AuthLayout, Field} from '../components'
import {getErrorMessage} from '../lib'

const SignIn = () => {
  const client = useApolloClient()
  const router = useRouter()
  const [signIn] = useMutation(SignInMutation)
  const [errorMsg, setErrorMsg] = useState()
  const [wavesOpen, setWavesOpen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()

    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    try {
      setIsSubmitting(true)
      await client.resetStore()
      const {data} = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      })
      if (data.signIn.user) {
        setWavesOpen(false)
        setTimeout(() => router.push('/'), 650)
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
    setIsSubmitting(false)
  }

  return (
    <AuthLayout open={wavesOpen}>
      <h2 className="sr-only">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          required
          label="Email"
        />
        <Field
          name="password"
          type="password"
          autoComplete="password"
          placeholder="Password"
          required
          label="Password"
        />

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button disabled={isSubmitting} className="button -full" type="submit">
          Log in
        </button>
        <p className="wave-pad -small">
          Don't have an account?{' '}
          <Link href="signup">
            <a className="link -no-ul">Sign up</a>
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: {email: $email, password: $password}) {
      user {
        id
        email
      }
    }
  }
`

export default withApollo(SignIn)
