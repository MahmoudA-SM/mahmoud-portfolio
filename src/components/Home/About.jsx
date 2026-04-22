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
      <div className="about-grid">
        <div className="about-card about-card--summary">
          <h3>Summary</h3>
          <p>{profile.summary}</p>
          <button className="about-cta" onClick={scrollToContact}>Start a Project</button>
        </div>
        <div className="about-card">
          <h3>Links</h3>
          <div className="about-actions">
            {profile.links.email && (
              <a href={`mailto:${profile.links.email}`} aria-label="Email">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2 8 5 8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
            {profile.links.linkedin && (
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.82-2.05 3.75-2.05C20.4 8.6 22 10.38 22 13.7V21h-4v-6.4c0-1.52-.03-3.48-2.12-3.48-2.13 0-2.46 1.66-2.46 3.37V21h-4V9Z" fill="currentColor"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
