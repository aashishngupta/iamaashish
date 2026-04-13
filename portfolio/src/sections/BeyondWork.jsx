import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';
import { Plane, Dumbbell, Coffee, Users, Wine, Car, Sunrise, Search, Mic, Rocket } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } };

// ── INTERESTS ─────────────────────────────────────────────────────────────────
// Add your photos to /public/beyond/ and list paths in the `images` array.
// e.g. images: ['/beyond/travel-1.jpg', '/beyond/travel-2.jpg']
// Each tile auto-cycles through its images every ~4 seconds.
const interests = [
  {
    id: 'travel',
    Icon: Plane,
    label: 'Travel',
    line1: '13+ countries. Every trip, alone.',
    line2: 'Solo travel made the world feel conquerable. And raised the bar on everything else.',
    tall: true,
    gradient: 'linear-gradient(160deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    images: [
      // '/beyond/travel-1.jpg',
      // '/beyond/travel-2.jpg',
    ],
  },
  {
    id: 'fitness',
    Icon: Dumbbell,
    label: 'Fitness',
    line1: 'In the gym since 2012. Five days a week.',
    line2: 'The only place where feedback is instant and there are no shortcuts.',
    tall: false,
    gradient: 'linear-gradient(160deg, #c94b4b 0%, #4b134f 100%)',
    images: [],
  },
  {
    id: 'coffee',
    Icon: Coffee,
    label: 'Coffee Connoisseur',
    line1: 'Black. No sugar. No exceptions.',
    line2: 'Not about the caffeine. The 10 minutes of forced stillness before the day begins.',
    tall: false,
    gradient: 'linear-gradient(160deg, #2c1a0e 0%, #7c4a1e 100%)',
    images: [],
  },
  {
    id: 'networking',
    Icon: Users,
    label: 'Networking',
    line1: 'Intentional about every room I enter',
    line2: 'One honest conversation has changed more for me than months of strategy docs.',
    tall: false,
    gradient: 'linear-gradient(160deg, #0d2137 0%, #1a4a6e 100%)',
    images: [],
  },
  {
    id: 'whisky',
    Icon: Wine,
    label: 'Whisky Tasting',
    line1: '50+ single malts and counting',
    line2: 'Peaty, complex, and completely unapologetic. The good ones always are.',
    tall: false,
    gradient: 'linear-gradient(160deg, #431407 0%, #9a3412 100%)',
    images: [],
  },
  {
    id: 'drives',
    Icon: Car,
    label: 'Long Drives',
    line1: 'No destination. Just miles ahead.',
    line2: 'My clearest thinking happens at 100kmph with nothing but road and a good playlist.',
    tall: false,
    gradient: 'linear-gradient(160deg, #0f0c29 0%, #302b63 100%)',
    images: [],
  },
  {
    id: 'spirituality',
    Icon: Sunrise,
    label: 'Spirituality',
    line1: 'Going inward is not optional for me',
    line2: 'Staying calm when everything is moving fast was not a gift. It was built, daily.',
    tall: true,
    gradient: 'linear-gradient(160deg, #1a0533 0%, #3b1f6e 50%, #0d1a3a 100%)',
    images: [],
  },
  {
    id: 'decoding',
    Icon: Search,
    label: 'Decoding Businesses',
    line1: 'I cannot enter a business without breaking it down',
    line2: 'Every store, every product. I am always asking what the real game is.',
    tall: false,
    gradient: 'linear-gradient(160deg, #052e16 0%, #065f46 100%)',
    images: [],
  },
  {
    id: 'podcasts',
    Icon: Mic,
    label: 'Podcasts',
    line1: 'My most used app. Every single day.',
    line2: 'I grew up without easy access to mentors. Podcasts became how I found them.',
    tall: false,
    gradient: 'linear-gradient(160deg, #1e0a3c 0%, #5b21b6 100%)',
    images: [],
  },
  {
    id: 'scifi',
    Icon: Rocket,
    label: 'Sci-fi Shows',
    line1: 'Dark. Severance. Westworld.',
    line2: 'Shows that make you question everything are the only kind worth finishing.',
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
          alt={`Aashish Kumar Gupta — ${item.label}`}
          loading="lazy"
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
          opacity: 0.22,
          userSelect: 'none',
        }}>
          <item.Icon size={44} strokeWidth={1.25} color="#ffffff" />
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
