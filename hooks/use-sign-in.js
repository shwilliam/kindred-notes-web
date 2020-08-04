import {useMutation} from 'react-query'

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

export const useSignIn = () => {
  const [signIn] = useMutation(signInRequest)
  return signIn
}
