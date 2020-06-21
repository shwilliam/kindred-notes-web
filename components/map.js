import {useRouter} from 'next/router'
import {useEffect, useRef} from 'react'
import {createMapPopup, Mapbox, mountMap} from '../lib'

export const MapView = ({markers}) => {
  const router = useRouter()
  const mapRef = useRef()
  const noMarkers = !markers?.length

  useEffect(() => {
    if (noMarkers) {
      // having no markers means this map is useless
      router.push('/not-found')
      return
    }

    const map = mountMap(mapRef.current)

    markers.features.forEach(marker => {
      const el = document.createElement('div')

      el.className = 'map__marker'

      new Mapbox.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          createMapPopup(
            marker.properties.title,
            marker.properties.comment,
            marker.properties.avatar,
          ),
        )
        .addTo(map)
    })
  }, [])

  if (noMarkers) return null

  return <div ref={el => (mapRef.current = el)} className="map" />
}
