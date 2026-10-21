import { Page, SectionHead, ContactBand, FAQ, WhatsAppButton } from '../shared';
import { StackMap } from '../visuals';
import { dataServices, standards, governance, partnerModel, credentials, dataFaqs, links } from '../content';
import { DownloadIcon, CheckIcon } from '../icons';

export default function Data() {
  return (
    <Page current="data">
      <section className="hero hero-service">
        <div className="container hero-split">
          <div className="hero-copy">
            <p className="kicker reveal"><span className="kicker-num">→</span>Informatica consulting</p>
            <h1 className="display display-md">Informatica, end to end.</h1>
            <p className="lead reveal">
              PowerCenter, IDMC, data quality, governance and migrations, for data teams and Informatica
              partners. Delivered remotely, in English or Arabic, and reconciled to the last row.
            </p>
            <div className="cta-row reveal">
              <WhatsAppButton>Discuss your project</WhatsAppButton>
              <a className="btn btn-ghost" href={links.capability} download={links.capabilityName}>
                <DownloadIcon /> <span>Capability statement</span>
              </a>
            </div>
          </div>
          <div className="hero-visual reveal"><StackMap /></div>
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

      <section className="section section-ink scheme-ink">
        <div className="container">
          <SectionHead index="02" label="Standards" title="How every delivery is held to account." />
          <div className="standards">
            {standards.map((s, i) => (
              <div className="standard reveal" key={s.title}>
                <span className="row-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <p className="kicker"><span className="kicker-num">03</span>Track record</p>
            <h2>{governance.title}</h2>
            <p className="section-lead">{governance.text}</p>
            <ul className="check-list">
              {credentials.map((c) => <li key={c}><CheckIcon /> {c}</li>)}
            </ul>
          </div>
          <div className="panel reveal">
            <h3>Working with Informatica partners</h3>
            <ul className="check-list">
              {partnerModel.map((p) => <li key={p}><CheckIcon /> {p}</li>)}
            </ul>
            <WhatsAppButton>Send me the work package</WhatsAppButton>
          </div>
        </div>
      </section>

      <FAQ items={dataFaqs} index="04" />

      <ContactBand
        title="Have an Informatica project to deliver?"
        text="Send me the scope. You'll get how I'd deliver it, a fixed price and a date."
      />
    </Page>
  );
}
