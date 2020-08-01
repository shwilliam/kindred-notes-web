import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {useMutation} from 'react-query'
import {AuthLayout, Field, Head} from '../components'

const signInRequest = async data => {
  const response = await fetch('/api/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
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
      const email = emailElement.value.trim()
      const password = passwordElement.value

      // TODO: normalize html5 and manual input validation
      if (!email.length) {
        setErrorMsg('Please provide an email')
        return
      }

      if (!password.length) {
        setErrorMsg('Please enter a password')
        return
      }

      setIsSubmitting(true)
      const response = await signIn({
        email: email,
        password: password,
      })

      if (!response) {
        setErrorMsg('Unable to connect to server')
      } else if (response.error) {
        setErrorMsg(response.error?.message ?? 'Error signing in')
      } else {
        setWavesOpen(false)
        setTimeout(() => router.push('/'), 650)
      }
    } catch (error) {
      setErrorMsg(error.message)
    }
    setIsSubmitting(false)
  }

  return (
    <AuthLayout open={wavesOpen}>
      <Head title="Sign in" description="Sign in to kindrednotes" />
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
        <p className="wave-pad">
          Don't have an account?{' '}
          <Link href="signup">
            <a className="link -no-ul">Sign up</a>
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
