import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } };

const interests = [
  { icon: '🏋️', label: 'Fitness' },
  { icon: '🧘', label: 'Yoga' },
  { icon: '🚴', label: 'Cycling' },
  { icon: '💃', label: 'Salsa' },
  { icon: '🥃', label: 'Whisky Tasting' },
  { icon: '🚗', label: 'Long Drives' },
  { icon: '✈️', label: 'Travel' },
  { icon: '🚀', label: 'Sci-fi Shows' },
];

const beliefs = [
  {
    title: 'Empathy is a product skill.',
    body: "The best product decisions I've made came from genuinely understanding the person on the other end.",
  },
  {
    title: 'Build before you theorize.',
    body: 'I trust engineers who ship over consultants who deck. Same applies to PMs.',
  },
  {
    title: 'AI changes the leverage, not the judgment.',
    body: 'The tools got faster. The hard part — deciding what to build — is still fully human.',
  },
];

export default function BeyondWork() {
  const [ref, inView] = useInView();

  return (
    <section
      id="beyond"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-background-primary)', transition: 'var(--transition-colors)' }}
    >
      <div className="container">
        <SectionLabel>Beyond Work</SectionLabel>
        <motion.h2
          className="section-heading"
          style={{ marginBottom: 30 }}
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={fadeUp.transition}
        >
          The human behind <em>the products.</em>
        </motion.h2>
        {/* <motion.p
          style={{ fontSize: 15, color: 'var(--color-text-tertiary)', marginBottom: 48, transition: 'var(--transition-colors)' }}
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
        >
          INFJ. Grew up in a small town in Haryana with a dream at age 3 to become a CEO.
        </motion.p> */}

        <div style={{ gridTemplateColumns: '1fr 1fr', gap: 64 }} className="beyond-grid">
          {/* Left */}
          <motion.div
            initial={fadeUp.initial}
            animate={inView ? fadeUp.animate : fadeUp.initial}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {interests.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    borderRadius: 'var(--border-radius-pill)',
                    background: 'var(--color-background-secondary)',
                    border: '0.5px solid var(--color-border-tertiary)',
                    fontSize: 18,
                    fontWeight: 400,
                    color: 'var(--color-text-secondary)',
                    transition: 'var(--transition-colors)',
                  }}
                >
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', display: 'none', lineHeight: 1.7, transition: 'var(--transition-colors)' }}>
              Empathy · Systems thinking · Radical honesty · Long-term over short-term
            </p>
          </motion.div>

          {/* Right — belief cards */}
          <motion.div
            style={{ display: 'flex', display: 'none', flexDirection: 'column', gap: 12 }}
            initial={fadeUp.initial}
            animate={inView ? fadeUp.animate : fadeUp.initial}
            transition={{ ...fadeUp.transition, delay: 0.25 }}
          >
            {beliefs.map((b, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-background-secondary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-lg)',
                  padding: '18px 20px',
                  transition: 'var(--transition-colors)',
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 4, transition: 'var(--transition-colors)' }}>
                  {b.title}
                </p>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, transition: 'var(--transition-colors)' }}>
                  {b.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .beyond-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
