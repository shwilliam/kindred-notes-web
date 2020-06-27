import {useMutation, queryCache} from 'react-query'

const addInterestRequest = async data => {
  const response = await fetch('/api/users/interests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.user
}

export const useAddInterest = () =>
  useMutation(addInterestRequest, {
    onMutate: interest => {
      queryCache.cancelQueries('user')

      const previousValue = queryCache.getQueryData('user')

      queryCache.setQueryData('user', old => ({
        user: {
          ...old.user,
          interests: [...old.user.interests, {title: interest.title}],
        },
      }))

      return previousValue
    },
    onError: (_error, _vars, previousValue) =>
      queryCache.setQueryData('user', previousValue),
    onSettled: () => {
      queryCache.invalidateQueries('user')
      queryCache.invalidateQueries('notesInbox')
    },
  })
