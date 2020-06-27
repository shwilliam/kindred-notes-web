import {useRouter} from 'next/router'
import {
  FadeIn,
  Footer,
  Head,
  Header,
  MapView,
  Spinner,
} from '../../../components'
import {useNote} from '../../../hooks'
import {protectRoute, reduceViewerToFeature} from '../../../lib'

export default () => {
  const router = useRouter()
  const {id} = router.query
  const note = useNote(id)

  if (note.status === 'loading')
    return (
      <>
        <h1 className="sr-only">Note Map</h1>
        <Header />
        <Spinner full />
        <Footer />
      </>
    )

  if (note.status === 'error')
    return (
      <>
        <h1 className="sr-only">Note Map</h1>
        <Header />
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
      <Header />

      <FadeIn className="footer-pad">
        <MapView markers={repliesGeoJson} />
      </FadeIn>
      <Footer />
    </main>
  )
}

export const getServerSideProps = ctx => {
  protectRoute(ctx)
  return {props: {}}
}
