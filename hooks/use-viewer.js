import {useQuery} from 'react-query'

const viewerRequest = async () => {
  const response = await fetch('/api/users/viewer')
  const responseJson = await response.json()

  return responseJson
}

export const useViewer = () => {
  const viewerResponse = useQuery('viewer', viewerRequest)
  const {status, data, error, isFetching} = viewerResponse

  // TODO: redirect to login if no user

  return {loading: isFetching, data}
}
