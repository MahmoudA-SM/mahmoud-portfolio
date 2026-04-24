import React from 'react';
import './Reasons.css';

const reasons = [
  {
    title: 'Conversion Focused',
    description: "I don't just build 'pretty' sites. I build tools designed to make people click, call, and buy.",
    icon: '🎯',
  },
  {
    title: 'Business-First Logic',
    description: 'I prioritize your bottom line. We automate manual work to save you hours every single week.',
    icon: '⚡',
  },
  {
    title: 'Reliable Delivery',
    description: 'Direct communication, clear updates, and zero surprises. I hit deadlines every single time.',
    icon: '🤝',
  },
];

const Reasons = () => {
  return (
    <section className="reasons section reveal">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Why Mahmoud?</p>
          <h2>Design that delivers.</h2>
        </div>
        <p className="section-subtitle">Most agencies sell you code. I sell you outcomes.</p>
      </div>
      <div className="reasons-grid">
        {reasons.map((r, i) => (
          <div key={i} className="reasons-item">
            <div className="reasons-icon">{r.icon}</div>
            <div className="reasons-content">
              <h3>{r.title}</h3>
              <p>{r.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reasons;
