'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Form, Badge } from 'react-bootstrap';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import palette from '@/theme/palette';
import SeoContent from '@/components/common/SeoContent';

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

/* ─── constants ───────────────────────────────────────────────────────────── */
const COLOR_PRESETS = [
  { label: 'Gray',   value: 'gray',   rgb: [0.50, 0.50, 0.50], hex: '#808080' },
  { label: 'Red',    value: 'red',    rgb: [0.80, 0.10, 0.10], hex: '#cc1a1a' },
  { label: 'Blue',   value: 'blue',   rgb: [0.10, 0.20, 0.75], hex: '#1a33bf' },
  { label: 'Green',  value: 'green',  rgb: [0.05, 0.55, 0.25], hex: '#0d8c40' },
  { label: 'Black',  value: 'black',  rgb: [0.05, 0.05, 0.05], hex: '#0d0d0d' },
];

const POSITIONS = [
  { value: 'diagonal',      label: 'Diagonal (45°)'  },
  { value: 'center',        label: 'Center'          },
  { value: 'bottom-center', label: 'Bottom Center'   },
  { value: 'bottom-left',   label: 'Bottom Left'     },
  { value: 'bottom-right',  label: 'Bottom Right'    },
  { value: 'top-center',    label: 'Top Center'      },
  { value: 'top-left',      label: 'Top Left'        },
  { value: 'top-right',     label: 'Top Right'       },
];

const MARGIN_PT = 20; // pdf-lib margin in points

/* ─── canvas watermark renderer ──────────────────────────────────────────── */
const drawWatermark = (canvas, text, position, fontSize, opacity, colorHex, pageWidth, pageHeight) => {
  const ctx   = canvas.getContext('2d');
  const scale = canvas.width / pageWidth;
  const sf    = fontSize * scale;
  const sm    = MARGIN_PT * scale;

  ctx.save();
  ctx.font        = `bold ${sf}px Helvetica, Arial, sans-serif`;
  ctx.fillStyle   = hexToRgba(colorHex, opacity / 100);
  ctx.textBaseline = 'middle';
  ctx.textAlign   = 'center';

  if (position === 'diagonal') {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 4); // counter-clockwise = bottom-left to top-right (matches pdf-lib degrees(45))
    ctx.fillText(text, 0, 0);
  } else {
    const tw = ctx.measureText(text).width;
    let x, y;
    switch (position) {
      case 'center':
        x = canvas.width / 2;         y = canvas.height / 2;              break;
      case 'bottom-center':
        x = canvas.width / 2;         y = canvas.height - sm - sf / 2;    break;
      case 'bottom-left':
        ctx.textAlign = 'left';
        x = sm;                        y = canvas.height - sm - sf / 2;    break;
      case 'bottom-right':
        ctx.textAlign = 'right';
        x = canvas.width - sm;         y = canvas.height - sm - sf / 2;    break;
      case 'top-center':
        x = canvas.width / 2;         y = sm + sf / 2;                    break;
      case 'top-left':
        ctx.textAlign = 'left';
        x = sm;                        y = sm + sf / 2;                    break;
      case 'top-right':
        ctx.textAlign = 'right';
        x = canvas.width - sm;         y = sm + sf / 2;                    break;
      default:
        x = canvas.width / 2;         y = canvas.height / 2;
    }
    ctx.fillText(text, x, y);
  }
  ctx.restore();
};

/* ─── pdf-lib watermark writer ───────────────────────────────────────────── */
const writeWatermark = (page, text, font, fontSize, position, opacity, colorRgb) => {
  const { width, height } = page.getSize();
  const [r, g, b] = colorRgb;
  const tw = font.widthOfTextAtSize(text, fontSize);
  const common = { size: fontSize, font, color: rgb(r, g, b), opacity: opacity / 100 };

  if (position === 'diagonal') {
    page.drawText(text, {
      ...common,
      x: width / 2 - tw / 2,
      y: height / 2 - fontSize / 2,
      rotate: degrees(45),
    });
    return;
  }

  let x, y;
  switch (position) {
    case 'center':
      x = (width - tw) / 2;      y = height / 2 - fontSize / 2;      break;
    case 'bottom-center':
      x = (width - tw) / 2;      y = MARGIN_PT;                       break;
    case 'bottom-left':
      x = MARGIN_PT;              y = MARGIN_PT;                       break;
    case 'bottom-right':
      x = width - tw - MARGIN_PT; y = MARGIN_PT;                      break;
    case 'top-center':
      x = (width - tw) / 2;      y = height - MARGIN_PT - fontSize;   break;
    case 'top-left':
      x = MARGIN_PT;              y = height - MARGIN_PT - fontSize;   break;
    case 'top-right':
      x = width - tw - MARGIN_PT; y = height - MARGIN_PT - fontSize;  break;
    default:
      x = (width - tw) / 2;      y = height / 2 - fontSize / 2;
  }
  page.drawText(text, { ...common, x, y });
};

/* ─── component ───────────────────────────────────────────────────────────── */
export default function AddWatermarkClient() {
  const [pdfFile,       setPdfFile]       = useState(null);
  const [pages,         setPages]         = useState([]);           // { index, base, pageWidth, pageHeight }
  const [pageSettings,  setPageSettings]  = useState({});           // index → { selected, customized, fontSize, position, expanded }
  const [previewThumbs, setPreviewThumbs] = useState([]);
  const [isLoading,     setIsLoading]     = useState(false);
  const [isProcessing,  setIsProcessing]  = useState(false);
  const [isPreviewing,  setIsPreviewing]  = useState(false);
  const [error,         setError]         = useState('');

  // Global settings
  const [text,      setText]      = useState('CONFIDENTIAL');
  const [opacity,   setOpacity]   = useState(30);
  const [fontSize,  setFontSize]  = useState(48);
  const [colorKey,  setColorKey]  = useState('gray');
  const [position,  setPosition]  = useState('diagonal');

  const debounceRef = useRef(null);

  /* ── helpers ─────────────────────────────────────────────────────────── */
  const getEffective = (index) => {
    const ps = pageSettings[index] || {};
    return {
      selected: ps.selected ?? true,
      fontSize: ps.customized ? ps.fontSize : fontSize,
      position: ps.customized ? ps.position : position,
    };
  };

  const setPs = (index, patch) =>
    setPageSettings(prev => ({ ...prev, [index]: { ...prev[index], ...patch } }));

  /* ── load PDF + base thumbnails ──────────────────────────────────────── */
  const handleFiles = async (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError(''); setPdfFile(file); setPages([]); setPreviewThumbs([]); setIsLoading(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const pageData = [];
      const initSettings = {};
      for (let i = 1; i <= pdf.numPages; i++) {
        const pg  = await pdf.getPage(i);
        const vp1 = pg.getViewport({ scale: 1.0 });
        const vp  = pg.getViewport({ scale: 0.4 });
        const c   = document.createElement('canvas');
        c.width = vp.width; c.height = vp.height;
        await pg.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
        pageData.push({ index: i, base: c.toDataURL(), pageWidth: vp1.width, pageHeight: vp1.height });
        initSettings[i] = { selected: true, customized: false, fontSize, position, expanded: false };
      }
      setPages(pageData);
      setPageSettings(initSettings);
    } catch (err) { setError('Failed to load PDF: ' + err.message); }
    finally { setIsLoading(false); }
  };

  /* ── regenerate preview thumbnails ──────────────────────────────────── */
  useEffect(() => {
    if (!pages.length) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsPreviewing(true);
      const thumbs = [];
      for (const pg of pages) {
        const img = new Image();
        await new Promise(res => { img.onload = res; img.src = pg.base; });
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const eff = getEffective(pg.index);
        if (eff.selected && text.trim()) {
          const colorHex = COLOR_PRESETS.find(c => c.value === colorKey)?.hex ?? '#808080';
          drawWatermark(canvas, text, eff.position, eff.fontSize, opacity, colorHex, pg.pageWidth, pg.pageHeight);
        }
        thumbs.push(canvas.toDataURL());
      }
      setPreviewThumbs(thumbs);
      setIsPreviewing(false);
    }, 250);
  }, [pages, text, opacity, fontSize, colorKey, position, pageSettings]);

  /* ── select all / none ───────────────────────────────────────────────── */
  const selectAll  = () => setPageSettings(prev => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, { ...v, selected: true  }])));
  const selectNone = () => setPageSettings(prev => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, { ...v, selected: false }])));

  const selectedCount = pages.filter(p => pageSettings[p.index]?.selected !== false).length;

  /* ── generate PDF ────────────────────────────────────────────────────── */
  const handleProcess = async () => {
    if (!pdfFile) return;
    if (!text.trim()) { setError('Please enter watermark text.'); return; }
    setIsProcessing(true); setError('');
    try {
      const pdf  = await PDFDocument.load(await pdfFile.arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const colorPreset = COLOR_PRESETS.find(c => c.value === colorKey) || COLOR_PRESETS[0];
      pdf.getPages().forEach((page, i) => {
        const idx = i + 1;
        const eff = getEffective(idx);
        if (!eff.selected) return;
        writeWatermark(page, text, font, eff.fontSize, eff.position, opacity, colorPreset.rgb);
      });
      const baseName = pdfFile.name.replace(/\.pdf$/i, '');
      const url = URL.createObjectURL(new Blob([await pdf.save()], { type: 'application/pdf' }));
      Object.assign(document.createElement('a'), { href: url, download: `${baseName}-watermarked.pdf` }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError('Failed to process PDF: ' + err.message); }
    finally { setIsProcessing(false); }
  };

  const activeColor = COLOR_PRESETS.find(c => c.value === colorKey) || COLOR_PRESETS[0];

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-droplet me-2" />Add Watermark</h1>
          <p className="lead opacity-90 mb-0">Choose pages, customise per-page size &amp; position — preview updates live</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 960 }}>

        {/* ── File picker ── */}
        {!pdfFile ? (
          <DropZone onFiles={handleFiles} accept="application/pdf" multiple={false} label="Drop a PDF file here or click to browse" />
        ) : (
          <div className="d-flex align-items-center settings-panel mb-4 gap-3">
            <i className="bi bi-file-earmark-pdf-fill text-danger flex-shrink-0" style={{ fontSize: '2rem' }} />
            <div className="flex-grow-1 min-w-0 d-flex flex-column flex-sm-row align-items-sm-center gap-2">
              <div className="min-w-0 flex-grow-1">
                <div className="fw-semibold text-truncate">{pdfFile.name}</div>
                <small className="text-muted">{pages.length} pages &middot; {formatBytes(pdfFile.size)}</small>
              </div>
              <Button
                variant="outline-secondary" size="sm"
                className="d-inline-flex align-items-center gap-1 flex-shrink-0"
                onClick={() => { setPdfFile(null); setPages([]); setPreviewThumbs([]); setPageSettings({}); }}
              >
                <i className="bi bi-arrow-repeat" /> Change File
              </Button>
            </div>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3" dismissible onClose={() => setError('')}>{error}</Alert>}

        {isLoading && (
          <div className="text-center py-5">
            <Spinner variant="primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted">Loading PDF pages…</p>
          </div>
        )}

        {pdfFile && pages.length > 0 && (
          <>
            {/* ── Global settings ── */}
            <div className="settings-panel mb-4">
              <h5 className="fw-semibold mb-4" style={{ color: palette.indigo[900] }}>
                <i className="bi bi-sliders me-2" />Watermark Options
              </h5>

              <Row className="g-4">
                {/* Text */}
                <Col xs={12}>
                  <Form.Label htmlFor="wm-text" className="fw-semibold small">Watermark Text</Form.Label>
                  <Form.Control
                    id="wm-text"
                    type="text" value={text} maxLength={60}
                    onChange={e => setText(e.target.value)}
                    placeholder="e.g. CONFIDENTIAL, DRAFT, SAMPLE"
                  />
                </Col>

                {/* Opacity */}
                <Col xs={12} sm={6}>
                  <Form.Label htmlFor="wm-opacity" className="fw-semibold small">Opacity: <strong>{opacity}%</strong></Form.Label>
                  <Form.Range id="wm-opacity" min={5} max={80} value={opacity} onChange={e => setOpacity(parseInt(e.target.value))} />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">5% (faint)</small>
                    <small className="text-muted">80% (bold)</small>
                  </div>
                </Col>

                {/* Font size */}
                <Col xs={12} sm={6}>
                  <Form.Label htmlFor="wm-font-size" className="fw-semibold small">Default font size: <strong>{fontSize}pt</strong></Form.Label>
                  <Form.Range id="wm-font-size" min={16} max={90} value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">16pt</small>
                    <small className="text-muted">90pt</small>
                  </div>
                </Col>

                {/* Color */}
                <Col xs={12} sm={6}>
                  <Form.Label className="fw-semibold small">Color</Form.Label>
                  <div className="d-flex gap-2 flex-wrap mt-1">
                    {COLOR_PRESETS.map(c => (
                      <button
                        key={c.value} onClick={() => setColorKey(c.value)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          padding: '5px 12px', borderRadius: 8, cursor: 'pointer',
                          border: colorKey === c.value ? `2px solid ${c.hex}` : '2px solid #e5e7eb',
                          background: colorKey === c.value ? c.hex + '18' : '#fff',
                          fontWeight: colorKey === c.value ? 600 : 400,
                          fontSize: '0.85rem',
                        }}
                      >
                        <span style={{ width: 14, height: 14, borderRadius: '50%', background: c.hex, flexShrink: 0 }} />
                        {c.label}
                      </button>
                    ))}
                  </div>
                </Col>

                {/* Default position */}
                <Col xs={12} sm={6}>
                  <Form.Label className="fw-semibold small">Default position</Form.Label>
                  <div className="d-flex flex-wrap gap-2 mt-1">
                    {POSITIONS.map(p => (
                      <Button
                        key={p.value} size="sm"
                        variant={position === p.value ? 'primary' : 'outline-secondary'}
                        onClick={() => setPosition(p.value)}
                        style={position === p.value ? { background: palette.gradient.primary, border: 'none' } : {}}
                      >
                        {p.label}
                      </Button>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>

            {/* ── Page selection header ── */}
            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
              <h6 className="mb-0 fw-semibold">Pages</h6>
              <Badge bg="secondary" pill>{selectedCount} / {pages.length} selected</Badge>
              <Button variant="outline-primary"   size="sm" onClick={selectAll}>Select All</Button>
              <Button variant="outline-secondary" size="sm" onClick={selectNone}>Deselect All</Button>
              <div className="ms-auto d-flex align-items-center gap-2">
                {isPreviewing && <Spinner size="sm" variant="secondary" />}
                {!isPreviewing && <small className="text-muted">Preview updates live</small>}
              </div>
            </div>

            {/* ── Page grid ── */}
            <Row className="g-3 mb-4">
              {pages.map((pg, i) => {
                const ps  = pageSettings[pg.index] || {};
                const eff = getEffective(pg.index);
                const isSelected  = eff.selected;
                const isCustomized = ps.customized;
                const isExpanded  = ps.expanded;

                return (
                  <Col key={pg.index} xs={6} sm={4} md={3}>
                    <div style={{
                      borderRadius: 10,
                      border: isSelected ? '2px solid #6366f1' : '2px solid #e5e7eb',
                      background: '#fff',
                      overflow: 'hidden',
                      opacity: isSelected ? 1 : 0.55,
                      transition: 'border-color 0.15s, opacity 0.15s',
                      boxShadow: isSelected ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
                    }}>
                      {/* Thumbnail — click to toggle */}
                      <div
                        style={{ padding: 6, cursor: 'pointer' }}
                        onClick={() => setPs(pg.index, { selected: !isSelected })}
                      >
                        <img
                          src={previewThumbs[i] ?? pg.base}
                          alt={`Page ${pg.index}`}
                          style={{ width: '100%', borderRadius: 6, display: 'block' }}
                        />
                        <div className="d-flex align-items-center justify-content-between mt-1 px-1">
                          <small className="fw-semibold" style={{ color: palette.text.secondary }}>
                            Page {pg.index}
                          </small>
                          {isCustomized && (
                            <Badge bg="warning" text="dark" pill style={{ fontSize: '0.6rem' }}>custom</Badge>
                          )}
                        </div>
                      </div>

                      {/* Per-page customize toggle */}
                      <div style={{ borderTop: '1px solid #f3f4f6', padding: '4px 6px' }}>
                        <button
                          onClick={() => setPs(pg.index, { expanded: !isExpanded })}
                          style={{
                            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '0.72rem', color: palette.text.muted,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '2px 0',
                          }}
                        >
                          <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`} />
                          {isExpanded ? 'Hide' : 'Customize this page'}
                        </button>
                      </div>

                      {/* Per-page settings panel */}
                      {isExpanded && (
                        <div style={{ borderTop: '1px solid #e5e7eb', padding: '10px 8px', background: '#fafafa' }}>
                          {/* Font size */}
                          <div className="mb-2">
                            <label style={{ fontSize: '0.7rem', fontWeight: 600, color: palette.text.secondary, display: 'block', marginBottom: 3 }}>
                              Font size: <strong>{eff.fontSize}pt</strong>
                            </label>
                            <input
                              type="range" min={16} max={90}
                              value={eff.fontSize}
                              style={{ width: '100%', cursor: 'pointer' }}
                              onChange={e => setPs(pg.index, { customized: true, fontSize: parseInt(e.target.value) })}
                            />
                          </div>

                          {/* Position */}
                          <div className="mb-2">
                            <label style={{ fontSize: '0.7rem', fontWeight: 600, color: palette.text.secondary, display: 'block', marginBottom: 4 }}>
                              Position
                            </label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                              {POSITIONS.map(p => (
                                <button
                                  key={p.value}
                                  onClick={() => setPs(pg.index, { customized: true, position: p.value })}
                                  style={{
                                    padding: '2px 7px', borderRadius: 5, cursor: 'pointer', fontSize: '0.65rem',
                                    border: eff.position === p.value ? '1.5px solid #6366f1' : '1.5px solid #e5e7eb',
                                    background: eff.position === p.value ? '#eef2ff' : '#fff',
                                    color: eff.position === p.value ? '#4f46e5' : palette.text.secondary,
                                    fontWeight: eff.position === p.value ? 600 : 400,
                                  }}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Reset */}
                          {isCustomized && (
                            <button
                              onClick={() => setPs(pg.index, { customized: false, fontSize, position })}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '0.7rem', padding: 0 }}
                            >
                              <i className="bi bi-arrow-counterclockwise me-1" />Reset to default
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>

            {/* ── Download ── */}
            <div className="text-center">
              <Button
                size="lg"
                onClick={handleProcess}
                disabled={isProcessing || selectedCount === 0 || !text.trim()}
                className="px-5"
                style={{ background: palette.gradient.primary, border: 'none', color: '#fff' }}
              >
                {isProcessing
                  ? <><Spinner size="sm" className="me-2" />Processing…</>
                  : <><i className="bi bi-file-earmark-arrow-down me-2" />Add Watermark &amp; Download</>
                }
              </Button>
              {selectedCount === 0 && (
                <p className="text-muted small mt-2">Select at least one page to apply the watermark.</p>
              )}
            </div>
          </>
        )}
      </Container>
      <SeoContent slug="add-watermark" />
    </>
  );
}
