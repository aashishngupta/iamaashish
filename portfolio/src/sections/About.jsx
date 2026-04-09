import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } };


const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/aashish-kr-gupta',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/aashishngupta',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/aashishngupta',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/aashishngupta',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function About() {
  const [ref, inView] = useInView();
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-background-secondary)', transition: 'var(--transition-colors)' }}
    >
      <div className="container">
        <SectionLabel>My Story</SectionLabel>

        <motion.div
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={fadeUp.transition}
          style={{}}
        >
          <h2
            className="section-heading"
            style={{ marginBottom: 32 }}
          >
            Engineer turned founder,
            <br />
            <em>now building the next wave of AI products.</em>
          </h2>

         <p style={{ marginBottom: 18, transition: 'var(--transition-colors)' }}>
  I didn’t start as a product manager. I started by building.
  Before frameworks or roadmaps, I was writing code, breaking things, and understanding how systems behave in the real world.
  That instinct stayed. Even today, I think in constraints, trade-offs, and first principles.
  I come from a small town, Indri in Haryana. Exposure was limited, but ambition wasn’t.
  At 9, I wanted to become the CEO of a software company. Over time, that became direction.
  That journey took me to PEC Chandigarh and into entrepreneurship early.
  In 2015, we built India's first AI-led product, Yana.AI.
</p>

<p style={{ marginBottom: 18, transition: 'var(--transition-colors)' }}>
  It wasn’t perfectly positioned, but it was strong.
  Strong enough to attract multiple acquisition offers, open doors to global investors, and create opportunities with large companies.
  There was no AI playbook back then.
  I learned by digging into research, cold reaching out to experts, and building from first principles.
  From the first investor pitch to the first funding round, from the first 100 customers to the first team, and acquisition conversations,
  every step came with challenges.
  There was no playbook. Just decisions, mistakes, and constant learning.
</p>

<p style={{ marginBottom: 18, transition: 'var(--transition-colors)' }}>
  That phase taught me what actually matters.
  Building is messy. Markets are unpredictable.
  Real insight comes from research and user feedback.
  Building and selling must happen together.
  And resilience matters more than initial brilliance.
  Emotion can start things, but conviction, sharp thinking, and adaptability take you forward.
</p>

<p style={{ marginBottom: 18, transition: 'var(--transition-colors)' }}>
  From there, the curve accelerated.
  I started working with CXOs, identifying gaps, and solving real business problems while adapting to market signals.
  Over time, I moved from building features to owning outcomes.
  I’ve built AI-driven systems used by millions, deployed across Fortune 200 companies.
  The journey hasn’t been linear.
  I’ve shipped things that didn’t work, built features no one used, and underestimated distribution.
  That changed how I operate.
</p>

<p style={{ marginBottom: 8, transition: 'var(--transition-colors)' }}>
  I focus on problems, not ideas.
  I prioritize outcomes over output.
  I choose clarity over complexity.
</p>

<p style={{ marginBottom: 18, transition: 'var(--transition-colors)' }}>
  In 2020, being featured in Forbes 30 Under 30 Asia was a strong milestone.
  I once planned a master’s from an Ivy League university, but building on the ground changed that perspective.
  For now, building remains the classroom.
  Working deeply in AI, one thing became clear.
  AI without grounding is just noise.
  I focus on building products that move real metrics, not just narratives,
  stay close to users, and challenge assumptions early. If there’s one thing this journey has reinforced, it’s this.
  Clarity beats intelligence. Execution beats ideas. Consistency beats intensity.
</p>

<p style={{ marginBottom: 18, transition: 'var(--transition-colors)' }}>
  Integrity is non-negotiable.
  No vanity metrics. No artificial positioning.
</p>

<p style={{ marginBottom: 32, transition: 'var(--transition-colors)' }}>
  If you’re looking to build, scale, or rethink your product, or even just want to exchange ideas, feel free to reach out.
</p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 18px',
                  borderRadius: 'var(--border-radius-pill)',
                  background: 'var(--color-background-primary)',
                  border: '1px solid var(--color-border-tertiary)',
                  boxShadow: 'var(--shadow-xs)',
                  fontSize: 14, fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'all 180ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.color = 'var(--color-accent)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.12)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border-tertiary)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {s.icon}
                {s.label}
                <span style={{ fontSize: 12, opacity: 0.5 }}>↗</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
