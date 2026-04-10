import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Web3Forms — paste your access key here (or in .env as VITE_WEB3FORMS_KEY)
// Get your free key in 30 seconds: https://web3forms.com → enter 92.aashish@gmail.com → check inbox
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

const easeStd = [0.25, 0.1, 0.25, 1];

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: "Let's connect",
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setSent(false);
      setError('');
      setForm({ name: '', email: '', subject: "Let's connect", message: '' });
      setTimeout(() => firstInputRef.current?.focus(), 120);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setError('');
  }

  function validate() {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.';
    if (!form.subject.trim()) return 'Please enter a subject.';
    if (!form.message.trim()) return 'Please write a message.';
    return null;
  }

  async function handleSend() {
    const err = validate();
    if (err) { setError(err); return; }

    setSending(true);
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name:       form.name,
          email:      form.email,
          subject:    form.subject,
          message:    form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (e) {
      console.error(e);
      setError('Could not send right now. Please email me directly at 92.aashish@gmail.com');
    } finally {
      setSending(false);
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 13px',
    fontSize: 14,
    fontFamily: 'var(--font-sans)',
    color: 'var(--color-text-primary)',
    background: 'var(--color-background-secondary)',
    border: '1px solid var(--color-border-tertiary)',
    borderRadius: 10,
    outline: 'none',
    transition: 'border-color 150ms ease',
    boxSizing: 'border-box',
    resize: 'none',
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />

          {/* Centering wrapper */}
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1001,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
            pointerEvents: 'none',
          }}>
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.28, ease: easeStd }}
              style={{
                pointerEvents: 'auto',
                width: '100%',
                maxWidth: 480,
                background: 'var(--color-background-primary)',
                borderRadius: 20,
                boxShadow: '0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div style={{
                padding: '22px 24px 18px',
                borderBottom: '0.5px solid var(--color-border-tertiary)',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', letterSpacing: '-0.02em', marginBottom: 3 }}>
                    Get in touch
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                    Drop a note — I read every message.
                  </div>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--color-background-tertiary)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, color: 'var(--color-text-tertiary)',
                    flexShrink: 0, marginLeft: 12,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '20px 24px 24px' }}>
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', padding: '20px 0 12px' }}
                  >
                    <div style={{ fontSize: 40, marginBottom: 14 }}>🙏</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8 }}>
                      Thanks for reaching out!
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
                      I have received your mail. I'll get back to you soon on this.
                    </div>
                    <button onClick={onClose} className="btn btn-accent" style={{ fontSize: 13 }}>
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 }}>Your name</label>
                        <input
                          ref={firstInputRef}
                          type="text"
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={e => set('name', e.target.value)}
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                          onBlur={e => e.target.style.borderColor = 'var(--color-border-tertiary)'}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 }}>Your email</label>
                        <input
                          type="email"
                          placeholder="jane@company.com"
                          value={form.email}
                          onChange={e => set('email', e.target.value)}
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                          onBlur={e => e.target.style.borderColor = 'var(--color-border-tertiary)'}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 }}>Subject</label>
                      <input
                        type="text"
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={e => set('subject', e.target.value)}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--color-border-tertiary)'}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 }}>Message</label>
                      <textarea
                        rows={5}
                        placeholder="Hi Aashish, I'd love to talk about..."
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        style={{ ...inputStyle, lineHeight: 1.6 }}
                        onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--color-border-tertiary)'}
                      />
                    </div>

                    {error && (
                      <div style={{ fontSize: 12, color: '#e53935', fontWeight: 500 }}>⚠ {error}</div>
                    )}

                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
                      <button onClick={onClose} className="btn btn-outline" style={{ fontSize: 13, padding: '9px 20px' }}>
                        Cancel
                      </button>
                      <button
                        onClick={handleSend}
                        className="btn btn-accent"
                        disabled={sending}
                        style={{ fontSize: 13, padding: '9px 24px', opacity: sending ? 0.7 : 1 }}
                      >
                        {sending ? 'Sending…' : 'Send message ↗'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
