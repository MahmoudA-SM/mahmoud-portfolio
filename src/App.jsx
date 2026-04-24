import React, { useEffect, useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Home/Hero';
import LogoBar from './components/Home/LogoBar';
import Row from './components/Home/Row';
import Modal from './components/UI/Modal';
import About from './components/Home/About';
import WhatIBuild from './components/Home/WhatIBuild';
import FAQ from './components/Home/FAQ';
import Contact from './components/Home/Contact';
import Footer from './components/Home/Footer';
import { projects, profile } from './data/content';
import './App.css';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    const root = document.documentElement;
    // Hardcoded theme values
    root.setAttribute('data-theme', 'light');
    root.style.setProperty('--accent', '#22d3ee');
    root.style.setProperty('--radius', '22px');
    root.style.setProperty('--radius-inner', '16px');
  }, []);

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
        <Hero profile={profile} />
        <LogoBar />
        <About profile={profile} />
        <WhatIBuild />
        <Row
          sectionId="projects"
          eyebrow="Selected work"
          title="Projects"
          items={projects}
          onItemClick={handleItemClick}
        />
        <div className="projects-cta reveal">
          <p>Like what you see? Let's build something.</p>
          <button onClick={() => handleNavigate('contact')}>START A PROJECT</button>
        </div>
        <FAQ />
        <Contact profile={profile} />
      </main>
      <footer className="page-footer">
        <Footer />
      </footer>
      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

export default App;
