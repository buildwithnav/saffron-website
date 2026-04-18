import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Location.css';

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  const sectionRef = useRef(null);
  const hoursRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hours list stagger reveal */
      if (hoursRef.current) {
        const rows = hoursRef.current.querySelectorAll('li');
        gsap.fromTo(
          rows,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: hoursRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="location" className="location" ref={sectionRef}>
      <div className="location__header reveal">
        <span className="eyebrow">Find Us</span>
        <h2 className="section-title">
          Visit <em>Saffron</em>
        </h2>
        <div className="gold-divider"><span className="dot"></span></div>
      </div>

      <div className="location__grid">
        <div className="location__map reveal-left">
          <iframe
            title="Saffron Restaurant Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3254.5!2d-119.1292!3d35.3878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ea6a0000000000%3A0x0!2zMzAxNSBDYWxsb3dheSBEciwgQmFrZXJzZmllbGQsIENBIDkzMzEy!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="location__info reveal-right">
          <div className="location__block">
            <h3>Address</h3>
            <p>
              3015 Calloway Dr, Unit D2 & D3<br />
              Bakersfield, CA 93312
            </p>
          </div>

          <div className="location__block">
            <h3>Contact</h3>
            <p>
              <a href="tel:+16616794271">(661) 679-4271</a>
            </p>
            <p>
              <a href="mailto:saffronindian60@gmail.com">saffronindian60@gmail.com</a>
            </p>
          </div>

          <div className="location__block">
            <h3>Hours</h3>
            <ul className="location__hours" ref={hoursRef}>
              <li>
                <span>Mon &ndash; Thu</span>
                <span>11:00 AM &ndash; 9:00 PM</span>
              </li>
              <li>
                <span>Fri &ndash; Sat</span>
                <span>11:00 AM &ndash; 10:00 PM</span>
              </li>
              <li>
                <span>Sunday</span>
                <span>11:00 AM &ndash; 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
