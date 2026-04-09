import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&#]+)/);
  return match ? match[1] : null;
}

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const isYoutube = item?.type === 'youtube';
  const youtubeId = isYoutube ? getYouTubeId(item.url) : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.88)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <motion.div
            key="lightbox-content"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#1c1c1e',
              borderRadius: 16,
              overflow: 'hidden',
              maxWidth: isYoutube ? 900 : 680,
              width: '100%',
              border: '0.5px solid #2a2a2a',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 20px',
              borderBottom: '0.5px solid #2a2a2a',
            }}>
              <span style={{ fontSize: 13, color: '#a1a1a6', fontWeight: 500 }}>
                {item.label}
                {item.company && ` · ${item.company}`}
              </span>
              <button
                onClick={onClose}
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: '#2c2c2e', color: '#a1a1a6',
                  fontSize: 16, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>

            {/* Body */}
            {isYoutube && youtubeId ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  title={item.label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            ) : (
              <div style={{
                height: 340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                background: '#111',
              }}>
                <span style={{ fontSize: 48 }}>
                  {item.type === 'video' ? '▶' : item.type === 'pdf' ? '📄' : '🖼'}
                </span>
                <span style={{ fontSize: 14, color: '#6e6e73', textAlign: 'center', padding: '0 32px' }}>
                  {item.label} — placeholder media
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}