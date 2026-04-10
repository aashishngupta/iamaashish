import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } };

// ── Set your Medium username here ──────────────────────────────
const MEDIUM_USERNAME = 'aashish-kr-gupta'; // e.g. 'aashish-kr-gupta'

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
  Medium: { bg: '#fff3e8', color: '#b54708' },
};

function useMediumArticles(username) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!username) { setLoading(false); return; }
    const rssUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=4`;
    fetch(apiUrl)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'ok' && data.items?.length) {
          setArticles(data.items.map(item => ({
            title: item.title,
            body: item.description?.replace(/<[^>]*>/g, '').slice(0, 120) + '…',
            date: new Date(item.pubDate).getFullYear().toString(),
            href: item.link,
            thumbnail: item.thumbnail,
          })));
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [username]);

  return { articles, loading, error };
}

export default function Thinking() {
  const [ref, inView] = useInView();
  const { articles: mediumArticles, loading: mediumLoading } = useMediumArticles(MEDIUM_USERNAME);

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

        {/* Static posts */}
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
                  fontSize: 10, fontWeight: 500, padding: '3px 8px',
                  borderRadius: 'var(--border-radius-pill)',
                  background: (typeColor[post.type] || { bg: 'var(--color-background-secondary)' }).bg,
                  color: (typeColor[post.type] || { color: 'var(--color-text-secondary)' }).color,
                }}>
                  {post.type}
                </span>
                <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', transition: 'var(--transition-colors)' }}>
                  {post.date}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: 'var(--color-text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 10, transition: 'var(--transition-colors)' }}>
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

        {/* Medium articles — fetched live */}
        {(mediumLoading || mediumArticles.length > 0) && (
          <div style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="20" height="20" viewBox="0 0 195 195" fill="none" style={{ flexShrink: 0 }}>
                  <rect width="195" height="195" rx="34" fill="#000"/>
                  <ellipse cx="60" cy="97.5" rx="34" ry="34" fill="white"/>
                  <ellipse cx="139" cy="97.5" rx="21" ry="34" fill="white"/>
                  <ellipse cx="177" cy="97.5" rx="10" ry="28" fill="white"/>
                </svg>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>From Medium</span>
              </div>
              <a
                href={`https://medium.com/@${MEDIUM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none' }}
              >
                View all ↗
              </a>
            </div>

            {mediumLoading ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="thinking-grid">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ height: 120, borderRadius: 'var(--border-radius-lg)', background: 'var(--color-background-tertiary)', animation: 'pulse 1.4s ease-in-out infinite', opacity: 0.6 }} />
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="thinking-grid">
                {mediumArticles.map((article, i) => (
                  <motion.a
                    key={i}
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={fadeUp.initial}
                    animate={inView ? fadeUp.animate : fadeUp.initial}
                    transition={{ ...fadeUp.transition, delay: 0.1 + i * 0.07 }}
                    style={{
                      background: 'var(--color-background-primary)',
                      border: '0.5px solid var(--color-border-tertiary)',
                      borderRadius: 'var(--border-radius-lg)',
                      padding: '18px 20px',
                      display: 'flex', gap: 14, alignItems: 'flex-start',
                      transition: 'transform 200ms ease, box-shadow 200ms ease, var(--transition-colors)',
                      cursor: 'pointer', textDecoration: 'none',
                    }}
                    whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
                  >
                    {article.thumbnail && (
                      <img
                        src={article.thumbnail}
                        alt=""
                        style={{ width: 72, height: 56, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 'var(--border-radius-pill)', background: typeColor.Medium.bg, color: typeColor.Medium.color }}>
                          Medium
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{article.date}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)', lineHeight: 1.35, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', transition: 'var(--transition-colors)' }}>
                        {article.title}
                      </h3>
                      <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-accent)' }}>Read ↗</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
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
