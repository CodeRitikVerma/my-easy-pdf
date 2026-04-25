'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import palette from '@/theme/palette';
import useIsMobile from '@/hooks/useIsMobile';

const useWindowWidth = () => {
  const [width, setWidth] = useState(1200);
  useEffect(() => {
    setWidth(window.innerWidth);
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
};

const ActiveItem = ({ item, color, onClose, compact }) => (
  <Link href={item.href} onClick={onClose} style={{
    display: 'flex', alignItems: 'center', gap: 10,
    padding: compact ? '10px 8px' : '7px 8px', borderRadius: 8,
    textDecoration: 'none', color: palette.text.secondary,
    transition: 'background 0.15s, color 0.15s', minHeight: compact ? 44 : 'auto',
  }}
  onMouseEnter={e => { e.currentTarget.style.background = `${color}10`; e.currentTarget.style.color = color; }}
  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = palette.text.secondary; }}>
    <span style={{ width: 28, height: 28, borderRadius: 7, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <i className={`bi ${item.icon}`} aria-hidden="true" style={{ fontSize: '0.82rem', color }} />
    </span>
    <span style={{ fontSize: compact ? '0.88rem' : '0.84rem', fontWeight: 500, lineHeight: 1.2 }}>{item.name}</span>
  </Link>
);

const SoonItem = ({ item, compact }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: compact ? '10px 8px' : '7px 8px', borderRadius: 8, opacity: 0.45, cursor: 'default', minHeight: compact ? 44 : 'auto' }}>
    <span style={{ width: 28, height: 28, borderRadius: 7, background: palette.surface.overlay, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <i className={`bi ${item.icon}`} aria-hidden="true" style={{ fontSize: '0.82rem', color: palette.text.muted }} />
    </span>
    <span style={{ fontSize: compact ? '0.88rem' : '0.84rem', color: palette.text.muted, flex: 1, lineHeight: 1.2 }}>{item.name}</span>
    <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', borderRadius: 20, background: palette.indigo[50], color: palette.indigo[500], whiteSpace: 'nowrap', flexShrink: 0 }}>Soon</span>
  </div>
);

const CategoryCard = ({ cat, onClose, compact }) => {
  const color = cat.color || palette.primary;
  return (
    <div style={{ background: palette.surface.base, borderRadius: 14, border: `1px solid ${palette.border.default}`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: compact ? '12px 14px 10px' : '14px 16px 10px', borderBottom: `1px solid ${palette.border.default}`, background: `${color}08`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 36, height: 36, borderRadius: 10, background: `${color}20`, border: `1.5px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <i className={`bi ${cat.icon}`} aria-hidden="true" style={{ fontSize: '1rem', color }} />
        </span>
        <span style={{ fontWeight: 700, fontSize: compact ? '0.9rem' : '0.85rem', color: palette.text.primary, lineHeight: 1.2 }}>{cat.title}</span>
      </div>
      <div style={{ padding: '6px 8px 10px' }}>
        {cat.items.map((item, ii) =>
          item.href === '#'
            ? <SoonItem key={ii} item={item} compact={compact} />
            : <ActiveItem key={ii} item={item} color={color} onClose={onClose} compact={compact} />
        )}
      </div>
    </div>
  );
};

const MegaMenu = ({ categories, onClose, onMouseEnter, onMouseLeave }) => {
  const isMobile = useIsMobile();
  const winWidth = useWindowWidth();
  const visible  = categories.filter(c => !c.mobileOnly || isMobile);
  const cols     = winWidth < 480 ? 1 : winWidth < 768 ? 2 : 5;
  const compact  = winWidth < 768;
  const pad      = winWidth < 480 ? '12px' : winWidth < 768 ? '14px' : '20px 24px 24px';

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', top: 56, left: 0, right: 0, bottom: 0, zIndex: 1040, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)' }} />
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ position: 'fixed', top: 56, left: 0, right: 0, zIndex: 1041, display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 56px)', background: palette.surface.raised, boxShadow: '0 16px 48px rgba(15,23,42,0.18)' }}>
        <div style={{ height: 3, background: palette.gradient.primary, flexShrink: 0 }} />
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: compact ? '12px 16px' : '16px 28px 14px', borderBottom: `1px solid ${palette.border.default}`, background: palette.surface.base, boxShadow: '0 2px 8px rgba(15,23,42,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: compact ? 30 : 34, height: compact ? 30 : 34, borderRadius: 9, background: palette.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className="bi bi-grid-fill" aria-hidden="true" style={{ color: 'white', fontSize: compact ? '0.8rem' : '0.9rem' }} />
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: compact ? '0.9rem' : '0.95rem', color: palette.text.primary, lineHeight: 1.2 }}>All PDF Tools</div>
              {!compact && <div style={{ fontSize: '0.75rem', color: palette.text.muted }}>Everything you need to work with PDFs</div>}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close menu" style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${palette.border.strong}`, background: 'transparent', color: palette.text.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = palette.surface.overlay; e.currentTarget.style.color = palette.text.primary; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = palette.text.muted; }}>
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>
        <div className="mega-scroll" style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ padding: pad, maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: compact ? 10 : 16 }}>
              {visible.map((cat, ci) => <CategoryCard key={ci} cat={cat} onClose={onClose} compact={compact} />)}
            </div>
          </div>
          <div style={{ padding: compact ? '10px 16px 12px' : '10px 28px 14px', borderTop: `1px solid ${palette.border.default}`, background: palette.surface.base, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <i className="bi bi-rocket-takeoff" aria-hidden="true" style={{ color: palette.indigo[400], fontSize: '0.8rem' }} />
            <span style={{ fontSize: '0.75rem', color: palette.text.muted, textAlign: 'center' }}>
              Features marked <strong style={{ color: palette.indigo[500] }}>Soon</strong> are coming in future updates
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenu;
