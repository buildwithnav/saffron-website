import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import PrivateEvents from './components/PrivateEvents';
import Reservations from './components/Reservations';
import Location from './components/Location';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);
  const progressRef = useRef(null);
  const stickyOrderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- scroll progress bar ---- */
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      /* ---- fade-up reveals ---- */
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      /* ---- slide-left reveals ---- */
      gsap.utils.toArray('.reveal-left').forEach((el) => {
        gsap.fromTo(el,
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      /* ---- slide-right reveals ---- */
      gsap.utils.toArray('.reveal-right').forEach((el) => {
        gsap.fromTo(el,
          { x: 50, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      /* ---- scale reveals ---- */
      gsap.utils.toArray('.reveal-scale').forEach((el) => {
        gsap.fromTo(el,
          { scale: 0.92, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      /* ---- sticky order button entrance ---- */
      if (stickyOrderRef.current) {
        gsap.from(stickyOrderRef.current, {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: 2,
          ease: 'back.out(1.4)',
        });
      }

      /* ---- gold divider draw-in ---- */
      gsap.utils.toArray('.gold-divider').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          onEnter: () => el.classList.add('is-visible'),
          once: true,
        });
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="App" ref={appRef}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="scroll-progress" ref={progressRef} />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Menu />
        <Reviews />
        <PrivateEvents />
        <Reservations />
        <Location />
      </main>
      <Footer />
      <a
        href="https://www.doordash.com/store/saffron-indian-food-&-bar-bakersfield-41931145/"
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-order"
        ref={stickyOrderRef}
      >
        <svg className="sticky-order__icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        Order Now
      </a>
    </div>
  );
}

export default App;
