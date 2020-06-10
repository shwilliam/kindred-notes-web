import {useQuery} from '@apollo/react-hooks'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
import gql from 'graphql-tag'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {withApollo} from '../apollo/client'
import {FadeIn, Footer, Header, Note} from '../components'

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
      <>
        <h1 className="sr-only">Kindred Notes</h1>
        <Header />

        <FadeIn className="footer-pad">
          <Tabs>
            <TabList>
              <Tab>Received</Tab>
              <Tab>Sent</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ul className="note-grid">
                  {data.notes?.map(({id, content, color, style, font}) => (
                    <li className="note-grid__cell" key={id}>
                      <Link href={`/note/${id}`}>
                        <a className="link -no-ul">
                          <Note color={color} style={style} font={font}>
                            {content}
                          </Note>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </TabPanel>
              <TabPanel>
                <ul className="note-grid">
                  {data.sentNotes?.map(({id, content, color, style, font}) => (
                    <li className="note-grid__cell" key={id}>
                      <Link href={`/note/${id}`}>
                        <a className="link -no-ul">
                          <Note color={color} style={style} font={font}>
                            {content}
                          </Note>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </FadeIn>
        <Footer />
      </>
    )
  }

  return (
    <>
      <h1 className="sr-only">Kindred Notes</h1>
      <Header />
      <Footer />
    </>
  )
}

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
    notes {
      id
      content
      color
      font
      style
    }
    sentNotes {
      id
      content
      color
      font
      style
    }
  }
`

export default withApollo(Index)
