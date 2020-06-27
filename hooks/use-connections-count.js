import {useQuery} from 'react-query'

const connectionsCountRequest = async () => {
  const response = await fetch('/api/notes/connections')
  const responseJson = await response.json()

  return responseJson
}

export const useConnectionsCount = () =>
  useQuery('connectionsCount', connectionsCountRequest)
