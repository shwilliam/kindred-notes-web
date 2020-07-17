import {IconFacebook, IconInstagram, IconTwitter} from './icons'

export const Footer = () => (
  <footer className="footer__wrapper">
    <div className="footer">
      <p className="footer__copyright">
        &copy; Copyright {new Date().getFullYear()} KindredNotes. All Rights
        Reserved.
      </p>

      <ul className="footer__links">
        <li>
          <a
            className="footer__link"
            href="https://twitter.com/KindredNotes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconTwitter />
            <span className="sr-only">Twitter</span>
          </a>
        </li>
        <li>
          <a
            className="footer__link"
            href="https://instagram.com/kindrednotes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconInstagram />
            <span className="sr-only">Instagram</span>
          </a>
        </li>
        <li>
          <a
            className="footer__link"
            href="https://www.facebook.com/kindrednotes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconFacebook />
            <span className="sr-only">Facebook</span>
          </a>
        </li>
      </ul>
    </div>
  </footer>
)
