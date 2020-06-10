import {useApolloClient, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {withApollo} from '../apollo/client'
import {Footer, Header} from '../components'

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

  return (
    <>
      <h1 className="sr-only">Signing out</h1>
      <Header />
      <Footer />
    </>
  )
}

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`

export default withApollo(SignOut)
