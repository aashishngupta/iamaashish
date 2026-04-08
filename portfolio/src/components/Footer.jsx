const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aashish-kr-gupta' },
  { label: 'GitHub', href: 'https://github.com/aashishngupta' },
  { label: 'Instagram', href: 'https://instagram.com/aashishngupta.ai' },
];

export default function Footer() {
  return (
    <footer style={{
      background: '#0a0a0a',
      color: '#6e6e73',
      borderTop: '0.5px solid #1c1c1e',
      padding: '28px 0',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 13 }}>© 2026 Aashish Kumar Gupta</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: '#6e6e73', transition: 'color 200ms ease' }}
              onMouseEnter={e => e.target.style.color = '#f5f5f7'}
              onMouseLeave={e => e.target.style.color = '#6e6e73'}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
