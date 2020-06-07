import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {withApollo} from '../apollo/client'
import Layout from '../components/layout'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
    notes {
      id
      content
    }
  }
`

const Index = () => {
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
        You're signed in as {data.viewer.email} go to{' '}
        <Link href="/about">
          <a>about</a>
        </Link>{' '}
        page, or{' '}
        <Link href="/signout">
          <a>sign out</a>
        </Link>
        <ul>
          {data.notes?.map(({id, content}) => (
            <li key={id}>{content}</li>
          ))}
        </ul>
      </Layout>
    )
  }

  return <p>Loading...</p>
}

export default withApollo(Index)
