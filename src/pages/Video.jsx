import { useRef, useState } from 'react';
import { Page, SectionHead, ContactBand, FAQ, WhatsAppButton, EmailButton, LoopVideo } from '../shared';
import { shorts, longform, credits, videoServices, videoSpecs, videoFaqs } from '../content';
import { PlayIcon } from '../icons';

/* Poster first, real player only after a tap: nothing heavy loads until someone asks for it */
function Player({ item, vertical }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);
  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };
  return (
    <div className={`player${vertical ? ' player-v' : ' player-h'}`}>
      {playing ? (
        <video ref={ref} src={item.src} poster={item.poster} controls playsInline preload="auto" />
      ) : (
        <button type="button" className="player-poster" onClick={start} aria-label={`Play: ${item.title} (${item.length})`}>
          <img src={item.poster} alt="" loading="lazy" decoding="async" width={vertical ? 540 : 1280} height={vertical ? 960 : 720} />
          <span className="player-btn" aria-hidden="true"><PlayIcon /></span>
          <span className="player-len" aria-hidden="true">{item.length}</span>
        </button>
      )}
    </div>
  );
}

export default function Video() {
  return (
    <Page current="video">
      <section className="hero hero-video scheme-ink">
        <div className="container hero-split">
          <div className="hero-copy">
            <p className="kicker reveal"><span className="kicker-num">03</span>Video editing · Retaincut</p>
            <h1 className="display display-md">Videos people watch to the end.</h1>
            <p className="lead reveal">
              Retaincut is my video editing studio. I turn talking-head footage into tight long-form edits and
              shorts that hold attention: clean cuts, word-timed captions, designed headlines, licensed music
              and mastered sound.
            </p>
            <div className="cta-row reveal">
              <WhatsAppButton>Get a free 60-second test edit</WhatsAppButton>
              <EmailButton />
            </div>
          </div>
          <div className="hero-visual reel reveal" aria-label="Three sample shorts">
            {shorts.map((s, i) => (
              <div className={`device device-phone reel-${i}`} key={s.id}>
                <span className="device-notch" aria-hidden="true" />
                <span className="device-screen">
                  {i === 1
                    ? <LoopVideo src={s.src} poster={s.poster} label={`${s.title}, sample short, muted preview`} />
                    : <img src={s.poster} alt="" width="540" height="960" decoding="async" />}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="samples">
        <div className="container">
          <SectionHead index="01" label="Sample edits" title="Press play.">
            Sample edits made at Retaincut from Creative Commons footage. Send your own footage and the next
            ones are yours.
          </SectionHead>
          <div className="shorts">
            {shorts.map((s) => (
              <article className="short reveal" key={s.id}>
                <Player item={s} vertical />
                <h3>{s.title}</h3>
                <p>{s.notes}</p>
              </article>
            ))}
          </div>
          <article className="long reveal">
            <Player item={longform} />
            <div>
              <p className="door-for">Long-form · {longform.length}</p>
              <h3>{longform.title}</h3>
              <p>{longform.notes}</p>
            </div>
          </article>
          <p className="credits reveal">
            Footage: <a href={credits.footage.href} target="_blank" rel="noopener noreferrer">{credits.footage.text}</a>.{' '}
            {credits.music.text} (shorts).
          </p>
        </div>
      </section>

      <section className="section section-ink scheme-ink">
        <div className="container">
          <SectionHead index="02" label="What I edit" title="Long videos, shorts, and reels for brands." />
          <div className="grid-3">
            {videoServices.map((s, i) => (
              <div className="tile tile-ink reveal" key={s.title}>
                <span className="row-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <dl className="specs reveal">
            {videoSpecs.map((s) => (
              <div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container offer reveal">
          <p className="kicker"><span className="kicker-num">03</span>Try it first</p>
          <h2>A free 60-second test edit, on your footage.</h2>
          <p className="section-lead">
            Send a link to one of your videos. I edit 60 seconds in the style you want. If you like it, we
            agree a fixed price per video. If not, you owe nothing.
          </p>
          <div className="cta-row">
            <WhatsAppButton>Send me your footage</WhatsAppButton>
          </div>
        </div>
      </section>

      <FAQ items={videoFaqs} index="04" />

      <ContactBand
        title="Have footage sitting on your drive?"
        text="Creators, podcasters, agencies (white-label) and businesses. Tell me what you film and how often."
        primary="Get a free test edit"
      />
    </Page>
  );
}
