'use client';
import React, { useState, useRef } from 'react';
import palette from '@/theme/palette';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const SignatureCanvas = ({ pageImgUrl, sigImgUrl, sigAspectRatio, transformRef, initialTransform }) => {
  const containerRef = useRef(null);
  const [pos, setPos]   = useState({ x: 0, y: 0 });
  const [w,   setW]     = useState(0);
  const pinchRef        = useRef(null);

  const sync = (newPos, newW) => {
    const el = containerRef.current;
    if (!el || !transformRef) return;
    transformRef.current = { xFrac: newPos.x / el.clientWidth, yFrac: newPos.y / el.clientHeight, wFrac: newW / el.clientWidth };
  };

  const clampPos = (x, y, newW = w) => {
    const el = containerRef.current;
    if (!el) return { x, y };
    const sigH = newW / sigAspectRatio;
    return { x: clamp(x, 0, el.clientWidth - newW), y: clamp(y, 0, el.clientHeight - sigH) };
  };

  const apply = (newPos, newW) => { setPos(newPos); setW(newW); sync(newPos, newW); };

  const onPageLoad = () => {
    const el = containerRef.current;
    if (!el) return;
    const cW = el.clientWidth, cH = el.clientHeight;
    if (initialTransform?.wFrac) {
      const newW = initialTransform.wFrac * cW;
      apply({ x: clamp(initialTransform.xFrac * cW, 0, cW - newW), y: clamp(initialTransform.yFrac * cH, 0, cH - newW / sigAspectRatio) }, newW);
    } else {
      const initW = cW * 0.32, sigH = initW / sigAspectRatio;
      apply({ x: clamp(cW - initW - cW * 0.04, 0, cW - initW), y: clamp(cH - sigH - cH * 0.04, 0, cH - sigH) }, initW);
    }
  };

  const onDragDown = (e) => {
    e.preventDefault();
    const ox = e.clientX - pos.x, oy = e.clientY - pos.y;
    const onMove = (e) => { apply(clampPos(e.clientX - ox, e.clientY - oy), w); };
    const onUp   = ()  => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const onDragTouch = (e) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0], ox = t.clientX - pos.x, oy = t.clientY - pos.y;
    const onMove = (e) => { if (e.touches.length !== 1) return; const t = e.touches[0]; apply(clampPos(t.clientX - ox, t.clientY - oy), w); };
    const onEnd  = ()  => { document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onEnd); };
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  };

  const onResizeDown = (e) => {
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX, startW = w;
    const onMove = (e) => { const cW = containerRef.current.clientWidth; const newW = clamp(startW + (e.clientX - startX), 50, cW * 0.9); apply(clampPos(pos.x, pos.y, newW), newW); };
    const onUp   = ()  => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const onResizeTouch = (e) => {
    e.preventDefault(); e.stopPropagation();
    const startX = e.touches[0].clientX, startW = w;
    const onMove = (e) => { const cW = containerRef.current.clientWidth; const newW = clamp(startW + (e.touches[0].clientX - startX), 50, cW * 0.9); apply(clampPos(pos.x, pos.y, newW), newW); };
    const onEnd  = ()  => { document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onEnd); };
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  };

  const onContainerTouch = (e) => {
    if (e.touches.length !== 2) return;
    e.preventDefault();
    const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    pinchRef.current = { dist, startW: w };
    const onMove = (e) => {
      if (e.touches.length !== 2 || !pinchRef.current) return;
      e.preventDefault();
      const cW = containerRef.current.clientWidth;
      const newDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const newW = clamp(pinchRef.current.startW * (newDist / pinchRef.current.dist), 50, cW * 0.9);
      apply(clampPos(pos.x, pos.y, newW), newW);
    };
    const onEnd = () => { pinchRef.current = null; document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onEnd); };
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  };

  return (
    <div ref={containerRef} onTouchStart={onContainerTouch}
      style={{ position: 'relative', width: '100%', userSelect: 'none', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.18)', background: '#f0f0f0', touchAction: 'none' }}>
      {pageImgUrl
        ? <img src={pageImgUrl} alt="PDF page" onLoad={onPageLoad} draggable={false} style={{ width: '100%', display: 'block', pointerEvents: 'none' }} />
        : <div style={{ paddingTop: '141%' }} />}
      {sigImgUrl && w > 0 && (
        <div onMouseDown={onDragDown} onTouchStart={onDragTouch}
          style={{ position: 'absolute', left: pos.x, top: pos.y, width: w, cursor: 'move', zIndex: 10, touchAction: 'none' }}>
          <div style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)', background: palette.primary, color: '#fff', fontSize: '0.62rem', fontWeight: 600, padding: '2px 9px', borderRadius: 20, whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 12 }}>
            <i className="bi bi-arrows-move me-1"></i>Drag to move
          </div>
          <div style={{ border: `2px dashed ${palette.primary}99`, borderRadius: 4, padding: 2 }}>
            <img src={sigImgUrl} alt="Signature" draggable={false} style={{ width: '100%', display: 'block', pointerEvents: 'none' }} />
          </div>
          <div onMouseDown={onResizeDown} onTouchStart={onResizeTouch}
            style={{ position: 'absolute', bottom: -9, right: -9, width: 20, height: 20, background: palette.primary, borderRadius: '50%', border: '2.5px solid #fff', cursor: 'se-resize', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', touchAction: 'none', zIndex: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bi bi-arrows-angle-expand" style={{ fontSize: '0.5rem', color: '#fff' }}></i>
          </div>
        </div>
      )}
      {!sigImgUrl && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(2px)' }}>
          <p style={{ color: palette.text.muted, fontSize: '0.85rem', margin: 0 }}>
            <i className="bi bi-pen me-2"></i>Create your signature in Step 2 to preview
          </p>
        </div>
      )}
    </div>
  );
};

export default SignatureCanvas;
