import React from 'react';
import './Reservations.css';

const timeOptions = [
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
];

const Reservations = () => {
  const submitted = new URLSearchParams(window.location.search).get('reserved') === 'true';

  return (
    <section id="reservations" className="reservations">
      <div className="reservations__inner">
        <span className="eyebrow">Reserve a Table</span>
        <h2 className="section-title">
          Join Us for an <em>Unforgettable</em> Evening
        </h2>

        {submitted ? (
          <div className="reservations__success">
            <p>Thank you! We'll confirm your reservation shortly.</p>
          </div>
        ) : (
          <form className="reservations__form" action="https://formsubmit.co/saffronindian60@gmail.com" method="POST">
            <input type="hidden" name="_next" value="https://buildwithnav.github.io/saffron-website/?reserved=true#reservations" />
            <input type="hidden" name="_subject" value="New Reservation Request — Saffron" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="res-name">Name</label>
                <input
                  type="text"
                  id="res-name"
                  name="name"
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="res-email">Email</label>
                <input
                  type="email"
                  id="res-email"
                  name="email"
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="res-phone">Phone</label>
                <input
                  type="tel"
                  id="res-phone"
                  name="phone"
                  required
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="res-date">Date</label>
                <input
                  type="date"
                  id="res-date"
                  name="date"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="res-time">Time</label>
                <select id="res-time" name="time" required defaultValue="">
                  <option value="" disabled>
                    Select a time
                  </option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="res-party">Party Size</label>
                <select id="res-party" name="partySize" required defaultValue="">
                  <option value="" disabled>
                    Number of guests
                  </option>
                  {[...Array(9)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                  <option value="10+">10+</option>
                </select>
              </div>
            </div>

            <div className="form-group form-group--full">
              <label htmlFor="res-requests">Special Requests</label>
              <textarea
                id="res-requests"
                name="specialRequests"
                rows="4"
                placeholder="Allergies, celebrations, seating preferences..."
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Reserve Now
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Reservations;
