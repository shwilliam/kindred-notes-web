import {truncate} from '../lib'

export const ShareActions = ({content, url}) => {
  const truncatedContent = `"${truncate(100, content)}"`

  return (
    <ul className="share-buttons">
      <li>
        <a
          href={`https://twitter.com/intent/tweet?source=${url}&text=${truncatedContent}&via=kindrednotes`}
          target="_blank"
          title="Tweet"
        >
          <img alt="Tweet" src="/images/icons/twitter.png" />
        </a>
      </li>
      <li>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${truncatedContent}`}
          target="_blank"
          title="Share to Facebook"
        >
          <img alt="Share on Facebook" src="/images/icons/fb.png" />
        </a>
      </li>
      <li>
        <a
          href={`mailto:?subject=Check out this kindred note!&body=${truncatedContent} (${url})`}
          target="_blank"
          title="Send email"
        >
          <img alt="Send email" src="/images/icons/email.png" />
        </a>
      </li>
    </ul>
  )
}
