import {useNotesOutbox} from './index'

export const useNotesOutboxViewers = () => {
  const notesOutbox = useNotesOutbox()

  const outboxViewers = notesOutbox?.data?.notes?.reduce(
    (viewers, val) => [...viewers, ...val.viewers],
    [],
  )
  
  return outboxViewers
}