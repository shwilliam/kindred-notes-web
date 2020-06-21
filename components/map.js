import {useEffect, useRef} from 'react'
import {createMapPopup, Mapbox, mountMap} from '../lib'

export const MapView = ({markers}) => {
  const mapRef = useRef()

  useEffect(() => {
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

  return <div ref={el => (mapRef.current = el)} className="map" />
}
