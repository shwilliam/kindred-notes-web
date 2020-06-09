import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {withApollo} from '../apollo/client'
import {AuthLayout, Field} from '../components'
import {getErrorMessage} from '../lib/form'

const SignUpMutation = gql`
  mutation SignUpMutation(
    $email: String!
    $interests: String!
    $password: String!
  ) {
    signUp(input: {email: $email, interests: $interests, password: $password}) {
      user {
        id
        email
      }
    }
  }
`

const SignUp = () => {
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    const emailElement = event.currentTarget.elements.email
    const interestsElement = event.currentTarget.elements.interests
    const passwordElement = event.currentTarget.elements.password

    try {
      await signUp({
        variables: {
          email: emailElement.value,
          interests: interestsElement.value,
          password: passwordElement.value,
        },
      })

      router.push('/signin')
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  return (
    <AuthLayout>
      <h2 className="sr-only">Sign Up</h2>
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
          name="interests"
          type="text"
          required
          label="Interests (comma-separated)"
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
          Sign up
        </button>
        <p>
          Already have an account?{' '}
          <Link href="signin">
            <a className="link -no-ul">Sign in</a>
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default withApollo(SignUp)
