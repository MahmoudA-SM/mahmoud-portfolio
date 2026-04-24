import React from 'react';
import './Row.css';
import DeviceMockup from '../UI/DeviceMockup';

const Row = ({ title, eyebrow, items, onItemClick, sectionId }) => {
  return (
    <section className="projects-section reveal" id={sectionId}>
      <div className="section-header">
        <div>
          {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
        </div>
        <p className="section-subtitle">A collection of conversion-focused digital experiences.</p>
      </div>

      <div className="project-rows">
        {items.map((item, index) => (
          <article 
            key={item.id} 
            className={`project-row ${index % 2 === 1 ? 'project-row-reversed' : ''}`}
          >
            <div className="project-content">
              <div className="project-tags">
                {item.tags?.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
              <h3 className="project-title">{item.title}</h3>
              <p className="project-desc">{item.description}</p>
              
              <div className="project-actions">
                <a 
                  href={item.link} 
                  className="project-main-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Site 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <button 
                  className="project-secondary-link"
                  onClick={() => onItemClick && onItemClick(item)}
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="project-visual">
              <DeviceMockup 
                desktop={item.desktopMockup} 
                mobile={item.mobileMockup} 
                title={item.title}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Row;
