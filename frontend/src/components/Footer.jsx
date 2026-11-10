import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">

        {/* ── Top Grid ── */}
        <div className={styles.inner}>

          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoMain}>Koh-Fee Brew</span>
              <span className={styles.logoSub}>Multi Cuisine Restaurant</span>
            </Link>
            <p className={styles.bio}>
              Where every plate tells a story &amp; every sip becomes a memory.
              Crafted with love in Bhubaneswar.
            </p>

            {/* Social links */}
            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/koh.feee"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="#"
                className={styles.socialIcon}
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className={styles.linksBlock}>
            <h4 className={styles.title}>Explore</h4>
            <nav className={styles.nav}>
              <Link to="/">Home</Link>
              <Link to="/menu">Full Menu</Link>
              <Link to="/gallery">Gallery</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className={styles.linksBlock}>
            <h4 className={styles.title}>Contact</h4>
            <nav className={styles.nav}>
              <a href="tel:+910000000000">+91 00000 00000</a>
              <a href="mailto:hello@kohfeebrew.com">hello@kohfeebrew.com</a>
              <span>PLOT NO A/62, Saheed Nagar,<br />Bhubaneswar, Odisha 751007</span>
            </nav>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Koh-Fee Brew. All rights reserved.</p>
          <Link to="/admin" className={styles.staffLink}>Staff Portal</Link>
        </div>
      </div>
    </footer>
  );
}
