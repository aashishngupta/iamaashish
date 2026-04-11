import { useState } from 'react';
import { motion } from 'framer-motion';

const BOOK = {
  image: '/book-image.jpg',
  title: 'Greater Than Success: With Asia\'s Most Influential Entrepreneurs',
  author: 'Firdouz Hameed',
  role: 'Featured Author — Dedicated Chapter',
  description: `Like all good things, this book also has a purpose. Through these entrepreneurs, I intend to inspire a future generation of entrepreneurs. When those in this book tell you their life's journey, it gives you something that you can relate to. From their words, you will learn about the current market situation, future predictions, industrial analysis, technological innovations, ease of doing business, and so much more. I also designed this book to introduce you to some exceptional individuals who are disrupting conventional methods. Like I said in my previous book, gone are the days of a brick-and-mortar business. Now, I don't mean to say these age-old methods will not bring you any luck. But by not digitizing your business, you will miss out on so many opportunities. Everything you have learned till today is a thing of the past. Innovations that would have taken years before are now being fast-tracked to meet the needs of the ever-changing world. Sometimes entrepreneurs used to say that a particular product or service they introduced was too soon to be adopted by the people. Today's entrepreneurs will not say that. No matter what futuristic product you offer, there couldn't possibly be a better time to launch it.`,
};

const LIMIT = 320;

export default function FeaturedBook() {
  const [expanded, setExpanded] = useState(false);
  const needsTrunc = BOOK.description.length > LIMIT;
  const displayText = !expanded && needsTrunc
    ? BOOK.description.slice(0, LIMIT) + '… '
    : BOOK.description + ' ';

  return (
    <section className="section-pad" style={{ background: 'var(--color-background-secondary)', transition: 'var(--transition-colors)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 0,
            background: 'linear-gradient(135deg, #0f0c1e 0%, #1a1035 50%, #0d1a2e 100%)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 12px 48px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)',
          }}
          className="featured-book-card"
        >
          {/* Book cover */}
          <div style={{
            width: 180, flexShrink: 0,
            background: '#0a0818',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '28px 20px',
          }} className="book-cover-col">
            <div style={{
              boxShadow: '6px 6px 28px rgba(0,0,0,0.55), -2px 0 8px rgba(0,0,0,0.3)',
              borderRadius: 6,
              overflow: 'hidden',
              width: '100%',
              aspectRatio: '2/3',
              background: 'linear-gradient(160deg, #1e3a5f 0%, #0a1628 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <img
                src={BOOK.image}
                alt={BOOK.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
              {/* Fallback: invisible, image covers this */}
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px',
                borderRadius: 'var(--border-radius-pill)',
                background: 'rgba(124,58,237,0.25)',
                border: '0.5px solid rgba(167,139,250,0.35)',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                textTransform: 'uppercase', color: '#c4b5fd',
              }}>
                Biography · Featured in a Book
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20, fontWeight: 800,
              color: '#f5f5f7',
              letterSpacing: '-0.02em', lineHeight: 1.25,
              marginBottom: 4,
            }}>
              {BOOK.title}
            </h3>

            {/* Author */}
            <div style={{ fontSize: 13, color: '#a78bfa', fontWeight: 600, marginBottom: 14 }}>
              by {BOOK.author} &nbsp;·&nbsp; <span style={{ color: '#8e8e93', fontWeight: 400 }}>{BOOK.role}</span>
            </div>

            {/* Description */}
            <p style={{
              fontSize: 13, lineHeight: 1.7,
              color: '#c7c7cc',
            }}>
              {displayText}
              {!expanded && needsTrunc && (
                <button onClick={() => setExpanded(true)} style={{ fontSize: 11, fontWeight: 600, color: '#a78bfa', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                  Read more ↓
                </button>
              )}
              {expanded && needsTrunc && (
                <button onClick={() => setExpanded(false)} style={{ fontSize: 11, fontWeight: 600, color: '#a78bfa', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                  Show less ↑
                </button>
              )}
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .featured-book-card { flex-direction: column !important; }
          .book-cover-col { width: 100% !important; padding: 24px !important; }
          .book-cover-col > div { width: 120px !important; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
