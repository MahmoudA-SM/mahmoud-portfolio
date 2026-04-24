import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = ({ profile, onNavigate }) => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${showBackground ? 'navbar-solid' : ''}`}>
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => onNavigate && onNavigate('top')}>
          <span className="navbar-name">{profile?.name || 'Mahmoud Moustafa'}</span>
          <span className="navbar-role">Conversion-Focused Web &amp; Systems Developer</span>
        </button>
        <nav className="navbar-links">
          <button onClick={() => onNavigate && onNavigate('about')}>About</button>
          <button onClick={() => onNavigate && onNavigate('projects')}>Projects</button>
        </nav>
        <button className="navbar-cta" onClick={() => onNavigate && onNavigate('contact')}>
          START A PROJECT
        </button>
      </div>
    </header>
  );
};

export default Navbar;
