import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    q: "Are you available right now?",
    a: "Yes, I'm currently taking on new projects. If you have a specific deadline, mention it in the form and I'll confirm whether I can meet it.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most websites ship in 2–4 weeks. Internal tools and automations depend on scope but usually take 3–6 weeks. I'll give you a realistic timeline after our first conversation.",
  },
  {
    q: "Do you work with clients outside Egypt and Saudi Arabia?",
    a: "Yes, I work 100% remotely and take on projects from anywhere. Most communication happens over WhatsApp, email, or a short call.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A brief description of what you need, your timeline, and any existing branding (logo, colors). That's it: I'll handle the rest.",
  },
  {
    q: "What does a project cost?",
    a: "Most projects start at $800 depending on scope. Conversion websites typically fall in the $1k–$3k range. Internal tools and automations vary more. Use the budget field in the contact form and I'll tailor my response accordingly.",
  },
];

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq section reveal">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">FAQ</p>
          <h2>Common questions</h2>
        </div>
        <p className="section-subtitle">Everything you'd want to know before reaching out.</p>
      </div>
      <div className="faq-list">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <span className="faq-chevron"><ChevronIcon /></span>
              </button>
              <div className="faq-answer" aria-hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
