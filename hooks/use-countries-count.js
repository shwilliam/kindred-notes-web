import {useQuery} from 'react-query'

const countriesCountRequest = async () => {
  const response = await fetch('/api/users/countries')
  const responseJson = await response.json()

  return responseJson
}

export const useCountriesCount = () =>
  useQuery('countriesCount', countriesCountRequest)
