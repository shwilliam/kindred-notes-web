import {useQuery} from 'react-query'

const popularTagsRequest = async () => {
  const response = await fetch('/api/tags/popular')
  const responseJson = await response.json()

  return responseJson
}

export const usePopularTags = () => useQuery('popularTags', popularTagsRequest)
