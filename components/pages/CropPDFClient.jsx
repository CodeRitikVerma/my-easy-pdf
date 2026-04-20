'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Form } from 'react-bootstrap';
import { PDFDocument } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import palette from '@/theme/palette';
import SeoContent from '@/components/common/SeoContent';

const getPdfJs = async () => {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  return pdfjsLib;
};

const formatBytes = (b) => {
  if (b < 1024) return b + ' B';
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
  return (b / (1024 * 1024)).toFixed(2) + ' MB';
};

/* Handle positions for the crop rectangle */
const HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

export default function CropPDFClient() {
  const [pdfFile,      setPdfFile]      = useState(null);
  const [pages,        setPages]        = useState([]); // {index, thumb, w, h (points)}
  const [activeIdx,    setActiveIdx]    = useState(0);
  const [previewUrl,   setPreviewUrl]   = useState('');
  const [previewSize,  setPreviewSize]  = useState({ w: 0, h: 0 });
  const [crop,         setCrop]         = useState({ x: 0, y: 0, w: 0, h: 0 }); // in % (0-1)
  const [applyMode,    setApplyMode]    = useState('all');   // 'all' | 'current'
  const [isLoading,    setIsLoading]    = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error,        setError]        = useState('');

  const imgRef       = useRef(null);
  const dragState    = useRef(null);   // { mode, startX, startY, origCrop }

  /* ── Load PDF ── */
  const handleFiles = async (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError(''); setPdfFile(file); setPages([]); setActiveIdx(0); setIsLoading(true);
    try {
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const data = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const vp1  = page.getViewport({ scale: 1 });
        const vp   = page.getViewport({ scale: 0.35 });
        const c = document.createElement('canvas');
        c.width = vp.width; c.height = vp.height;
        await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
        data.push({ index: i, thumb: c.toDataURL(), w: vp1.width, h: vp1.height });
      }
      setPages(data);
    } catch (e) { setError('Failed to load PDF: ' + e.message); }
    finally { setIsLoading(false); }
  };

  /* ── Render active page at higher res for cropping preview ── */
  useEffect(() => {
    if (!pdfFile || !pages.length) { setPreviewUrl(''); return; }
    let cancelled = false;
    (async () => {
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: await pdfFile.arrayBuffer() }).promise;
      const page = await pdf.getPage(activeIdx + 1);
      const vp   = page.getViewport({ scale: 1.5 });
      const c = document.createElement('canvas');
      c.width = vp.width; c.height = vp.height;
      await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      if (cancelled) return;
      setPreviewUrl(c.toDataURL());
      setPreviewSize({ w: vp.width, h: vp.height });
      setCrop({ x: 0.08, y: 0.08, w: 0.84, h: 0.84 });
    })();
    return () => { cancelled = true; };
  }, [pdfFile, pages.length, activeIdx]);

  /* ── Drag / resize handlers (operate in normalized 0-1 coords) ── */
  const onPointerDown = (e, mode) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = imgRef.current.getBoundingClientRect();
    dragState.current = {
      mode,
      startPx: { x: e.clientX, y: e.clientY },
      rect,
      origCrop: { ...crop },
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup',   onPointerUp);
  };

  const onPointerMove = useCallback((e) => {
    const s = dragState.current;
    if (!s) return;
    const dx = (e.clientX - s.startPx.x) / s.rect.width;
    const dy = (e.clientY - s.startPx.y) / s.rect.height;
    const c  = { ...s.origCrop };
    const clamp = (v) => Math.max(0, Math.min(1, v));

    if (s.mode === 'move') {
      c.x = clamp(s.origCrop.x + dx);
      c.y = clamp(s.origCrop.y + dy);
      if (c.x + c.w > 1) c.x = 1 - c.w;
      if (c.y + c.h > 1) c.y = 1 - c.h;
    } else {
      // resize by handle
      let x1 = s.origCrop.x, y1 = s.origCrop.y;
      let x2 = s.origCrop.x + s.origCrop.w, y2 = s.origCrop.y + s.origCrop.h;
      if (s.mode.includes('w')) x1 = clamp(x1 + dx);
      if (s.mode.includes('e')) x2 = clamp(x2 + dx);
      if (s.mode.includes('n')) y1 = clamp(y1 + dy);
      if (s.mode.includes('s')) y2 = clamp(y2 + dy);
      if (x2 - x1 < 0.05) { if (s.mode.includes('w')) x1 = x2 - 0.05; else x2 = x1 + 0.05; }
      if (y2 - y1 < 0.05) { if (s.mode.includes('n')) y1 = y2 - 0.05; else y2 = y1 + 0.05; }
      c.x = x1; c.y = y1; c.w = x2 - x1; c.h = y2 - y1;
    }
    setCrop(c);
  }, []);

  const onPointerUp = useCallback(() => {
    dragState.current = null;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup',   onPointerUp);
  }, [onPointerMove]);

  useEffect(() => () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup',   onPointerUp);
  }, [onPointerMove, onPointerUp]);

  /* ── Save cropped PDF ── */
  const handleSave = async () => {
    if (!pdfFile || !pages.length) return;
    setIsProcessing(true); setError('');
    try {
      const pdf = await PDFDocument.load(await pdfFile.arrayBuffer());
      const allPages = pdf.getPages();
      const targets = applyMode === 'all' ? allPages.map((_, i) => i) : [activeIdx];
      for (const i of targets) {
        const p = allPages[i];
        const { width, height } = p.getSize();
        // crop.y is from top (pdf.js); pdf-lib origin is bottom-left
        const x = crop.x * width;
        const w = crop.w * width;
        const h = crop.h * height;
        const y = height - (crop.y * height) - h;
        p.setCropBox(x, y, w, h);
        p.setMediaBox(x, y, w, h);
      }
      const bytes = await pdf.save();
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      const baseName = pdfFile.name.replace(/\.pdf$/i, '');
      Object.assign(document.createElement('a'), { href: url, download: `${baseName}-cropped.pdf` }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) { setError('Failed to crop PDF: ' + e.message); }
    finally { setIsProcessing(false); }
  };

  const cropPxStyle = {
    position: 'absolute',
    left:   `${crop.x * 100}%`,
    top:    `${crop.y * 100}%`,
    width:  `${crop.w * 100}%`,
    height: `${crop.h * 100}%`,
    border: '2px solid #6366f1',
    background: 'rgba(99,102,241,0.08)',
    boxShadow: '0 0 0 9999px rgba(0,0,0,0.35)',
    cursor: 'move',
    boxSizing: 'border-box',
  };

  const handleStyle = (pos) => {
    const base = { position: 'absolute', width: 12, height: 12, background: '#fff', border: '2px solid #6366f1', borderRadius: 2 };
    const cursor = { nw: 'nwse-resize', ne: 'nesw-resize', se: 'nwse-resize', sw: 'nesw-resize',
                     n: 'ns-resize', s: 'ns-resize', e: 'ew-resize', w: 'ew-resize' }[pos];
    const positions = {
      nw: { top: -6, left: -6 }, ne: { top: -6, right: -6 },
      se: { bottom: -6, right: -6 }, sw: { bottom: -6, left: -6 },
      n:  { top: -6, left: '50%', transform: 'translateX(-50%)' },
      s:  { bottom: -6, left: '50%', transform: 'translateX(-50%)' },
      w:  { left: -6, top: '50%', transform: 'translateY(-50%)' },
      e:  { right: -6, top: '50%', transform: 'translateY(-50%)' },
    };
    return { ...base, ...positions[pos], cursor };
  };

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-crop me-2" />Crop PDF</h1>
          <p className="lead opacity-90 mb-0">Drag the crop box to trim whitespace, margins or unwanted areas from every page</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 1000 }}>
        {!pdfFile ? (
          <DropZone onFiles={handleFiles} accept="application/pdf" multiple={false} label="Drop a PDF file here or click to browse" />
        ) : (
          <div className="d-flex align-items-center settings-panel mb-4 gap-3">
            <i className="bi bi-file-earmark-pdf-fill text-danger" style={{ fontSize: '2rem' }} />
            <div className="flex-grow-1 min-w-0">
              <div className="fw-semibold text-truncate">{pdfFile.name}</div>
              <small className="text-muted">{pages.length} pages · {formatBytes(pdfFile.size)}</small>
            </div>
            <Button variant="outline-secondary" size="sm" onClick={() => { setPdfFile(null); setPages([]); setPreviewUrl(''); }}>
              <i className="bi bi-arrow-repeat me-1" />Change
            </Button>
          </div>
        )}

        {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

        {isLoading && (
          <div className="text-center py-5">
            <Spinner variant="primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted">Loading PDF pages…</p>
          </div>
        )}

        {pages.length > 0 && (
          <Row className="g-4">
            {/* Thumbnail rail */}
            <Col md={3}>
              <div className="settings-panel" style={{ maxHeight: 600, overflowY: 'auto' }}>
                <h6 className="fw-semibold mb-3"><i className="bi bi-list-ol me-2" />Pages</h6>
                {pages.map((p, i) => (
                  <div key={p.index} onClick={() => setActiveIdx(i)}
                    style={{
                      cursor: 'pointer', padding: 6, borderRadius: 8, marginBottom: 8,
                      border: i === activeIdx ? '2px solid #6366f1' : '2px solid transparent',
                      background: i === activeIdx ? '#eef2ff' : '#fff',
                    }}>
                    <img src={p.thumb} alt={`Page ${p.index}`} style={{ width: '100%', display: 'block', borderRadius: 4 }} />
                    <div className="text-center small fw-semibold mt-1">Page {p.index}</div>
                  </div>
                ))}
              </div>
            </Col>

            {/* Crop preview */}
            <Col md={9}>
              <div className="settings-panel mb-3">
                <Form.Label className="fw-semibold small mb-2">Apply crop to</Form.Label>
                <div className="d-flex gap-2">
                  <Button size="sm" variant={applyMode === 'all' ? 'primary' : 'outline-secondary'}
                    onClick={() => setApplyMode('all')}
                    style={applyMode === 'all' ? { background: palette.gradient.primary, border: 'none' } : {}}>
                    <i className="bi bi-files me-1" />All {pages.length} pages
                  </Button>
                  <Button size="sm" variant={applyMode === 'current' ? 'primary' : 'outline-secondary'}
                    onClick={() => setApplyMode('current')}
                    style={applyMode === 'current' ? { background: palette.gradient.primary, border: 'none' } : {}}>
                    <i className="bi bi-file-earmark me-1" />Current page only
                  </Button>
                </div>
                <small className="text-muted d-block mt-2">
                  <i className="bi bi-info-circle me-1" />
                  Drag the box to move it. Drag a corner or edge to resize. Everything outside the box is cropped away.
                </small>
              </div>

              <div style={{ position: 'relative', userSelect: 'none', background: '#f3f4f6', borderRadius: 8, overflow: 'hidden' }}>
                {previewUrl ? (
                  <>
                    <img ref={imgRef} src={previewUrl} alt="Preview"
                      draggable={false}
                      style={{ width: '100%', display: 'block' }} />
                    <div style={cropPxStyle} onPointerDown={(e) => onPointerDown(e, 'move')}>
                      {HANDLES.map(h => (
                        <div key={h} style={handleStyle(h)} onPointerDown={(e) => onPointerDown(e, h)} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-5"><Spinner size="sm" /> Loading preview…</div>
                )}
              </div>

              <div className="text-center mt-4">
                <Button size="lg" disabled={isProcessing || !previewUrl} onClick={handleSave} className="px-5"
                  style={{ background: palette.gradient.primary, border: 'none', color: '#fff' }}>
                  {isProcessing
                    ? <><Spinner size="sm" className="me-2" />Processing…</>
                    : <><i className="bi bi-crop me-2" />Crop &amp; Download PDF</>}
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <SeoContent slug="crop-pdf" />
    </>
  );
}
