'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Form } from 'react-bootstrap';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import palette from '@/theme/palette';

const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const POSITIONS = [
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right',  label: 'Bottom Right'  },
  { value: 'top-center',    label: 'Top Center'    },
  { value: 'top-right',     label: 'Top Right'     },
];

export default function AddPageNumbersClient() {
  const [pdfFile,      setPdfFile]      = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error,        setError]        = useState('');
  const [position,     setPosition]     = useState('bottom-center');
  const [startFrom,    setStartFrom]    = useState(1);
  const [fontSize,     setFontSize]     = useState(12);
  const [margin,       setMargin]       = useState(20);

  const handleFiles = (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError(''); setPdfFile(file);
  };

  const handleProcess = async () => {
    if (!pdfFile) return;
    setIsProcessing(true); setError('');
    try {
      const pdf = await PDFDocument.load(await pdfFile.arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const text = String(i + startFrom);
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        let x, y;
        if (position === 'bottom-center') { x = (width - textWidth) / 2; y = margin; }
        else if (position === 'bottom-right') { x = width - textWidth - margin; y = margin; }
        else if (position === 'top-center') { x = (width - textWidth) / 2; y = height - margin - fontSize; }
        else { x = width - textWidth - margin; y = height - margin - fontSize; }
        page.drawText(text, { x, y, size: fontSize, font, color: rgb(0.1, 0.1, 0.1) });
      });
      const bytes = await pdf.save();
      const baseName = pdfFile.name.replace(/\.pdf$/i, '');
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
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
          <p className="lead opacity-90 mb-0">Add customizable page numbers to every page of your PDF</p>
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
              <i className="bi bi-sliders me-2"></i>Page Number Options
            </h5>

            <Row className="g-4">
              <Col xs={12} sm={6}>
                <Form.Label className="fw-semibold small">Position</Form.Label>
                <div className="d-flex flex-wrap gap-2 mt-1">
                  {POSITIONS.map(p => (
                    <Button
                      key={p.value}
                      size="sm"
                      variant={position === p.value ? 'primary' : 'outline-secondary'}
                      onClick={() => setPosition(p.value)}
                      style={position === p.value ? { background: palette.gradient.primary, border: 'none' } : {}}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Label className="fw-semibold small">Start from number</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={startFrom}
                  onChange={e => setStartFrom(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{ maxWidth: 120 }}
                />
              </Col>

              <Col xs={12} sm={6}>
                <Form.Label className="fw-semibold small">Font size: {fontSize}pt</Form.Label>
                <Form.Range min={8} max={20} value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} />
                <div className="d-flex justify-content-between">
                  <small className="text-muted">8pt</small>
                  <small className="text-muted">20pt</small>
                </div>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Label className="fw-semibold small">Margin from edge: {margin}pt</Form.Label>
                <Form.Range min={5} max={60} value={margin} onChange={e => setMargin(parseInt(e.target.value))} />
                <div className="d-flex justify-content-between">
                  <small className="text-muted">5pt</small>
                  <small className="text-muted">60pt</small>
                </div>
              </Col>
            </Row>

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
                  : <><i className="bi bi-file-earmark-arrow-down me-2"></i>Add Page Numbers &amp; Download</>
                }
              </Button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
