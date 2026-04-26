import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    image: `${process.env.PUBLIC_URL}/hero-food.jpg`,
    alt: 'Fresh butter chicken with naan',
    title: 'Fresh Ingredients',
    text: 'We source the finest spices and produce daily, ensuring every dish bursts with vibrant, authentic flavor.',
  },
  {
    image: `${process.env.PUBLIC_URL}/pillar-desserts.jpg`,
    alt: 'Traditional Indian desserts',
    title: 'Time-Honored Recipes',
    text: 'Four decades of mastery distilled into every dish — recipes perfected over a lifetime and rooted in tradition.',
  },
  {
    image: `${process.env.PUBLIC_URL}/hero-dining.jpg`,
    alt: 'Warm dining room at Saffron',
    title: 'Warm Hospitality',
    text: 'Forty years of welcoming guests like family — Inder and Sukhwinder set the tone for attentive, heartfelt service.',
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const textRef = useRef(null);
  const pillarsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Image clip-path reveal: left to right */
      imagesRef.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      /* Text line-by-line reveal */
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll('p');
        paragraphs.forEach((p) => {
          gsap.fromTo(
            p,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: p,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      /* Pillar cards stagger reveal */
      const validPillars = pillarsRef.current.filter(Boolean);
      if (validPillars.length > 0) {
        gsap.fromTo(
          validPillars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: validPillars[0],
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
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__container">
        <div className="about__header reveal">
          <span className="eyebrow">Our Story</span>
          <h2>
            Four Decades of <em>Passion,</em> One Dream
          </h2>
          <div className="gold-divider"><span className="dot"></span></div>
        </div>

        <div className="about__two-col">
          <div className="about__images reveal-left">
            <img
              ref={(el) => { imagesRef.current[0] = el; }}
              src={`${process.env.PUBLIC_URL}/about-food.jpg`}
              alt="Saffron dishes being served at the table"
              className="about__img"
              loading="lazy"
            />
            <img
              ref={(el) => { imagesRef.current[1] = el; }}
              src={`${process.env.PUBLIC_URL}/about-spices.jpg`}
              alt="Colorful Indian spices at the market"
              className="about__img"
              loading="lazy"
            />
          </div>

          <div className="about__text reveal-right" ref={textRef}>
            <p>
              Saffron is the culmination of a lifelong dream. Inder Gill and his wife
              Sukhwinder Gill have spent over forty years in the restaurant industry,
              perfecting their craft and building a deep understanding of what makes
              a dining experience truly memorable. With Saffron, they bring all of that
              expertise together — a restaurant that is as much a reflection of who
              they are as the food they serve.
            </p>
            <p>
              The vision is rooted in contrast: modern, stylish interiors paired with
              deeply traditional flavors. Walk in and you will find a space that feels
              contemporary and inviting — clean lines, warm lighting, a thoughtful
              atmosphere designed for everything from intimate date nights to lively
              celebrations. But the kitchen tells a different story — one of
              whole spices ground fresh, curries slow-cooked for hours, breads
              hand-rolled and pulled from the tandoor, and recipes that carry the
              weight of generations.
            </p>
            <p>
              Saffron is not just a restaurant — it is Inder and Sukhwinder's gift to
              Bakersfield. A place where the warmth of Indian hospitality meets the
              energy of a modern dining room, where every dish is an invitation to
              taste four decades of passion on a single plate.
            </p>
          </div>
        </div>

        <div className="about__pillars">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`pillar reveal d${index + 1}`}
              ref={(el) => { pillarsRef.current[index] = el; }}
            >
              <img className="pillar__img" src={pillar.image} alt={pillar.alt} loading="lazy" />
              <h3 className="pillar__title">{pillar.title}</h3>
              <p className="pillar__text">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
