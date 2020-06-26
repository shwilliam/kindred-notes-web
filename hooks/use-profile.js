import {useQuery} from 'react-query'

const profileRequest = async () => {
  const response = await fetch('/api/users/profile')
  const responseJson = await response.json()

  return responseJson
}

export const useProfile = () => {
  const profileResponse = useQuery('user', profileRequest) // TODO: cache by user id
  const {status, data, error, isFetching} = profileResponse

  return {loading: isFetching, error, status, data}
}
