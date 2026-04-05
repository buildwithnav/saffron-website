import React, { useState } from 'react';
import './Reservations.css';

const Reservations = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const formData = new FormData(e.target);
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSubmitted(true);
        } else {
          setError('Something went wrong. Please call us at (661) 679-4271.');
        }
      })
      .catch(() => {
        setError('Something went wrong. Please call us at (661) 679-4271.');
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section id="inquiries" className="reservations">
      <div className="reservations__inner">
        <span className="eyebrow">Private Events & Catering</span>
        <h2 className="section-title">
          Let Us Make Your <em>Event</em> Special
        </h2>

        {submitted ? (
          <div className="reservations__success">
            <p>Thank you! We'll be in touch soon to discuss your event.</p>
          </div>
        ) : (
          <form className="reservations__form" onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value="43f3a1d4-3a9c-4fdb-a1ca-39c75d278bd8" />
            <input type="hidden" name="subject" value="New Event Inquiry — Saffron" />
            <input type="hidden" name="from_name" value="Saffron Website" />
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="inq-name">Name</label>
                <input
                  type="text"
                  id="inq-name"
                  name="name"
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="inq-email">Email</label>
                <input
                  type="email"
                  id="inq-email"
                  name="email"
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="inq-phone">Phone</label>
                <input
                  type="tel"
                  id="inq-phone"
                  name="phone"
                  required
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="inq-type">Event Type</label>
                <select id="inq-type" name="eventType" required defaultValue="">
                  <option value="" disabled>
                    Select event type
                  </option>
                  <option value="Catering">Catering</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Wedding / Reception">Wedding / Reception</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Private Dining">Private Dining</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="inq-date">Preferred Date</label>
                <input
                  type="date"
                  id="inq-date"
                  name="date"
                />
              </div>

              <div className="form-group">
                <label htmlFor="inq-guests">Estimated Guests</label>
                <select id="inq-guests" name="estimatedGuests" defaultValue="">
                  <option value="" disabled>
                    Number of guests
                  </option>
                  <option value="10-25">10 - 25</option>
                  <option value="25-50">25 - 50</option>
                  <option value="50-100">50 - 100</option>
                  <option value="100+">100+</option>
                </select>
              </div>
            </div>

            <div className="form-group form-group--full">
              <label htmlFor="inq-details">Tell Us About Your Event</label>
              <textarea
                id="inq-details"
                name="eventDetails"
                rows="4"
                placeholder="What's the occasion? Any specific menu preferences, dietary needs, or other details..."
              />
            </div>

            {error && <p style={{ color: '#e74c3c', marginBottom: '1rem' }}>{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Reservations;
