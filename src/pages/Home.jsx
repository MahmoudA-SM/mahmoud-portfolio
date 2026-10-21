import { Page, SectionHead, ContactBand, WhatsAppButton, EmailButton } from '../shared';
import { StackMap, PhoneScroll, PhoneVideo } from '../visuals';
import { doors, ticker, habit, steps, experience, credentials, hafi, links, testimonial } from '../content';
import { ArrowIcon, CheckIcon, LinkedInIcon } from '../icons';

function DoorVisual({ k }) {
  if (k === 'data') return <StackMap compact />;
  if (k === 'websites') return <PhoneScroll src={hafi.tall} alt="ahmedalhafi.com on a phone" href={hafi.url} />;
  return <PhoneVideo src="/video/loop-hobby.mp4" poster="/video/loop-hobby.jpg" label="Clip from a sample short edited at Retaincut, CC BY footage, credits on the video page" />;
}

export default function Home() {
  return (
    <Page current="home">
      <section className="hero hero-home">
        <div className="container">
          <div className="hero-top">
            <div>
              <p className="meta-line reveal">
                <span>Informatica consulting</span><span>Websites</span><span>Video editing</span><span>Riyadh and remote</span>
              </p>
              <h1 className="display">
                <a className="display-line" data-acc="data" href="/data/">Data you can trust.<ArrowIcon /></a>
                <a className="display-line" data-acc="websites" href="/websites/">Websites that sell.<ArrowIcon /></a>
                <a className="display-line" data-acc="video" href="/video/">Videos people finish.<ArrowIcon /></a>
              </h1>
            </div>
            <figure className="portrait reveal">
              <img src="/mahmoud.jpg" alt="Mahmoud Moustafa" width="349" height="349" fetchPriority="high" />
              <figcaption><strong>Mahmoud Moustafa</strong><span>Informatica consultant · Web · Video</span></figcaption>
            </figure>
          </div>
          <div className="hero-foot">
            <p className="lead reveal">
              I'm Mahmoud, an Informatica consultant across PowerCenter, IDMC, data quality and governance.
              I also build websites that turn visits into WhatsApp messages, and edit videos that hold
              attention to the last second. One standard for all three: agree what good looks like, then prove it.
            </p>
            <div className="cta-row reveal">
              <WhatsAppButton />
              <EmailButton />
            </div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="Highlights">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1}>
              {ticker.map((t) => <li key={t}>{t}</li>)}
            </ul>
          ))}
        </div>
      </div>

      <section className="section" id="services">
        <div className="container">
          <SectionHead index="01" label="What I do" title="Pick what you need." />
          <div className="doors">
            {doors.map((d) => (
              <article className="door reveal" data-acc={d.key} key={d.key}>
                <div className="door-visual"><DoorVisual k={d.key} /></div>
                <div className="door-body">
                  <p className="door-num">{d.num}</p>
                  <h3>{d.title}</h3>
                  <p className="door-for">{d.for}</p>
                  <p>{d.text}</p>
                  <a className="door-link" href={`/${d.key}/`}>{d.cta} <ArrowIcon /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-quote">
        <div className="container">
          <blockquote className="quote quote-lg reveal">
            <p>"{testimonial.quote}"</p>
            <footer><strong>{testimonial.name}</strong><span>{testimonial.role} · website client · {testimonial.note}</span></footer>
          </blockquote>
        </div>
      </section>

      <section className="section section-ink scheme-ink">
        <div className="container">
          <SectionHead index="02" label="One habit" title="Agree what good looks like. Then prove it." />
          <div className="habit">
            {habit.map((h) => (
              <div className="habit-item reveal" data-acc={h.key} key={h.key}>
                <p className="habit-label">{h.label}</p>
                <p>{h.text}</p>
              </div>
            ))}
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li className="step reveal" key={s.title}>
                <span className="step-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container about-grid">
          <div className="about-intro reveal">
            <img className="avatar" src="/mahmoud.jpg" alt="Mahmoud Moustafa" width="349" height="349" loading="lazy" decoding="async" />
            <p className="kicker"><span className="kicker-num">03</span>About</p>
            <h2>Hi, I'm Mahmoud.</h2>
            <p>
              Informatica consultant with a computer science degree from Canada and a software engineering
              background in Saudi Arabia. I've worked on national data governance for Saudi government
              entities under NDMO standards, and I'm Informatica-certified in data quality. Alongside the data
              work I build websites for businesses and edit video at Retaincut, my editing studio.
            </p>
            <p>Native Arabic, fluent English. Remote, across time zones.</p>
            <div className="cta-row">
              <a className="btn btn-ghost" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon /> <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="about-side">
            <ol className="timeline">
              {experience.map((e) => (
                <li className="reveal" key={e.role}>
                  <h3>{e.role}</h3>
                  <p className="tl-where">{e.where}</p>
                  <p>{e.text}</p>
                </li>
              ))}
            </ol>
            <div className="creds reveal">
              <h3>Certifications and training</h3>
              <ul>{credentials.map((c) => <li key={c}><CheckIcon /> {c}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <ContactBand text="Data work, a website or video editing. Message me in English or Arabic and you'll get a clear plan and a fixed price." />
    </Page>
  );
}
