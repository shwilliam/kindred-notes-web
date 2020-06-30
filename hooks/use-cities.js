import {useEffect, useState} from 'react'

export const useCities = () => {
  const [cities, setCities] = useState()

  useEffect(() => {
    ;(async () => {
      // TODO: handle error
      const citiesResponse = await fetch('/api/cities')
      const citiesJson = await citiesResponse.json()
      setCities(citiesJson.cities)
    })()
  }, [])

  return cities
}
