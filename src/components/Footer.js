import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const [email, setEmail] = useState('');
  const footerRef = useRef(null);
  const colsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Footer columns stagger reveal */
      const validCols = colsRef.current.filter(Boolean);
      if (validCols.length > 0) {
        gsap.fromTo(
          validCols,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for subscribing, ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-main">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col footer-brand" ref={(el) => { colsRef.current[0] = el; }}>
            <h2 className="footer-logo">SAFFRON</h2>
            <p className="footer-tagline">
              Authentic Indian cuisine crafted with passion, tradition, and the finest spices from around the world.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/saffronindiacuisine" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                &#9673; Instagram
              </a>
              <a href="https://www.facebook.com/groups/207692043666388/posts/1563885504713695/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                &#9673; Facebook
              </a>
              <a href="https://www.yelp.com/biz/saffron-indian-food-and-bar-bakersfield" target="_blank" rel="noopener noreferrer" aria-label="Yelp">
                &#9673; Yelp
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col" ref={(el) => { colsRef.current[1] = el; }}>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#inquiries">Inquiries</a></li>
              <li><a href="#location">Location</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-col" ref={(el) => { colsRef.current[2] = el; }}>
            <h3 className="footer-heading">Contact</h3>
            <address className="footer-contact">
              <p>3015 Calloway Dr, Unit D2 & D3</p>
              <p>Bakersfield, CA 93312</p>
              <p className="footer-contact-gap">
                <a href="tel:+16616794271">(661) 679-4271</a>
              </p>
              <p>
                <a href="mailto:saffronindian60@gmail.com">saffronindian60@gmail.com</a>
              </p>
            </address>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col" ref={(el) => { colsRef.current[3] = el; }}>
            <h3 className="footer-heading">Newsletter</h3>
            <p className="footer-newsletter-text">
              Subscribe for exclusive offers, new menu announcements, and event invitations.
            </p>
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="footer-newsletter-input"
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <span>&copy; 2026 Saffron. All rights reserved.</span>
        <span>Designed by whiteWabbit</span>
      </div>
    </footer>
  );
};

export default Footer;
