import { LoopVideo } from './shared';
import { stack } from './content';

/* The Informatica platform as a map of the products covered */
export function StackMap({ compact = false }) {
  return (
    <figure className={`stack${compact ? ' stack-compact' : ''}`} aria-label="Informatica products covered">
      <div className="stack-top" aria-hidden="true"><span>informatica</span><span>end to end</span></div>
      <div className="stack-groups">
        {stack.map((g) => (
          <div className="stack-group" key={g.group}>
            <p className="stack-label">{g.group}</p>
            <ul>
              {(compact ? g.items.slice(0, 3) : g.items).map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </figure>
  );
}

/* A phone showing a real client site that scrolls slowly on its own */
export function PhoneScroll({ src, alt, href }) {
  return (
    <a className="device device-phone phone-scroll" href={href} target="_blank" rel="noopener noreferrer"
      aria-label={`${alt}. Opens the live site in a new tab`}>
      <span className="device-notch" aria-hidden="true" />
      <span className="device-screen">
        <img src={src} alt="" width="780" height="3600" decoding="async" />
      </span>
    </a>
  );
}

/* A phone playing a short on mute, for the home page */
export function PhoneVideo({ src, poster, label }) {
  return (
    <div className="device device-phone">
      <span className="device-notch" aria-hidden="true" />
      <span className="device-screen">
        <LoopVideo src={src} poster={poster} label={label} />
      </span>
    </div>
  );
}
