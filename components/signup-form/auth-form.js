import {useState} from 'react'
import {Field} from '../../components'

export const SignupAuthForm = ({onSubmit}) => {
  const [errorMsg, setErrorMsg] = useState()
  const handleSubmit = event => {
    event.preventDefault()
    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password
    const email = emailElement.value.trim()
    const password = passwordElement.value.trim()

    if (!email.length) {
      setErrorMsg('Please provide an email')
      return
    }
    // TODO: check if user with exists

    if (!password.length) {
      setErrorMsg('Please enter a password')
      return
    }
    // TODO: confirm password field

    onSubmit({email, password})
  }

  return (
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

      <button className="button -full" type="submit">
        Create account
      </button>
    </form>
  )
}
