import React from 'react';
import './LogoBar.css';

const partners = [
  { name: 'Saudi Broadcasting Authority', logo: '/assets/logos/sba.png' },
  { name: 'Renad Al Majd Group', logo: '/assets/logos/rmg.png' },
  { name: 'Pillar Arabian Contracting and Trading', logo: '/assets/logos/pillar.png' },
];

const LogoBar = () => {
  const doubled = [...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners];

  return (
    <section className="logo-bar reveal">
      <p className="logo-bar-label">Organizations I've worked with</p>
      <div className="logo-bar-wrapper">
        <div className="logo-bar-track">
          {doubled.map((partner, i) => (
            <div key={i} className="logo-bar-card" aria-hidden={i >= partners.length}>
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className={`partner-logo ${partner.name.includes('Pillar') ? 'pillar-logo' : ''}`} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
