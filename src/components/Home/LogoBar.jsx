import React from 'react';
import './LogoBar.css';

const orgs = [
  'Saudi Broadcasting Authority',
  'Renad Al Majd Group',
  'Pillar Arabian Contracting and Trading',
  'Construction Projects Contracting Company',
];

const LogoBar = () => {
  const doubled = [...orgs, ...orgs];

  return (
    <section className="logo-bar reveal">
      <p className="logo-bar-label">Organizations I've worked with</p>
      <div className="logo-bar-wrapper">
        <div className="logo-bar-track">
          {doubled.map((org, i) => (
            <div key={i} className="logo-bar-card" aria-hidden={i >= orgs.length}>
              {org}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
