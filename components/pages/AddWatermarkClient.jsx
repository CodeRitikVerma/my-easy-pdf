'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Form } from 'react-bootstrap';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import palette from '@/theme/palette';

const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const COLOR_PRESETS = [
  { label: 'Gray',  value: 'gray',  rgb: [0.5, 0.5, 0.5],  swatch: '#808080' },
  { label: 'Red',   value: 'red',   rgb: [0.8, 0.1, 0.1],  swatch: '#cc1a1a' },
  { label: 'Blue',  value: 'blue',  rgb: [0.1, 0.2, 0.75], swatch: '#1a33bf' },
];

export default function AddWatermarkClient() {
  const [pdfFile,      setPdfFile]      = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error,        setError]        = useState('');
  const [text,         setText]         = useState('CONFIDENTIAL');
  const [opacity,      setOpacity]      = useState(30);
  const [fontSize,     setFontSize]     = useState(48);
  const [colorKey,     setColorKey]     = useState('gray');

  const handleFiles = (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError(''); setPdfFile(file);
  };

  const handleProcess = async () => {
    if (!pdfFile) return;
    if (!text.trim()) { setError('Please enter watermark text.'); return; }
    setIsProcessing(true); setError('');
    try {
      const pdf = await PDFDocument.load(await pdfFile.arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const colorPreset = COLOR_PRESETS.find(c => c.value === colorKey) || COLOR_PRESETS[0];
      const [r, g, b] = colorPreset.rgb;
      const opacityVal = opacity / 100;

      pdf.getPages().forEach(page => {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const x = (width - textWidth * Math.cos(Math.PI / 4) + height * Math.sin(Math.PI / 4)) / 2 - textWidth / 2;
        const y = (height - height * Math.cos(Math.PI / 4) - textWidth * Math.sin(Math.PI / 4)) / 2 + height / 2;
        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2 - fontSize / 2,
          size: fontSize,
          font,
          color: rgb(r, g, b),
          opacity: opacityVal,
          rotate: degrees(45),
        });
      });

      const bytes = await pdf.save();
      const baseName = pdfFile.name.replace(/\.pdf$/i, '');
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      Object.assign(document.createElement('a'), { href: url, download: `${baseName}-watermarked.pdf` }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError('Failed to process PDF: ' + err.message); }
    finally { setIsProcessing(false); }
  };

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-droplet me-2"></i>Add Watermark</h1>
          <p className="lead opacity-90 mb-0">Add a diagonal text watermark to every page of your PDF</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 900 }}>
        {!pdfFile ? (
          <DropZone onFiles={handleFiles} accept="application/pdf" multiple={false} label="Drop a PDF file here or click to browse" />
        ) : (
          <div className="d-flex align-items-center settings-panel mb-4">
            <i className="bi bi-file-earmark-pdf-fill text-danger me-3" style={{ fontSize: '2rem' }}></i>
            <div className="flex-grow-1 min-w-0">
              <div className="fw-semibold text-truncate">{pdfFile.name}</div>
              <small className="text-muted">{formatBytes(pdfFile.size)}</small>
            </div>
            <Button variant="outline-secondary" size="sm" className="d-inline-flex align-items-center gap-1" onClick={() => setPdfFile(null)}><i className="bi bi-arrow-repeat" /> Change File</Button>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3" dismissible onClose={() => setError('')}>{error}</Alert>}

        {pdfFile && (
          <div className="settings-panel mb-4">
            <h5 className="fw-semibold mb-4" style={{ color: palette.indigo[900] }}>
              <i className="bi bi-sliders me-2"></i>Watermark Options
            </h5>

            <Row className="g-4">
              <Col xs={12}>
                <Form.Label className="fw-semibold small">Watermark Text</Form.Label>
                <Form.Control
                  type="text"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="e.g. CONFIDENTIAL, DRAFT, SAMPLE"
                  maxLength={60}
                />
              </Col>

              <Col xs={12} sm={6}>
                <Form.Label className="fw-semibold small">Opacity: {opacity}%</Form.Label>
                <Form.Range min={10} max={80} value={opacity} onChange={e => setOpacity(parseInt(e.target.value))} />
                <div className="d-flex justify-content-between">
                  <small className="text-muted">10% (faint)</small>
                  <small className="text-muted">80% (bold)</small>
                </div>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Label className="fw-semibold small">Font size: {fontSize}pt</Form.Label>
                <Form.Range min={20} max={80} value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} />
                <div className="d-flex justify-content-between">
                  <small className="text-muted">20pt</small>
                  <small className="text-muted">80pt</small>
                </div>
              </Col>

              <Col xs={12}>
                <Form.Label className="fw-semibold small">Color</Form.Label>
                <div className="d-flex gap-2 flex-wrap mt-1">
                  {COLOR_PRESETS.map(c => (
                    <button
                      key={c.value}
                      onClick={() => setColorKey(c.value)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
                        border: colorKey === c.value ? `2px solid ${c.swatch}` : '2px solid #e5e7eb',
                        background: colorKey === c.value ? c.swatch + '18' : '#fff',
                        fontWeight: colorKey === c.value ? 600 : 400,
                        fontSize: '0.9rem',
                      }}
                    >
                      <span style={{ width: 16, height: 16, borderRadius: '50%', background: c.swatch, display: 'inline-block', flexShrink: 0 }}></span>
                      {c.label}
                    </button>
                  ))}
                </div>
              </Col>
            </Row>

            <div className="mt-4 p-3 rounded" style={{ background: palette.surface.inset, border: `1px solid ${palette.border.default}` }}>
              <p className="text-muted small mb-1"><strong>Preview:</strong> Your watermark will look like this on each page</p>
              <div style={{
                position: 'relative', height: 120, background: '#fff',
                border: '1px solid #e5e7eb', borderRadius: 6, overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: Math.min(fontSize * 0.6, 40),
                  color: COLOR_PRESETS.find(c => c.value === colorKey)?.swatch || '#808080',
                  opacity: opacity / 100,
                  transform: 'rotate(45deg)',
                  fontWeight: 700,
                  letterSpacing: 2,
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}>
                  {text || 'WATERMARK'}
                </span>
              </div>
            </div>

            <div className="text-center mt-4">
              <Button
                size="lg"
                onClick={handleProcess}
                disabled={isProcessing}
                className="px-5"
                style={{ background: palette.gradient.primary, border: 'none', color: '#fff' }}
              >
                {isProcessing
                  ? <><Spinner size="sm" className="me-2" />Processing…</>
                  : <><i className="bi bi-file-earmark-arrow-down me-2"></i>Add Watermark &amp; Download</>
                }
              </Button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
