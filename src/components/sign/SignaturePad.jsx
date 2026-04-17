import React, { useState, useRef, useEffect } from 'react';
import { Accordion, Form, Button } from 'react-bootstrap';
import palette from '../../theme/palette';

/* ── Font imports ── */
import '@fontsource/great-vibes';
import '@fontsource/sacramento';
import '@fontsource/tangerine/700.css';
import '@fontsource/allura';
import '@fontsource/dancing-script/700.css';
import '@fontsource/satisfy';
import '@fontsource/kaushan-script';
import '@fontsource/pacifico';
import '@fontsource/lobster';
import '@fontsource/caveat/700.css';
import '@fontsource/indie-flower';
import '@fontsource/patrick-hand';
import '@fontsource/permanent-marker';
import '@fontsource/rock-salt';

/* ── Exported constants ── */
export const FONT_CATEGORIES = [
  { label: 'Elegant',     icon: 'bi-stars',   fonts: [
    { id: 'great-vibes',  label: 'Great Vibes',  family: '"Great Vibes", cursive',  weight: '400' },
    { id: 'sacramento',   label: 'Sacramento',   family: '"Sacramento", cursive',   weight: '400' },
    { id: 'tangerine',    label: 'Tangerine',    family: '"Tangerine", cursive',    weight: '700' },
    { id: 'allura',       label: 'Allura',       family: '"Allura", cursive',       weight: '400' },
  ]},
  { label: 'Script',      icon: 'bi-pen',     fonts: [
    { id: 'dancing',   label: 'Dancing Script', family: '"Dancing Script", cursive', weight: '700' },
    { id: 'satisfy',   label: 'Satisfy',        family: '"Satisfy", cursive',        weight: '400' },
    { id: 'kaushan',   label: 'Kaushan Script', family: '"Kaushan Script", cursive', weight: '400' },
    { id: 'pacifico',  label: 'Pacifico',       family: '"Pacifico", cursive',       weight: '400' },
    { id: 'lobster',   label: 'Lobster',        family: '"Lobster", cursive',        weight: '400' },
  ]},
  { label: 'Handwriting', icon: 'bi-pencil',  fonts: [
    { id: 'caveat',        label: 'Caveat',        family: '"Caveat", cursive',          weight: '700' },
    { id: 'indie-flower',  label: 'Indie Flower',  family: '"Indie Flower", cursive',    weight: '400' },
    { id: 'patrick-hand',  label: 'Patrick Hand',  family: '"Patrick Hand", sans-serif', weight: '400' },
  ]},
  { label: 'Bold & Fun',  icon: 'bi-brush',   fonts: [
    { id: 'permanent-marker', label: 'Permanent Marker', family: '"Permanent Marker", cursive', weight: '400' },
    { id: 'rock-salt',        label: 'Rock Salt',        family: '"Rock Salt", cursive',        weight: '400' },
  ]},
];
export const FONTS_FLAT = FONT_CATEGORIES.flatMap(c => c.fonts);
export const COLORS = [
  { id: 'black',  label: 'Black',      hex: '#111827' },
  { id: 'navy',   label: 'Navy Blue',  hex: '#1e3a8a' },
  { id: 'red',    label: 'Dark Red',   hex: '#991b1b' },
  { id: 'green',  label: 'Dark Green', hex: '#14532d' },
  { id: 'purple', label: 'Purple',     hex: '#581c87' },
  { id: 'teal',   label: 'Teal',       hex: '#134e4a' },
];

const PEN_LABELS   = ['Hairline', 'Fine', 'Regular', 'Medium', 'Bold', 'Heavy', 'Marker', 'Brush'];
const PREVIEW_PX   = 62;
const EXPORT_PX    = 100;

/* ── Pure-sync canvas draw (no async — fonts must already be loaded) ── */
const drawToCanvas = (text, fontFamily, colorHex, fontSize, fontWeight, penWeight) => {
  const strokeW = penWeight <= 1 ? 0 : (penWeight - 1) * 1.4;
  const extra   = Math.ceil(strokeW) + 8;
  const padX    = 20 + extra;
  const textY   = fontSize + extra;
  const tmp = document.createElement('canvas');
  const ctx = tmp.getContext('2d');
  ctx.font   = `${fontWeight} ${fontSize}px ${fontFamily}`;
  tmp.width  = Math.ceil(ctx.measureText(text).width) + padX * 2;
  tmp.height = Math.ceil(fontSize * 1.5) + extra * 2;
  ctx.font   = `${fontWeight} ${fontSize}px ${fontFamily}`;
  if (strokeW > 0.3) {
    ctx.strokeStyle = colorHex; ctx.lineWidth = strokeW * 2;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.strokeText(text, padX, textY);
  }
  ctx.fillStyle = colorHex;
  ctx.fillText(text, padX, textY);
  return { canvas: tmp, dataUrl: tmp.toDataURL('image/png') };
};

/* Async version with font-load guard — used for high-res PDF export */
export const buildSigCanvas = async (text, fontFamily, colorHex, fontSize, fontWeight, penWeight = 1) => {
  await document.fonts.load(`${fontWeight} ${fontSize}px ${fontFamily}`).catch(() => {});
  return drawToCanvas(text, fontFamily, colorHex, fontSize, fontWeight, penWeight);
};

/* ── Component ──────────────────────────────────────────────────────────
 * Props:
 *   colorHex – ink colour (managed by parent)
 *   onChange – ({ dataUrl, aspectRatio, getHighRes }) => void
 * ─────────────────────────────────────────────────────────────────────── */
const SignaturePad = ({ colorHex, onChange }) => {
  const [mode,      setMode]      = useState('type');
  const [sigText,   setSigText]   = useState('');
  const [sigFont,   setSigFont]   = useState('dancing');
  const [penWeight, setPenWeight] = useState(2);   // 1-8: stroke thickness in type mode
  const [brushSize, setBrushSize] = useState(3);   // 1-16: stroke px in draw mode
  const [hasDrawn,  setHasDrawn]  = useState(false);

  const previewRef = useRef(null);
  const drawRef    = useRef(null);
  const isDrawing  = useRef(false);
  const lastPos    = useRef(null);
  const cbRef      = useRef(onChange);
  useEffect(() => { cbRef.current = onChange; });

  const activeFont     = FONTS_FLAT.find(f => f.id === sigFont) ?? FONTS_FLAT[0];
  const activeCatLabel = FONT_CATEGORIES.find(c => c.fonts.some(f => f.id === sigFont))?.label ?? 'Script';

  /* Preload every font family once on mount so drawToCanvas runs synchronously */
  useEffect(() => {
    FONTS_FLAT.forEach(f =>
      document.fonts.load(`${f.weight} ${EXPORT_PX}px ${f.family}`).catch(() => {}),
    );
  }, []);

  /* ── Synchronous type-mode render (instant on every state change) ── */
  useEffect(() => {
    if (mode !== 'type') return;
    const text = sigText.trim() || 'Your Signature';
    const { canvas: src, dataUrl } = drawToCanvas(
      text, activeFont.family, colorHex, PREVIEW_PX, activeFont.weight, penWeight,
    );
    const cv = previewRef.current;
    if (cv) { cv.width = src.width; cv.height = src.height; cv.getContext('2d').drawImage(src, 0, 0); }
    cbRef.current({
      dataUrl,
      aspectRatio: src.width / src.height,
      getHighRes:  () => buildSigCanvas(text, activeFont.family, colorHex, EXPORT_PX, activeFont.weight, penWeight)
                          .then(r => r.dataUrl),
    });
  }, [mode, sigText, sigFont, penWeight, colorHex]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Draw mode: reset canvas on switch ── */
  useEffect(() => {
    if (mode !== 'draw') return;
    const cv = drawRef.current;
    if (cv) cv.getContext('2d').clearRect(0, 0, cv.width, cv.height);
    setHasDrawn(false);
    cbRef.current({ dataUrl: '', aspectRatio: 4, getHighRes: async () => drawRef.current?.toDataURL('image/png') ?? '' });
  }, [mode]);

  const exportDraw = () => {
    const cv = drawRef.current;
    if (!cv) return;
    const dataUrl = cv.toDataURL('image/png');
    cbRef.current({ dataUrl, aspectRatio: cv.width / cv.height, getHighRes: async () => dataUrl });
  };

  const getPos = (e) => {
    const cv   = drawRef.current;
    const rect = cv.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - rect.left) * (cv.width / rect.width), y: (src.clientY - rect.top) * (cv.height / rect.height) };
  };

  const onDrawStart = (e) => {
    e.preventDefault();
    if (!hasDrawn) setHasDrawn(true);
    const cv    = drawRef.current;
    const scale = cv.width / cv.getBoundingClientRect().width;
    const pos   = getPos(e);
    isDrawing.current = true; lastPos.current = pos;
    const ctx = cv.getContext('2d');
    ctx.beginPath(); ctx.arc(pos.x, pos.y, (brushSize * scale) / 2, 0, Math.PI * 2);
    ctx.fillStyle = colorHex; ctx.fill();
  };

  const onDrawMove = (e) => {
    e.preventDefault();
    if (!isDrawing.current || !lastPos.current) return;
    const cv    = drawRef.current;
    const scale = cv.width / cv.getBoundingClientRect().width;
    const pos   = getPos(e);
    const ctx   = cv.getContext('2d');
    ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y); ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = colorHex; ctx.lineWidth = brushSize * scale;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    lastPos.current = pos;
  };

  const onDrawEnd = () => { isDrawing.current = false; lastPos.current = null; exportDraw(); };

  const clearDraw = () => {
    const cv = drawRef.current;
    if (!cv) return;
    cv.getContext('2d').clearRect(0, 0, cv.width, cv.height);
    setHasDrawn(false);
    cbRef.current({ dataUrl: '', aspectRatio: 4, getHighRes: async () => '' });
  };

  const penBarH = Math.max(1.5, (penWeight - 1) * 1.6);

  /* ── Render ── */
  return (
    <div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${palette.border.default}`, marginBottom: 28 }}>
        {[{ id: 'type', label: 'Type', icon: 'bi-keyboard' }, { id: 'draw', label: 'Draw', icon: 'bi-pen-fill' }].map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            flex: 1, padding: '13px 0', border: 'none', cursor: 'pointer', transition: 'background 0.18s, color 0.18s',
            background: mode === m.id ? palette.primary : 'transparent',
            color: mode === m.id ? '#fff' : palette.text.muted,
            fontWeight: 700, fontSize: '0.92rem',
          }}>
            <i className={`bi ${m.icon} me-2`} />{m.label}
          </button>
        ))}
      </div>

      {/* ══ TYPE MODE ══ */}
      {mode === 'type' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Name input */}
          <div>
            <label className="fw-semibold small d-block mb-2">Your name</label>
            <Form.Control
              type="text" placeholder="e.g. John Smith"
              value={sigText} onChange={e => setSigText(e.target.value)}
              maxLength={60} style={{ fontSize: '1rem', borderRadius: 10, padding: '10px 14px' }}
            />
          </div>

          {/* Pen size — controls stroke thickness only, not text size */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label className="fw-semibold small mb-0">
                <i className="bi bi-pen me-1" style={{ color: palette.text.muted }} />Pen Size
              </label>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: palette.primary }}>{PEN_LABELS[penWeight - 1]}</span>
            </div>
            <Form.Range min={1} max={8} step={1} value={penWeight} onChange={e => setPenWeight(+e.target.value)} />
            {/* Live bar — height grows as stroke thickens */}
            <div style={{ height: penBarH, background: colorHex, borderRadius: 8, marginTop: 6, transition: 'height 0.1s, background 0.15s', boxShadow: penWeight > 4 ? `0 2px 8px ${colorHex}44` : 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: '0.68rem', color: palette.text.muted }}>
              <span>Hairline</span><span>Brush</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: palette.border.default }} />

          {/* Font accordion */}
          <div>
            <label className="fw-semibold small d-block mb-2">Style</label>
            <Accordion defaultActiveKey={activeCatLabel} flush>
              {FONT_CATEGORIES.map(cat => {
                const hasSel = cat.fonts.some(f => f.id === sigFont);
                return (
                  <Accordion.Item key={cat.label} eventKey={cat.label} style={{
                    border: `1.5px solid ${hasSel ? palette.primary + '44' : palette.border.default}`,
                    borderRadius: 10, marginBottom: 8, overflow: 'hidden',
                  }}>
                    <Accordion.Header>
                      <i className={`bi ${cat.icon} me-2`} style={{ color: palette.primary, fontSize: '0.85rem' }} />
                      <span style={{ fontWeight: 700, fontSize: '0.88rem', flex: 1 }}>{cat.label}</span>
                      {hasSel && <span style={{ fontSize: '0.65rem', padding: '2px 9px', borderRadius: 20, background: `${palette.primary}15`, color: palette.primary, fontWeight: 700, marginRight: 8 }}>Active</span>}
                    </Accordion.Header>
                    <Accordion.Body style={{ padding: '8px 10px 12px', background: `${palette.surface.overlay}80` }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {cat.fonts.map(font => (
                          <div key={font.id} onClick={() => setSigFont(font.id)} style={{
                            padding: '10px 14px', borderRadius: 9, cursor: 'pointer', transition: 'all 0.13s',
                            border: sigFont === font.id ? `2px solid ${palette.primary}` : `1.5px solid transparent`,
                            background: sigFont === font.id ? `${palette.primary}0a` : palette.surface.base,
                            display: 'flex', alignItems: 'center', gap: 10,
                            boxShadow: sigFont === font.id ? `0 2px 8px ${palette.primary}20` : '0 1px 3px rgba(0,0,0,0.05)',
                          }}>
                            <span style={{ fontFamily: font.family, fontWeight: font.weight, fontSize: '1.5rem', color: colorHex, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.35 }}>
                              {sigText.trim() || 'Your Signature'}
                            </span>
                            <span style={{ fontSize: '0.62rem', color: palette.text.muted, flexShrink: 0 }}>{font.label}</span>
                            <i className={`bi ${sigFont === font.id ? 'bi-check-circle-fill text-primary' : 'bi-circle'}`}
                              style={{ flexShrink: 0, fontSize: '0.9rem', opacity: sigFont === font.id ? 1 : 0.22 }} />
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: palette.border.default }} />

          {/* Live preview */}
          <div>
            <label className="fw-semibold small d-block mb-2">Preview</label>
            <div style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', border: `1.5px solid ${palette.border.default}`, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <canvas ref={previewRef} style={{ maxWidth: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      )}

      {/* ══ DRAW MODE ══ */}
      {mode === 'draw' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Brush size */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label className="fw-semibold small mb-0">
                <i className="bi bi-brush me-1" style={{ color: palette.text.muted }} />Brush Size
              </label>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: Math.max(5, brushSize * 2.2), height: Math.max(5, brushSize * 2.2), borderRadius: '50%', background: colorHex, display: 'inline-block', border: '1px solid rgba(0,0,0,0.1)', transition: 'all 0.1s', flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: palette.primary }}>{brushSize}px</span>
              </span>
            </div>
            <Form.Range min={1} max={16} step={1} value={brushSize} onChange={e => setBrushSize(+e.target.value)} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: '0.68rem', color: palette.text.muted }}>
              <span>Fine</span><span>Thick</span>
            </div>
          </div>

          {/* Drawing canvas */}
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${palette.border.default}`, background: '#fff', touchAction: 'none' }}>
            <canvas ref={drawRef} width={800} height={340}
              onMouseDown={onDrawStart} onMouseMove={onDrawMove} onMouseUp={onDrawEnd} onMouseLeave={onDrawEnd}
              onTouchStart={onDrawStart} onTouchMove={onDrawMove} onTouchEnd={onDrawEnd}
              style={{ width: '100%', display: 'block', cursor: 'crosshair', touchAction: 'none', userSelect: 'none' }} />
            {!hasDrawn && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, pointerEvents: 'none' }}>
                <i className="bi bi-pen" style={{ fontSize: '2rem', color: palette.border.strong, opacity: 0.4 }} />
                <span style={{ fontSize: '0.85rem', color: palette.text.muted, opacity: 0.55 }}>Sign with finger or mouse</span>
              </div>
            )}
            {/* Baseline guide */}
            <div style={{ position: 'absolute', bottom: 60, left: '8%', right: '8%', height: 1, background: palette.border.default, pointerEvents: 'none' }} />
          </div>

          {/* Controls row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button variant="outline-danger" size="sm" onClick={clearDraw} style={{ borderRadius: 8 }}>
              <i className="bi bi-arrow-counterclockwise me-1" />Clear
            </Button>
            {hasDrawn && (
              <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                <i className="bi bi-check-circle-fill" />Signature captured
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
