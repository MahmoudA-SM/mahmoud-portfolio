import React from 'react';
import Hero from '../Home/Hero';
import Row from '../Home/Row';
import Modal from '../UI/Modal';
import './ExperiencePage.css';

const ExperiencePage = ({ items, selectedItem, onItemClick, onCloseModal }) => {
  const featured = items && items.length ? items[0] : null;
  return (
    <div className="experience-page">
      <Hero item={featured} onMoreInfo={() => onItemClick && featured && onItemClick(featured)} />
      <Row title="Work Experience" items={items} onItemClick={onItemClick} />
      <Modal item={selectedItem} onClose={onCloseModal} />
      <div style={{ height: '50px' }}></div>
    </div>
  );
};

export default ExperiencePage;
