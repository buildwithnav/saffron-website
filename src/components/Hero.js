import React, { useState, useEffect, useCallback } from 'react';
import './Hero.css';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
    alt: 'Elegant restaurant interior with warm lighting',
  },
  {
    url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=80',
    alt: 'Traditional Indian curry dishes on a table',
  },
  {
    url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1920&q=80',
    alt: 'Spices and ingredients used in Indian cooking',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="home" className="hero">
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
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <h1 className="hero__title">SAFFRON</h1>
        <p className="hero__tagline">Indian Food & Bar — Bakersfield, CA</p>
        <div className="hero__cta">
          <a href="#inquiries" className="btn btn-primary">Reserve a Table</a>
          <a href="#menu" className="btn btn-ghost">Explore Menu</a>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
