import Link from 'next/link'
import {useLocalStorage} from 'react-use'

export const CookiesDisclaimer = () => {
  const [
    hasClosedCookiesDisclaimer,
    setHasClosedCookiesDisclaimer,
  ] = useLocalStorage('has_closed_cookies_disclaimer')

  const closeCookiesDisclaimer = () => setHasClosedCookiesDisclaimer(true)

  if (hasClosedCookiesDisclaimer) return null

  return (
    <div className="cookies__wrapper">
      <div className="nav__container cookies">
        <button
          onClick={closeCookiesDisclaimer}
          className="button -floating cookies__accept"
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <p>
          We use cookies to make interactions with our website and services
          easier for you. Read more about our privacy policy{' '}
          <Link href="/privacy-policy">
            <a>here</a>
          </Link>
          . By using this site you are giving us your consent to do this.
        </p>
      </div>
    </div>
  )
}
