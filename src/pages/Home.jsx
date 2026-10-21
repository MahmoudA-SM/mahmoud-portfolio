import { Page, SectionHead, ContactBand, WhatsAppButton, EmailButton } from '../shared';
import { LoadRecord, PhoneScroll, PhoneVideo } from '../visuals';
import { doors, ticker, habit, steps, experience, credentials, hafi, links } from '../content';
import { ArrowIcon, CheckIcon, LinkedInIcon } from '../icons';

function DoorVisual({ k }) {
  if (k === 'data') return <LoadRecord compact />;
  if (k === 'websites') return <PhoneScroll src={hafi.tall} alt="ahmedalhafi.com on a phone" href={hafi.url} />;
  return <PhoneVideo src="/video/loop-hobby.mp4" poster="/video/loop-hobby.jpg" label="Clip from a sample short edited at Retaincut" />;
}

export default function Home() {
  return (
    <Page current="home">
      <section className="hero hero-home">
        <div className="container">
          <p className="meta-line reveal">
            <span>Mahmoud Moustafa</span><span>Data / Websites / Video</span><span>Riyadh and remote</span><span>EN / AR</span>
          </p>
          <h1 className="display">
            <a className="display-line" data-acc="data" href="/data/">Data you can trust.<ArrowIcon /></a>
            <a className="display-line" data-acc="websites" href="/websites/">Websites that sell.<ArrowIcon /></a>
            <a className="display-line" data-acc="video" href="/video/">Videos people finish.<ArrowIcon /></a>
          </h1>
          <div className="hero-foot">
            <p className="lead reveal">
              I'm Mahmoud. I build Informatica data loads that prove every row is accounted for, websites that
              turn visits into WhatsApp messages, and video edits that hold attention to the last second.
              Three services, one habit: agree what good looks like, then show the proof.
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
              I studied computer science in Canada, worked as a software developer in Saudi Arabia, then moved
              into data management on a national data governance program in Riyadh. Alongside the data work I
              build websites for small businesses and edit video at Retaincut, my editing studio.
            </p>
            <p>Native Arabic, fluent English. I work remotely, on Saudi and Egypt time.</p>
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
              <ul>{credentials.map((c) => <li key={c}><CheckIcon /> {c}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <ContactBand text="Data work, a website or video editing. Message me in English or Arabic and you'll get a clear plan and a fixed price." />
    </Page>
  );
}
