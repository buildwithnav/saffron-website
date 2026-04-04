import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Events', href: '#events' },
  { label: 'Reservations', href: '#reservations' },
  { label: 'Location', href: '#location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      {/* Top Info Bar */}
      <div className="navbar__topbar">
        <div className="container navbar__topbar-inner">
          <span className="navbar__topbar-address">
            3015 Calloway Dr, Unit D2 & D3, Bakersfield, CA 93312
          </span>
          <span className="navbar__topbar-phone">
            <a href="tel:+16616794271">(661) 679-4271</a>
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="navbar__main">
        <div className="container navbar__main-inner">
          <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, '#home')}>
            SAFFRON
          </a>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#order" className="btn-primary navbar__cta" onClick={(e) => handleNavClick(e, '#order')}>
            Order Online
          </a>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#order" className="btn-primary navbar__mobile-cta" onClick={(e) => handleNavClick(e, '#order')}>
                Order Online
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
