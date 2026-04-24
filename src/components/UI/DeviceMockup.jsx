import React from 'react';
import './DeviceMockup.css';

const DeviceMockup = ({ desktop, mobile, title }) => {
  return (
    <div className="mockup-container">
      {/* MacBook Mockup */}
      <div className="macbook-frame">
        <div className="macbook-screen">
          <img src={desktop} alt={`${title} Desktop view`} className="screen-content" />
        </div>
        <div className="macbook-base"></div>
      </div>

      {/* iPhone Mockup */}
      <div className="iphone-frame">
        <div className="iphone-screen">
          <img src={mobile} alt={`${title} Mobile view`} className="screen-content" />
        </div>
        <div className="iphone-island"></div>
      </div>
      
      {/* Decorative Glow */}
      <div className="mockup-glow"></div>
    </div>
  );
};

export default DeviceMockup;
