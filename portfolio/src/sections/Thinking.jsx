import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } };

const posts = [
  {
    type: 'Research',
    date: '2025',
    title: 'Agentic AI Atlas',
    body: 'Comprehensive market research mapping the agentic AI landscape — players, patterns, and investment theses.',
    href: 'https://linkedin.com/in/aashish-kr-gupta',
  },
  {
    type: 'Essay',
    date: '2025',
    title: 'MVPs and MVEs are Dead. The Gen-AI world demands a MAC.',
    body: 'Why the standard product development framework breaks in the age of generative AI.',
    href: 'https://linkedin.com/in/aashish-kr-gupta',
  },
  {
    type: 'Essay',
    date: '2024',
    title: 'From SaaS to AaaS: Why Agent as a Service will supplant traditional software.',
    body: 'The architectural and business model shift happening underneath the AI hype. Published on Medium.',
    href: 'https://medium.com',
  },
  {
    type: 'AI Content',
    date: 'Ongoing',
    title: '@aashishngupta.ai on Instagram',
    body: 'Weekly breakdowns of agentic AI, LLM decisions, and lessons from scaling AI systems.',
    href: 'https://instagram.com/aashishngupta.ai',
  },
];

const typeColor = {
  Research: { bg: 'var(--color-background-info)', color: 'var(--color-text-info)' },
  Essay: { bg: '#eeedfe', color: '#3c3489' },
  'AI Content': { bg: '#eaf3de', color: '#3b6d11' },
};

export default function Thinking() {
  const [ref, inView] = useInView();

  return (
    <section
      id="thinking"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-background-secondary)', transition: 'var(--transition-colors)' }}
    >
      <div className="container">
        <SectionLabel>Thinking</SectionLabel>
        <motion.h2
          className="section-heading"
          style={{ marginBottom: 40 }}
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={fadeUp.transition}
        >
          What I think about <em>publicly.</em>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="thinking-grid">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={fadeUp.initial}
              animate={inView ? fadeUp.animate : fadeUp.initial}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              style={{
                background: 'var(--color-background-primary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 'var(--border-radius-lg)',
                padding: '24px',
                display: 'block',
                transition: 'transform 200ms ease, box-shadow 200ms ease, var(--transition-colors)',
                cursor: 'pointer',
              }}
              whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 500,
                  padding: '3px 8px',
                  borderRadius: 'var(--border-radius-pill)',
                  ...((typeColor[post.type] || { bg: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)' }) && {}),
                  background: (typeColor[post.type] || { bg: 'var(--color-background-secondary)' }).bg,
                  color: (typeColor[post.type] || { color: 'var(--color-text-secondary)' }).color,
                }}>
                  {post.type}
                </span>
                <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', transition: 'var(--transition-colors)' }}>
                  {post.date}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 18,
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
                marginBottom: 10,
                transition: 'var(--transition-colors)',
              }}>
                {post.title}
              </h3>

              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 16, transition: 'var(--transition-colors)' }}>
                {post.body}
              </p>

              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-accent)', transition: 'var(--transition-colors)' }}>
                Read ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .thinking-grid { grid-template-columns: 1fr !important; }
        }
        [data-theme="dark"] .thinking-grid a span[style*="#eeedfe"] {
          background: #1e1a40 !important; color: #b8b0ff !important;
        }
        [data-theme="dark"] .thinking-grid a span[style*="#eaf3de"] {
          background: #1a2e0a !important; color: #a8d878 !important;
        }
      `}</style>
    </section>
  );
}
