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
import {reduceReplyToFeature} from '../../../lib'

export default () => {
  const router = useRouter()
  const {id} = router.query
  const note = useNote(id)

  if (!note.loading && note.error)
    return (
      <>
        <h1 className="sr-only">Note Map</h1>
        <Header />
        <p>Uh oh.. Something went wrong.</p>
      </>
    )

  if (note.loading)
    return (
      <>
        <h1 className="sr-only">Note Map</h1>
        <Header />
        <Spinner full />
        <Footer />
      </>
    )

  const repliesGeoJson = {
    type: 'FeatureCollection',
    features: note.data.note?.viewers?.reduce(reduceReplyToFeature, []),
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
