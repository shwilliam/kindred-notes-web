import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {withApollo} from '../apollo/client'
import {Layout} from '../components'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`

const Profile = () => {
  const router = useRouter()
  const {data, loading} = useQuery(ViewerQuery)

  if (
    loading === false &&
    data.viewer === null &&
    typeof window !== 'undefined'
  ) {
    router.push('/signin')
  }

  if (data && data.viewer) {
    return (
      <Layout>
        <header className="header">
          <h1>Profile</h1>

          <div>
            You're signed in as {data.viewer.email} go to{' '}
            <Link href="/about">
              <a>about</a>
            </Link>{' '}
            page, or{' '}
            <Link href="/signout">
              <a>sign out</a>
            </Link>
          </div>
        </header>
        <main className="main">
          <Link href="/signout">
            <a className="button -full">Sign out</a>
          </Link>
        </main>
      </Layout>
    )
  }

  return <p>Loading...</p>
}

export default withApollo(Profile)
