import {useQuery} from 'react-query'

const viewerRequest = async () => {
  const response = await fetch('/api/users/viewer')
  return response.ok && (await response.json())
}

export const useViewer = () => useQuery('viewer', viewerRequest, {retry: 0})
