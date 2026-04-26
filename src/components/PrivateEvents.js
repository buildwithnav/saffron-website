import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PrivateEvents.css';

gsap.registerPlugin(ScrollTrigger);

const PrivateEvents = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* True parallax: background moves at 0.5x scroll speed */
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      /* Ambient overlay gradient that warms on scroll */
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          '--overlay-warmth': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      /* Heading word-by-word reveal */
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.events__word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="events" className="events" ref={sectionRef}>
      <div
        className="events__bg"
        ref={bgRef}
        style={{
          backgroundImage:
            `url(${process.env.PUBLIC_URL}/events-venue.jpg)`,
        }}
      />
      <div className="events__overlay" ref={overlayRef} />

      <div className="events__content">
        <span className="eyebrow reveal">Private Events</span>
        <h2 className="section-title reveal d1" ref={headingRef}>
          <span className="events__word">Celebrate</span>{' '}
          <span className="events__word">Your</span>{' '}
          <em className="events__word">Special</em>{' '}
          <span className="events__word">Moments</span>
        </h2>
        <div className="gold-divider reveal d2"><span className="dot"></span></div>
        <p className="events__text reveal d3">
          From intimate gatherings to grand celebrations, Saffron offers an
          exquisite setting for your most memorable occasions. Our dedicated
          events team will craft a bespoke dining experience with curated menus,
          personalized decor, and impeccable service.
        </p>
        <a href="#inquiries" className="btn btn-primary reveal d4">
          Inquire Now
        </a>
      </div>
    </section>
  );
};

export default PrivateEvents;
