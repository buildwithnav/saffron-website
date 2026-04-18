import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Party Trays', href: '#menu', action: 'party-trays' },
  { label: 'Events', href: '#events' },
  { label: 'Inquiries', href: '#inquiries' },
  { label: 'Location', href: '#location' },
];

const SECTION_IDS = ['home', 'about', 'menu', 'events', 'inquiries', 'location'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navbarRef = useRef(null);
  const topbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation — slide navbar in from top
      gsap.from(navbarRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Hide topbar on scroll past 200px
      ScrollTrigger.create({
        start: 200,
        onUpdate: (self) => {
          if (!topbarRef.current) return;
          if (self.direction === 1 && self.scroll() > 200) {
            gsap.to(topbarRef.current, {
              y: -topbarRef.current.offsetHeight,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.inOut',
              overwrite: true,
            });
          } else if (self.direction === -1 && self.scroll() <= 200) {
            gsap.to(topbarRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.inOut',
              overwrite: true,
            });
          }
        },
      });

      // Active section highlighting via ScrollTrigger
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(id);
            }
          },
        });
      });
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMenuOpen(false);
    if (link.action === 'party-trays') {
      window.dispatchEvent(new CustomEvent('select-menu-tab', { detail: 'Party Trays' }));
    }
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Determine whether a nav link matches the currently active section.
   * Special case: "Party Trays" shares href #menu with the Menu link,
   * so only highlight the primary "Menu" link for the menu section.
   */
  const isLinkActive = (link) => {
    const sectionId = link.href.replace('#', '');
    if (link.action === 'party-trays') return false;
    return sectionId === activeSection;
  };

  return (
    <header ref={navbarRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      {/* Top Info Bar */}
      <div ref={topbarRef} className="navbar__topbar">
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
          <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, { href: '#home' })}>
            SAFFRON
          </a>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={isLinkActive(link) ? 'navbar__link--active' : ''}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="https://www.doordash.com/store/saffron-indian-food-&-bar-bakersfield-41931145/" target="_blank" rel="noopener noreferrer" className="btn-primary navbar__cta">
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
              <li key={link.label}>
                <a
                  href={link.href}
                  className={isLinkActive(link) ? 'navbar__link--active' : ''}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="https://www.doordash.com/store/saffron-indian-food-&-bar-bakersfield-41931145/" target="_blank" rel="noopener noreferrer" className="btn-primary navbar__mobile-cta">
                Order Online
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
