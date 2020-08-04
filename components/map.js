import {useEffect, useRef} from 'react'
import {createMapPopup, Mapbox, mountMap} from '../lib'

export const MapView = ({markers, full = false}) => {
  const mapRef = useRef()
  const noMarkers = !markers?.features?.length

  useEffect(() => {
    if (noMarkers) return

    const map = mountMap(mapRef.current)

    markers.features.forEach(({geometry, properties}) => {
      const {title, comment, avatar} = properties

      const el = document.createElement('div')
      el.className = 'map__marker'
      el.style.backgroundImage = `
        linear-gradient(to bottom, #ebf5f840, #48a9c620),
        url(/images/avatars/peep-${avatar}.png)
      `

      new Mapbox.Marker(el)
        .setLngLat(geometry.coordinates)
        .setPopup(createMapPopup(title, comment, avatar))
        .addTo(map)
    })
  }, [])

  if (noMarkers) return null

  return (
    <div
      ref={el => (mapRef.current = el)}
      className={`map ${full ? '-full' : ''}`}
    />
  )
}
