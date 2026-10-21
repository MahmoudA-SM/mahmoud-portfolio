import { useEffect, useRef, useState } from 'react';
import { links, pages } from './content';
import {
  WhatsAppIcon, MailIcon, LinkedInIcon, SunIcon, MoonIcon, MenuIcon, PlusIcon, ArrowIcon,
} from './icons';

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    // Follow the system setting until the visitor picks one themselves
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (!document.documentElement.dataset.theme) setTheme(currentTheme()); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* private mode: still works for this visit */ }
    setTheme(next);
  };

  return (
    <button className="icon-btn" type="button" onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export function WhatsAppButton({ children = 'Message me on WhatsApp', className = 'btn btn-primary' }) {
  return (
    <a className={className} href={links.whatsapp} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon /> <span>{children}</span>
    </a>
  );
}

export function EmailButton({ className = 'btn btn-ghost' }) {
  return (
    <a className={className} href={`mailto:${links.email}`}>
      <MailIcon /> <span>Email me</span>
    </a>
  );
}

function Header({ current }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Keyboard users land on the first link; Escape returns them to the menu button
    if (window.matchMedia('(max-width: 879px)').matches) navRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      menuBtnRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="Mahmoud Moustafa, home">
          <span className="brand-mark" aria-hidden="true">MM</span>
          <span className="brand-name">Mahmoud Moustafa</span>
        </a>
        <nav className="nav" id="site-nav" aria-label="Main" ref={navRef}>
          {pages.map((p) => (
            <a key={p.key} href={p.href} data-acc={p.key}
              className={current === p.key ? 'is-current' : undefined}
              aria-current={current === p.key ? 'page' : undefined}>
              <span className="nav-dot" aria-hidden="true" />{p.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <WhatsAppButton className="btn btn-primary btn-sm header-wa">WhatsApp</WhatsAppButton>
          <button className="icon-btn menu-btn" type="button" ref={menuBtnRef} aria-expanded={open}
            aria-controls="site-nav" aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}>
            <MenuIcon open={open} />
          </button>
        </div>
      </div>
    </header>
  );
}

export function SectionHead({ index, label, title, children }) {
  return (
    <div className="section-head reveal">
      <p className="kicker"><span className="kicker-num">{index}</span>{label}</p>
      <h2>{title}</h2>
      {children && <p className="section-lead">{children}</p>}
    </div>
  );
}

export function FAQ({ items, index = '', title = 'Common questions' }) {
  return (
    <section className="section" id="faq">
      <div className="container faq-grid">
        <SectionHead index={index} label="Questions" title={title} />
        <div className="faq">
          {items.map((f) => (
            <details className="reveal" key={f.q}>
              <summary><span>{f.q}</span><PlusIcon /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactBand({ title = 'Tell me what you need.', text, primary = 'Message me on WhatsApp' }) {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <p className="kicker reveal"><span className="kicker-num">→</span>Contact</p>
        <h2 className="contact-title reveal">{title}</h2>
        {text && <p className="contact-text reveal">{text}</p>}
        <div className="contact-options reveal">
          <a className="contact-option contact-wa" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span><strong>{primary}</strong><small dir="ltr">{links.whatsappLabel}</small></span>
            <ArrowIcon />
          </a>
          <a className="contact-option" href={`mailto:${links.email}`}>
            <MailIcon />
            <span><strong>Email</strong><small>{links.email}</small></span>
            <ArrowIcon />
          </a>
          <a className="contact-option" href={links.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
            <span><strong>LinkedIn</strong><small>Mahmoud Moustafa</small></span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ current }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">Mahmoud Moustafa</p>
          <p className="footer-sub">Data, websites and video. Remote, in English and Arabic.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <a href="/" aria-current={current === 'home' ? 'page' : undefined}>Home</a>
          {pages.map((p) => (
            <a key={p.key} href={p.href} aria-current={current === p.key ? 'page' : undefined}>{p.long}</a>
          ))}
          <a href={`mailto:${links.email}`}>{links.email}</a>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} Mahmoud Moustafa</p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contact');
      const nearContact = contact && contact.getBoundingClientRect().top < window.innerHeight;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearContact);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a className={`fab${show ? ' is-visible' : ''}`} href={links.whatsapp} target="_blank" rel="noopener noreferrer"
      aria-label="Message me on WhatsApp" tabIndex={show ? 0 : -1} aria-hidden={!show}>
      <WhatsAppIcon />
    </a>
  );
}

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    // Anything already on screen or above it (deep link, reload mid-page) shows straight away
    items.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in'); });
    document.documentElement.classList.add('can-reveal');
    const showAll = () => items.forEach((el) => el.classList.add('is-in'));
    window.addEventListener('beforeprint', showAll);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => { if (!el.classList.contains('is-in')) io.observe(el); });
    return () => { io.disconnect(); window.removeEventListener('beforeprint', showAll); };
  }, []);

  useEffect(() => {
    // Sections render after the browser tried to jump to #hash, so jump again once they exist
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);
}

export function Page({ current, children }) {
  useReveal();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header current={current} />
      <main id="main">{children}</main>
      <Footer current={current} />
      <FloatingWhatsApp />
    </>
  );
}

/* Plays a muted looping clip only while it is on screen, and never for reduced-motion visitors */
export function LoopVideo({ src, poster, className, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="none"
      aria-label={label} />
  );
}
