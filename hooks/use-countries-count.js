import {useQuery} from 'react-query'

const countriesCountRequest = async () => {
  // const response = await fetch('/api/users/countries')
  // const responseJson = await response.json()

  // return responseJson
  return {countries: 12} // DELETEME: temporarily disabled
}

export const useCountriesCount = () =>
  useQuery('countriesCount', countriesCountRequest)
