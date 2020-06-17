import {useState} from 'react'
import {countryCodes, countries} from '../lib'

export const useCountriesSearch = () => {
  const [country, setCountry] = useState()
  const [countryResults, setCountryResults] = useState(countryCodes)
  const handleCountryInputChange = inputValue =>
    setCountryResults(
      countryCodes.filter(countryCode =>
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
