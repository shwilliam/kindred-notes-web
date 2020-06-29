import {useState} from 'react'
import {Field} from '../../components'
import {emailExistsRequest} from '../../lib'

export const SignupAuthForm = ({onSubmit}) => {
  const [inputValues, setInputValues] = useState({email: '', password: ''})
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState()

  const handleSubmit = async event => {
    event.preventDefault()
    setErrorMsg()

    let {email, password} = inputValues
    email = email.trim()

    // TODO: confirm password field

    // TODO: normalize html5 and manual input validation
    if (!email.length) {
      setErrorMsg('Please provide an email')
      return
    }

    if (!password.length) {
      setErrorMsg('Please enter a password')
      return
    }

    setLoading(true)

    let emailExists
    try {
      emailExists = await emailExistsRequest({email})
    } catch (error) {
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
