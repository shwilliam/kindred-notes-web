import {useQuery, useLazyQuery} from '@apollo/react-hooks'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
import gql from 'graphql-tag'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {withApollo} from '../apollo/client'
import {FadeIn, Footer, Header, Note, Spinner, Modal} from '../components'
import {useEffect, useState} from 'react'

const Index = () => {
  const router = useRouter()
  const [openNote, setOpenNote] = useState()
  const {data, loading} = useQuery(ViewerQuery)
  const [getNote] = useLazyQuery(NoteQuery, {
    onCompleted: data => setOpenNote(data.note),
    fetchPolicy: 'network-only',
  })

  const handleModalClose = () => {
    setOpenNote()
    router.back()
  }

  const handleKeyDown = e => {
    if (router.query.note && 27 === e.keyCode) handleModalClose()
  }

  useEffect(() => {
    if (router.query.note) getNote({variables: {id: router.query.note}})
  }, [router.query])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [router.query])

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

        {router.query.note && (
          <Modal onDismiss={handleModalClose}>
            {openNote ? (
              <Note
                color={openNote.color}
                style={openNote.style}
                font={openNote.font}
                full
              >
                {openNote.content}
              </Note>
            ) : (
              <p>loading...</p>
            )}
          </Modal>
        )}

        <FadeIn className="footer-pad">
          <Tabs>
            <TabList>
              <Tab>Received</Tab>
              <Tab>Sent</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {data.notes?.length ? (
                  <ul className="note-grid">
                    {data.notes.map(({id, content, color, style, font}) => (
                      <li className="note-grid__cell" key={id}>
                        <Link href={`/?note=${id}`} as={`/note/${id}`}>
                          <a className="link -no-ul">
                            <Note color={color} style={style} font={font}>
                              {content}
                            </Note>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="info wrapper">
                    <p className="info__text">
                      Looks like no notes match your interests.
                    </p>
                    <p className="info__text">
                      <Link href="/profile">
                        <a>Click here</a>
                      </Link>{' '}
                      to add some.
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                {data.sentNotes?.length ? (
                  <ul className="note-grid">
                    {data.sentNotes.map(({id, content, color, style, font}) => (
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
                ) : (
                  <div className="info wrapper">
                    <p className="info__text">
                      Your sent notes will show up here.{' '}
                    </p>
                    <p className="info__text">
                      <Link href="/new">
                        <a>Click here</a>
                      </Link>{' '}
                      to send you first!
                    </p>
                  </div>
                )}
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
      <Spinner />
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

const NoteQuery = gql`
  query NoteQuery($id: String!) {
    note(id: $id) {
      id
      author
      content
      color
      style
      font
      replies {
        id
        content
        author
        avatar
      }
    }
  }
`

export default withApollo(Index)
