import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    url: `${process.env.PUBLIC_URL}/hero-food.jpg`,
    alt: 'Butter chicken with naan and rice at Saffron',
  },
  {
    url: `${process.env.PUBLIC_URL}/hero-dining.jpg`,
    alt: 'Elegant dining room with banquette seating at Saffron',
  },
  {
    url: `${process.env.PUBLIC_URL}/hero-bar.jpg`,
    alt: 'Moody bar counter with craft spirits at Saffron',
  },
];

const TITLE_TEXT = 'SAFFRON';
const PARTICLE_COUNT = 18;

/**
 * Generate a deterministic set of particle style configs so they remain
 * stable across re-renders without triggering lint warnings.
 */
function buildParticleStyles(count) {
  const styles = [];
  for (let i = 0; i < count; i++) {
    const left = ((i * 37 + 11) % 100);
    const size = 2 + (i % 4);
    const delay = (i * 0.7) % 8;
    const duration = 6 + (i % 7);
    const startY = 20 + ((i * 19) % 60);
    styles.push({ left, size, delay, duration, startY });
  }
  return styles;
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const overlayRef = useRef(null);

  const particleStyles = useMemo(() => buildParticleStyles(PARTICLE_COUNT), []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  /* ── GSAP entrance timeline + scroll parallax ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = titleRef.current?.querySelectorAll('.hero__letter');
      const ctaButtons = ctaRef.current?.querySelectorAll('.btn');

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      /* Title — letter stagger */
      if (letters?.length) {
        tl.from(letters, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.03,
        });
      }

      /* Tagline — fade up with blur dissolve */
      tl.from(
        taglineRef.current,
        {
          y: 24,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.9,
        },
        '-=0.5',
      );

      /* CTA buttons — stagger from below with scale */
      if (ctaButtons?.length) {
        tl.from(
          ctaButtons,
          {
            y: 30,
            opacity: 0,
            scale: 0.92,
            duration: 0.7,
            stagger: 0.12,
          },
          '-=0.4',
        );
      }

      /* Scroll indicator — last to appear */
      tl.from(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.6,
        },
        '-=0.2',
      );

      /* ── Scroll parallax ── */
      gsap.to(contentRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero__slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
            style={{ backgroundImage: `url(${slide.url})` }}
            aria-hidden={index !== currentSlide}
            role="img"
            aria-label={slide.alt}
          />
        ))}
        <div className="hero__overlay" ref={overlayRef} />
      </div>

      {/* Floating gold particles */}
      <div className="hero__particles" aria-hidden="true">
        {particleStyles.map((p, i) => (
          <span
            key={i}
            className="hero__particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              bottom: `${p.startY}%`,
            }}
          />
        ))}
      </div>

      <div className="hero__content" ref={contentRef}>
        <h1 className="hero__title" aria-label="Saffron Indian Food & Bar" ref={titleRef}>
          {TITLE_TEXT.split('').map((char, i) => (
            <span key={i} className="hero__letter">
              {char}
            </span>
          ))}
        </h1>
        <p className="hero__tagline" ref={taglineRef}>
          Indian Food &amp; Bar<br />Bakersfield, CA
        </p>
        <div className="hero__cta" ref={ctaRef}>
          <a href="#inquiries" className="btn btn-primary">Reserve a Table</a>
          <a href="#menu" className="btn btn-ghost">Explore Menu</a>
        </div>
      </div>

      <div className="hero__scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
