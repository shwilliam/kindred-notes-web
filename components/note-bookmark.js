import {IconBookmark} from './index'

export const NoteBookmark = ({onClick, isBookmarked, bordered}) => (
  <button
    type="button"
    className="button -floating note__bookmark"
    onClick={onClick}
  >
    <span className="sr-only">{isBookmarked ? 'unbookmark' : 'bookmark'}</span>
    <IconBookmark fill={isBookmarked} bordered={bordered} />
  </button>
)
