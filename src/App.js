import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import PrivateEvents from './components/PrivateEvents';
import Reservations from './components/Reservations';
import Location from './components/Location';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);
  const progressRef = useRef(null);

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
      >
        Order Now
      </a>
    </div>
  );
}

export default App;
