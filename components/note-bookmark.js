import {useState} from 'react'
import {useMutation} from 'react-query'
import {IconBookmark} from './index'

const bookmarkNoteRequest = async data => {
  const response = await fetch('/api/notes/bookmark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.user
}

const removeBookmarkNoteRequest = async data => {
  const response = await fetch('/api/notes/bookmark', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.user
}

export const NoteBookmark = ({id, bordered, bookmarks}) => {
  const [bookmarkNote] = useMutation(bookmarkNoteRequest)
  const [unbookmarkNote] = useMutation(removeBookmarkNoteRequest)
  const [isBookmarkedLocally, setIsBookmarkedLocally] = useState(undefined)
  const onBookmark = () => {
    setIsBookmarkedLocally(true)
    bookmarkNote({id})
  }

  const onUnbookmark = () => {
    setIsBookmarkedLocally(false)
    unbookmarkNote({id})
  }

  const isBookmarked =
    typeof isBookmarkedLocally === 'undefined'
      ? bookmarks?.some(bookmark => bookmark.id === id)
      : isBookmarkedLocally

  return (
    <button
      type="button"
      className="button -floating note__bookmark"
      onClick={isBookmarked ? onUnbookmark : onBookmark}
    >
      <span className="sr-only">
        {isBookmarked ? 'unbookmark' : 'bookmark'}
      </span>
      <IconBookmark fill={isBookmarked} bordered={bordered} />
    </button>
  )
}
