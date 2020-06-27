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
    // TODO: avoid calling if already viewed
    if (router.query.note) viewNote({id: router.query.note})
  }, [router.query])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [router.query])

  return (
    <main>
      <Head title="My notes" description="Kindred Notes" />
      <h1 className="sr-only">Kindred Notes</h1>
      <Header />

      {viewer.status === 'loading' ? (
        <Spinner full />
      ) : viewer.status === 'error' ? (
        <p className="error">
          An unexpected error occurred. Please refresh the page to try again.
        </p>
      ) : (
        <>
          {router.query.note && (
            <NoteModal id={router.query.note} onDismiss={handleModalClose} />
          )}

          <FadeIn className="footer-pad">
            {notesInbox.status === 'success' &&
              notesOutbox.status === 'success' && (
                <NoteGrid
                  inbox={notesInbox.data.notes}
                  outbox={notesOutbox.data.notes}
                  viewerId={viewer.data.id}
                />
              )}
          </FadeIn>
        </>
      )}

      <Footer />
    </main>
  )
}

export const getServerSideProps = ctx => {
  protectRoute(ctx)
  return {props: {}}
}
