import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useState} from 'react'
import {IconBookmark} from './index'

export const NoteBookmark = ({id, bordered, bookmarks}) => {
  const [bookmarkNote] = useMutation(BookmarkNoteMutation)
  const [unbookmarkNote] = useMutation(UnbookmarkNoteMutation)
  const [isBookmarkedLocally, setIsBookmarkedLocally] = useState(undefined)

  const onBookmark = () => {
    setIsBookmarkedLocally(true)
    bookmarkNote({variables: {noteId: id}})
  }

  const onUnbookmark = () => {
    setIsBookmarkedLocally(false)
    unbookmarkNote({variables: {noteId: id}})
  }

  const isBookmarked =
    typeof isBookmarkedLocally === 'undefined'
      ? bookmarks?.includes(id)
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

const BookmarkNoteMutation = gql`
  mutation BookmarkNoteMutation($noteId: String!) {
    bookmarkNote(input: {noteId: $noteId}) {
      isBookmarked
    }
  }
`

const UnbookmarkNoteMutation = gql`
  mutation UnbookmarkNoteMutation($noteId: String!) {
    unbookmarkNote(input: {noteId: $noteId}) {
      isBookmarked
    }
  }
`
