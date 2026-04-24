import React from 'react';
import './Process.css';

const steps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: "We start with a deep dive into your business goals. We don't just talk features; we talk outcomes and ROI.",
  },
  {
    number: '02',
    title: 'Design & Development',
    description: 'I build your solution using a conversion-first approach. Fast, responsive, and built to turn visitors into customers.',
  },
  {
    number: '03',
    title: 'Launch & Support',
    description: "Your site goes live. But I don't just disappear; I'm here to ensure everything runs smoothly as you scale.",
  },
];

const Process = () => {
  return (
    <section className="process section reveal" id="process">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">The Workflow</p>
          <h2>How We Work</h2>
        </div>
        <p className="section-subtitle">A streamlined process designed to get you results, fast.</p>
      </div>
      <div className="process-grid">
        {steps.map((step) => (
          <div key={step.number} className="process-card">
            <span className="process-number">{step.number}</span>
            <h3 className="process-title">{step.title}</h3>
            <p className="process-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
