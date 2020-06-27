import {useMutation, queryCache} from 'react-query'

const deleteInterestRequest = async data => {
  const response = await fetch('/api/users/interests', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.user
}

export const useDeleteInterest = () =>
  useMutation(deleteInterestRequest, {
    onMutate: interest => {
      queryCache.cancelQueries('user')

      const previousValue = queryCache.getQueryData('user')

      queryCache.setQueryData('user', old => {
        const updatedInterests = [...old.user.interests]
        const removedIdx = updatedInterests.findIndex(
          ({title}) => title === interest.title,
        )
        updatedInterests.splice(removedIdx, 1)

        return {
          user: {
            ...old.user,
            interests: updatedInterests,
          },
        }
      })

      return previousValue
    },
    onError: (_error, _vars, previousValue) =>
      queryCache.setQueryData('user', previousValue),
    onSettled: () => {
      queryCache.invalidateQueries('user')
      queryCache.invalidateQueries('notesInbox')
    },
  })
