import {useLazyQuery, useMutation, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {withApollo} from '../apollo/client'
import {
  FadeIn,
  Footer,
  Head,
  Header,
  NoteGrid,
  NoteModal,
  Spinner,
} from '../components'
import {ViewNoteMutation} from '../lib'

const Notes = () => {
  const router = useRouter()
  const [openNote, setOpenNote] = useState()
  const {data, loading} = useQuery(ViewerQuery)
  const [viewNote] = useMutation(ViewNoteMutation)
  const [getNote] = useLazyQuery(NoteQuery, {
    onCompleted: data => setOpenNote(data.note),
    // fetchPolicy: 'network-only',
  })

  const handleModalClose = () => {
    setOpenNote()
    router.back()
  }

  const handleKeyDown = e => {
    if (router.query.note && 27 === e.keyCode) handleModalClose()
  }

  useEffect(() => {
    if (router.query.note) {
      getNote({variables: {id: router.query.note}})
      viewNote({variables: {noteId: router.query.note}})
    }
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

  return (
    <main>
      {/* FIXME */}
      <Head title="Home" description="Kindred Notes" />
      <h1 className="sr-only">Kindred Notes</h1>
      <Header />

      {data && data.viewer ? (
        <>
          {router.query.note && (
            <NoteModal
              id={openNote?.id}
              color={openNote?.color}
              style={openNote?.style}
              font={openNote?.font}
              content={openNote?.content}
              replies={openNote?.replies}
              avatar={data.viewer?.avatar}
              nickname={data.viewer?.nickname}
              onDismiss={handleModalClose}
              isOwn={openNote?.author === data.viewer?.id}
              loading={!!openNote}
              viewerLocation={data.viewer?.coords}
            />
          )}

          <FadeIn className="footer-pad">
            <NoteGrid
              inbox={data.notes}
              outbox={data.sentNotes}
              viewerId={data?.viewer.id}
            />
          </FadeIn>
        </>
      ) : (
        <Spinner full />
      )}
      <Footer />
    </main>
  )
}

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      avatar
      nickname
      coords
    }
    notes {
      id
      viewedBy
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

export default withApollo(Notes)
