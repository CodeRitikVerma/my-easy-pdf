'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Form } from 'react-bootstrap';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import palette from '@/theme/palette';
import SeoContent from '@/components/common/SeoContent';

const getPdfJs = async () => {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  return pdfjsLib;
};

const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const POSITIONS = [
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right',  label: 'Bottom Right'  },
  { value: 'bottom-left',   label: 'Bottom Left'   },
  { value: 'top-center',    label: 'Top Center'    },
  { value: 'top-right',     label: 'Top Right'     },
  { value: 'top-left',      label: 'Top Left'      },
];

/* Draw a page-number label onto a canvas that already has the page image drawn */
const drawNumberOnCanvas = (canvas, text, position, fontSize, margin, pageWidth, pageHeight) => {
  const ctx = canvas.getContext('2d');
  const scale = canvas.width / pageWidth;
  const sf = fontSize * scale;
  const sm = margin * scale;

  ctx.font = `bold ${sf}px Helvetica, Arial, sans-serif`;
  ctx.textBaseline = 'alphabetic';
  const tw = ctx.measureText(text).width;

  let x, y;
  switch (position) {
    case 'bottom-center': x = (canvas.width - tw) / 2;       y = canvas.height - sm; break;
    case 'bottom-right':  x = canvas.width - tw - sm;        y = canvas.height - sm; break;
    case 'bottom-left':   x = sm;                             y = canvas.height - sm; break;
    case 'top-center':    x = (canvas.width - tw) / 2;       y = sm + sf;            break;
    case 'top-right':     x = canvas.width - tw - sm;        y = sm + sf;            break;
    case 'top-left':      x = sm;                             y = sm + sf;            break;
    default:              x = (canvas.width - tw) / 2;       y = canvas.height - sm;
  }

  /* subtle halo for readability on any background */
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth   = sf * 0.35;
  ctx.lineJoin    = 'round';
  ctx.strokeText(text, x, y);

  ctx.fillStyle = 'rgba(17,17,17,0.92)';
  ctx.fillText(text, x, y);
};

export default function AddPageNumbersClient() {
  const [pdfFile,        setPdfFile]        = useState(null);
  const [pages,          setPages]          = useState([]); // { index, base, pageWidth, pageHeight }
  const [previewThumbs,  setPreviewThumbs]  = useState([]);
  const [isLoading,      setIsLoading]      = useState(false);
  const [isProcessing,   setIsProcessing]   = useState(false);
  const [isPreviewing,   setIsPreviewing]   = useState(false);
  const [error,          setError]          = useState('');
  const [position,       setPosition]       = useState('bottom-center');
  const [startFrom,      setStartFrom]      = useState(1);
  const [fontSize,       setFontSize]       = useState(12);
  const [margin,         setMargin]         = useState(20);

  const debounceRef = useRef(null);

  /* ── Load PDF + base thumbnails ── */
  const handleFiles = async (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError(''); setPdfFile(file); setPages([]); setPreviewThumbs([]); setIsLoading(true);
    try {
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const pageData = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page    = await pdf.getPage(i);
        const vp1     = page.getViewport({ scale: 1.0 });
        const vp      = page.getViewport({ scale: 0.4 });
        const canvas  = document.createElement('canvas');
        canvas.width  = vp.width;
        canvas.height = vp.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        pageData.push({
          index:     i,
          base:      canvas.toDataURL(),
          pageWidth:  vp1.width,
          pageHeight: vp1.height,
        });
      }
      setPages(pageData);
    } catch (err) { setError('Failed to load PDF: ' + err.message); }
    finally { setIsLoading(false); }
  };

  /* ── Re-generate preview thumbnails whenever settings or pages change ── */
  useEffect(() => {
    if (!pages.length) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsPreviewing(true);
      const thumbs = [];
      for (const pg of pages) {
        const img = new Image();
        await new Promise(res => { img.onload = res; img.src = pg.base; });
        const canvas  = document.createElement('canvas');
        canvas.width  = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const label = String(pg.index + startFrom - 1);
        drawNumberOnCanvas(canvas, label, position, fontSize, margin, pg.pageWidth, pg.pageHeight);
        thumbs.push(canvas.toDataURL());
      }
      setPreviewThumbs(thumbs);
      setIsPreviewing(false);
    }, 250);
  }, [pages, position, startFrom, fontSize, margin]);

  /* ── Write numbers to PDF + download ── */
  const handleProcess = async () => {
    if (!pdfFile) return;
    setIsProcessing(true); setError('');
    try {
      const pdf  = await PDFDocument.load(await pdfFile.arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      pdf.getPages().forEach((page, i) => {
        const { width, height } = page.getSize();
        const text = String(i + startFrom);
        const tw   = font.widthOfTextAtSize(text, fontSize);
        let x, y;
        switch (position) {
          case 'bottom-center': x = (width - tw) / 2;    y = margin;                        break;
          case 'bottom-right':  x = width - tw - margin; y = margin;                        break;
          case 'bottom-left':   x = margin;               y = margin;                        break;
          case 'top-center':    x = (width - tw) / 2;    y = height - margin - fontSize;    break;
          case 'top-right':     x = width - tw - margin; y = height - margin - fontSize;    break;
          case 'top-left':      x = margin;               y = height - margin - fontSize;    break;
          default:              x = (width - tw) / 2;    y = margin;
        }
        page.drawText(text, { x, y, size: fontSize, font, color: rgb(0.07, 0.07, 0.07) });
      });
      const baseName = pdfFile.name.replace(/\.pdf$/i, '');
      const url = URL.createObjectURL(new Blob([await pdf.save()], { type: 'application/pdf' }));
      Object.assign(document.createElement('a'), { href: url, download: `${baseName}-numbered.pdf` }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError('Failed to process PDF: ' + err.message); }
    finally { setIsProcessing(false); }
  };

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-123 me-2"></i>Add Page Numbers</h1>
          <p className="lead opacity-90 mb-0">Customise position, size and margin — preview updates live on every page</p>
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
                onClick={() => { setPdfFile(null); setPages([]); setPreviewThumbs([]); }}
              >
                <i className="bi bi-arrow-repeat" /> Change File
              </Button>
            </div>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3" dismissible onClose={() => setError('')}>{error}</Alert>}

        {/* ── Loading ── */}
        {isLoading && (
          <div className="text-center py-5">
            <Spinner variant="primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted">Loading PDF pages…</p>
          </div>
        )}

        {/* ── Settings + Preview ── */}
        {pdfFile && pages.length > 0 && (
          <>
            {/* Settings panel */}
            <div className="settings-panel mb-4">
              <h5 className="fw-semibold mb-4" style={{ color: palette.indigo?.[900] ?? '#1e1b4b' }}>
                <i className="bi bi-sliders me-2" />Page Number Options
              </h5>

              <Row className="g-4">
                {/* Position */}
                <Col xs={12} sm={6}>
                  <Form.Label className="fw-semibold small">Position</Form.Label>
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

                {/* Start from */}
                <Col xs={12} sm={6}>
                  <Form.Label htmlFor="pn-start-from" className="fw-semibold small">Start from number</Form.Label>
                  <Form.Control
                    id="pn-start-from"
                    type="number" min={1} value={startFrom}
                    onChange={e => setStartFrom(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ maxWidth: 120 }}
                  />
                </Col>

                {/* Font size */}
                <Col xs={12} sm={6}>
                  <Form.Label htmlFor="pn-font-size" className="fw-semibold small">Font size: <strong>{fontSize}pt</strong></Form.Label>
                  <Form.Range id="pn-font-size" min={8} max={24} value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">8pt</small><small className="text-muted">24pt</small>
                  </div>
                </Col>

                {/* Margin */}
                <Col xs={12} sm={6}>
                  <Form.Label htmlFor="pn-margin" className="fw-semibold small">Margin from edge: <strong>{margin}pt</strong></Form.Label>
                  <Form.Range id="pn-margin" min={5} max={60} value={margin} onChange={e => setMargin(parseInt(e.target.value))} />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">5pt</small><small className="text-muted">60pt</small>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Preview label */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <h6 className="mb-0 fw-semibold">Live Preview</h6>
              {isPreviewing && <Spinner size="sm" variant="secondary" />}
              {!isPreviewing && <small className="text-muted">Numbers update as you adjust settings</small>}
            </div>

            {/* Thumbnail grid */}
            <Row className="g-3 mb-4">
              {pages.map((page, i) => (
                <Col key={page.index} xs={6} sm={4} md={3}>
                  <div style={{
                    borderRadius: 10, border: '2px solid #e5e7eb',
                    background: '#fff', padding: 6,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}>
                    <img
                      src={previewThumbs[i] ?? page.base}
                      alt={`Page ${page.index}`}
                      style={{ width: '100%', borderRadius: 6, display: 'block' }}
                    />
                    <div className="text-center mt-1 small fw-semibold" style={{ color: palette.text?.secondary ?? '#374151' }}>
                      Page {page.index}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Download button */}
            <div className="text-center">
              <Button
                size="lg"
                onClick={handleProcess}
                disabled={isProcessing}
                className="px-5"
                style={{ background: palette.gradient.primary, border: 'none', color: '#fff' }}
              >
                {isProcessing
                  ? <><Spinner size="sm" className="me-2" />Processing…</>
                  : <><i className="bi bi-file-earmark-arrow-down me-2" />Add Page Numbers &amp; Download</>
                }
              </Button>
            </div>
          </>
        )}
      </Container>
      <SeoContent slug="add-page-numbers" />
    </>
  );
}
