import {useQuery} from 'react-query'

const viewerRequest = async () => {
  const response = await fetch('/api/users/viewer')
  const responseJson = await response.json()

  return responseJson
}

export const useViewer = () => useQuery('viewer', viewerRequest)
