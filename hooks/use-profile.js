import {useQuery} from 'react-query'

const profileRequest = async () => {
  const response = await fetch('/api/users/profile')
  const responseJson = await response.json()

  return responseJson
}

export const useProfile = () => useQuery('user', profileRequest) // TODO: cache by user id
