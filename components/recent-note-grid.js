import {useRecentNotes} from '../hooks'
import {NoteGrid} from './index'

export const RecentNoteGrid = () => {
  const recentNotes = useRecentNotes()

  if (recentNotes?.data?.notes)
    return (
      <NoteGrid
        title="Recent notes"
        notes={recentNotes?.data?.notes}
        loading={false}
        error={false}
      />
    )

  return null
}
