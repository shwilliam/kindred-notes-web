import {useQuery} from '@apollo/react-hooks'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
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
    sentNotes {
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
        <Tabs>
          <TabList>
            <Tab>Received</Tab>
            <Tab>Sent</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ul className="note-grid">
                {data.notes?.map(({id, content}) => (
                  <li className="note note-grid__cell" key={id}>
                    <Link href={`/note/${id}`}>
                      <a>{content}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </TabPanel>
            <TabPanel>
              <ul className="note-grid">
                {data.sentNotes?.map(({id, content}) => (
                  <li className="note note-grid__cell" key={id}>
                    <Link href={`/note/${id}`}>
                      <a>{content}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    )
  }

  return <p>Loading...</p>
}

export default withApollo(Index)
