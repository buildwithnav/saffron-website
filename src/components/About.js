import React from 'react';
import './About.css';

const pillars = [
  {
    icon: '\uD83C\uDF3F',
    title: 'Fresh Ingredients',
    text: 'We source the finest spices and produce daily, ensuring every dish bursts with vibrant, authentic flavor.',
  },
  {
    icon: '\uD83D\uDCDC',
    title: 'Time-Honored Recipes',
    text: 'Four decades of mastery distilled into every dish — recipes perfected over a lifetime and rooted in tradition.',
  },
  {
    icon: '\uD83E\uDEF6',
    title: 'Warm Hospitality',
    text: 'Forty years of welcoming guests like family — Inder and Sukhwinder set the tone for attentive, heartfelt service.',
  },
];

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__header">
          <span className="eyebrow">Our Story</span>
          <h2>
            Four Decades of <em>Passion,</em> One Dream
          </h2>
        </div>

        <div className="about__two-col">
          <div className="about__images">
            <img
              src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d4a?w=600&q=80"
              alt="Indian dishes beautifully plated"
              className="about__img"
            />
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80"
              alt="Chef preparing food in a professional kitchen"
              className="about__img"
            />
          </div>

          <div className="about__text">
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
            <div key={index} className="pillar">
              <span className="pillar__icon">{pillar.icon}</span>
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
