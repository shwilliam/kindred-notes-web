import {useApolloClient, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {withApollo} from '../apollo/client'

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`

const SignOut = () => {
  const client = useApolloClient()
  const router = useRouter()
  const [signOut] = useMutation(SignOutMutation)

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push('/signin')
      })
    })
  }, [signOut, router, client])

  return <p>Signing out...</p>
}

export default withApollo(SignOut)
