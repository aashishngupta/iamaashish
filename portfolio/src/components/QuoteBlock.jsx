import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
};

export default function QuoteBlock({ quote, attribution, secondQuote }) {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} style={{ background: 'var(--color-background-secondary)', display: 'none', transition: 'var(--transition-colors)' }}>
      <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
        <motion.div
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={fadeUp.transition}
        >
          {/* Accent rule */}
          <div style={{
            width: 40,
            height: 2,
            background: 'var(--gradient-accent)',
            borderRadius: 2,
            margin: '0 auto 32px',
          }} />

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(22px, 3vw, 34px)',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
            marginBottom: 20,
            transition: 'var(--transition-colors)',
          }}>
            &ldquo;{quote}&rdquo;
          </p>
          <p style={{
            fontSize: 12,
            color: 'var(--color-text-tertiary)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            marginBottom: secondQuote ? 40 : 0,
            transition: 'var(--transition-colors)',
          }}>
            {attribution}
          </p>

          {secondQuote && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(14px, 2vw, 20px)',
              color: 'var(--color-text-secondary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.45,
              marginTop: 8,
              transition: 'var(--transition-colors)',
            }}>
              &ldquo;{secondQuote}&rdquo;
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
