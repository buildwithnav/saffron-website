import React from 'react';
import './Catering.css';

export default function Catering() {
  const handleViewTrays = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('select-menu-tab', { detail: 'Party Trays' }));
    const menuSection = document.querySelector('#menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="catering" id="catering">
      <div className="catering__container container">
        <div className="catering__text reveal">
          <span className="eyebrow">Catering & Party Trays</span>
          <h2>Let Us Bring the <em>Feast</em> to You</h2>
          <p className="catering__description">
            Hosting a party, office event, or family gathering? Our party trays bring the full Saffron experience to your table — from tandoori platters to biryani, paneer, and more.
          </p>
          <div className="catering__details">
            <div className="catering__detail">
              <span className="catering__detail-label">Small Tray</span>
              <span className="catering__detail-value">Serves 10–15</span>
            </div>
            <div className="catering__detail">
              <span className="catering__detail-label">Large Tray</span>
              <span className="catering__detail-value">Serves 25–30</span>
            </div>
          </div>
          <div className="catering__actions">
            <button className="btn btn-primary" onClick={handleViewTrays}>
              View Party Trays
            </button>
            <a href="tel:+16616794271" className="btn btn-ghost">
              Call to Order
            </a>
          </div>
        </div>
        <div className="catering__gallery reveal-right">
          <div className="catering__img-wrapper catering__img--large">
            <img
              src={`${process.env.PUBLIC_URL}/catering-curries.jpg`}
              alt="Catering spread with samosas, curries, rice, and chutneys"
              loading="lazy"
            />
          </div>
          <div className="catering__img-wrapper catering__img--small">
            <img
              src={`${process.env.PUBLIC_URL}/catering-tandoori.jpg`}
              alt="Tandoori and naan party spread"
              loading="lazy"
            />
          </div>
          <div className="catering__img-wrapper catering__img--small">
            <img
              src={`${process.env.PUBLIC_URL}/catering-desserts.jpg`}
              alt="Full catering party spread"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
