import React from 'react';
import './Hero.css';

const Hero = ({ profile }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero reveal" id="top">
      <div className="hero-inner">
        <p className="section-eyebrow">Portfolio 2026</p>
        <h1 className="hero-title">{profile?.name || 'Mahmoud Moustafa'}</h1>
        <p className="hero-role">I build websites and systems that turn visitors into clients and manual work into automation.</p>
        <p className="hero-summary">
          I design and build conversion-focused websites for service businesses and founders.
          Every site I make is built around one goal: getting visitors to take action, such as to book, call, or buy.
          Clean code, sharp design, real results.
        </p>
        <div className="hero-actions">
          <button className="hero-cta" onClick={scrollToContact}>
            Start a Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
