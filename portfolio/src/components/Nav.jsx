import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['My Story', 'Work', 'Thinking', 'Now', 'Contact'];

export default function Nav({ theme, onToggleTheme }) {
  const logoSrc = theme === 'dark'
    ? '/aashish-logo/logo_white.svg'
    : '/aashish-logo/logo_black.svg';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  function scrollTo(id) {
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        background: scrolled ? 'var(--nav-bg-scrolled)' : 'transparent',
        borderBottom: scrolled ? '0.5px solid var(--color-border-tertiary)' : '0.5px solid transparent',
        transition: 'background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', padding: 0, margin: 0, background: 'none', border: 'none', cursor: 'pointer', outline: 'none', flexShrink: 0 }}
          >
            <img
              src={logoSrc}
              alt="Aashish Kumar Gupta"
              style={{ height: 40, width: 'auto', display: 'block', transition: 'opacity 200ms ease', marginLeft: '8px' }}
            />
          </button>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nav-desktop">
            {links.map(l => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                style={{ fontSize: 16, fontWeight: 'bold', color: 'var(--color-text-secondary)', transition: 'color 200ms ease' }}
                onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}
              >
                {l}
              </button>
            ))}
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>

          {/* Mobile right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="nav-mobile">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
              style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}
            >
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--color-text-primary)', transition: '300ms', transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--color-text-primary)', transition: '300ms', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--color-text-primary)', transition: '300ms', transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 60,
              left: 0,
              right: 0,
              background: 'var(--color-background-primary)',
              borderBottom: '0.5px solid var(--color-border-tertiary)',
              zIndex: 99,
              padding: '16px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {links.map(l => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                style={{
                  textAlign: 'left',
                  padding: '12px 0',
                  fontSize: 17,
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  borderBottom: '0.5px solid var(--color-border-tertiary)',
                  transition: 'var(--transition-colors)',
                }}
              >
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'var(--color-background-secondary)',
        border: '0.5px solid var(--color-border-tertiary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, transition: 'var(--transition-colors)',
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
