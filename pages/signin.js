import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {useMutation} from 'react-query'
import {AuthLayout, Field, Head} from '../components'
import {getErrorMessage} from '../lib'

const signInRequest = async data => {
  const response = await fetch('/api/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response) throw new Error('Error authenticating user')

  const responseJson = await response.json()
  return responseJson.user
}

export default () => {
  const router = useRouter()
  const [signIn] = useMutation(signInRequest)
  const [errorMsg, setErrorMsg] = useState()
  const [wavesOpen, setWavesOpen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()

    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    try {
      setIsSubmitting(true)
      await signIn({
        email: emailElement.value,
        password: passwordElement.value,
      })
      setWavesOpen(false)
      setTimeout(() => router.push('/'), 650)
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
    setIsSubmitting(false)
  }

  return (
    <AuthLayout open={wavesOpen}>
      <Head title="Sign in" description="Sign in to Kindred Notes" />
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

        <button
          title="Log in"
          disabled={isSubmitting}
          className="button -full"
          type="submit"
        >
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
