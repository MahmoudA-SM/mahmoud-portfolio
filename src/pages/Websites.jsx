import { Page, SectionHead, ContactBand, FAQ, WhatsAppButton } from '../shared';
import { PhoneScroll } from '../visuals';
import { hafi, testimonial, websiteFeatures, websiteExtras, websiteFaqs, steps } from '../content';
import { ArrowIcon, CheckIcon } from '../icons';

export default function Websites() {
  return (
    <Page current="websites">
      <section className="hero hero-service">
        <div className="container hero-split">
          <div className="hero-copy">
            <p className="kicker reveal"><span className="kicker-num">→</span>Websites for small businesses</p>
            <h1 className="display display-md">Visits in. WhatsApp messages out.</h1>
            <p className="lead reveal">
              A clear, fast website that works on the phone, shows up on Google and sends customers straight
              to your WhatsApp. For businesses in Saudi Arabia and Egypt.
            </p>
            <div className="cta-row reveal">
              <WhatsAppButton>Ask for a plan and a price</WhatsAppButton>
              <a className="btn btn-ghost" href="#work"><span>See the work</span></a>
            </div>
          </div>
          <div className="hero-visual reveal">
            <PhoneScroll src={hafi.tall} alt="ahmedalhafi.com on a phone" href={hafi.url} />
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <SectionHead index="01" label="Live work" title={hafi.name} />
          <article className="showcase reveal">
            <a className="browser" href={hafi.url} target="_blank" rel="noopener noreferrer"
              aria-label={`Open ${hafi.urlLabel} in a new tab`}>
              <span className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{hafi.urlLabel}</span></span>
              <img src={hafi.desktop} alt={`${hafi.name} website on a laptop screen`} width="1600" height="1000" loading="lazy" decoding="async" />
            </a>
            <div className="showcase-info">
              <p className="door-for">{hafi.kind}</p>
              <ul className="check-list">
                {hafi.points.map((p) => <li key={p}><CheckIcon /> {p}</li>)}
              </ul>
              <a className="door-link" href={hafi.url} target="_blank" rel="noopener noreferrer">
                Visit {hafi.urlLabel} <ArrowIcon />
              </a>
            </div>
          </article>
          <blockquote className="quote reveal">
            <p>"{testimonial.quote}"</p>
            <footer><strong>{testimonial.name}</strong><span>{testimonial.role} · {testimonial.note}</span></footer>
          </blockquote>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead index="02" label="Included" title="What every site comes with" />
          <div className="grid-3">
            {websiteFeatures.map((f, i) => (
              <div className="tile reveal" key={f.title}>
                <span className="row-num">0{i + 1}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="extras reveal">
            <p className="kicker"><span className="kicker-num">+</span>Add after launch</p>
            <div className="extras-list">
              {websiteExtras.map((x) => (
                x.href
                  ? <a className="extra" href={x.href} key={x.title}><strong>{x.title}</strong><span>{x.text}</span><ArrowIcon /></a>
                  : <div className="extra" key={x.title}><strong>{x.title}</strong><span>{x.text}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="03" label="How it works" title="Fixed price. You see it before it goes live." />
          <ol className="steps steps-light">
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

      <FAQ items={websiteFaqs} index="04" />

      <ContactBand
        title="Want a website for your business?"
        text="Tell me what you do and send a link to your Instagram or current page. I'll reply with a plan and a fixed price."
      />
    </Page>
  );
}
