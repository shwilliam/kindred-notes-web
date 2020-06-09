import {useApolloClient, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {withApollo} from '../apollo/client'
import {AuthLayout, Field} from '../components'
import {getErrorMessage} from '../lib/form'

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

const SignIn = () => {
  const client = useApolloClient()
  const [signIn] = useMutation(SignInMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()

    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    try {
      await client.resetStore()
      const {data} = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      })
      if (data.signIn.user) {
        await router.push('/')
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  return (
    <AuthLayout>
      <h2 className="sr-only">Sign In</h2>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
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
        <button className="button -full" type="submit">
          Login
        </button>
        <p>
          Don't have an account?{' '}
          <Link href="signup">
            <a className="link -no-ul">Sign up</a>
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default withApollo(SignIn)
