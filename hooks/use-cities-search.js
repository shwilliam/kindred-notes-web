import {useEffect, useState} from 'react'
import {cities, filterCitiesByCountry} from '../lib'
import {useDebounce} from './index'

export const useCitiesSearch = (query, country) => {
  const [results, setResults] = useState([])
  const debouncedSearchTerm = useDebounce(query, 500)

  useEffect(() => {
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
