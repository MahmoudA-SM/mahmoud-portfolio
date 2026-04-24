import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { profile } from '../../data/content';
import { useMagnetic } from '../../hooks/useMagnetic';
import './Contact.css';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.82-2.05 3.75-2.05C20.4 8.6 22 10.38 22 13.7V21h-4v-6.4c0-1.52-.03-3.48-2.12-3.48-2.13 0-2.46 1.66-2.46 3.37V21h-4V9Z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const Contact = () => {
  const [state, handleSubmit] = useForm('xbdqqapp');
  const magneticSubmit = useMagnetic(0.2, 80);

  return (
    <section className="contact section reveal" id="contact">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Get in touch</p>
          <h2>Ready to start a project?</h2>
        </div>
        <p className="section-subtitle">Tell me what you're building. I'll tell you how I can help.</p>
      </div>

      <div className="contact-card">
        {state.succeeded ? (
          <div className="contact-sent">
            <p className="contact-sent-title">Message sent.</p>
            <p className="contact-sent-sub">I'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
                <ValidationError field="name" errors={state.errors} className="contact-error" />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
                <ValidationError field="email" errors={state.errors} className="contact-error" />
              </div>
            </div>

            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="contact-type">Project type</label>
                <select id="contact-type" name="project_type" defaultValue="">
                  <option value="" disabled>Select a type…</option>
                  <option value="Conversion website">Conversion website</option>
                  <option value="Internal tool">Internal tool</option>
                  <option value="Automation">Automation</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-budget">Budget range</label>
                <select id="contact-budget" name="budget" defaultValue="">
                  <option value="" disabled>Select a range…</option>
                  <option value="Under $1k">Under $1k</option>
                  <option value="$1k–$3k">$1k–$3k</option>
                  <option value="$3k–$7k">$3k–$7k</option>
                  <option value="$7k+">$7k+</option>
                </select>
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Project description</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project: what you need, your timeline, anything relevant."
                required
              />
              <ValidationError field="message" errors={state.errors} className="contact-error" />
            </div>
            <ValidationError errors={state.errors} className="contact-error" />
            <div className="contact-footer">
              <button 
                ref={magneticSubmit}
                type="submit" 
                className="contact-submit" 
                disabled={state.submitting}
              >
                {state.submitting ? 'Sending…' : 'Send Message'}
              </button>
              <div className="contact-trust-badges">
                <span className="contact-trust">I respond within 24 hours.</span>
                <span className="contact-guarantee">✓ 100% Satisfaction Guarantee</span>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="contact-alts">
        <span className="contact-alts-label">or reach me directly</span>
        <div className="contact-alts-links">
          {profile.links.linkedin && (
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-alt-link"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          )}
          {profile.links.whatsapp && (
            <a
              href={profile.links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="contact-alt-link contact-alt-link--whatsapp"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
