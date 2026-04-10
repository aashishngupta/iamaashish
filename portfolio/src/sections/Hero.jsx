import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GREETING = "Hi, I'm Aashish Gupta. Welcome to my corner of the internet 👋";

function useTypewriter(text, speed = 38, startDelay = 500) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.9, ease: 'easeOut', delay },
});

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const { displayed, done } = useTypewriter(GREETING, 36, 400);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-background-secondary)',
        transition: 'var(--transition-colors)',
      }}
    >
      {/* ── Subtle background — no gradient orbs ── */}

      <div className="container" style={{ paddingTop: 110, paddingBottom: 110, position: 'relative', width: '100%' }}>
        <motion.div style={{ y: textY }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 420px',
              gap: 72,
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            {/* ── LEFT: Text content ── */}
            <div>
              {/* Greeting pill — "Hi, I'm Aashish Gupta" */}
              <motion.div {...fadeUp(0.0)} style={{ marginBottom: 16 }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '6px 14px 6px 6px',
                  borderRadius: 'var(--border-radius-pill)',
                  background: 'rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(124,58,237,0.18)',
                  boxShadow: '0 2px 16px rgba(124,58,237,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  transition: 'var(--transition-colors)',
                }}>
                  {/* Avatar */}
                  <span style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
                  }}>AG</span>
                  {displayed}
                  <span style={{
                    display: 'inline-block',
                    width: 2,
                    height: '1em',
                    background: 'var(--color-accent)',
                    marginLeft: 2,
                    borderRadius: 1,
                    verticalAlign: 'middle',
                    animation: done ? 'cursorBlink 1s step-end infinite' : 'none',
                    opacity: done ? undefined : 1,
                  }} />
                </span>
              </motion.div>

              {/* Credentials badges */}
              <motion.div {...fadeUp(0.08)} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {[
                  'Digital Transformation',
                  'AI Product Leader',
                  'xFounder',
                  'Angel Investor',
                ].map((item, i) => {
                  const label = typeof item === 'string' ? item : item.label;
                  const isXFounder = typeof item === 'object' && item.small;
                  return (
                    <span key={i} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 12px',
                      borderRadius: 'var(--border-radius-pill)',
                      background: 'var(--color-background-info)',
                      border: '0.5px solid rgba(124,58,237,0.22)',
                      boxShadow: '0 1px 6px rgba(124,58,237,0.08)',
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent)',
                      transition: 'var(--transition-colors)',
                    }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }} />
                      {isXFounder ? (
                        <><span style={{ fontSize: 8, textTransform: 'lowercase', letterSpacing: 0 }}>x</span>Founder</>
                      ) : label}
                    </span>
                  );
                })}
              </motion.div>

              {/* H1 */}
              <motion.h1
                {...fadeUp(0.15)}
                className="hero-h1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  letterSpacing: '-0.038em',
                  lineHeight: 1.10,
                  color: 'var(--color-text-primary)',
                  marginBottom: 28,
                  transition: 'var(--transition-colors)',
                }}
              >
                I transform businesses by building{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #6366f1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  AI products,
                </span>
                <br />
                scaling them to millions
                <br />
                and building teams that outlast me.
              </motion.h1>


              {/* Subtext */}
              <motion.p
                {...fadeUp(0.28)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 17,
                  fontWeight: 400,
                  color: 'var(--color-text-secondary)',
                  
                  lineHeight: 1.65,
                  marginBottom: 40,
                  transition: 'var(--transition-colors)',
                }}
              >
                Happy to work with teams that are serious about building and solving real problems.
              </motion.p>

              {/* CTAs */}
              <motion.div
                {...fadeUp(0.32)}
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
              >
                <button
                  className="btn btn-accent"
                  style={{ boxShadow: '0 4px 20px rgba(124,58,237,0.28), 0 1px 4px rgba(0,0,0,0.08)' }}
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See my work →
                </button>
                <a className="btn btn-outline" href="mailto:92.aashish@gmail.com"
                  style={{ boxShadow: '0 2px 10px rgba(80,60,130,0.08)' }}>
                  Get in touch
                </a>
              </motion.div>

              {/* Stat strip */}
              <motion.div
                {...fadeUp(0.42)}
                className="hero-stat-strip"
                style={{
                  display: 'flex',
                  gap: 36,
                  marginTop: 64,
                  paddingTop: 32,
                  borderTop: '0.5px solid var(--color-border-tertiary)',
                  flexWrap: 'wrap',
                  transition: 'var(--transition-colors)',
                }}
              >
                {[
                  { num: '~ 13', label: 'Years of Exp' },
                  { num: '10+', label: 'Years in AI' },
                  { num: '8+', label: 'Years in B2B'},
                  { num: '6+', label: 'Years in B2G'},
                  { num: '5+', label: 'Years in B2C'},
                  { num: '2+', label: 'Years in D2C' },
                  { num: '200M+', label: 'Users Impacted' },
                  { num: '2×', label: 'Founder' },
                  { num: '$20M+', label: 'Revenues Driven' },
                  
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 + i * 0.08 }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 26,
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      letterSpacing: '-0.025em',
                      lineHeight: 1,
                      marginBottom: 5,
                      transition: 'var(--transition-colors)',
                    }}>
                      {s.num}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: 'var(--color-text-tertiary)',
                      fontWeight: 400,
                      lineHeight: 1.4,
                      transition: 'var(--transition-colors)',
                    }}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Photo ── */}
            <motion.div
              {...fadeIn(0.3)}
              style={{ position: 'relative', marginTop: -48 }}
              className="hero-photo-col"
            >
              <div style={{
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
                aspectRatio: '3 / 4',
              }}>
                <img
                  src="/aashish.jpg"
                  alt="Aashish Kumar Gupta"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '38%',
                  background: 'linear-gradient(to top, rgba(13,13,20,0.38) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Award sticky notes — top right, vertical stack, straight */}
              <div style={{ position: 'absolute', top: 16, right: 3, display: 'flex', flexDirection: 'column', gap: 7, zIndex: 10 }} className="hero-sticky-notes">
                {[
                  { icon: '🏆', title: 'Forbes 30U30 Asia', sub: 'Enterprise Technology' },
                  { icon: '⭐', title: 'Best Use of AI in Automation', sub: 'AICRA & MeitY' },
                  { icon: '🥇', title: 'Global Mobility Winner', sub: 'Niti Aayog' },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    {...fadeIn(0.45 + i * 0.1)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '7px 12px 7px 10px',
                      borderRadius: 10,
                      background: '#ffffff',
                      border: '0.5px solid rgba(0,0,0,0.10)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{b.icon}</span>
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#1d1d1f', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{b.title}</span>
                      <span style={{ fontSize: 9, fontWeight: 500, color: '#6e6e73', lineHeight: 1.3, marginTop: 1 }}>{b.sub}</span>
                    </span>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.2, 0.65, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)', margin: '0 auto' }}
        />
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        /* Hero h1 — fixed sizes per breakpoint, no viewport scaling */
        .hero-h1 { font-size: 44px; }
        @media (max-width: 1280px) { .hero-h1 { font-size: 40px; } }
        @media (max-width: 1024px) { .hero-h1 { font-size: 36px; } }
        @media (max-width: 860px) { .hero-h1 { font-size: 32px; } }
        @media (max-width: 480px) { .hero-h1 { font-size: 28px; } }

        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { max-width: 360px; margin: 0 auto; }
          .hero-photo-col { margin-top: 0 !important; }
        }
        @media (max-width: 768px) {
          .hero-stat-strip { gap: 20px !important; margin-top: 40px !important; }
          .hero-sticky-notes { right: 4px !important; top: 10px !important; }
          .hero-sticky-notes > div { font-size: 10px !important; }
        }
        @media (max-width: 480px) {
          .hero-stat-strip { gap: 16px !important; }
        }
        [data-theme="dark"] .hero-greeting-pill {
          background: rgba(30,21,53,0.72) !important;
        }
      `}</style>
    </section>
  );
}
