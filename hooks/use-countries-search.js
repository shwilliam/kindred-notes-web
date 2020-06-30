import {useState} from 'react'
import {countries, countryCodes} from '../lib'
import {useCities} from './index'

export const useCountriesSearch = () => {
  const [country, setCountry] = useState()
  const cities = useCities()
  const [countryResults, setCountryResults] = useState(countryCodes)
  const handleCountryInputChange = inputValue =>
    cities &&
    setCountryResults(
      countryCodes(cities).filter(countryCode =>
        countries[countryCode]
          .toLowerCase()
          .startsWith(inputValue.toLowerCase()),
      ),
    )

  return {
    country,
    setCountry,
    countryResults,
    handleCountryInputChange,
  }
}
