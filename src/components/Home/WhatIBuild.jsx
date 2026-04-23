import React from 'react';
import './WhatIBuild.css';

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3h18v4H3zM3 10h12v4H3zM3 17h7v4H3z" />
      </svg>
    ),
    title: 'Conversion Websites',
    description: 'Landing pages and sites built to book, sell, and convert.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 17.5h7M17.5 14v7" />
      </svg>
    ),
    title: 'Internal Systems & Tools',
    description: 'Custom dashboards, admin panels, and internal tools that replace manual work.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="M7 12h4l2-5.3M11 12l2 5.3" />
      </svg>
    ),
    title: 'Integrations & Automation',
    description: 'Connecting your tools and workflows so your business runs without babysitting.',
  },
];

const WhatIBuild = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="what-i-build section reveal">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Services</p>
          <h2>What I Build</h2>
        </div>
      </div>
      <div className="wib-grid">
        {services.map((s) => (
          <div key={s.title} className="wib-card">
            <div className="wib-icon">{s.icon}</div>
            <h3 className="wib-title">{s.title}</h3>
            <p className="wib-desc">{s.description}</p>
          </div>
        ))}
      </div>
      <div className="wib-cta-wrap">
        <button className="wib-cta" onClick={scrollToContact}>
          START A PROJECT
        </button>
      </div>
    </section>
  );
};

export default WhatIBuild;
