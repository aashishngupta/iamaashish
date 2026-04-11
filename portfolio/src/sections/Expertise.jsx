import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';
import SwipeDots from '../components/SwipeDots';

// ── SKILLS ────────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    category: 'Product',
    items: [
      { label: 'Product Strategy & Vision',     score: 5 },
      { label: 'Product Management (0→1 & 1→N)', score: 5 },
      { label: 'Roadmapping & Prioritization',   score: 5 },
      { label: 'User Research & Discovery',       score: 4 },
      { label: 'Product-led Growth',              score: 4 },
    ],
  },
  {
    category: 'AI & Engineering',
    items: [
      { label: 'AI / ML Product Design',          score: 5 },
      { label: 'Agentic AI & LLM Systems',         score: 5 },
      { label: 'System Design & Architecture',     score: 4 },
      { label: 'Vibe Coding (AI-assisted Dev)',     score: 4 },
      { label: 'Data Engineering & Pipelines',     score: 3 },
    ],
  },
  {
    category: 'Business',
    items: [
      { label: 'Go-to-Market (GTM)',               score: 5 },
      { label: 'B2B / B2G Sales & Presales',       score: 5 },
      { label: 'Business Strategy',                score: 5 },
      { label: 'Fundraising & Investor Relations', score: 4 },
      { label: 'P&L & Financial Modelling',        score: 3 },
    ],
  },
  {
    category: 'Leadership',
    items: [
      { label: 'Team Building & Mentorship',       score: 5 },
      { label: 'Cross-functional Execution',       score: 5 },
      { label: 'Stakeholder Management',           score: 5 },
      { label: 'OKR & Performance Frameworks',     score: 4 },
      { label: 'Executive Communication',          score: 4 },
    ],
  },
];

// ── TOOLS ─────────────────────────────────────────────────────────────────────
const TOOLS = [
  {
    category: 'AI & Vibe Coding',
    icon: '🤖',
    items: ['Claude', 'ChatGPT', 'Cursor', 'GitHub Copilot', 'Bolt.new', 'Lovable', 'Replit', 'Perplexity', 'Midjourney', 'ElevenLabs'],
  },
  {
    category: 'Product Management',
    icon: '📋',
    items: ['Jira', 'Linear', 'Notion', 'Confluence', 'Productboard', 'Aha!', 'Trello', 'Asana', 'Monday.com'],
  },
  {
    category: 'Analytics & Data',
    icon: '📊',
    items: ['Mixpanel', 'Amplitude', 'Google Analytics', 'Metabase', 'Tableau', 'Looker', 'Hotjar', 'FullStory', 'Segment'],
  },
  {
    category: 'Design & Prototyping',
    icon: '🎨',
    items: ['Figma', 'Miro', 'Whimsical', 'FigJam', 'Canva', 'Framer', 'Balsamiq'],
  },
  {
    category: 'Presentation & Docs',
    icon: '📑',
    items: ['Google Slides', 'PowerPoint', 'Pitch', 'Tome', 'Notion', 'Coda', 'Gamma'],
  },
  {
    category: 'Growth & Marketing',
    icon: '📣',
    items: ['HubSpot', 'Mailchimp', 'Apollo', 'Clay', 'Clearbit', 'Google Ads', 'LinkedIn Ads', 'Webflow'],
  },
  {
    category: 'Engineering & Dev',
    icon: '⚙️',
    items: ['GitHub', 'VS Code', 'Postman', 'Vercel', 'AWS', 'Docker', 'Supabase', 'Firebase', 'FastAPI'],
  },
  {
    category: 'Communication',
    icon: '💬',
    items: ['Slack', 'Loom', 'Zoom', 'Google Meet', 'Calendly', 'Intercom', 'Zendesk'],
  },
];

// ── Skill bar ─────────────────────────────────────────────────────────────────
function SkillBar({ label, score, inView, delay }) {
  const pct = (score / 5) * 100;
  const color =
    score === 5 ? '#7c3aed' :
    score === 4 ? '#6366f1' :
    score === 3 ? '#a78bfa' : '#c4b5fd';

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>
          {label}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <motion.div
              key={n}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.3, delay: delay + n * 0.04 }}
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: n <= score ? color : 'var(--color-border-tertiary)',
                transition: 'background 300ms ease',
              }}
            />
          ))}
        </div>
      </div>
      <div style={{
        height: 4, borderRadius: 2,
        background: 'var(--color-background-tertiary)',
        overflow: 'hidden',
        transition: 'var(--transition-colors)',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
          style={{ height: '100%', borderRadius: 2, background: color }}
        />
      </div>
    </div>
  );
}

// ── Bento card accent colors per category ────────────────────────────────────
const BENTO_ACCENTS = [
  { bg: '#f3f0ff', border: 'rgba(124,58,237,0.18)', accent: '#7c3aed', tagBg: 'rgba(124,58,237,0.08)', tagColor: '#7c3aed' },
  { bg: '#eef2ff', border: 'rgba(99,102,241,0.18)', accent: '#6366f1', tagBg: 'rgba(99,102,241,0.08)', tagColor: '#6366f1' },
  { bg: '#fff7ed', border: 'rgba(234,88,12,0.15)',  accent: '#ea580c', tagBg: 'rgba(234,88,12,0.07)',  tagColor: '#c2410c' },
  { bg: '#fdf2f8', border: 'rgba(219,39,119,0.15)', accent: '#db2777', tagBg: 'rgba(219,39,119,0.07)', tagColor: '#be185d' },
  { bg: '#f0fdf4', border: 'rgba(22,163,74,0.15)',  accent: '#16a34a', tagBg: 'rgba(22,163,74,0.07)',  tagColor: '#15803d' },
  { bg: '#fff1f2', border: 'rgba(225,29,72,0.15)',  accent: '#e11d48', tagBg: 'rgba(225,29,72,0.07)',  tagColor: '#be123c' },
  { bg: '#f0f9ff', border: 'rgba(2,132,199,0.15)',  accent: '#0284c7', tagBg: 'rgba(2,132,199,0.07)',  tagColor: '#0369a1' },
  { bg: '#fefce8', border: 'rgba(202,138,4,0.18)',  accent: '#ca8a04', tagBg: 'rgba(202,138,4,0.07)',  tagColor: '#a16207' },
];

// ── MAIN SECTION ──────────────────────────────────────────────────────────────
export default function Expertise() {
  const [skillsRef, skillsInView] = useInView();
  const [toolsRef, toolsInView] = useInView();
  const skillsScrollRef = useRef(null);
  const toolsScrollRef = useRef(null);

  return (
    <>
      {/* ══ SKILLS SECTION ══════════════════════════════════════════════════ */}
      <section
        id="expertise"
        className="section-pad"
        style={{ background: 'var(--color-background-primary)', transition: 'var(--transition-colors)' }}
      >
        <div className="container" ref={skillsRef}>
          <SectionLabel>Skills & Depth</SectionLabel>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <h2 className="section-heading" style={{ margin: 0 }}>
              Where I'm <em>genuinely dangerous.</em>
            </h2>
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[1,2,3,4,5].map(n => (
                  <span key={n} style={{ width: 8, height: 8, borderRadius: '50%', background: n <= 3 ? '#a78bfa' : '#7c3aed', display: 'inline-block' }} />
                ))}
              </span>
              Rated 1–5
            </span>
          </div>

          <SwipeDots scrollRef={skillsScrollRef} count={SKILLS.length} />
          <div ref={skillsScrollRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 32,
          }} className="skills-grid mobile-hscroll">
            {SKILLS.map((group, gi) => (
              <div key={gi}>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--color-accent)',
                  marginBottom: 18, transition: 'var(--transition-colors)',
                }}>
                  {group.category}
                </div>
                {group.items.map((skill, si) => (
                  <SkillBar
                    key={si}
                    label={skill.label}
                    score={skill.score}
                    inView={skillsInView}
                    delay={gi * 0.05 + si * 0.07}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 600px)  { .skills-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══ TOOLS SECTION ═══════════════════════════════════════════════════ */}
      <section
        id="tools"
        className="section-pad"
        style={{ background: 'var(--color-background-secondary)', transition: 'var(--transition-colors)' }}
      >
        <div className="container" ref={toolsRef}>
          <SectionLabel>Toolbox</SectionLabel>

          <h2 className="section-heading" style={{ marginBottom: 8 }}>
            Tools I actually <em>live in.</em>
          </h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 40, transition: 'var(--transition-colors)' }}>
            Across 13 years — the stack I reach for to get things done.
          </p>

          {/* Bento grid */}
          <SwipeDots scrollRef={toolsScrollRef} count={TOOLS.length} />
          <div ref={toolsScrollRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: 'auto',
            gap: 14,
          }} className="bento-grid mobile-hscroll">
            {TOOLS.map((group, gi) => {
              const a = BENTO_ACCENTS[gi % BENTO_ACCENTS.length];
              // Make AI & first two cards span 2 cols for visual variety
              const wide = gi === 0 || gi === 2;
              return (
                <motion.div
                  key={gi}
                  initial={{ opacity: 0, y: 20 }}
                  animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: gi * 0.06 }}
                  style={{
                    gridColumn: wide ? 'span 2' : 'span 1',
                    background: a.bg,
                    border: `1px solid ${a.border}`,
                    borderRadius: 16,
                    padding: '20px 20px 18px',
                    transition: 'var(--transition-colors)',
                  }}
                >
                  {/* Card header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{
                      width: 32, height: 32, borderRadius: 8, fontSize: 16,
                      background: a.tagBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {group.icon}
                    </span>
                    <span style={{
                      fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
                      textTransform: 'uppercase', color: a.accent,
                    }}>
                      {group.category}
                    </span>
                  </div>

                  {/* Tool tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {group.items.map((tool, ti) => (
                      <span key={ti} style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--border-radius-pill)',
                        background: a.tagBg,
                        border: `0.5px solid ${a.border}`,
                        fontSize: 12, fontWeight: 500,
                        color: a.tagColor,
                        whiteSpace: 'nowrap',
                      }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .bento-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 600px)  { .bento-grid { grid-template-columns: 1fr !important; } .bento-grid > div { grid-column: span 1 !important; } }
        `}</style>
      </section>
    </>
  );
}
