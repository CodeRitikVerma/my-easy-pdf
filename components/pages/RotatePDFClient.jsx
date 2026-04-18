'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Badge, ButtonGroup } from 'react-bootstrap';
import { PDFDocument, degrees } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import palette from '@/theme/palette';

const getPdfJs = async () => {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  return pdfjsLib;
};

const renderThumbnail = async (pdfjsDoc, pageNum) => {
  const page = await pdfjsDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale: 0.4 });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width; canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  return canvas.toDataURL();
};

export default function RotatePDFClient() {
  const [pdfFile,      setPdfFile]      = useState(null);
  const [pages,        setPages]        = useState([]);
  const [isLoading,    setIsLoading]    = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error,        setError]        = useState('');

  const handleFiles = async (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError(''); setPdfFile(file); setPages([]); setIsLoading(true);
    try {
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const pageData = [];
      for (let i = 1; i <= pdf.numPages; i++)
        pageData.push({ index: i, thumbnail: await renderThumbnail(pdf, i), rotation: 0, selected: false });
      setPages(pageData);
    } catch (err) { setError('Failed to load PDF: ' + err.message); }
    finally { setIsLoading(false); }
  };

  const togglePage  = (index) => setPages(prev => prev.map(p => p.index === index ? { ...p, selected: !p.selected } : p));
  const selectAll   = () => setPages(prev => prev.map(p => ({ ...p, selected: true })));
  const deselectAll = () => setPages(prev => prev.map(p => ({ ...p, selected: false })));

  const rotate = (angle, target) => setPages(prev => prev.map(p => {
    if (target === 'all' || (target === 'selected' && p.selected))
      return { ...p, rotation: ((p.rotation + angle) % 360 + 360) % 360 };
    return p;
  }));

  const selectedCount = pages.filter(p => p.selected).length;
  const hasRotations  = pages.some(p => p.rotation !== 0);

  const applyAndDownload = async () => {
    if (!pdfFile) return;
    setIsProcessing(true); setError('');
    try {
      const pdf = await PDFDocument.load(await pdfFile.arrayBuffer());
      pages.forEach(({ index, rotation }) => {
        if (rotation !== 0) { const page = pdf.getPage(index - 1); page.setRotation(degrees((page.getRotation().angle + rotation) % 360)); }
      });
      const url = URL.createObjectURL(new Blob([await pdf.save()], { type: 'application/pdf' }));
      Object.assign(document.createElement('a'), { href: url, download: 'rotated.pdf' }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError('Failed to process PDF: ' + err.message); }
    finally { setIsProcessing(false); }
  };

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-arrow-clockwise me-2"></i>Rotate PDF</h1>
          <p className="lead opacity-90 mb-0">Rotate pages in your PDF — select pages or rotate all at once</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5">
        {!pdfFile ? (
          <DropZone onFiles={handleFiles} accept="application/pdf" multiple={false} label="Drop a PDF file here or click to browse" />
        ) : (
          <div className="d-flex align-items-center settings-panel mb-4">
            <i className="bi bi-file-earmark-pdf-fill text-danger me-3" style={{ fontSize: '2rem' }}></i>
            <div className="flex-grow-1 min-w-0">
              <div className="fw-semibold text-truncate">{pdfFile.name}</div>
              <small className="text-muted">{pages.length} pages</small>
            </div>
            <Button variant="outline-secondary" size="sm" className="d-inline-flex align-items-center gap-1" onClick={() => { setPdfFile(null); setPages([]); }}><i className="bi bi-arrow-repeat" /> Change File</Button>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {isLoading && <div className="text-center py-5"><Spinner variant="primary" style={{ width: '3rem', height: '3rem' }} /><p className="mt-3 text-muted">Loading PDF pages…</p></div>}

        {pages.length > 0 && (
          <>
            <div className="settings-panel mb-4">
              <Row className="g-2 align-items-center flex-wrap">
                <Col xs="auto"><Button variant="outline-primary" size="sm" onClick={selectAll}>Select All</Button></Col>
                <Col xs="auto"><Button variant="outline-secondary" size="sm" onClick={deselectAll}>Deselect All</Button></Col>
                {selectedCount > 0 && (
                  <>
                    <Col xs="auto"><span className="text-muted small">Rotate selected ({selectedCount}):</span></Col>
                    <Col xs="auto">
                      <ButtonGroup size="sm">
                        <Button variant="outline-primary" onClick={() => rotate(-90, 'selected')}><i className="bi bi-arrow-counterclockwise"></i> 90°</Button>
                        <Button variant="outline-primary" onClick={() => rotate(90,  'selected')}><i className="bi bi-arrow-clockwise"></i> 90°</Button>
                        <Button variant="outline-primary" onClick={() => rotate(180, 'selected')}>180°</Button>
                      </ButtonGroup>
                    </Col>
                  </>
                )}
                <Col xs="auto" className="ms-auto">
                  <span className="text-muted small me-2">Rotate all:</span>
                  <ButtonGroup size="sm">
                    <Button variant="primary" onClick={() => rotate(-90, 'all')}><i className="bi bi-arrow-counterclockwise"></i> 90°</Button>
                    <Button variant="primary" onClick={() => rotate(90,  'all')}><i className="bi bi-arrow-clockwise"></i> 90°</Button>
                    <Button variant="primary" onClick={() => rotate(180, 'all')}>180°</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </div>

            <p className="text-muted small mb-3">Click a page to select it, then use rotation buttons above. Preview updates instantly.</p>

            <Row className="g-3 mb-4">
              {pages.map(page => (
                <Col key={page.index} xs={6} sm={4} md={3} lg={2}>
                  <div className={`page-thumbnail${page.selected ? ' selected' : ''}`} onClick={() => togglePage(page.index)}>
                    <div style={{ overflow: 'hidden', borderRadius: 6, aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: palette.surface.overlay }}>
                      <img src={page.thumbnail} alt={`Page ${page.index}`} style={{ maxWidth: '100%', maxHeight: '100%', transform: `rotate(${page.rotation}deg)`, transition: 'transform 0.3s ease' }} />
                    </div>
                    <div className="text-center mt-1 small fw-semibold">Page {page.index}</div>
                    <div className="text-center" style={{ minHeight: 22 }}>
                      {page.rotation !== 0 && <Badge bg="warning" text="dark" pill className="me-1"><i className="bi bi-arrow-clockwise me-1"></i>{page.rotation}°</Badge>}
                      {page.selected && <Badge bg="primary" pill><i className="bi bi-check-lg"></i></Badge>}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <div className="text-center">
              <Button variant="primary" size="lg" onClick={applyAndDownload} disabled={isProcessing || !hasRotations} className="px-5">
                {isProcessing ? <><Spinner size="sm" className="me-2" />Processing…</> : <><i className="bi bi-file-earmark-arrow-down me-2"></i>Apply Rotation &amp; Download</>}
              </Button>
              {!hasRotations && <p className="text-muted small mt-2">Rotate at least one page to enable download.</p>}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
