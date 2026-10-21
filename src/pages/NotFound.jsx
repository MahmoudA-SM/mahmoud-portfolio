import { Page, WhatsAppButton } from '../shared';
import { pages } from '../content';
import { ArrowIcon } from '../icons';

export default function NotFound() {
  return (
    <Page current="none">
      <section className="hero">
        <div className="container hero-copy">
          <p className="kicker"><span className="kicker-num">404</span>Page not found</p>
          <h1 className="display display-md">That page isn't here.</h1>
          <p className="lead">Try one of these instead, or message me directly.</p>
          <ul className="extras-list">
            <li><a className="extra" href="/"><strong>Home</strong><span>Mahmoud Moustafa</span><ArrowIcon /></a></li>
            {pages.map((p) => (
              <li key={p.key}><a className="extra" href={p.href}><strong>{p.long}</strong><span>{p.href}</span><ArrowIcon /></a></li>
            ))}
          </ul>
          <div className="cta-row"><WhatsAppButton /></div>
        </div>
      </section>
    </Page>
  );
}
