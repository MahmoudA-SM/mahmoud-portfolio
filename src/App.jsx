import React, { useEffect, useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Home/Hero';
import Row from './components/Home/Row';
import Modal from './components/UI/Modal';
import ThemeCustomizer from './components/UI/ThemeCustomizer';
import { projects, experience, education, profile } from './data/content';
import './App.css';
import About from './components/Home/About';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('mahmoud_portfolio_theme');
    return saved ? JSON.parse(saved) : {
      mode: 'light',
      accent: '#22d3ee',
      radius: '22px'
    };
  });

  const featured = projects[0];
  const stats = {
    projects: projects.length,
    roles: experience.length,
    locations: profile.locations.length,
    languages: profile.languages.length
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.mode);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--radius', theme.radius);
    
    const radiusVal = parseInt(theme.radius);
    root.style.setProperty('--radius-inner', `${Math.max(0, radiusVal - 6)}px`);
    
    localStorage.setItem('mahmoud_portfolio_theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px 40% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
      document.documentElement.style.setProperty('--scroll-progress', progress.toString());
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleNavigate = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app">
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar profile={profile} onNavigate={handleNavigate} />
      <main className="page">
        <Hero
          profile={profile}
          featured={featured}
          stats={stats}
          onMoreInfo={() => handleItemClick(featured)}
        />
        <About profile={profile} />
        <Row
          sectionId="projects"
          eyebrow="Selected work"
          title="Projects"
          items={projects}
          onItemClick={handleItemClick}
        />
        <Row
          sectionId="experience"
          eyebrow="Career"
          title="Work Experience"
          items={experience}
          onItemClick={handleItemClick}
        />
        <Row
          sectionId="education"
          eyebrow="Education"
          title="Education"
          items={education}
          onItemClick={handleItemClick}
        />
      </main>
      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      <ThemeCustomizer theme={theme} onThemeChange={setTheme} />
    </div>
  );
}

export default App;
