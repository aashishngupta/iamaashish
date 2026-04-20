import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';
import SwipeDots from '../components/SwipeDots';
import { Zap, Bot, Network, ClipboardList, BarChart2, PenTool, FileText, Megaphone, Code2, MessageSquare } from 'lucide-react';

// ── SKILLS ────────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    category: 'Product',
    items: [
      { label: 'Product Strategy & Vision',       score: 5 },
      { label: 'Product Management',              score: 5 },
      { label: 'Roadmapping & Prioritization',    score: 5 },
      { label: 'Feature Scoping & Trade-offs',    score: 5 },
      { label: 'User Research & Discovery',       score: 4 },
      { label: 'North Star & Metrics Design',     score: 4 },
      { label: 'Product-led Growth',              score: 4 },
      { label: 'Competitive Analysis',            score: 4 },
    ],
  },
  {
    category: 'Agentic AI Systems',
    items: [
      { label: 'LLM Architecture & Agent Design',   score: 5 },
      { label: 'RAG Pipelines & Vector Search',      score: 5 },
      { label: 'Prompt Engineering',                 score: 5 },
      { label: 'LLM Routing & Orchestration',        score: 5 },
      { label: 'GPT / OpenAI Models',                score: 4 },
      { label: 'Tool Use & Function Calling',        score: 4 },
      { label: 'Observability & Evals',              score: 4 },
      { label: 'Governance, Safety & PII Handling',  score: 4 },
      { label: 'Context & Memory Management',        score: 4 },
    ],
  },
  {
    category: 'Engineering',
    items: [
      { label: 'Vibe Coding (AI-assisted Dev)',   score: 5 },
      { label: 'System Design & Architecture',    score: 4 },
      { label: 'API Design & Integration',        score: 4 },
      { label: 'Backend Development (FastAPI)',   score: 3 },
      { label: 'Frontend (React, Next.js)',       score: 3 },
      { label: 'Database Design (SQL, NoSQL)',    score: 3 },
      { label: 'Data Engineering & Pipelines',   score: 3 },
      { label: 'Cloud & Infra (AWS, Vercel)',     score: 3 },
    ],
  },
  {
    category: 'Traditional AI & ML',
    items: [
      { label: 'AI Product Strategy & Design',   score: 5 },
      { label: 'AI Prototyping & POCs',           score: 5 },
      { label: 'ML Model Evaluation & Tuning',   score: 4 },
      { label: 'NLP & Computer Vision Apps',     score: 4 },
      { label: 'Predictive Modelling',           score: 3 },
      { label: 'Data Science & Analytics',       score: 4 },
      { label: 'Feature Engineering',            score: 4 },
      { label: 'Responsible AI & Ethics',        score: 4 },
    ],
  },
  {
    category: 'Marketing & Growth',
    items: [
      { label: 'Go-to-Market Strategy',          score: 5 },
      { label: 'Performance Marketing',          score: 3 },
      { label: 'Brand & Positioning',            score: 4 },
      { label: 'D2C & Marketplace Growth',       score: 3 },
      { label: 'SEO & Organic Growth',           score: 3 },
      { label: 'Email & Retention Marketing',    score: 4 },
      { label: 'Community Building',             score: 3 },
      { label: 'Content & Thought Leadership',   score: 3 },
    ],
  },
  {
    category: 'Sales & Revenue',
    items: [
      { label: 'B2B Enterprise Sales',                  score: 4 },
      { label: 'B2G / Government Sales',                score: 3.5 },
      { label: 'Presales & Solutioning',                score: 4 },
      { label: 'Deal Structuring & Negotiation',        score: 3 },
      { label: 'Business Development & Partnerships',   score: 4 },
      { label: 'Enterprise Account Management',         score: 4 },
      { label: 'Pricing & Commercial Strategy',         score: 4 },
      { label: 'RFP & Tender Responses',                score: 3 },
    ],
  },
  {
    category: 'Leadership',
    items: [
      { label: 'Team Building & Mentorship',     score: 5 },
      { label: 'Cross-functional Execution',     score: 5 },
      { label: 'Stakeholder Management',         score: 5 },
      { label: 'Hiring & Talent Strategy',       score: 4 },
      { label: 'OKR & Performance Frameworks',   score: 4 },
      { label: 'Executive Communication',        score: 4 },
      { label: 'Culture & Org Design',           score: 4 },
      { label: 'Crisis & Change Management',     score: 3 },
    ],
  },
  {
    category: 'Finance & Strategy',
    items: [
      { label: 'Business Strategy',              score: 5 },
      { label: 'Unit Economics & Pricing',       score: 4 },
      { label: 'P&L Ownership',                  score: 4 },
      { label: 'Market Sizing (TAM / SAM / SOM)', score: 4 },
      { label: 'Fundraising & Investor Relations', score: 4 },
      { label: 'Competitive Landscape Analysis', score: 4 },
      { label: 'Financial Modelling',            score: 3 },
      { label: 'Cap Table & Term Sheets',        score: 3 },
    ],
  },
];

// ── TOOLS ─────────────────────────────────────────────────────────────────────
const TOOLS = [
  {
    category: 'Vibe Coding',
    Icon: Zap,
    items: ['Claude Code', 'Codex', 'Cursor', 'GitHub Copilot', 'Lovable', 'v0'],
  },
  {
    category: 'Gen AI Tools',
    Icon: Bot,
    items: ['ChatGPT', 'Claude', 'ElevenLabs', 'HeyGen', 'Pop AI', 'Gamma', 'Runway', 'Sora'],
  },
  {
    category: 'Agentic AI Stack',
    Icon: Network,
    items: ['LangChain', 'Ragas', 'Weights & Biases', 'Pinecone', 'ChromaDB', 'LlamaIndex', 'OpenAI Evals'],
  },
  {
    category: 'Product Management',
    Icon: ClipboardList,
    items: ['Jira', 'Notion', 'Confluence', 'Asana', 'Monday.com'],
  },
  {
    category: 'Analytics & Data',
    Icon: BarChart2,
    items: ['Mixpanel', 'Amplitude', 'Google Analytics', 'Looker'],
  },
  {
    category: 'Design & Prototyping',
    Icon: PenTool,
    items: ['Figma', 'Miro', 'Whimsical', 'Canva', 'Framer'],
  },
  {
    category: 'Presentation & Docs',
    Icon: FileText,
    items: ['Google Slides', 'PowerPoint', 'Tome', 'Notion', 'Gamma'],
  },
  {
    category: 'Growth & Marketing',
    Icon: Megaphone,
    items: ['HubSpot', 'Mailchimp', 'Apollo', 'Clearbit', 'Google Ads', 'LinkedIn Ads', 'Webflow'],
  },
  {
    category: 'Engineering & Dev',
    Icon: Code2,
    items: ['GitHub', 'VS Code', 'Postman', 'Vercel', 'AWS', 'Docker', 'Firebase', 'FastAPI'],
  },
  {
    category: 'Communication',
    Icon: MessageSquare,
    items: ['Slack', 'Zoom', 'Google Meet', 'Calendly', 'Zendesk'],
  },
];

// ── Skill bar ─────────────────────────────────────────────────────────────────
function SkillBar({ label, score, inView, delay }) {
  const pct = (score / 5) * 100;
  const color =
    score >= 5   ? '#7c3aed' :
    score >= 4   ? '#6366f1' :
    score >= 3   ? '#a78bfa' : '#c4b5fd';

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>
          {label}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3, 4, 5].map(n => {
            const filled = n <= Math.floor(score);
            const half = !filled && score % 1 !== 0 && n === Math.ceil(score);
            return (
              <motion.div
                key={n}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: filled || half ? 1 : 0.25 } : { scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.3, delay: delay + n * 0.04 }}
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: filled || half ? color : 'var(--color-border-tertiary)',
                  opacity: half ? 0.45 : 1,
                  transition: 'background 300ms ease',
                }}
              />
            );
          })}
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

const SKILLS_PER_PAGE = 3;

// ── MAIN SECTION ──────────────────────────────────────────────────────────────
export default function Expertise() {
  const [skillsRef, skillsInView] = useInView();
  const [toolsRef, toolsInView] = useInView();
  const [skillsPage, setSkillsPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const skillsScrollRef = useRef(null);
  const toolsScrollRef = useRef(null);
  const totalSkillPages = Math.ceil(SKILLS.length / SKILLS_PER_PAGE);
  const visibleSkills = SKILLS.slice(skillsPage * SKILLS_PER_PAGE, (skillsPage + 1) * SKILLS_PER_PAGE);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
              Where I create <em>outsized impact.</em>
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

          {isMobile ? (
            /* ── Mobile: horizontal scroll ── */
            <>
              <div ref={skillsScrollRef} style={{
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                gap: 16,
                paddingBottom: 12,
                marginLeft: -20,
                marginRight: -20,
                paddingLeft: 20,
                paddingRight: 20,
              }} className="skills-hscroll">
                {SKILLS.map((group, gi) => (
                  <div key={gi} style={{
                    scrollSnapAlign: 'start',
                    flexShrink: 0,
                    width: 'calc(85vw)',
                    maxWidth: 320,
                    background: 'var(--color-background-secondary)',
                    border: '0.5px solid var(--color-border-tertiary)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: '20px 22px',
                    transition: 'var(--transition-colors)',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 18, transition: 'var(--transition-colors)' }}>
                      {group.category}
                    </div>
                    {group.items.map((skill, si) => (
                      <SkillBar key={si} label={skill.label} score={skill.score} inView={skillsInView} delay={gi * 0.05 + si * 0.07} />
                    ))}
                  </div>
                ))}
              </div>
              <SwipeDots scrollRef={skillsScrollRef} count={SKILLS.length} />
            </>
          ) : (
            /* ── Desktop: paginated 4-up grid ── */
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={skillsPage}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
                >
                  {visibleSkills.map((group, gi) => {
                    const globalIdx = skillsPage * SKILLS_PER_PAGE + gi;
                    return (
                      <div key={gi} style={{
                        background: 'var(--color-background-secondary)',
                        border: '0.5px solid var(--color-border-tertiary)',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: '22px 24px',
                        transition: 'var(--transition-colors)',
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 18, transition: 'var(--transition-colors)' }}>
                          {group.category}
                        </div>
                        {group.items.map((skill, si) => (
                          <SkillBar key={si} label={skill.label} score={skill.score} inView={skillsInView} delay={globalIdx * 0.05 + si * 0.06} />
                        ))}
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 32 }}>
                <button
                  onClick={() => setSkillsPage(p => Math.max(0, p - 1))}
                  disabled={skillsPage === 0}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '0.5px solid var(--color-border-tertiary)',
                    background: 'var(--color-background-primary)',
                    cursor: skillsPage === 0 ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, color: 'var(--color-text-primary)',
                    opacity: skillsPage === 0 ? 0.3 : 1,
                    transition: 'var(--transition-colors)',
                  }}
                >‹</button>
                {Array.from({ length: totalSkillPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSkillsPage(i)}
                    style={{
                      width: skillsPage === i ? 24 : 8, height: 8, borderRadius: 4,
                      border: 'none', cursor: 'pointer', padding: 0,
                      background: skillsPage === i ? 'var(--color-accent)' : 'var(--color-border-tertiary)',
                      transition: 'all 250ms ease',
                    }}
                  />
                ))}
                <button
                  onClick={() => setSkillsPage(p => Math.min(totalSkillPages - 1, p + 1))}
                  disabled={skillsPage === totalSkillPages - 1}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '0.5px solid var(--color-border-tertiary)',
                    background: 'var(--color-background-primary)',
                    cursor: skillsPage === totalSkillPages - 1 ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, color: 'var(--color-text-primary)',
                    opacity: skillsPage === totalSkillPages - 1 ? 0.3 : 1,
                    transition: 'var(--transition-colors)',
                  }}
                >›</button>
              </div>
            </>
          )}
        </div>

        <style>{`
          .skills-hscroll::-webkit-scrollbar { display: none; }
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

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <h2 className="section-heading" style={{ margin: 0 }}>
              Tools I actually <em>live in.</em>
            </h2>
            <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)', transition: 'var(--transition-colors)' }}>
              {TOOLS.reduce((acc, g) => acc + g.items.length, 0)}+ tools across {TOOLS.length} categories
            </span>
          </div>

          <div ref={toolsScrollRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }} className="tools-grid mobile-hscroll">
            {TOOLS.map((group, gi) => {
              const accent = BENTO_ACCENTS[gi % BENTO_ACCENTS.length].accent;
              return (
                <motion.div
                  key={gi}
                  initial={{ opacity: 0, y: 16 }}
                  animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: gi * 0.05 }}
                  style={{
                    background: 'var(--color-background-primary)',
                    border: '0.5px solid var(--color-border-tertiary)',
                    borderTop: `2.5px solid ${accent}`,
                    borderRadius: 'var(--border-radius-md)',
                    padding: '20px 22px',
                    transition: 'var(--transition-colors)',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <group.Icon size={16} strokeWidth={1.75} color={accent} style={{ flexShrink: 0 }} />
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
                      textTransform: 'uppercase', color: 'var(--color-text-secondary)',
                      transition: 'var(--transition-colors)',
                    }}>
                      {group.category}
                    </span>
                  </div>

                  {/* Tools — dot-separated for a clean look */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 0', alignItems: 'center' }}>
                    {group.items.map((tool, ti) => (
                      <span key={ti} style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          fontSize: 12.5,
                          fontWeight: 450,
                          color: 'var(--color-text-secondary)',
                          transition: 'var(--transition-colors)',
                          letterSpacing: '-0.005em',
                        }}>
                          {tool}
                        </span>
                        {ti < group.items.length - 1 && (
                          <span style={{
                            display: 'inline-block',
                            width: 3, height: 3,
                            borderRadius: '50%',
                            background: 'var(--color-border-tertiary)',
                            margin: '0 7px',
                            flexShrink: 0,
                          }} />
                        )}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <SwipeDots scrollRef={toolsScrollRef} count={TOOLS.length} />
        </div>

        <style>{`
          @media (max-width: 1024px) { .tools-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 600px)  { .tools-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
