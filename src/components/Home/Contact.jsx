import React, { useState } from 'react';
import './Contact.css';

const Contact = ({ profile }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const email = profile?.links?.email || 'mahmoudmoustafa.ca@gmail.com';
    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

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
        {sent ? (
          <div className="contact-sent">
            <p className="contact-sent-title">Your message is on its way.</p>
            <p className="contact-sent-sub">Check your mail client to send it. I'll get back to you within 24 hours.</p>
            <button className="contact-submit" onClick={() => setSent(false)}>Send another</button>
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
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="contact-error">{errors.name}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="contact-error">{errors.email}</span>}
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">Project description</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project — what you need, your timeline, anything relevant."
                value={form.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <span className="contact-error">{errors.message}</span>}
            </div>
            <div className="contact-footer">
              <button type="submit" className="contact-submit">Send Message</button>
              <span className="contact-trust">I respond within 24 hours.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
