import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';
import SwipeDots from '../components/SwipeDots';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } };

const MEDIUM_USERNAME = 'aashishngupta';

// ── Static pinned pieces (shown when Medium has no articles) ──────────────────
const PINNED = [
  {
    type: 'Research',
    date: '2025',
    title: 'Agentic AI Atlas',
    body: 'Comprehensive market research mapping the agentic AI landscape — players, patterns, and investment theses.',
    href: 'https://linkedin.com/in/aashish-kr-gupta',
    cover: null,
  },
  {
    type: 'Essay',
    date: '2025',
    title: 'MVPs and MVEs are Dead. The Gen-AI world demands a MAC.',
    body: 'Why the standard product development framework breaks in the age of generative AI.',
    href: 'https://linkedin.com/in/aashish-kr-gupta',
    cover: null,
  },
  {
    type: 'Essay',
    date: '2024',
    title: 'From SaaS to AaaS: Why Agent as a Service will supplant traditional software.',
    body: 'The architectural and business model shift happening underneath the AI hype.',
    href: `https://medium.com/@${MEDIUM_USERNAME}`,
    cover: null,
  },
  {
    type: 'AI Content',
    date: 'Ongoing',
    title: '@aashishngupta.ai on Instagram',
    body: 'Weekly breakdowns of agentic AI, LLM decisions, and lessons from scaling AI systems.',
    href: 'https://instagram.com/aashishngupta.ai',
    cover: null,
  },
];

const typeColor = {
  Research:    { bg: 'var(--color-background-info)', color: 'var(--color-text-info)' },
  Essay:       { bg: '#eeedfe', color: '#3c3489' },
  'AI Content':{ bg: '#eaf3de', color: '#3b6d11' },
  Medium:      { bg: '#fff3e8', color: '#b54708' },
};


// ── Load Medium articles from static JSON (generated at dev/build start) ─────
function useMediumArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/medium-articles.json')
      .then(r => r.ok ? r.json() : [])
      .then(data => { if (Array.isArray(data) && data.length) setArticles(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { articles, loading };
}

// ── Blog card ─────────────────────────────────────────────────────────────────
function BlogCard({ title, body, date, href, cover, type, categories, delay, inView }) {
  const tag = type || (categories?.[0] || 'Essay');
  const tc = typeColor[type] || { bg: '#f0f0f5', color: '#555' };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={fadeUp.initial}
      animate={inView ? fadeUp.animate : fadeUp.initial}
      transition={{ ...fadeUp.transition, delay }}
      style={{
        background: 'var(--color-background-primary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 'var(--border-radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'transform 200ms ease, box-shadow 200ms ease, var(--transition-colors)',
        cursor: 'pointer',
        height: '100%',
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
    >
      {/* Cover image */}
      {cover ? (
        <div style={{ width: '100%', height: 160, overflow: 'hidden', flexShrink: 0, background: '#f0f0f5' }}>
          <img
            src={cover}
            alt={title ? `Cover image for article: ${title}` : 'Article cover image'}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 300ms ease' }}
            onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
          />
        </div>
      ) : (
        <div style={{ width: '100%', height: 80, background: 'linear-gradient(135deg, #f0ebff 0%, #e8f4fd 100%)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 28, opacity: 0.35 }}>✍️</span>
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 600, padding: '2px 8px',
            borderRadius: 'var(--border-radius-pill)',
            background: tc.bg, color: tc.color,
            whiteSpace: 'nowrap',
          }}>
            {tag}
          </span>
          <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', whiteSpace: 'nowrap' }}>{date}</span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 15,
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.4,
          marginBottom: 8,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          letterSpacing: '-0.01em',
        }}>
          {title}
        </h3>

        {body && (
          <p style={{
            fontSize: 12,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            marginBottom: 14,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}>
            {body}
          </p>
        )}

        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent)', marginTop: 'auto' }}>
          Read ↗
        </span>
      </div>
    </motion.a>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
      <div style={{ height: 160, background: 'var(--color-background-tertiary)', animation: 'pulse 1.4s ease-in-out infinite' }} />
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ height: 10, width: '40%', borderRadius: 6, background: 'var(--color-background-tertiary)', animation: 'pulse 1.4s ease-in-out infinite' }} />
        <div style={{ height: 14, width: '90%', borderRadius: 6, background: 'var(--color-background-tertiary)', animation: 'pulse 1.4s ease-in-out infinite 0.1s' }} />
        <div style={{ height: 14, width: '70%', borderRadius: 6, background: 'var(--color-background-tertiary)', animation: 'pulse 1.4s ease-in-out infinite 0.2s' }} />
      </div>
    </div>
  );
}

// ── Desktop Pager — shows 3 cards at a time with prev/next ───────────────────
function DesktopPager({ cards, inView }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(cards.length / 3);
  const visible = cards.slice(page * 3, page * 3 + 3);

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'stretch' }}
        >
          {visible.map((card, i) => (
            <BlogCard key={`${page}-${i}`} {...card} type={card.type || 'Medium'} delay={i * 0.06} inView={inView} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pager controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
          {/* Prev */}
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '0.5px solid var(--color-border-tertiary)',
              background: 'var(--color-background-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: page === 0 ? 'default' : 'pointer',
              opacity: page === 0 ? 0.3 : 1,
              transition: 'all 150ms ease',
              color: 'var(--color-text-primary)',
              fontSize: 16,
            }}
            onMouseEnter={e => { if (page > 0) e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-tertiary)'; }}
            aria-label="Previous articles"
          >
            ←
          </button>

          {/* Page dots */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                style={{
                  width: i === page ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === page ? 'var(--color-accent)' : 'var(--color-border-tertiary)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 300ms ease',
                  opacity: i === page ? 0.85 : 1,
                }}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '0.5px solid var(--color-border-tertiary)',
              background: 'var(--color-background-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: page === totalPages - 1 ? 'default' : 'pointer',
              opacity: page === totalPages - 1 ? 0.3 : 1,
              transition: 'all 150ms ease',
              color: 'var(--color-text-primary)',
              fontSize: 16,
            }}
            onMouseEnter={e => { if (page < totalPages - 1) e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-tertiary)'; }}
            aria-label="Next articles"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Writing() {
  const [ref, inView] = useInView();
  const { articles, loading } = useMediumArticles();
  const writingScrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = e => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const showMedium = loading || articles.length > 0;
  const showPinned = !loading && articles.length === 0;
  const displayCards = loading ? null : (articles.length > 0 ? articles : PINNED);

  return (
    <section
      id="thinking"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-background-secondary)', transition: 'var(--transition-colors)' }}
    >
      <div className="container">
        <SectionLabel>Writing & Perspectives</SectionLabel>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <motion.h2
            className="section-heading"
            style={{ margin: 0 }}
            initial={fadeUp.initial}
            animate={inView ? fadeUp.animate : fadeUp.initial}
            transition={fadeUp.transition}
          >
            Opinions, essays, <em>and ideas.</em>
          </motion.h2>

          <a
            href={`https://medium.com/@${MEDIUM_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none', flexShrink: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 195 195" fill="none" style={{ flexShrink: 0 }}>
              <rect width="195" height="195" rx="34" fill="currentColor" opacity="0.15"/>
              <ellipse cx="60" cy="97.5" rx="34" ry="34" fill="currentColor"/>
              <ellipse cx="139" cy="97.5" rx="21" ry="34" fill="currentColor"/>
              <ellipse cx="177" cy="97.5" rx="10" ry="28" fill="currentColor"/>
            </svg>
            View all on Medium ↗
          </a>
        </div>

        {/* Loading skeletons */}
        {loading && (
          isMobile ? (
            <>
              <SwipeDots scrollRef={writingScrollRef} count={6} />
              <div ref={writingScrollRef} className="writing-grid mobile-hscroll">
                {[0,1,2,3,4,5].map(i => <SkeletonCard key={i} />)}
              </div>
            </>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[0,1,2].map(i => <SkeletonCard key={i} />)}
            </div>
          )
        )}

        {/* Articles */}
        {!loading && displayCards && (
          isMobile ? (
            <>
              <SwipeDots scrollRef={writingScrollRef} count={displayCards.length} />
              <div ref={writingScrollRef} className="writing-grid mobile-hscroll">
                {displayCards.map((card, i) => (
                  <BlogCard
                    key={i}
                    {...card}
                    type={card.type || 'Medium'}
                    delay={i * 0.07}
                    inView={inView}
                  />
                ))}
              </div>
            </>
          ) : (
            <DesktopPager cards={displayCards} inView={inView} />
          )
        )}

        {/* Instagram strip */}
        <motion.a
          href="https://instagram.com/aashishngupta.ai"
          target="_blank"
          rel="noopener noreferrer"
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 20, padding: '14px 20px',
            background: 'linear-gradient(135deg, #fdf0ff 0%, #fff3e8 100%)',
            border: '0.5px solid rgba(124,58,237,0.15)',
            borderRadius: 'var(--border-radius-lg)',
            textDecoration: 'none', gap: 12,
          }}
          whileHover={{ y: -1, boxShadow: '0 4px 20px rgba(124,58,237,0.10)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>📱</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 2 }}>
                @aashishngupta.ai on Instagram
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                Weekly breakdowns of agentic AI, LLM decisions, and lessons from scaling AI products.
              </div>
            </div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', whiteSpace: 'nowrap', flexShrink: 0 }}>Follow ↗</span>
        </motion.a>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </section>
  );
}
