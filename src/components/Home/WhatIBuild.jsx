import React from 'react';
import './WhatIBuild.css';
import { useMagnetic } from '../../hooks/useMagnetic';

const services = [
  {
    id: 'conversion',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3h18v4H3zM3 10h12v4H3zM3 17h7v4H3z" />
      </svg>
    ),
    title: 'Conversion Websites',
    label: 'Most Popular',
    description: 'High-performance landing pages and brand sites designed to convert visitors into customers through strategic UX and persuasive copywriting.',
    stat: '↑ 40% Avg. Conversion Boost'
  },
  {
    id: 'systems',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 17.5h7M17.5 14v7" />
      </svg>
    ),
    title: 'Internal Systems',
    description: 'Custom dashboards and admin panels that eliminate manual spreadsheets and centralize your operations.',
  },
  {
    id: 'automation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="M7 12h4l2-5.3M11 12l2 5.3" />
      </svg>
    ),
    title: 'Integrations',
    description: 'Seamlessly connecting your tech stack (Stripe, HubSpot, Slack) to automate repetitive business tasks.',
  },
];

const WhatIBuild = () => {
  const magneticButton = useMagnetic(0.2, 80);
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="what-i-build section reveal">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Expertise</p>
          <h2>Bridging Design & Function</h2>
        </div>
      </div>
      <div className="wib-grid">
        {services.map((s) => (
          <div key={s.id} className={`wib-card wib-card-${s.id}`}>
            <div className="wib-card-content">
              {s.label && <span className="wib-badge">{s.label}</span>}
              <div className="wib-icon">{s.icon}</div>
              <h3 className="wib-title">{s.title}</h3>
              <p className="wib-desc">{s.description}</p>
              {s.stat && (
                <div className="wib-stat">
                  <span className="wib-stat-value">{s.stat}</span>
                </div>
              )}
            </div>
            <div className="wib-card-bg"></div>
          </div>
        ))}
      </div>
      <div className="wib-cta-wrap">
        <button 
          ref={magneticButton}
          className="wib-cta" 
          onClick={scrollToContact}
        >
          START A PROJECT
        </button>
      </div>
    </section>
  );
};

export default WhatIBuild;
