import { useEffect, useRef, useState } from 'react';
import {
  links, proof, dataServices, caseStudies, experience, credentials,
  websiteFeatures, websites, steps, faqs,
} from './content';
import {
  WhatsAppIcon, MailIcon, LinkedInIcon, SunIcon, MoonIcon, ArrowIcon,
  DownloadIcon, CheckIcon, MenuIcon, PlusIcon,
} from './icons';

const nav = [
  { id: 'data', label: 'Data work' },
  { id: 'websites', label: 'Websites' },
  { id: 'about', label: 'About' },
  { id: 'faq', label: 'FAQ' },
];

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

function WhatsAppButton({ children = 'Message me on WhatsApp', className = 'btn btn-primary' }) {
  return (
    <a className={className} href={links.whatsapp} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon /> <span>{children}</span>
    </a>
  );
}

function EmailButton({ className = 'btn btn-ghost' }) {
  return (
    <a className={className} href={`mailto:${links.email}`}>
      <MailIcon /> <span>Email me</span>
    </a>
  );
}

function Header() {
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
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">MM</span>
          <span className="brand-name">Mahmoud Moustafa</span>
        </a>
        <nav className="nav" id="site-nav" aria-label="Main" ref={navRef}>
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <WhatsAppButton className="btn btn-primary btn-sm header-wa">WhatsApp</WhatsAppButton>
          <button className="icon-btn menu-btn" type="button" ref={menuBtnRef} aria-expanded={open} aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            <MenuIcon open={open} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="dot" aria-hidden="true" /> Taking new projects</p>
          <h1>
            Data you can trust.<br />
            <span className="accent-text">Websites that bring in customers.</span>
          </h1>
          <p className="lead">
            I'm Mahmoud Moustafa. I build Informatica IDMC data loads, data quality checks and governance
            setups that prove every row is accounted for. And I build fast, phone-first websites for small
            businesses in Saudi Arabia and Egypt. Remote, in English and Arabic.
          </p>
          <div className="cta-row">
            <WhatsAppButton />
            <EmailButton />
          </div>
          <ul className="trust">
            <li><CheckIcon /> Informatica Cloud Data Quality certified</li>
            <li><CheckIcon /> NDMO data governance program, Riyadh</li>
            <li><CheckIcon /> Native Arabic, fluent English</li>
          </ul>
        </div>

        <figure className="receipt" aria-label="From a recent build: the audit record of one daily customer load">
          <p className="receipt-kicker">From a recent build</p>
          <div className="receipt-head">
            <span className="receipt-title">Daily customer load</span>
            <span className="badge badge-ok">Balanced</span>
          </div>
          <p className="receipt-sub">Informatica IDMC · scheduled 06:00 Riyadh time</p>
          <dl className="receipt-rows">
            <div><dt>Rows read</dt><dd>20,060</dd></div>
            <div><dt>Loaded to the customer table</dt><dd>19,589</dd></div>
            <div><dt>Rejected, each with a reason</dt><dd>471</dd></div>
            <div><dt>Refused by the database</dt><dd>0</dd></div>
          </dl>
          <div className="receipt-bar" aria-hidden="true">
            <span style={{ width: `${(19589 / 20060) * 100}%` }} />
            <span />
          </div>
          <figcaption>19,589 + 471 = 20,060. Nothing lost, and the numbers matched what was predicted before the run.</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="proof" aria-label="In numbers">
      <div className="container proof-grid">
        {proof.map((p) => (
          <div className="proof-item reveal" key={p.label}>
            <span className="proof-value">{p.value}</span>
            <span className="proof-label">{p.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="section-head reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-lead">{children}</p>}
    </div>
  );
}

function DataWork() {
  return (
    <section className="section" id="data">
      <div className="container">
        <SectionHead eyebrow="For data teams and Informatica partners" title="Informatica IDMC data work">
          Integration, data quality and governance in Informatica Intelligent Data Management Cloud.
          Every delivery comes with row counts that add up, not just a green status.
        </SectionHead>

        <div className="services">
          {dataServices.map((s, i) => (
            <article className="service reveal" key={s.title}>
              <span className="service-num">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>

        <div className="sub-head-wrap reveal">
          <h3 className="sub-head">Recent builds</h3>
          <p>Built and run end to end in my own Informatica IDMC environment, at real file sizes.</p>
        </div>
        <div className="cases">
          {caseStudies.map((c) => (
            <article className="case reveal" key={c.title}>
              <p className="case-tag">{c.tag}</p>
              <h4>{c.title}</h4>
              <div className="case-body">
                <p><strong>The problem.</strong> {c.problem}</p>
                <p><strong>What I built.</strong> {c.built}</p>
              </div>
              <dl className={`case-result cols-${c.result.length}`}>
                {c.result.map((r) => (
                  <div key={r.l}><dd>{r.n}</dd><dt>{r.l}</dt></div>
                ))}
              </dl>
              <p className="case-lesson">{c.lesson}</p>
            </article>
          ))}
        </div>

        <div className="callout reveal">
          <div>
            <h3>Need a hand on an Informatica project?</h3>
            <p>Send me the work package. I'll reply with how I'd deliver it, a fixed price and a date.</p>
          </div>
          <div className="cta-row">
            <WhatsAppButton>WhatsApp</WhatsAppButton>
            <a className="btn btn-ghost" href={links.capability} download={links.capabilityName}>
              <DownloadIcon /> <span>Capability statement (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Websites() {
  return (
    <section className="section section-alt" id="websites">
      <div className="container">
        <SectionHead eyebrow="For small businesses" title="Websites that turn visits into WhatsApp messages">
          A clear, fast website that works on the phone, shows up on Google and sends customers straight
          to your WhatsApp. <span lang="ar" dir="rtl" className="ar">مواقع بالعربي والإنجليزي</span>
        </SectionHead>

        <div className="sites">
          {websites.map((w) => (
            <article className="site reveal" key={w.name}>
              <a className="site-shot" href={w.url} target="_blank" rel="noopener noreferrer"
                aria-label={`Open ${w.urlLabel} in a new tab`}>
                <div className="browser">
                  <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{w.urlLabel}</span></div>
                  <img src={w.desktop} alt={`${w.name} website on a laptop screen`} width="1600" height="1000" loading="lazy" decoding="async" />
                </div>
                {w.mobile && (
                  <div className="phone">
                    <img src={w.mobile} alt={`${w.name} website on a phone`} width="780" height="1560" loading="lazy" decoding="async" />
                  </div>
                )}
              </a>
              <div className="site-info">
                <p className="case-tag">{w.kind}</p>
                <h3>{w.name}</h3>
                <p>{w.text}</p>
                <a className="text-link" href={w.url} target="_blank" rel="noopener noreferrer">
                  Visit {w.urlLabel} <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>

        <h3 className="sub-head reveal">What every site includes</h3>
        <div className="features">
          {websiteFeatures.map((f) => (
            <div className="feature reveal" key={f.title}>
              <span className="feature-icon"><CheckIcon /></span>
              <div>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="callout reveal">
          <div>
            <h3>Want a website for your business?</h3>
            <p>Tell me what you do and send a link to your Instagram or current page. I'll reply with a plan and a fixed price.</p>
          </div>
          <div className="cta-row">
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <SectionHead eyebrow="How it works" title="Clear steps, fixed prices, no surprises" />
        <ol className="steps">
          {steps.map((s, i) => (
            <li className="step reveal" key={s.title}>
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container about-grid">
        <div className="about-intro reveal">
          <img className="avatar" src="/mahmoud.jpg" alt="Mahmoud Moustafa" width="349" height="349" loading="lazy" decoding="async" />
          <p className="eyebrow">About</p>
          <h2>Hi, I'm Mahmoud.</h2>
          <p>
            I studied computer science in Canada, worked as a software developer in Saudi Arabia, then moved
            into data management on a national data governance program in Riyadh. Today I deliver Informatica
            IDMC work for data teams and build websites for small businesses.
          </p>
          <p>
            Both come down to the same habit: say up front what the result should be, then show that it is.
          </p>
          <div className="cta-row">
            <a className="btn btn-ghost" href={links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="about-side">
          <ol className="timeline">
            {experience.map((e) => (
              <li className="reveal" key={e.role + e.when}>
                <span className="tl-when">{e.when}</span>
                <h3>{e.role}</h3>
                <p className="tl-where">{e.where}</p>
                <p>{e.text}</p>
              </li>
            ))}
          </ol>
          <div className="creds reveal">
            <h3>Certifications and training</h3>
            <ul>
              {credentials.map((c) => <li key={c}><CheckIcon /> {c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="container narrow">
        <SectionHead eyebrow="FAQ" title="Common questions" />
        <div className="faq">
          {faqs.map((f) => (
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

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-card reveal">
          <p className="eyebrow">Contact</p>
          <h2>Tell me what you need.</h2>
          <p className="section-lead">
            A data work package or a website for your business. Message me in English or Arabic and you'll
            get a clear plan and a fixed price.
          </p>
          <div className="contact-options">
            <a className="contact-option contact-wa" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <span><strong>WhatsApp</strong><small dir="ltr">{links.whatsappLabel}</small></span>
            </a>
            <a className="contact-option" href={`mailto:${links.email}`}>
              <MailIcon />
              <span><strong>Email</strong><small>{links.email}</small></span>
            </a>
            <a className="contact-option" href={links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              <span><strong>LinkedIn</strong><small>Mahmoud Moustafa</small></span>
            </a>
          </div>
        </div>
      </div>
    </section>
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

export default function App() {
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

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Proof />
        <DataWork />
        <Websites />
        <Process />
        <About />
        <FAQ />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Mahmoud Moustafa</p>
          <p className="footer-links">
            <a href={`mailto:${links.email}`}>{links.email}</a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </div>
      </footer>
      <FloatingWhatsApp />
    </>
  );
}
