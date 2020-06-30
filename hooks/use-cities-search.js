import {useEffect, useState} from 'react'
import {filterCitiesByCountry} from '../lib'
import {useCities, useDebounce} from './index'

export const useCitiesSearch = (query, country) => {
  const [results, setResults] = useState([])
  const debouncedSearchTerm = useDebounce(query, 500)
  const cities = useCities()

  useEffect(() => {
    if (!cities) return

    if (country && debouncedSearchTerm) {
      setResults(
        cities
          .filter(filterCitiesByCountry(country))
          .filter(({name}) =>
            name.toLowerCase().startsWith(query.toLowerCase()),
          ),
      )
    } else {
      setResults([])
    }
  }, [debouncedSearchTerm])

  return results
}
