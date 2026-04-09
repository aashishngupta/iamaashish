import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } };

export default function Contact() {
  const [ref, inView] = useInView();

  return (
    <section
      id="contact"
      ref={ref}
      className="section-pad"
      style={{
        background: '#0a0a0a',
        color: '#f5f5f7',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.h2
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={fadeUp.transition}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(22px, 2.4vw, 36px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: '#f5f5f7',
            marginBottom: 20,
          }}
        >
          If you're building something ambitious in AI, I'd like to hear about it.
        </motion.h2>

        <motion.p
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          style={{ fontSize: 16, color: '#a1a1a6', lineHeight: 1.6, marginBottom: 40 }}
        >
          Whether it's a role, a collaboration, or just an interesting conversation.
        </motion.p>

        <motion.div
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a className="btn btn-white" href="mailto:92.aashish@gmail.com">
            92.aashish@gmail.com
          </a>
          <a
            className="btn btn-ghost-white"
            href="https://linkedin.com/in/aashish-kr-gupta"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
