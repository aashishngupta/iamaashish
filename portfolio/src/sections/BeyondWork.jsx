import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } };

// ── INTERESTS ─────────────────────────────────────────────────────────────────
// Add your photos to /public/beyond/ and list paths in the `images` array.
// e.g. images: ['/beyond/travel-1.jpg', '/beyond/travel-2.jpg']
// Each tile auto-cycles through its images every ~4 seconds.
const interests = [
  {
    id: 'travel',
    icon: '✈️',
    label: 'Travel',
    line1: '13+ countries, all solo',
    line2: 'Exploring 5 more in 2026',
    tall: true,
    gradient: 'linear-gradient(160deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    images: [
      // '/beyond/travel-1.jpg',
      // '/beyond/travel-2.jpg',
    ],
  },
  {
    id: 'fitness',
    icon: '🏋️',
    label: 'Fitness',
    line1: 'Training since 2012',
    line2: '5 days a week',
    tall: false,
    gradient: 'linear-gradient(160deg, #c94b4b 0%, #4b134f 100%)',
    images: [],
  },
  {
    id: 'yoga',
    icon: '🧘',
    label: 'Yoga',
    line1: 'Daily morning practice',
    line2: 'Ashtanga & Vinyasa',
    tall: false,
    gradient: 'linear-gradient(160deg, #667eea 0%, #764ba2 100%)',
    images: [],
  },
  {
    id: 'cycling',
    icon: '🚴',
    label: 'Cycling',
    line1: 'Weekend rides',
    line2: 'Planning a cross-state ride',
    tall: false,
    gradient: 'linear-gradient(160deg, #134e5e 0%, #71b280 100%)',
    images: [],
  },
  {
    id: 'salsa',
    icon: '💃',
    label: 'Salsa',
    line1: 'Dancing since 2018',
    line2: 'LA style & Cuban',
    tall: true,
    gradient: 'linear-gradient(160deg, #b91c1c 0%, #f59e0b 100%)',
    images: [],
  },
  {
    id: 'whisky',
    icon: '🥃',
    label: 'Whisky Tasting',
    line1: '50+ single malts tried',
    line2: 'Islay is home',
    tall: false,
    gradient: 'linear-gradient(160deg, #431407 0%, #9a3412 100%)',
    images: [],
  },
  {
    id: 'drives',
    icon: '🚗',
    label: 'Long Drives',
    line1: 'Solo highway therapy',
    line2: 'Music, podcasts & silence',
    tall: false,
    gradient: 'linear-gradient(160deg, #0f0c29 0%, #302b63 100%)',
    images: [],
  },
  {
    id: 'scifi',
    icon: '🚀',
    label: 'Sci-fi Shows',
    line1: 'Dark · Severance · Westworld',
    line2: 'Always watching something',
    tall: false,
    gradient: 'linear-gradient(160deg, #0a0a2e 0%, #4a0e8f 100%)',
    images: [],
  },
];

// ── TILE COMPONENT ─────────────────────────────────────────────────────────────
function PinterestTile({ item, delay, inView }) {
  const [imgIdx, setImgIdx] = useState(0);
  const hasImages = item.images?.length > 0;
  const multiImage = hasImages && item.images.length > 1;

  useEffect(() => {
    if (!multiImage) return;
    // Stagger start times so tiles don't all cycle together
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setImgIdx(i => (i + 1) % item.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }, delay * 550);
    return () => clearTimeout(start);
  }, [multiImage, item.images?.length, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: delay * 0.06 }}
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        background: item.gradient,
        gridRow: item.tall ? 'span 2' : 'span 1',
      }}
    >
      {/* Cycling image */}
      {hasImages && (
        <img
          key={imgIdx}
          src={item.images[imgIdx]}
          alt={item.label}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            animation: 'tileImgIn 0.75s ease forwards',
          }}
        />
      )}

      {/* Placeholder icon when no images uploaded yet */}
      {!hasImages && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 48, opacity: 0.22,
          userSelect: 'none',
        }}>
          {item.icon}
        </div>
      )}

      {/* Bottom gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 45%, transparent 72%)',
        pointerEvents: 'none',
      }} />

      {/* Text */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 14px 14px',
      }}>
        <div style={{
          fontSize: 13, fontWeight: 700, color: '#fff',
          lineHeight: 1.35, letterSpacing: '-0.01em',
        }}>
          {item.label}
        </div>
        {item.line1 && (
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.68)', marginTop: 3, lineHeight: 1.35 }}>
            {item.line1}
          </div>
        )}
        {item.line2 && (
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.45)', marginTop: 2, lineHeight: 1.3 }}>
            {item.line2}
          </div>
        )}
      </div>

      {/* Image-cycling progress dots */}
      {multiImage && (
        <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 3 }}>
          {item.images.map((_, i) => (
            <div key={i} style={{
              width: i === imgIdx ? 14 : 4,
              height: 4, borderRadius: 2,
              background: i === imgIdx ? '#fff' : 'rgba(255,255,255,0.35)',
              transition: 'all 400ms ease',
            }} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── SECTION ────────────────────────────────────────────────────────────────────
export default function BeyondWork() {
  const [ref, inView] = useInView();

  return (
    <section
      id="beyond"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-background-primary)', transition: 'var(--transition-colors)' }}
    >
      <div className="container">
        <SectionLabel>Beyond Work</SectionLabel>
        <motion.h2
          className="section-heading"
          style={{ marginBottom: 32 }}
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={fadeUp.transition}
        >
          The human behind <em>the products.</em>
        </motion.h2>

        {/* Pinterest-style image tile grid */}
        <div
          className="interests-pinterest"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '170px',
            gap: 12,
          }}
        >
          {interests.map((item, i) => (
            <PinterestTile key={item.id} item={item} delay={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tileImgIn {
          from { opacity: 0; transform: scale(1.05); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 900px) {
          .interests-pinterest { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .interests-pinterest {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 130px !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
