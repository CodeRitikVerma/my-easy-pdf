'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { HexColorPicker } from 'react-colorful';
import { Container, Row, Col, Button, Alert, Spinner, Form, Badge } from 'react-bootstrap';
import { PDFDocument } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import SignatureCanvas from '@/components/SignatureCanvas';
import SignaturePad, { COLORS } from '@/components/sign/SignaturePad';
import palette from '@/theme/palette';

const getPdfJs = async () => {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  return pdfjsLib;
};

const renderPage = async (pdfjsDoc, pageNum, scale) => {
  const page = await pdfjsDoc.getPage(pageNum);
  const vp = page.getViewport({ scale });
  const cv = document.createElement('canvas');
  cv.width = vp.width; cv.height = vp.height;
  await page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
  return cv.toDataURL();
};

const StepHeader = ({ n, done, title, subtitle }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingBottom: 14, marginBottom: 18, borderBottom: `1.5px solid ${palette.border.default}` }}>
    <span style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? '#16a34a' : palette.primary, color: '#fff', fontWeight: 700, fontSize: '0.78rem', transition: 'background 0.3s' }}>
      {done ? <i className="bi bi-check-lg" /> : n}
    </span>
    <div>
      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: palette.text.primary, lineHeight: 1.3 }}>{title}</div>
      {subtitle && <div style={{ fontSize: '0.71rem', color: palette.text.muted, marginTop: 2 }}>{subtitle}</div>}
    </div>
  </div>
);

const PRESET_COLORS = [
  '#000000','#1f2937','#374151','#6b7280','#9ca3af','#f9fafb',
  '#7f1d1d','#dc2626','#f87171','#ec4899','#be185d','#fda4af',
  '#78350f','#b45309','#d97706','#f59e0b','#fb923c','#fef08a',
  '#14532d','#15803d','#16a34a','#22c55e','#34d399','#a7f3d0',
  '#1e3a8a','#1d4ed8','#3b82f6','#60a5fa','#38bdf8','#bae6fd',
];
const LIGHT_SWATCHES = new Set(['#f9fafb','#fda4af','#fef08a','#a7f3d0','#bae6fd','#9ca3af','#fb923c','#f59e0b']);
const getLum = (h) => {
  if (!/^#[0-9a-fA-F]{6}$/.test(h)) return 0;
  const r=parseInt(h.slice(1,3),16)/255, g=parseInt(h.slice(3,5),16)/255, b=parseInt(h.slice(5,7),16)/255;
  return 0.299*r + 0.587*g + 0.114*b;
};

const ColorPickerModal = ({ customColor, colorHex, onChange, onClose, onClear }) => {
  const [hexInput, setHexInput] = useState(customColor || colorHex);
  const [preview,  setPreview]  = useState(customColor || colorHex);

  useEffect(() => { const v = customColor || colorHex; setHexInput(v); setPreview(v); }, [customColor, colorHex]);
  useEffect(() => { const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = prev; }; }, []);

  const pick = (v) => { setPreview(v); setHexInput(v); onChange(v); };
  const commitHex = (raw) => {
    const v = raw.startsWith('#') ? raw : '#' + raw;
    setHexInput(v);
    if (/^#[0-9a-fA-F]{6}$/.test(v)) { setPreview(v); onChange(v); }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  const validHex = /^#[0-9a-fA-F]{6}$/.test(preview);
  const lum = getLum(preview);
  const onPrev = lum > 0.58 ? '#1f2937' : '#ffffff';

  const panel = (
    <div style={{ background: '#ffffff', borderRadius: isMobile ? '20px 20px 0 0' : 18, overflow: 'hidden', width: isMobile ? '100%' : 400, maxHeight: isMobile ? '88vh' : 'min(600px, calc(100vh - 48px))', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 72px rgba(15,23,42,0.28), 0 4px 20px rgba(15,23,42,0.10)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px 12px', borderBottom: `1px solid ${palette.border.default}`, flexShrink: 0 }}>
        <span style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: palette.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="bi bi-palette-fill" style={{ color: '#fff', fontSize: '0.9rem' }} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: palette.text.primary, lineHeight: 1.2 }}>Choose Ink Color</div>
          <div style={{ fontSize: '0.68rem', color: palette.text.muted, marginTop: 1 }}>Drag the picker or choose a preset</div>
        </div>
        <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: '50%', border: `1.5px solid ${palette.border.strong}`, background: 'transparent', color: palette.text.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.background='#fee2e2'; e.currentTarget.style.borderColor='#fca5a5'; e.currentTarget.style.color='#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor=palette.border.strong; e.currentTarget.style.color=palette.text.muted; }}>
          <i className="bi bi-x-lg" />
        </button>
      </div>

      <div style={{ overflowY: 'auto', flex: 1 }} className="thin-scroll">
        <div style={{ padding: '14px 16px 0' }}>
          <HexColorPicker color={validHex ? preview : '#000000'} onChange={pick} />
        </div>
        <div style={{ padding: '12px 16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: palette.surface.raised, borderRadius: 10, border: `1.5px solid ${palette.border.default}` }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: validHex ? preview : '#000', border: `2px solid ${palette.border.strong}`, boxShadow: '0 1px 4px rgba(0,0,0,0.15)', transition: 'background 0.1s' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: palette.text.muted, flexShrink: 0 }}>#</span>
            <input type="text" value={hexInput.startsWith('#') ? hexInput.slice(1).toUpperCase() : hexInput.toUpperCase()} maxLength={6} spellCheck={false} placeholder="000000" onChange={e => commitHex(e.target.value)}
              style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', fontSize: '0.95rem', fontFamily: 'monospace', fontWeight: 700, outline: 'none', color: palette.text.primary, letterSpacing: '0.1em' }} />
            <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 7px', borderRadius: 5, flexShrink: 0, background: `${palette.primary}15`, color: palette.primary, letterSpacing: '0.04em' }}>HEX</span>
          </div>
        </div>
        <div style={{ padding: '12px 16px 14px' }}>
          <div style={{ fontSize: '0.64rem', fontWeight: 700, color: palette.text.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="bi bi-palette2" style={{ fontSize: '0.68rem', color: palette.primary }} />Quick Presets
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 7 }}>
            {PRESET_COLORS.map((c, i) => {
              const active = preview === c, isLight = LIGHT_SWATCHES.has(c);
              return (
                <button key={i} onClick={() => pick(c)} title={c} style={{ aspectRatio: '1', borderRadius: 8, background: c, outline: 'none', border: active ? `2.5px solid ${palette.primary}` : isLight ? `1.5px solid ${palette.border.strong}` : '1.5px solid transparent', cursor: 'pointer', transition: 'all 0.13s', position: 'relative', boxShadow: active ? `0 0 0 2px #fff, 0 0 0 4px ${palette.primary}` : '0 1px 3px rgba(0,0,0,0.15)', transform: active ? 'scale(1.15)' : 'scale(1)' }}>
                  {active && <i className="bi bi-check" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: isLight ? '#374151' : '#fff', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', borderTop: `1px solid ${palette.border.default}`, background: palette.surface.raised, flexShrink: 0 }}>
        {customColor && (
          <button onClick={onClear} style={{ padding: '10px 14px', borderRadius: 10, background: 'none', border: `1.5px solid ${palette.border.strong}`, color: palette.text.muted, fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#fca5a5'; e.currentTarget.style.color='#ef4444'; e.currentTarget.style.background='#fef2f2'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=palette.border.strong; e.currentTarget.style.color=palette.text.muted; e.currentTarget.style.background='none'; }}>
            <i className="bi bi-x-circle" />Reset
          </button>
        )}
        <button onClick={onClose} style={{ flex: 1, padding: '11px 0', borderRadius: 10, background: palette.gradient.primary, color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: `0 4px 16px ${palette.primary}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
          onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; }} onMouseLeave={e => { e.currentTarget.style.opacity='1'; }}>
          <i className="bi bi-check2-circle" />Apply Color
        </button>
      </div>
    </div>
  );

  return createPortal(
    <>
      <div className="cpicker-backdrop" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }} />
      <div className={isMobile ? 'cpicker-panel-mobile' : 'cpicker-panel-desktop'} style={{ position: 'fixed', zIndex: 2001, ...(isMobile ? { bottom: 0, left: 0, right: 0 } : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }) }}>
        {panel}
      </div>
    </>,
    document.body
  );
};

export default function SignPDFClient() {
  const [pdfFile,          setPdfFile]          = useState(null);
  const [pages,            setPages]            = useState([]);
  const [isLoading,        setIsLoading]        = useState(false);
  const [isProcessing,     setIsProcessing]     = useState(false);
  const [error,            setError]            = useState('');
  const [sigColor,         setSigColor]         = useState('black');
  const [customColor,      setCustomColor]      = useState('');
  const [showColorPicker,  setShowColorPicker]  = useState(false);
  const [selectedPages,    setSelectedPages]    = useState(new Set([0]));
  const [previewPage,      setPreviewPage]      = useState(0);
  const [previewPageUrl,   setPreviewPageUrl]   = useState('');
  const [sigInfo,          setSigInfo]          = useState(null);
  const [positionedPages,  setPositionedPages]  = useState(new Set());

  const sigTransformRef   = useRef(null);
  const pageTransformsRef = useRef({});
  const pdfjsDocRef       = useRef(null);

  const colorHex   = customColor || COLORS.find(c => c.id === sigColor)?.hex || '#111827';
  const colorLabel = customColor ? 'Custom' : COLORS.find(c => c.id === sigColor)?.label;

  const allSelected = pages.length > 0 && selectedPages.size === pages.length;
  const step1Done   = !!sigInfo?.dataUrl;
  const step2Done   = selectedPages.size > 0;
  const canDownload = step1Done && pages.length > 0;

  useEffect(() => {
    if (!pdfjsDocRef.current) return;
    renderPage(pdfjsDocRef.current, previewPage + 1, 1.5).then(setPreviewPageUrl).catch(() => {});
  }, [previewPage]);

  const switchPage = useCallback((idx) => {
    if (sigTransformRef.current) { pageTransformsRef.current[previewPage] = { ...sigTransformRef.current }; setPositionedPages(prev => new Set([...prev, previewPage])); }
    setPreviewPage(idx);
  }, [previewPage]);

  const handleFiles = async (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError(''); setPdfFile(file); setPages([]); setPreviewPageUrl('');
    pageTransformsRef.current = {}; setPositionedPages(new Set()); setIsLoading(true);
    try {
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      pdfjsDocRef.current = pdf;
      const thumbs = [];
      for (let i = 1; i <= pdf.numPages; i++) thumbs.push({ index: i, thumbnail: await renderPage(pdf, i, 0.4) });
      setPages(thumbs); setSelectedPages(new Set([0])); setPreviewPage(0);
      setPreviewPageUrl(await renderPage(pdf, 1, 1.5));
    } catch (err) { setError('Failed to load PDF: ' + err.message); }
    finally { setIsLoading(false); }
  };

  const handleReset = () => { setPdfFile(null); setPages([]); setPreviewPageUrl(''); pdfjsDocRef.current = null; sigTransformRef.current = null; pageTransformsRef.current = {}; setPositionedPages(new Set()); };

  const togglePage = (idx) => {
    setSelectedPages(prev => { const next = new Set(prev); if (next.has(idx) && next.size > 1) next.delete(idx); else next.add(idx); return next; });
    switchPage(idx);
  };

  const toggleAll = (checked) => setSelectedPages(checked ? new Set(pages.map((_, i) => i)) : new Set([previewPage]));

  const applySignature = async () => {
    if (!pdfFile) { setError('Upload a PDF first.'); return; }
    if (!sigInfo?.dataUrl) { setError('Create your signature first.'); return; }
    setIsProcessing(true); setError('');
    if (sigTransformRef.current) { pageTransformsRef.current[previewPage] = { ...sigTransformRef.current }; setPositionedPages(prev => new Set([...prev, previewPage])); }
    try {
      const highResUrl = await sigInfo.getHighRes();
      const pdfDoc = await PDFDocument.load(await pdfFile.arrayBuffer());
      const pngBytes = await (await fetch(highResUrl || sigInfo.dataUrl)).arrayBuffer();
      const sigImg = await pdfDoc.embedPng(pngBytes);
      for (const idx of selectedPages) {
        const page = pdfDoc.getPage(idx);
        const { width: pW, height: pH } = page.getSize();
        const t = pageTransformsRef.current[idx] ?? sigTransformRef.current;
        let sigW, sigH, x, y;
        if (t?.wFrac) { sigW = t.wFrac * pW; sigH = sigW / sigInfo.aspectRatio; x = t.xFrac * pW; y = pH * (1 - t.yFrac) - sigH; }
        else { sigW = Math.min(200, pW * 0.35); sigH = sigW / sigInfo.aspectRatio; x = pW - sigW - 28; y = 28; }
        x = Math.max(0, Math.min(x, pW - sigW)); y = Math.max(0, Math.min(y, pH - sigH));
        page.drawImage(sigImg, { x, y, width: sigW, height: sigH });
      }
      const url = URL.createObjectURL(new Blob([await pdfDoc.save()], { type: 'application/pdf' }));
      Object.assign(document.createElement('a'), { href: url, download: 'signed.pdf' }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError('Failed to sign PDF: ' + err.message); }
    finally { setIsProcessing(false); }
  };

  const FileStrip = ({ className = '' }) => (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 10, background: palette.surface.base, border: `1.5px solid ${palette.border.default}`, fontSize: '0.82rem' }}>
      <i className="bi bi-file-earmark-pdf-fill" style={{ color: '#ef4444', fontSize: '1.05rem', flexShrink: 0 }} />
      <span style={{ flex: 1, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: palette.text.primary }}>{pdfFile?.name}</span>
      {pages.length > 0 && <span style={{ color: palette.text.muted, flexShrink: 0, fontSize: '0.76rem' }}>{pages.length} {pages.length === 1 ? 'page' : 'pages'}</span>}
      <div style={{ width: 1, height: 13, background: palette.border.strong, flexShrink: 0 }} />
      <button onClick={handleReset} style={{ background: 'none', border: 'none', color: palette.text.muted, cursor: 'pointer', padding: '2px 5px', fontSize: '0.76rem', fontWeight: 600, flexShrink: 0, borderRadius: 5, lineHeight: 1 }}>
        <i className="bi bi-arrow-repeat me-1" />Change
      </button>
    </div>
  );

  const NavBtn = ({ onClick, disabled, children }) => (
    <button onClick={onClick} disabled={disabled} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 12, border: 'none', background: disabled ? palette.surface.overlay : palette.primary, color: disabled ? palette.text.muted : '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, transition: 'all 0.15s', flexShrink: 0, boxShadow: disabled ? 'none' : `0 4px 14px ${palette.primary}44` }}>
      {children}
    </button>
  );

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-pen me-2" />Sign PDF</h1>
          <p className="lead opacity-90 mb-0">Type or draw your signature — drag it anywhere on the page</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 1160 }}>
        {error && <Alert variant="danger" dismissible onClose={() => setError('')} className="mb-4"><i className="bi bi-exclamation-triangle me-2" />{error}</Alert>}

        {!pdfFile && (
          <div style={{ maxWidth: 660, margin: '0 auto' }}>
            <DropZone onFiles={handleFiles} accept="application/pdf" multiple={false} label="Drop a PDF here or click to browse" />
          </div>
        )}

        {pdfFile && <FileStrip className="d-flex d-md-none mb-3" />}

        {isLoading && <div className="text-center py-5"><Spinner variant="primary" style={{ width: '3rem', height: '3rem' }} /><p className="mt-3 text-muted">Loading PDF…</p></div>}

        {pages.length > 0 && (
          <Row className="g-4 align-items-start">
            <Col xs={12} md={5} lg={4}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="settings-panel">
                  <StepHeader n={1} done={step1Done} title="Create Your Signature" subtitle="Type or draw · set colour and pen weight" />

                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <label className="fw-semibold small mb-0">Ink Color</label>
                      <span style={{ fontSize: '0.74rem', color: palette.text.muted, fontWeight: 500 }}>{colorLabel}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                      {COLORS.map(c => {
                        const active = sigColor === c.id && !customColor;
                        return (
                          <button key={c.id} onClick={() => { setSigColor(c.id); setCustomColor(''); setShowColorPicker(false); }} title={c.label}
                            style={{ width: 32, height: 32, borderRadius: '50%', background: c.hex, border: 'none', cursor: 'pointer', transition: 'all 0.14s', position: 'relative', flexShrink: 0, boxShadow: active ? `0 0 0 2.5px #fff, 0 0 0 4.5px ${palette.primary}` : '0 1px 4px rgba(0,0,0,0.22)', transform: active ? 'scale(1.18)' : 'scale(1)' }}>
                            {active && <i className="bi bi-check" style={{ color: '#fff', fontSize: '0.82rem', position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />}
                          </button>
                        );
                      })}
                      <button title="Pick custom color" onClick={() => setShowColorPicker(v => !v)}
                        style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0, position: 'relative', background: customColor ? customColor : 'conic-gradient(red 0deg,yellow 60deg,lime 120deg,cyan 180deg,blue 240deg,magenta 300deg,red 360deg)', transition: 'all 0.14s', boxShadow: customColor ? `0 0 0 2.5px #fff, 0 0 0 4.5px ${palette.primary}` : showColorPicker ? `0 0 0 2.5px #fff, 0 0 0 4.5px ${palette.primary}` : '0 1px 4px rgba(0,0,0,0.22)', transform: (customColor || showColorPicker) ? 'scale(1.18)' : 'scale(1)', outline: 'none' }}>
                        {!customColor && <i className="bi bi-eyedropper" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#fff', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }} />}
                        {customColor && <i className="bi bi-check" style={{ color: '#fff', fontSize: '0.82rem', position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} />}
                      </button>
                    </div>
                    {showColorPicker && (
                      <ColorPickerModal colorHex={colorHex} customColor={customColor}
                        onChange={v => { setCustomColor(v); setSigColor(''); }}
                        onClose={() => setShowColorPicker(false)}
                        onClear={() => { setCustomColor(''); setSigColor('black'); setShowColorPicker(false); }} />
                    )}
                  </div>

                  <div style={{ height: 1, background: palette.border.default, marginBottom: 18 }} />
                  <SignaturePad colorHex={colorHex} onChange={setSigInfo} />
                </div>

                <div className="settings-panel">
                  <StepHeader n={2} done={step2Done} title="Pages to Sign" subtitle="Tap to select · eye = currently previewed" />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: '0.76rem', color: palette.text.muted }}>{allSelected ? 'All pages selected' : `${selectedPages.size} of ${pages.length} selected`}</span>
                    <Form.Check type="switch" id="all-pages-switch" label={<span style={{ fontSize: '0.76rem', fontWeight: 600 }}>All</span>} checked={allSelected} onChange={e => toggleAll(e.target.checked)} />
                  </div>
                  <div className="thin-scroll" style={{ maxHeight: 200, overflowY: 'auto', paddingBottom: 8 }}>
                    <Row className="g-2">
                      {pages.map((p, i) => {
                        const sel = selectedPages.has(i), prev = previewPage === i, pos = positionedPages.has(i);
                        return (
                          <Col key={i} xs={3}>
                            <div onClick={() => togglePage(i)} style={{ cursor: 'pointer', borderRadius: 8, overflow: 'hidden', position: 'relative', border: sel ? `2.5px solid ${palette.primary}` : `1.5px solid ${palette.border.default}`, background: sel ? `${palette.primary}08` : palette.surface.base, transition: 'all 0.13s', boxShadow: sel ? `0 2px 8px ${palette.primary}28` : '0 1px 3px rgba(0,0,0,0.05)' }}>
                              <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: palette.surface.overlay, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={p.thumbnail} alt={`p${p.index}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                              </div>
                              <div style={{ position: 'absolute', top: 3, right: 3, width: 16, height: 16, borderRadius: '50%', background: sel ? palette.primary : 'rgba(255,255,255,0.9)', border: `1.5px solid ${sel ? palette.primary : palette.border.strong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.13s' }}>
                                {sel && <i className="bi bi-check" style={{ color: '#fff', fontSize: '0.48rem' }} />}
                              </div>
                              {pos && <div style={{ position: 'absolute', top: 3, left: 3, width: 12, height: 12, borderRadius: '50%', background: '#16a34a', border: '1.5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-check" style={{ color: '#fff', fontSize: '0.4rem' }} /></div>}
                              <div style={{ textAlign: 'center', padding: '3px 0', fontSize: '0.6rem', fontWeight: prev ? 700 : 500, color: sel ? palette.primary : palette.text.muted }}>
                                {prev ? <><i className="bi bi-eye-fill me-1" style={{ fontSize: '0.52rem' }} />p.{p.index}</> : `p.${p.index}`}
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                  {selectedPages.size > 1 && (
                    <div style={{ marginTop: 10, padding: '7px 11px', borderRadius: 8, background: `${palette.primary}0d`, border: `1px solid ${palette.primary}22`, fontSize: '0.74rem', color: palette.primary, fontWeight: 500 }}>
                      <i className="bi bi-layers me-1" />{selectedPages.size} pages · navigate right panel to position each page
                    </div>
                  )}
                </div>
              </div>
            </Col>

            <Col xs={12} md={7} lg={8}>
              <div style={{ position: 'sticky', top: 76 }}>
                <FileStrip className="d-none d-md-flex mb-3" />
                <div className="settings-panel">
                  <StepHeader n={3} done={false} title="Place Your Signature" subtitle="Drag to move · corner handle or pinch to resize" />
                  <SignatureCanvas key={previewPage} pageImgUrl={previewPageUrl} sigImgUrl={sigInfo?.dataUrl ?? ''} sigAspectRatio={sigInfo?.aspectRatio ?? 4} transformRef={sigTransformRef} initialTransform={pageTransformsRef.current[previewPage]} />

                  {pages.length > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, background: palette.surface.overlay, borderRadius: 14, padding: '10px 14px' }}>
                      <NavBtn onClick={() => switchPage(previewPage - 1)} disabled={previewPage === 0}><i className="bi bi-chevron-left" /><span className="d-none d-sm-inline">Prev</span></NavBtn>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: palette.text.primary, marginBottom: 4 }}>
                          Page {previewPage + 1} <span style={{ color: palette.text.muted, fontWeight: 400 }}>of {pages.length}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap' }}>
                          {selectedPages.has(previewPage) ? (
                            <span style={{ fontSize: '0.68rem', padding: '2px 9px', borderRadius: 20, background: `${palette.primary}15`, color: palette.primary, fontWeight: 700 }}><i className="bi bi-pen me-1" />Signing</span>
                          ) : (
                            <span style={{ fontSize: '0.68rem', padding: '2px 9px', borderRadius: 20, background: palette.surface.base, color: palette.text.muted, fontWeight: 600, border: `1px solid ${palette.border.default}` }}>Not selected</span>
                          )}
                          {positionedPages.has(previewPage) && <span style={{ fontSize: '0.68rem', padding: '2px 9px', borderRadius: 20, background: '#16a34a18', color: '#16a34a', fontWeight: 700 }}><i className="bi bi-check-circle me-1" />Positioned</span>}
                        </div>
                      </div>
                      <NavBtn onClick={() => switchPage(previewPage + 1)} disabled={previewPage === pages.length - 1}><span className="d-none d-sm-inline">Next</span><i className="bi bi-chevron-right" /></NavBtn>
                    </div>
                  )}

                  <div style={{ marginTop: 16 }}>
                    <Button variant="primary" size="lg" className="w-100" onClick={applySignature} disabled={isProcessing || !canDownload} style={{ borderRadius: 12, fontWeight: 700, fontSize: '1rem', padding: '13px 0', boxShadow: canDownload ? `0 6px 22px ${palette.primary}48` : 'none', transition: 'box-shadow 0.3s' }}>
                      {isProcessing ? <><Spinner size="sm" className="me-2" />Applying Signature…</> : <><i className="bi bi-cloud-download me-2" />Apply &amp; Download{selectedPages.size > 1 && <Badge bg="light" text="dark" className="ms-2" pill>{selectedPages.size} pages</Badge>}</>}
                    </Button>
                    {!step1Done && <p style={{ textAlign: 'center', color: palette.text.muted, fontSize: '0.77rem', marginTop: 8, marginBottom: 0 }}><i className="bi bi-arrow-left me-1" />Create your signature in Step 1 to continue</p>}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
