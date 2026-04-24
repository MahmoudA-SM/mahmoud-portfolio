import React from 'react';
import './ProjectImpact.css';

const impacts = [
  {
    value: '10',
    label: 'Weekly Time Saved',
    description: 'Reduced manual data entry for operations teams through automation.',
    suffix: 'HRS / WEEK'
  },
  {
    value: '99.9%',
    label: 'System Uptime',
    description: 'High-availability architecture for critical logistics and ERP platforms.',
  },
  {
    value: '40%',
    label: 'Conversion Lift',
    description: 'Average increase in user engagement for optimized landing pages.',
  },
  {
    value: '2x',
    label: 'Data Speed',
    description: 'Performance optimization for internal dashboards and reporting.',
  }
];

const ProjectImpact = () => {
  return (
    <section className="project-impact reveal">
      <div className="container">
        <div className="impact-header">
          <p className="eyebrow">Measurable Results</p>
          <h2 className="section-title">The Impact of My Work</h2>
        </div>
        <div className="impact-grid">
          {impacts.map((item, index) => (
            <div key={index} className="impact-card">
              <div className="impact-value">
                {item.value}
                {item.suffix && <span className="impact-suffix">{item.suffix}</span>}
              </div>
              <h3 className="impact-label">{item.label}</h3>
              <p className="impact-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectImpact;
