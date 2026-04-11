import { useEffect, useRef, useState } from 'react';

/**
 * SwipeDots — pager dots above a horizontal scroll container.
 * Pass a ref to the scroll container via `scrollRef`.
 * On mobile, tracks scroll position to highlight the active dot.
 */
export default function SwipeDots({ scrollRef, count }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollRef?.current;
    if (!el) return;
    const handler = () => {
      const cardWidth = el.scrollWidth / count;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(idx, count - 1));
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, [scrollRef, count]);

  return (
    <div className="mobile-swipe-dots" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={i === active ? 'active' : ''} />
      ))}
    </div>
  );
}
