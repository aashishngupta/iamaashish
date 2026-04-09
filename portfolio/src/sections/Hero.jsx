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
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
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
      {/* ── Apple-style mesh gradient background ── */}
      <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', y: bgY }}>
        {/* Primary violet orb */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: 820,
          height: 820,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.11) 0%, rgba(124,58,237,0.04) 45%, transparent 70%)',
          filter: 'blur(2px)',
        }} />
        {/* Secondary blue-violet orb */}
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '-5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.09) 0%, transparent 65%)',
        }} />
        {/* Warm rose accent — bottom left */}
        <div style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.07) 0%, transparent 65%)',
        }} />
        {/* Subtle grid / noise overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }} />
        {/* Top gradient fade */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 180,
          background: 'linear-gradient(to bottom, var(--color-background-secondary), transparent)',
        }} />
      </motion.div>

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
                  lineHeight: 1.04,
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

              {/* Award badges row */}
              <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }} className="hero-award-row">
                {[
                  { icon: '🏆', title: 'Forbes 30U30 Asia', sub: 'Enterprise Technology' },
                  { icon: '⭐', title: 'Best Use of AI in Automation', sub: 'Global AI Summit · AICRA & MeitY' },
                  { icon: '🥇', title: 'Global Mobility Hackathon Winner', sub: 'Niti Aayog' },
                ].map((b, i) => (
                  <span key={i} className="hero-award-badge" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 20px 10px 14px',
                    borderRadius: 'var(--border-radius-pill)',
                    background: 'rgba(255,255,255,0.82)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(124,58,237,0.18)',
                    boxShadow: '0 4px 20px rgba(124,58,237,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                    transition: 'var(--transition-colors)',
                  }}>
                    <span className="award-icon" style={{ fontSize: 30, lineHeight: 1 }}>{b.icon}</span>
                    <span>
                      <span className="award-title" style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--color-text-primary)', display: 'block', lineHeight: 1.2, letterSpacing: '-0.01em', transition: 'var(--transition-colors)' }}>{b.title}</span>
                      <span className="award-sub" style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--color-text-secondary)', display: 'block', lineHeight: 1.35, marginTop: 2, transition: 'var(--transition-colors)' }}>{b.sub}</span>
                    </span>
                  </span>
                ))}
              </motion.div>

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
              style={{ position: 'relative' }}
            >
              {/* Multi-layer glow halo */}
              <div style={{
                position: 'absolute',
                inset: -32,
                borderRadius: 40,
                background: 'radial-gradient(ellipse at 40% 50%, rgba(124,58,237,0.13) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                inset: -8,
                borderRadius: 28,
                background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(168,85,247,0.04) 100%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(80,60,130,0.18), 0 8px 24px rgba(0,0,0,0.10), inset 0 0 0 1px rgba(124,58,237,0.12)',
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
        }
        @media (max-width: 768px) {
          .hero-award-badge { padding: 8px 14px 8px 10px !important; }
          .hero-award-badge .award-icon { font-size: 22px !important; }
          .hero-stat-strip { gap: 20px !important; margin-top: 40px !important; }
          .hero-credential-row { gap: 6px !important; }
        }
        @media (max-width: 480px) {
          .hero-award-badge .award-title { font-size: 12px !important; }
          .hero-award-badge .award-sub { font-size: 10px !important; }
          .hero-stat-strip { gap: 16px !important; }
        }
        [data-theme="dark"] .hero-greeting-pill {
          background: rgba(30,21,53,0.72) !important;
        }
      `}</style>
    </section>
  );
}
