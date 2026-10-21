import { Page, SectionHead, ContactBand, FAQ, WhatsAppButton } from '../shared';
import { LoadRecord } from '../visuals';
import { dataTools, dataServices, caseStudies, partnerModel, dataFaqs, experience, links } from '../content';
import { DownloadIcon, CheckIcon } from '../icons';

export default function Data() {
  const renad = experience[0];
  return (
    <Page current="data">
      <section className="hero hero-service">
        <div className="container hero-split">
          <div className="hero-copy">
            <p className="kicker reveal"><span className="kicker-num">01</span>Informatica IDMC data work</p>
            <h1 className="display display-md">Every row, accounted for.</h1>
            <p className="lead reveal">
              Data integration, data quality and governance in Informatica Intelligent Data Management Cloud,
              for data teams and Informatica partners. Every delivery comes with row counts that add up, not
              just a green status.
            </p>
            <div className="cta-row reveal">
              <WhatsAppButton>Send me the work package</WhatsAppButton>
              <a className="btn btn-ghost" href={links.capability} download={links.capabilityName}>
                <DownloadIcon /> <span>Capability statement (PDF)</span>
              </a>
            </div>
          </div>
          <div className="hero-visual reveal"><LoadRecord /></div>
        </div>
        <div className="container">
          <ul className="chips reveal" aria-label="Tools and standards">
            {dataTools.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="01" label="Services" title="What I deliver" />
          <ol className="rows">
            {dataServices.map((s, i) => (
              <li className="row reveal" key={s.title}>
                <span className="row-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead index="02" label="Recent builds" title="Four builds, four sets of numbers.">
            Built and run end to end in my own Informatica IDMC environment, up to 20,000+ rows per run.
          </SectionHead>
          <div className="cases">
            {caseStudies.map((c) => (
              <article className="case reveal" key={c.title}>
                <div className="case-top">
                  <span>{c.tag}</span>
                  <code>{c.asset}</code>
                </div>
                <h3>{c.title}</h3>
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
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <p className="kicker"><span className="kicker-num">03</span>Experience</p>
            <h2>{renad.role}, {renad.where}</h2>
            <p className="tl-when">{renad.when}</p>
            <p className="section-lead">{renad.text}</p>
          </div>
          <div className="panel reveal">
            <h3>Working with Informatica partners</h3>
            <ul className="check-list">
              {partnerModel.map((p) => <li key={p}><CheckIcon /> {p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <FAQ items={dataFaqs} index="04" />

      <ContactBand
        title="Need a hand on an Informatica project?"
        text="Send me the work package. I'll reply with how I'd deliver it, a fixed price and a date."
      />
    </Page>
  );
}
