import MapboxGL from 'mapbox-gl'

MapboxGL.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY

export const Mapbox = MapboxGL

export const createMapPopup = (title, comment, avatar) =>
  new MapboxGL.Popup({offset: 25}).setHTML(
    `<div>
      <img
        class="avatar -small"
        src="/images/avatars/peep-${avatar}.png"
        aria-label="Avatar variant ${avatar}"
      />
      <p class="title -small">${title}</p>
      <p>${comment}</p>
    </div>`,
  )

export const mountMap = container =>
  new MapboxGL.Map({
    container,
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 2,
    center: [5, 34],
  })

export const reduceViewerToFeature = (
  features,
  {coords, avatar, nickname, country, city},
) => [
  ...features,
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: coords,
    },
    properties: {
      title: nickname,
      comment: `${city}, ${country}`,
      avatar,
    },
  },
]
