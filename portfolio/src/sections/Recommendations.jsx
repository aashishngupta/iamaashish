import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import SwipeDots from '../components/SwipeDots';

const LINKEDIN_URL = 'https://www.linkedin.com/in/aashishkumargupta/';

// Avatar gradient pairs — each person gets a unique one
const AVATAR_GRADIENTS = [
  ['#7c3aed', '#a855f7'],
  ['#0ea5e9', '#38bdf8'],
  ['#10b981', '#34d399'],
  ['#f59e0b', '#fbbf24'],
  ['#ef4444', '#f87171'],
  ['#8b5cf6', '#c084fc'],
  ['#06b6d4', '#67e8f9'],
];

const RECS = [
  {
    name: 'Vivekanand Pani',
    title: 'Co-founder, Reverie Language Technologies',
    relationship: 'Managed Aashish directly',
    date: 'Jan 2024',
    photo: null, // replace with '/rec-vivekanand.jpg' if you download from LinkedIn
    linkedIn: 'https://www.linkedin.com/in/vivekanandpani/',
    text: 'Aashish is among the rarest of men I have met. He is volcanic. He not just has a great bunch of ideas, but is super restless about implementing, has great energy to get into the details and constantly makes progress. Any place that has people like him is bound to be lively and progressive. His diligent efforts gave us some really great outcomes.',
  },
  {
    name: 'Arshad Hisham',
    title: 'Founder & CEO | Serial Entrepreneur | Inventor | Investor',
    relationship: 'Managed Aashish directly',
    date: 'Sep 2022',
    photo: null,
    linkedIn: 'https://www.linkedin.com/in/arshadhisham/',
    text: 'Aashish gave inputs on the Kaiser.Haus product and the Aido Robot platform. He is great at managing products, always skimming to what the product should really fix. Apart from being an amazing product guy, he is also great at managing people. And he is tenacious in managing through complex product management issues.',
  },
  {
    name: 'Divyanshu Sharma',
    title: '3X Founder | Product Builder | Storyteller',
    relationship: 'Managed Aashish directly',
    date: 'Aug 2022',
    photo: null,
    linkedIn: 'https://www.linkedin.com/in/divyanshu-sharma/',
    text: 'Aashish is a young Rockstar of the Indian startup ecosystem, with an infectious enthusiasm to think from first principles and solve problems using technology, and passion to really make a difference. Guys like him gives me hope for a great future of the Indian startup ecosystem.',
  },
  {
    name: 'Akanksha Bajaj',
    title: 'Head Partnerships @ IndusInd Bank | Ex-Disney+Hotstar | Ex-Accenture Strategy',
    relationship: "Was Aashish's client",
    date: 'Feb 2020',
    photo: null,
    linkedIn: 'https://www.linkedin.com/in/akanksha-bajaj/',
    text: 'I have worked with Aashish on an AI & ML project. His strong technical background along with his ability to apply his in-depth knowledge to solve business problems helped us deliver the most viable solution. With the support of his team we could ensure quick turnaround in the project which delivered a high cost save and productivity improvement to the business.',
  },
  {
    name: 'Anil Singh',
    title: 'Managing Director & Partner at Gemini Solutions',
    relationship: "Was Aashish's mentor",
    date: 'Jan 2020',
    photo: null,
    linkedIn: 'https://www.linkedin.com/in/anil-singh/',
    text: "Aashish has great expertise in technology, management & leadership. It was wonderful to work with him and mentor him. His capability to manage multiple things, discussing the strategy of a product from idea to execution, creating action plans and working towards reaching the goal within a very short period of time was quite impressive. A lot of things came naturally to him which take years of experience for other professionals. Aashish is humble, down to earth and diligent about his work. I highly recommend him to any institution for his efficient entrepreneurial and managerial capabilities.",
  },
  {
    name: 'Ravdeep Singh',
    title: 'Data Analytics & BI | SQL, Python, AWS | Driving Scalable Data Solutions',
    relationship: 'Reported to Aashish directly',
    date: 'Dec 2019',
    photo: null,
    linkedIn: 'https://www.linkedin.com/in/ravdeep-singh/',
    text: 'I will recommend Aashish Gupta as a person with profound knowledge and great skills of modern business solutions. Wise, intelligent, excellent and well educated Co-Founder who can be trusted. His leadership and organisational skills have been invaluable to the company. No matter how complex the problem is, he will always come up with a brilliant, elegant, and cost-effective solution. I have always felt Aashish Gupta was one of the best team mates I have ever had the opportunity of working with.',
  },
  {
    name: 'Sumit Arora',
    title: 'Product Manager | Certified Agile Practitioner | FinTech | e-Commerce',
    relationship: 'Managed Aashish directly',
    date: 'Mar 2014',
    photo: null,
    linkedIn: 'https://www.linkedin.com/in/sumitarora/',
    text: 'I have worked with Aashish on 2 projects so far. He is dedicated, hard-working and very efficient. His strength lies in his ability to prioritize task and his ability to manage time. He is always willing to take new assignment and learn from his experience. He works relentlessly until the task in hand is completed and does not hesitate to ask for clarification if needed. It has been a great experience working with him.',
  },
];

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('');
}

function Avatar({ name, photo, idx }) {
  const [g1, g2] = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
  if (photo) {
    return (
      <img
        src={photo}
        alt={`${name} — LinkedIn recommendation for Aashish Kumar Gupta`}
        loading="lazy"
        style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(124,58,237,0.15)' }}
      />
    );
  }
  return (
    <div style={{
      width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg, ${g1} 0%, ${g2} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em',
      boxShadow: `0 4px 12px ${g1}40`,
    }}>
      {initials(name)}
    </div>
  );
}

const WORD_LIMIT = 65;

function RecCard({ rec, idx }) {
  const [expanded, setExpanded] = useState(false);
  const words = rec.text.split(' ');
  const isLong = words.length > WORD_LIMIT;
  const displayText = !isLong || expanded ? rec.text : words.slice(0, WORD_LIMIT).join(' ') + '…';

  return (
    <div style={{
      background: 'var(--color-background-primary)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 'var(--border-radius-xl)',
      padding: '20px 24px 20px',
      display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: 'var(--shadow-sm)',
      transition: 'var(--transition-colors)',
    }}>
      {/* Quote mark */}
      <div style={{ fontSize: 36, lineHeight: 1, color: 'var(--color-accent)', opacity: 0.25, fontFamily: 'Georgia, serif', marginBottom: -4 }}>"</div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <p style={{ lineHeight: 1.75, transition: 'var(--transition-colors)' }}>
          {displayText}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              marginTop: 6,
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-accent)',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'opacity 150ms ease',
            }}
          >
            {expanded ? 'Read less ↑' : 'Read more ↓'}
          </button>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: '0.5px', background: 'var(--color-border-tertiary)', transition: 'var(--transition-colors)' }} />

      {/* Person row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar name={rec.name} photo={rec.photo} idx={idx} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>
              {rec.name}
            </span>
            <a
              href={rec.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 10, color: 'var(--color-accent)', flexShrink: 0, lineHeight: 1 }}
              title="View on LinkedIn"
            >↗</a>
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', lineHeight: 1.4, marginTop: 2, transition: 'var(--transition-colors)' }}>
            {rec.title}
          </div>
          <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              fontSize: 9.5, fontWeight: 600, color: 'var(--color-accent)',
              background: 'var(--color-background-info)',
              padding: '2px 7px', borderRadius: 'var(--border-radius-pill)',
              whiteSpace: 'nowrap',
            }}>
              {rec.relationship}
            </span>
            <span style={{ fontSize: 9.5, color: 'var(--color-text-tertiary)' }}>· {rec.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const CARDS_PER_PAGE = 3;

export default function Recommendations() {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const recScrollRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const totalPages = Math.ceil(RECS.length / CARDS_PER_PAGE);
  const visible = RECS.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="recommendations"
      style={{
        background: 'var(--color-background-secondary)',
        padding: '20px 0',
        transition: 'var(--transition-colors)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <SectionLabel>Recommendations</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
            <div>
              <h2 className="section-heading" style={{
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                transition: 'var(--transition-colors)',
              }}>
                What people say
              </h2>
              <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', marginTop: 10, transition: 'var(--transition-colors)' }}>
                {RECS.length} LinkedIn recommendations from managers, founders, and clients.
              </p>
            </div>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 600, color: 'var(--color-accent)',
                background: 'var(--color-background-info)',
                border: '0.5px solid rgba(124,58,237,0.2)',
                borderRadius: 'var(--border-radius-pill)',
                padding: '8px 16px',
                textDecoration: 'none',
                transition: 'var(--transition-colors)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              View all on LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Mobile: all cards in one horizontal scroll */}
        {isMobile ? (
          <>
            <div
              ref={mobileScrollRef}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                gap: 12,
                marginLeft: -20,
                marginRight: -20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 4,
              }}
            >
              {RECS.map((rec, i) => (
                <div key={rec.name} style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 'calc(85vw)', maxWidth: 340 }}>
                  <RecCard rec={rec} idx={i} />
                </div>
              ))}
            </div>
            <SwipeDots scrollRef={mobileScrollRef} count={RECS.length} />
          </>
        ) : (
          <>
            {/* Desktop: paginated grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                ref={recScrollRef}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
                className="rec-grid"
              >
                {visible.map((rec, i) => (
                  <RecCard key={rec.name} rec={rec} idx={page * CARDS_PER_PAGE + i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 36 }}>
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '0.5px solid var(--color-border-tertiary)',
                  background: 'var(--color-background-primary)',
                  cursor: page === 0 ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, color: 'var(--color-text-primary)',
                  opacity: page === 0 ? 0.3 : 1,
                  transition: 'var(--transition-colors)',
                }}
              >‹</button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  style={{
                    width: page === i ? 24 : 8, height: 8, borderRadius: 4,
                    border: 'none', cursor: 'pointer', padding: 0,
                    background: page === i ? 'var(--color-accent)' : 'var(--color-border-tertiary)',
                    transition: 'all 250ms ease',
                  }}
                />
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '0.5px solid var(--color-border-tertiary)',
                  background: 'var(--color-background-primary)',
                  cursor: page === totalPages - 1 ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, color: 'var(--color-text-primary)',
                  opacity: page === totalPages - 1 ? 0.3 : 1,
                  transition: 'var(--transition-colors)',
                }}
              >›</button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) { .rec-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
