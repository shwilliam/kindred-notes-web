import {useState} from 'react'
import {Field} from '../../components'

// TODO: move to `lib/`
const emailExistsRequest = async data => {
  const response = await fetch('/api/users/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.emailExists
}

export const SignupAuthForm = ({onSubmit}) => {
  const [inputValues, setInputValues] = useState({email: '', password: ''})
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState()

  const handleSubmit = async event => {
    event.preventDefault()
    setErrorMsg()

    let {email, password} = inputValues
    email = email.trim()
    password = password.trim()

    // TODO: confirm password field

    setLoading(true)

    let emailExists
    try {
      emailExists = await emailExistsRequest({email})
    } catch (_) {
      // assume email is available
      emailExists = false
    }

    if (emailExists) {
      setErrorMsg('A user with this email already exists')
    } else {
      const {email, password} = inputValues
      await onSubmit({email, password})
    }
    setLoading(false)
  }

  const handleInput = event => {
    event.persist()
    setInputValues(s => ({...s, [event.target.name]: event.target.value}))
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
        value={inputValues.email}
        onChange={handleInput}
      />
      <Field
        name="password"
        type="password"
        autoComplete="password"
        placeholder="Password"
        required
        label="Password"
        value={inputValues.password}
        onChange={handleInput}
      />

      {errorMsg && <p className="error">{errorMsg}</p>}

      <button
        disabled={loading}
        className="button -full"
        type="submit"
        title="Create account"
      >
        Create account
      </button>
    </form>
  )
}
