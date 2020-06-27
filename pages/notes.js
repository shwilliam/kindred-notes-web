import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {
  FadeIn,
  Footer,
  Head,
  Header,
  NoteGrid,
  NoteModal,
  Spinner,
} from '../components'
import {useNotesInbox, useNotesOutbox, useViewer, useViewNote} from '../hooks'
import {protectRoute} from '../lib'

export default () => {
  const router = useRouter()
  const viewer = useViewer()
  const notesInbox = useNotesInbox()
  const notesOutbox = useNotesOutbox()
  const viewNote = useViewNote()

  const handleModalClose = () => {
    router.back()
  }

  const handleKeyDown = e => {
    if (router.query.note && 27 === e.keyCode) handleModalClose()
  }

  useEffect(() => {
    if (router.query.note) viewNote({id: router.query.note})
  }, [router.query])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [router.query])

  if (!viewer.loading && !viewer.data && typeof window !== 'undefined') {
    router.push('/signin')
  }

  return (
    <main>
      <Head title="My notes" description="Kindred Notes" />
      <h1 className="sr-only">Kindred Notes</h1>
      <Header />

      {!viewer.loading && viewer.data ? (
        <>
          {router.query.note && (
            <NoteModal id={router.query.note} onDismiss={handleModalClose} />
          )}

          <FadeIn className="footer-pad">
            {!notesInbox.loading && !notesOutbox.loading && (
              <NoteGrid
                inbox={notesInbox.data.notes}
                outbox={notesOutbox.data.notes}
                viewerId={viewer.data.id}
              />
            )}
          </FadeIn>
        </>
      ) : (
        <Spinner full />
      )}

      <Footer />
    </main>
  )
}

export const getServerSideProps = ctx => {
  protectRoute(ctx)
  return {props: {}}
}
