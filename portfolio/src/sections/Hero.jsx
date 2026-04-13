import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ContactModal from '../components/ContactModal';

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
  const [contactOpen, setContactOpen] = useState(false);

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

      <div className="container hero-content-pad" style={{ paddingTop: 110, paddingBottom: 110, position: 'relative', width: '100%' }}>
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
                <span className="hero-greeting-pill" style={{
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
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
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
              <motion.div {...fadeUp(0.08)} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
                {[
                  'Digital Transformation',
                  'AI Product Leader',
                  'Entrepreneur',
                  'Angel Investor',
                ].map((item, i) => {
                  return (
                    <span key={i} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 10px',
                      borderRadius: 'var(--border-radius-pill)',
                      background: 'var(--color-background-info)',
                      border: '0.5px solid rgba(29,78,216,0.22)',
                      boxShadow: '0 1px 6px rgba(124,58,237,0.08)',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent)',
                      transition: 'var(--transition-colors)',
                    }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }} />
                      {item}
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
                  lineHeight: 1.22,
                  color: 'var(--color-text-primary)',
                  marginBottom: 28,
                  transition: 'var(--transition-colors)',
                }}
              >
                I transform businesses
                <br />
                by building{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  AI products,
                </span>
                <br />
                scaling them to millions
                <br />
                and crafting teams that outlast me.
              </motion.h1>

              {/* Award badges — horizontal row under h1 */}
              <motion.div {...fadeUp(0.20)} className="hero-awards-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {[
                  { icon: '🏆', title: 'Forbes 30U30 Asia', titleMobile: 'Forbes 30U30 Asia', sub: 'Enterprise Technology' },
                  { icon: '⭐', title: 'Best Use of AI in Automation', titleMobile: 'Best Use of AI', sub: 'AICRA & MeitY' },
                  { icon: '🥇', title: 'Global Mobility Winner', titleMobile: 'Global Mobility Winner', sub: 'Niti Aayog' },
                ].map((b, i) => (
                  <span key={i} className="hero-award-badge" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '6px 12px 6px 8px',
                    borderRadius: 10,
                    background: '#ffffff',
                    border: '0.5px solid rgba(0,0,0,0.10)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    whiteSpace: 'nowrap',
                  }}>
                    <span className="award-icon" style={{ fontSize: 24, lineHeight: 1 }}>{b.icon}</span>
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="award-title" style={{ fontSize: 13, fontWeight: 800, color: '#1d1d1f', lineHeight: 1.7, letterSpacing: '-0.01em' }}>
                      <span className="award-title-full">{b.title}</span>
                      {b.titleMobile && <span className="award-title-mobile">{b.titleMobile}</span>}
                    </span>
                      <span className="award-sub" style={{ fontSize: 10.5, fontWeight: 500, color: '#6e6e73', lineHeight: 1.7 }}>{b.sub}</span>
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
                className="hero-ctas"
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
              >
                <button
                  className="btn btn-accent"
                  style={{ boxShadow: '0 4px 20px rgba(124,58,237,0.28), 0 1px 4px rgba(0,0,0,0.08)' }}
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See my work →
                </button>
                <button className="btn btn-outline"
                  style={{ boxShadow: '0 2px 10px rgba(80,60,130,0.08)' }}
                  onClick={() => setContactOpen(true)}>
                  Get in touch
                </button>
              </motion.div>

              {/* Stat strip — two-row card */}
              <motion.div {...fadeUp(0.42)} style={{ marginTop: 48 }}>
                <div className="hero-stat-card" style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '0.5px solid var(--color-border-secondary)',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                  transition: 'var(--transition-colors)',
                }}>

                  {/* Row 1 — Experience */}
                  <div className="hero-stat-row hero-stat-row-exp" style={{
                    display: 'flex',
                    background: 'var(--color-background-primary)',
                    transition: 'var(--transition-colors)',
                  }}>
                    {[
                      { num: '~13', label: 'Years of Exp' },
                      { num: '10+', label: 'Years in AI' },
                      { num: '8+',  label: 'B2B' },
                      { num: '6+',  label: 'B2G' },
                      { num: '5+',  label: 'B2C' },
                      { num: '2+',  label: 'D2C' },
                    ].map((s, i, arr) => (
                      <motion.div
                        key={i}
                        className="hero-stat-cell"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.25,0.1,0.25,1], delay: 0.44 + i * 0.07 }}
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: '18px 8px',
                          borderRight: i < arr.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none',
                          transition: 'var(--transition-colors)',
                        }}
                      >
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 22,
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                          letterSpacing: '-0.025em',
                          lineHeight: 1,
                          marginBottom: 5,
                          transition: 'var(--transition-colors)',
                        }}>{s.num}</div>
                        <div style={{
                          fontSize: 10,
                          color: 'var(--color-text-tertiary)',
                          fontWeight: 500,
                          lineHeight: 1.3,
                          transition: 'var(--transition-colors)',
                        }}>{s.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ height: '0.5px', background: 'var(--color-border-secondary)', transition: 'var(--transition-colors)' }} />

                  {/* Row 2 — Impact */}
                  <div className="hero-stat-row hero-stat-row-impact" style={{
                    display: 'flex',
                    background: 'var(--color-background-info)',
                    transition: 'var(--transition-colors)',
                  }}>
                    {[
                      { num: '100M+', label: 'Users Impacted' },
                      { num: '2×',    label: 'Founder' },
                      { num: '$30M+', label: 'Revenue Driven' },
                    ].map((s, i, arr) => (
                      <motion.div
                        key={i}
                        className="hero-stat-cell"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.25,0.1,0.25,1], delay: 0.72 + i * 0.08 }}
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: '18px 8px',
                          borderRight: i < arr.length - 1 ? '0.5px solid rgba(29,78,216,0.14)' : 'none',
                          transition: 'var(--transition-colors)',
                        }}
                      >
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 22,
                          fontWeight: 700,
                          color: 'var(--color-accent)',
                          letterSpacing: '-0.025em',
                          lineHeight: 1,
                          marginBottom: 5,
                          transition: 'var(--transition-colors)',
                        }}>{s.num}</div>
                        <div style={{
                          fontSize: 10,
                          color: 'var(--color-text-tertiary)',
                          fontWeight: 500,
                          lineHeight: 1.3,
                          transition: 'var(--transition-colors)',
                        }}>{s.label}</div>
                      </motion.div>
                    ))}
                  </div>

                </div>
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
                  src="/aashish-tedx.png"
                  alt="Aashish Kumar Gupta speaking at TEDx — AI Product Leader and Forbes 30 Under 30 Asia"
                  fetchpriority="high"
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
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

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

<style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ── H1 sizes ── */
        .hero-h1 { font-size: 44px; }
        @media (max-width: 1280px) { .hero-h1 { font-size: 40px; } }
        @media (max-width: 1024px) { .hero-h1 { font-size: 36px; } }
        @media (max-width: 860px)  { .hero-h1 { font-size: 32px; } }
        @media (max-width: 480px)  { .hero-h1 { font-size: 39px; line-height: 1.30 !important; letter-spacing: -0.03em !important; } }

        /* ── Tablet: collapse grid ── */
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          /* Move photo above text */
          .hero-photo-col { order: -1 !important; margin-top: 0 !important; }
          .hero-photo-col > div {
            max-width: 190px !important;
            margin: 0 auto !important;
            border-radius: 50% !important;
            aspect-ratio: 1 / 1 !important;
          }
          .hero-photo-col > div img { }
          /* Slightly tighten vertical padding */
          .hero-content-pad { padding-top: 88px !important; padding-bottom: 72px !important; }
        }

        /* ── Award title toggle ── */
        .award-title-mobile { display: none; }
        @media (max-width: 640px) {
          .award-title-full   { display: none; }
          .award-title-mobile { display: inline; }
        }

        /* ── Awards: horizontal scroll on mobile so all 3 fit one row ── */
        @media (max-width: 640px) {
          .hero-awards-row {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            padding-bottom: 4px !important;
          }
          .hero-awards-row::-webkit-scrollbar { display: none; }
          .hero-award-badge { flex-shrink: 0 !important; }
          .hero-award-badge { padding: 5px 10px 5px 7px !important; }
          .hero-award-badge .award-icon  { font-size: 18px !important; }
          .hero-award-badge .award-title { font-size: 11px !important; }
          .hero-award-badge .award-sub   { font-size: 9px !important; }
        }

        /* ── Stat card: mobile collapses exp row to 3-col grid ── */
        @media (max-width: 640px) {
          .hero-stat-row-exp {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .hero-stat-row-exp .hero-stat-cell {
            border-right: none !important;
            border-bottom: 0.5px solid var(--color-border-tertiary) !important;
          }
          /* Remove bottom border from last row (cells 3,4,5) */
          .hero-stat-row-exp .hero-stat-cell:nth-child(4),
          .hero-stat-row-exp .hero-stat-cell:nth-child(5),
          .hero-stat-row-exp .hero-stat-cell:nth-child(6) {
            border-bottom: none !important;
          }
          /* Restore vertical dividers within each row of 3 */
          .hero-stat-row-exp .hero-stat-cell:nth-child(1),
          .hero-stat-row-exp .hero-stat-cell:nth-child(2),
          .hero-stat-row-exp .hero-stat-cell:nth-child(4),
          .hero-stat-row-exp .hero-stat-cell:nth-child(5) {
            border-right: 0.5px solid var(--color-border-tertiary) !important;
          }
          .hero-stat-row-impact .hero-stat-cell { padding: 16px 8px !important; }
          .hero-stat-card { margin-top: 28px !important; }
        }

        /* ── Mobile: full polish ── */
        @media (max-width: 480px) {
          .hero-content-pad { padding-top: 76px !important; padding-bottom: 56px !important; }

          /* Greeting pill — allow wrap on tiny screens */
          .hero-greeting-pill { max-width: 100% !important; white-space: normal !important; font-size: 13px !important; }

          /* Photo — tighter circle */
          .hero-photo-col > div { max-width: 140px !important; }

          /* CTAs — full width, stacked */
          .hero-ctas { flex-direction: column !important; gap: 10px !important; }
          .hero-ctas .btn { width: 100% !important; text-align: center !important; justify-content: center !important; }
        }

        [data-theme="dark"] .hero-greeting-pill {
          background: rgba(30,21,53,0.72) !important;
        }
      `}</style>
    </section>
  );
}
