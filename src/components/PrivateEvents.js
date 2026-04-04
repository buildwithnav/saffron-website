import React from 'react';
import './PrivateEvents.css';

const PrivateEvents = () => {
  return (
    <section id="events" className="events">
      <div
        className="events__bg"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)',
        }}
      />
      <div className="events__overlay" />

      <div className="events__content">
        <span className="eyebrow">Private Events</span>
        <h2 className="section-title">
          Celebrate Your <em>Special</em> Moments
        </h2>
        <p className="events__text">
          From intimate gatherings to grand celebrations, Saffron offers an
          exquisite setting for your most memorable occasions. Our dedicated
          events team will craft a bespoke dining experience with curated menus,
          personalized decor, and impeccable service.
        </p>
        <a href="#reservations" className="btn btn-primary">
          Inquire Now
        </a>
      </div>
    </section>
  );
};

export default PrivateEvents;
