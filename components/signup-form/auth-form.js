import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useState} from 'react'
import {Field} from '../../components'

export const SignupAuthForm = ({onSubmit}) => {
  const [inputValues, setInputValues] = useState({email: '', password: ''})
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState()
  const [checkUserExists] = useLazyQuery(UserExistsQuery, {
    onCompleted: async data => {
      if (data.userExists?.exists) {
        setErrorMsg('A user with that email already exists')
      } else {
        const {email, password} = inputValues
        await onSubmit({email, password})
      }
      setLoading(false)
    },
  })

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
    checkUserExists({variables: {email}})
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

      <button disabled={loading} className="button -full" type="submit">
        Create account
      </button>
    </form>
  )
}

const UserExistsQuery = gql`
  query UserExistsQuery($email: String!) {
    userExists(email: $email) {
      exists
    }
  }
`
