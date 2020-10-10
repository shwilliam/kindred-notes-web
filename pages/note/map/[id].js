import {useRouter} from 'next/router'
import {FadeIn, Head, Header, MapView, Spinner} from '../../../components'
import {useNote} from '../../../hooks'
import {reduceViewerToFeature, validateHeaderToken} from '../../../lib'

const NoteMapPage = ({viewerId}) => {
  const router = useRouter()
  const {id} = router.query
  const note = useNote(id)

  if (note.status === 'loading')
    return (
      <>
        <h1 className="sr-only">Note Map</h1>
        <Header viewerId={viewerId} />
        <Spinner />
        <div />
      </>
    )

  if (note.status === 'error')
    return (
      <>
        <h1 className="sr-only">Note Map</h1>
        <Header viewerId={viewerId} />
        <p className="error">
          An unexpected error occurred. Please refresh the page to try again.
        </p>
      </>
    )

  const repliesGeoJson = {
    type: 'FeatureCollection',
    features: note.data.note?.viewers?.reduce(reduceViewerToFeature, []),
  }

  return (
    <main>
      <Head title="Note Map" />
      <h1 className="sr-only">Note Map</h1>
      <Header viewerId={viewerId} />

      <FadeIn className="footer-pad">
        <MapView markers={repliesGeoJson} full />
      </FadeIn>
    </main>
  )
}

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)
  const viewerId = token ? token.id : null

  if (!token)
    ctx.res
      .writeHead(301, {
        Location: '/signin',
      })
      .end()

  return {props: {viewerId}}
}

export default NoteMapPage
