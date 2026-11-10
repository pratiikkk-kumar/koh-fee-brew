import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar({ onReserve }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', to: '/menu' },
    { label: 'Gallery', to: '/gallery' },
  ];

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)} className={styles.logo}>
          <img src="/assets/logo.png" alt="Koh-Fee Brew" className={styles.logoImg} onError={(e) => { e.target.style.display='none'; }} />
          <span className={styles.logoText}>
            <span className={styles.logoMain}>Koh-Fee Brew</span>
            <span className={styles.logoSub}>Multi Cuisine Restaurant</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className={styles.links}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={styles.link}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <button className={`btn btn-primary ${styles.ctaBtn}`} onClick={onReserve}>
          Reserve Table
        </button>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <button className={`btn btn-primary ${styles.mobileCta}`} onClick={() => { setMenuOpen(false); onReserve(); }}>
          Reserve Table
        </button>
      </div>
    </header>
  );
}
