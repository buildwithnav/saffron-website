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
    title: 'Traditional Recipes',
    text: 'Passed down through generations, our recipes honor centuries-old techniques from across the Indian subcontinent.',
  },
  {
    icon: '\uD83E\uDEF6',
    title: 'Warm Hospitality',
    text: 'From the moment you step in, our team treats every guest like family with attentive, heartfelt service.',
  },
];

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__header">
          <span className="eyebrow">Our Story</span>
          <h2>
            Crafting <em>Authentic</em> Flavors Since 2018
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
              Saffron was born from a simple belief: that the rich, layered flavors of
              Indian cuisine deserve to be experienced in their most authentic form.
              Founded in 2018 by Chef Arjun Mehta, our kitchen is a tribute to the
              culinary traditions of India — from the smoky tandoors of Punjab to the
              coconut-laced curries of Kerala.
            </p>
            <p>
              Every dish at Saffron begins with whole spices, freshly ground and
              tempered to release their full depth. We slow-cook our curries, hand-roll
              our breads, and craft each plate with the same care you would find in an
              Indian home kitchen. Our menu evolves with the seasons, but our
              commitment to tradition never wavers.
            </p>
            <p>
              Step inside and you will find more than a restaurant — you will find a
              gathering place where stories are shared over fragrant biryanis, where
              celebrations are marked with sizzling platters, and where every meal is
              an invitation to savor something truly special.
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
