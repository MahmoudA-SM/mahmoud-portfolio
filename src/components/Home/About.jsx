import React from 'react';
import './About.css';
import { profile as defaultProfile } from '../../data/content';

const About = ({ profile = defaultProfile }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="about section reveal" id="about">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Profile</p>
          <h2>About</h2>
        </div>
        <p className="section-subtitle">{profile.availability}</p>
      </div>

      {profile.stats?.length > 0 && (
        <div className="about-stats">
          {profile.stats.map((s) => (
            <div key={s.label} className="about-stat">
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="about-grid">
        <div className="about-card about-card--summary">
          <h3>Summary</h3>
          <p>{profile.summary}</p>
          {profile.why && (
            <p className="about-why">{profile.why}</p>
          )}
          {profile.differentiator && (
            <p className="about-differentiator">{profile.differentiator}</p>
          )}
          <button className="about-cta" onClick={scrollToContact}>Start a Project</button>
        </div>
      </div>
    </section>
  );
};

export default About;
