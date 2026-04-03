import React, { useState } from 'react';
import './ThemeCustomizer.css';

const presets = [
  { name: 'Cyan', color: '#22d3ee' },
  { name: 'Amber', color: '#f59e0b' },
  { name: 'Rose', color: '#f43f5e' },
  { name: 'Emerald', color: '#10b981' },
  { name: 'Violet', color: '#8b5cf6' },
  { name: 'Red', color: '#ef4444' },
];

const ThemeCustomizer = ({ theme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  const handleModeChange = (mode) => {
    onThemeChange({ ...theme, mode });
  };

  const handleColorChange = (accent) => {
    onThemeChange({ ...theme, accent });
  };

  const handleRadiusChange = (radius) => {
    onThemeChange({ ...theme, radius: `${radius}px` });
  };

  return (
    <div className={`theme-customizer ${isOpen ? 'is-open' : ''}`}>
      <button 
        className="customizer-toggle" 
        onClick={togglePanel}
        aria-label="Customize theme"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

      <div className="customizer-panel">
        <div className="panel-header">
          <h3>Customize Theme</h3>
          <button className="panel-close" onClick={togglePanel}>&times;</button>
        </div>

        <div className="panel-section">
          <label>Mode</label>
          <div className="mode-options">
            {['light', 'dark', 'deep'].map((m) => (
              <button
                key={m}
                className={`mode-btn ${theme.mode === m ? 'active' : ''}`}
                onClick={() => handleModeChange(m)}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-section">
          <label>Accent Color</label>
          <div className="color-presets">
            {presets.map((p) => (
              <button
                key={p.name}
                className={`color-btn ${theme.accent === p.color ? 'active' : ''}`}
                style={{ backgroundColor: p.color }}
                onClick={() => handleColorChange(p.color)}
                title={p.name}
              />
            ))}
            <div className="custom-color-wrapper">
              <input 
                type="color" 
                value={theme.accent}
                onChange={(e) => handleColorChange(e.target.value)}
                className="custom-color-input"
              />
            </div>
          </div>
        </div>

        <div className="panel-section">
          <div className="label-with-value">
            <label>Border Radius</label>
            <span>{theme.radius}</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            value={parseInt(theme.radius)}
            onChange={(e) => handleRadiusChange(e.target.value)}
            className="radius-range"
          />
        </div>

        <div className="panel-footer">
          <p>Settings saved automatically</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
