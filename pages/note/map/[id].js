import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import {withApollo} from '../../../apollo/client'
import {FadeIn, Footer, Head, Header, MapView} from '../../../components'
import {reduceReplyToFeature} from '../../../lib'

const MapPage = () => {
  const router = useRouter()
  const {id} = router.query
  const {loading, error, data} = useQuery(NoteQuery, {variables: {id}})

  if (error)
    return (
      <>
        <h1 className="sr-only">Note Map</h1>
        <Header />
        <p>Uh oh.. Something went wrong.</p>
      </>
    )

  if (loading)
    return (
      <>
        <h1 className="sr-only">Note Map</h1>
        <Header />
        <Footer />
      </>
    )

  const {note} = data
  const repliesGeoJson = {
    type: 'FeatureCollection',
    features: note?.replies?.reduce(reduceReplyToFeature, []),
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

const NoteQuery = gql`
  query NoteQuery($id: String!) {
    note(id: $id) {
      replies {
        id
        content
        avatar
        coords
      }
    }
  }
`

export default withApollo(MapPage)
