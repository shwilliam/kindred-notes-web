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

    // TODO: normalize html5 and manual input validation
    if (!email.length) {
      setErrorMsg('Please provide an email')
      return
    }

    if (!password.length) {
      setErrorMsg('Please enter a password')
      return
    }
    // TODO: confirm password field

    setLoading(true)
    const emailExists = await emailExistsRequest({email})

    if (emailExists) {
      setErrorMsg('A user with that email already exists')
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
