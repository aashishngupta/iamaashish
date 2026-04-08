import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } };

const openToRows = [
  { label: 'Location', value: 'India · MENA/Dubai · Remote (US-compatible)' },
  { label: 'Stage', value: 'Series A to growth-stage' },
  { label: 'Domain', value: 'Agentic AI · Voice AI · Enterprise SaaS' },
  { label: 'Availability', value: 'Immediate' },
];

export default function Now() {
  const [ref, inView] = useInView();

  return (
    <section
      id="now"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-background-primary)', display: 'none', transition: 'var(--transition-colors)' }}
    >
      <div className="container">
        <SectionLabel>Now</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="now-grid">
          {/* Left — Building */}
          <motion.div
            initial={fadeUp.initial}
            animate={inView ? fadeUp.animate : fadeUp.initial}
            transition={fadeUp.transition}
          >
            <h2 className="section-heading" style={{ marginBottom: 24, fontSize: 'clamp(22px, 3vw, 32px)' }}>
              What I'm building.
            </h2>

            {/* Active badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#34c759',
                boxShadow: '0 0 0 3px rgba(52,199,89,0.2)',
                display: 'inline-block',
              }} />
              <span style={{ fontSize: 12, color: '#34c759', fontWeight: 500 }}>Active</span>
            </div>

            {/* pmGPT card */}
            <div style={{
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '20px',
              marginBottom: 20,
              transition: 'var(--transition-colors)',
            }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 10, transition: 'var(--transition-colors)' }}>
                pmGPT
              </p>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.65, transition: 'var(--transition-colors)' }}>
                An AI-native, privacy-first PM platform with a six-agent architecture. Designed to act as an AI chief of staff for PMs — handling research, PRDs, roadmap reasoning, and stakeholder communication autonomously.
              </p>
            </div>

            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, transition: 'var(--transition-colors)' }}>
              Open-source on GitHub:{' '}
              <a
                href="https://github.com/aashishngupta/support-agent-rag"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-accent)' }}
              >
                support-agent-rag
              </a>
              {' '}(LangChain + ChromaDB + GPT-4o) and{' '}
              <a
                href="https://github.com/aashishngupta/prop-ai-sales-agent"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-accent)' }}
              >
                prop-ai-sales-agent
              </a>
              {' '}(VAPI + Twilio + ElevenLabs multi-LLM voice agent).
            </p>
          </motion.div>

          {/* Right — Open to */}
          <motion.div
            initial={fadeUp.initial}
            animate={inView ? fadeUp.animate : fadeUp.initial}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
          >
            <h2 className="section-heading" style={{ marginBottom: 24, fontSize: 'clamp(22px, 3vw, 32px)' }}>
              What I'm open to.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 28, transition: 'var(--transition-colors)' }}>
              Senior product leadership roles — CPO, VP Product, Head of Product — at AI-first companies building something that matters. Particularly interested in agentic AI, enterprise SaaS, and voice/multimodal systems.
            </p>

            <div style={{
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 'var(--border-radius-lg)',
              overflow: 'hidden',
              marginBottom: 28,
              transition: 'var(--transition-colors)',
            }}>
              {openToRows.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 16,
                    padding: '14px 16px',
                    borderBottom: i < openToRows.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none',
                    transition: 'var(--transition-colors)',
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-tertiary)', minWidth: 90, textTransform: 'uppercase', letterSpacing: '0.06em', paddingTop: 1, transition: 'var(--transition-colors)' }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5, transition: 'var(--transition-colors)' }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <a className="btn btn-filled" href="mailto:92.aashish@gmail.com">
              Let's talk →
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .now-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
