import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } };

const timeline = [
  { year: '2026', title: 'Volza', role: 'Associate Principal PM', desc: 'Agentic AI transformation of global trade intelligence platform (4B+ shipment records)' },
  { year: '2025', title: 'pmGPT', role: 'Passion Project', desc: 'AI-native PM platform with 6-agent architecture' },
  { year: '2025', title: 'Phot.AI', role: 'Product Consultant', desc: 'Scaled GenAI SaaS for creators, 30+ AI tools' },
  { year: '2024–25', title: 'SearchUnify', role: 'Interim Head of Product', desc: 'Agentic AI Suite, 32% ARR growth, Forbes recognition active' },
  { year: '2022–24', title: 'Reverie by Reliance Jio', role: 'Interim Head of Voice', desc: '10M+ DAU, multilingual voice AI at scale' },
  { year: '2022', title: 'OfficeBanao (Lightspeed VC)', role: 'Founding Member', desc: '$2.2M first-year sales, $6M+ funding secured' },
  { year: '2022', title: 'inGen Dynamics', role: 'Product Consultant', desc: 'AI + IoT for Aido robot, 1.6x sales uplift' },
  { year: '2017–22', title: 'Discovr.AI', role: 'Co-Founder, Chief Product Officer', desc: 'Low-code AI platform, 30+ enterprise clients' },
  { year: '2015–21', title: 'OneLabs by Red Ginger', role: 'Co-Founder, Chief Product & Technology Officer', desc: '20M+ installs, B2C aggregator empire' },
  { year: '2014–15', title: 'Gemini Solutions', role: 'Senior Software Consultant', desc: 'Financial analytics for PIMCO (Barclays, JP Morgan data)' },
  { year: '2013–14', title: 'SocialAppsHQ', role: 'Software Development Engineer', desc: 'Real-time social media monitoring for Mumbai Police, Pepsi' },
  { year: '2009–13', title: 'PEC University of Technology', role: 'B.E. Information Technology', desc: 'Chandigarh, India' },
];

const awards = [
  { title: 'Forbes 30 Under 30 Asia', source: 'Forbes Magazine Asia' },
  { title: 'Best Use of AI in Automation', source: 'Global AI Summit (AICRA & MeitY)' },
  { title: 'Global Mobility Hackathon Winner', source: 'Niti Aayog' },
];

const certs = [
  'Agile Foundations by PMI (2023)',
  'Generative AI with LLMs by Deep Learning.AI & AWS (2023)',
  'Running a Profitable Business by PMI (2021)',
  'Corporate Finance Foundations (2020)',
];

export default function Achievements() {
  const [ref, inView] = useInView();

  return (
    <section
      id="achievements"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-background-secondary)', display: 'none', transition: 'var(--transition-colors)' }}
    >
      <div className="container">
        <SectionLabel>Full Arc</SectionLabel>
        <motion.h2
          className="section-heading"
          style={{ marginBottom: 8 }}
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={fadeUp.transition}
        >
          The full arc.
        </motion.h2>
        <motion.p
          style={{ fontSize: 14, color: 'var(--color-text-tertiary)', marginBottom: 48, transition: 'var(--transition-colors)' }}
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
        >
          From writing code at 20 to leading AI product orgs at scale.
        </motion.p>

        {/* Timeline */}
        <motion.div
          style={{ position: 'relative', paddingLeft: 32, marginBottom: 64 }}
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
        >
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 6,
            top: 8,
            bottom: 8,
            width: 1,
            background: 'var(--color-border-tertiary)',
            transition: 'var(--transition-colors)',
          }} />

          {timeline.map((item, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 28 }}>
              {/* Dot */}
              <div style={{ position: 'absolute', left: -32, top: 4 }}>
                <div style={{
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  background: 'var(--color-text-primary)',
                  border: '2px solid var(--color-background-secondary)',
                  transition: 'var(--transition-colors)',
                }} />
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--color-text-tertiary)',
                  minWidth: 64,
                  paddingTop: 2,
                  transition: 'var(--transition-colors)',
                  flexShrink: 0,
                }}>
                  {item.year}
                </span>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>
                    {item.title}
                  </span>
                  {' '}
                  <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)', transition: 'var(--transition-colors)' }}>
                    · {item.role}
                  </span>
                  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 3, lineHeight: 1.5, transition: 'var(--transition-colors)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Awards grid */}
        <motion.div
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
        >
          <div className="section-label" style={{ marginBottom: 20 }}>Awards</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 48 }} className="awards-grid">
            {awards.map((a, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-background-primary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-lg)',
                  padding: '20px',
                  transition: 'var(--transition-colors)',
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 10 }}>★</div>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 4, lineHeight: 1.4, transition: 'var(--transition-colors)' }}>
                  {a.title}
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', transition: 'var(--transition-colors)' }}>
                  {a.source}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.25 }}
        >
          <div className="section-label" style={{ marginBottom: 16 }}>Certifications</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {certs.map((c, i) => (
              <span
                key={i}
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  padding: '6px 14px',
                  borderRadius: 'var(--border-radius-pill)',
                  background: 'var(--color-background-primary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  color: 'var(--color-text-secondary)',
                  transition: 'var(--transition-colors)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .awards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
