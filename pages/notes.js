import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {
  FadeIn,
  Footer,
  Head,
  Header,
  InboxOutboxTabs,
  NoteModal,
} from '../components'
import {useNotesInbox, useNotesOutbox, useViewNote} from '../hooks'
import {validateHeaderToken} from '../lib'

export default ({viewerId}) => {
  const router = useRouter()
  const notesInbox = useNotesInbox()
  const notesOutbox = useNotesOutbox()
  const {viewNote, viewReplies} = useViewNote()

  const handleModalClose = () => {
    router.back()
  }

  const handleKeyDown = e => {
    if (router.query.note && 27 === e.keyCode) handleModalClose()
  }

  useEffect(() => {
    // TODO: avoid calling if already viewed
    if (router.query.note) {
      viewNote({id: router.query.note})
      viewReplies({id: router.query.note})
    }
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

      {router.query.note && (
        <NoteModal
          id={router.query.note}
          viewerId={viewerId}
          onDismiss={handleModalClose}
        />
      )}

      <FadeIn className="footer-pad">
        {notesInbox.status === 'success' &&
          notesOutbox.status === 'success' && (
            <InboxOutboxTabs
              inbox={notesInbox.data.notes}
              outbox={notesOutbox.data.notes}
              viewerId={viewerId}
            />
          )}
      </FadeIn>

      <Footer />
    </main>
  )
}

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)

  if (!token) {
    ctx.res
      .writeHead(301, {
        Location: '/signin',
      })
      .end()
    return {props: {}}
  }

  return {props: {viewerId: token.id}}
}
