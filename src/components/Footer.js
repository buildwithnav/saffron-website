import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for subscribing, ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col footer-brand">
            <h2 className="footer-logo">SAFFRON</h2>
            <p className="footer-tagline">
              Authentic Indian cuisine crafted with passion, tradition, and the finest spices from around the world.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/saffronindiacuisine" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                &#9673; Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                &#9673; Facebook
              </a>
              <a href="https://www.yelp.com/biz/saffron-indian-food-and-bar-bakersfield" target="_blank" rel="noopener noreferrer" aria-label="Yelp">
                &#9673; Yelp
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#reservations">Reservations</a></li>
              <li><a href="#location">Location</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-col">
            <h3 className="footer-heading">Contact</h3>
            <address className="footer-contact">
              <p>3015 Calloway Dr, Unit D2 & D3</p>
              <p>Bakersfield, CA 93312</p>
              <p className="footer-contact-gap">
                <a href="tel:+16616794271">(661) 679-4271</a>
              </p>
              <p>
                <a href="mailto:hello@saffronindianfood.com">hello@saffronindianfood.com</a>
              </p>
            </address>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col">
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
