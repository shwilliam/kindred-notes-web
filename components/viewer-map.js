import {MapView} from '../components'
import {useNotesOutboxViewers} from '../hooks'
import {reduceViewerToFeature} from '../lib'

export const ViewerMap = () => {
  const outboxViewers = useNotesOutboxViewers()

  const outboxViewersJson = outboxViewers && {
    type: 'FeatureCollection',
    features: outboxViewers?.reduce(reduceViewerToFeature, []),
  }

  if (outboxViewersJson?.features?.length > 0)
    return (
      <>
        <h2 className="title -center">Your Connections</h2>
        <MapView markers={outboxViewersJson} />
      </>
    )

  return null
}
