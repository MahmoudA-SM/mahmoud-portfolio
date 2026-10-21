import { LoopVideo } from './shared';
import { useCountUp, fmt } from './hooks';
import { CheckIcon } from './icons';

const READ = 20060;
const LOADED = 19589;
const REJECTED = 471;
const TARGETS = [READ, LOADED, REJECTED];

/* The audit record of the daily IDMC load (evidence #31 and #33), counting up when seen */
export function LoadRecord({ compact = false }) {
  const [ref, [read, loaded, rejected]] = useCountUp(TARGETS);
  const done = read === READ;
  return (
    <figure ref={ref} className={`record${compact ? ' record-compact' : ''}`}
      aria-label="From a recent build: 20,060 rows read, 19,589 loaded, 471 rejected with a reason, 0 refused, balanced">
      <div className="record-top" aria-hidden="true">
        <span>load_audit</span>
        <span>tf_CRM_Customers_Daily</span>
      </div>
      {!compact && <p className="record-kicker" aria-hidden="true">From a recent build · 06:00 Riyadh time</p>}
      <dl className="record-rows" aria-hidden="true">
        <div><dt>rows_read</dt><dd>{fmt(read)}</dd></div>
        <div><dt>rows_loaded</dt><dd>{fmt(loaded)}</dd></div>
        <div><dt>rows_rejected</dt><dd>{fmt(rejected)}</dd></div>
        <div><dt>rows_refused</dt><dd>0</dd></div>
      </dl>
      <div className="record-bar" aria-hidden="true">
        <span style={{ width: `${(loaded / READ) * 100}%` }} />
        <span style={{ width: `${(rejected / READ) * 100}%` }} />
      </div>
      <div className={`record-balanced${done ? ' is-done' : ''}`} aria-hidden="true">
        <span>balanced</span>
        <strong><CheckIcon /> {done ? 'YES' : '...'}</strong>
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
        <img src={src} alt="" width="780" height="6400" decoding="async" />
      </span>
    </a>
  );
}

/* A phone playing a short on mute, for the home page and the video hero */
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
