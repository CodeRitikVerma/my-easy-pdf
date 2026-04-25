'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Badge, Form } from 'react-bootstrap';
import DropZone from '@/components/common/DropZone';
import SeoContent from '@/components/common/SeoContent';

const getPdfJs = async () => {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  return pdfjsLib;
};

const renderPage = async (pdfjsDoc, pageNum, scale) => {
  const page = await pdfjsDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width; canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  return canvas;
};

export default function PDFToImageClient({
  slug          = 'pdf-to-image',
  heading       = 'PDF to Image',
  subtitle      = 'Extract PDF pages as PNG or JPEG images',
  headingIcon   = 'bi-card-image',
  defaultFormat = 'png',
} = {}) {
  const [pdfFile,        setPdfFile]        = useState(null);
  const [pdfjsDoc,       setPdfjsDoc]       = useState(null);
  const [pages,          setPages]          = useState([]);
  const [isLoading,      setIsLoading]      = useState(false);
  const [isExporting,    setIsExporting]    = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [error,          setError]          = useState('');
  const [format,         setFormat]         = useState(defaultFormat);
  const [scale,          setScale]          = useState(2);

  const handleFiles = async (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError(''); setPdfFile(file); setPages([]); setPdfjsDoc(null); setIsLoading(true);
    try {
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      setPdfjsDoc(pdf);
      const pageData = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const canvas = await renderPage(pdf, i, 0.4);
        pageData.push({ index: i, thumbnail: canvas.toDataURL(), selected: true });
      }
      setPages(pageData);
    } catch (err) { setError('Failed to load PDF: ' + err.message); }
    finally { setIsLoading(false); }
  };

  const togglePage  = (index) => setPages(prev => prev.map(p => p.index === index ? { ...p, selected: !p.selected } : p));
  const selectAll   = () => setPages(prev => prev.map(p => ({ ...p, selected: true })));
  const deselectAll = () => setPages(prev => prev.map(p => ({ ...p, selected: false })));
  const selectedPages = pages.filter(p => p.selected);

  const exportImages = async (whichPages) => {
    if (whichPages.length === 0) { setError('Please select at least one page.'); return; }
    setIsExporting(true); setExportProgress(0); setError('');
    try {
      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
      if (whichPages.length === 1) {
        const canvas = await renderPage(pdfjsDoc, whichPages[0].index, Number(scale));
        const blob = await new Promise(res => canvas.toBlob(res, mimeType, 0.95));
        const url = URL.createObjectURL(blob);
        Object.assign(document.createElement('a'), { href: url, download: `page-${whichPages[0].index}.${format}` }).click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } else {
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        for (let i = 0; i < whichPages.length; i++) {
          const canvas = await renderPage(pdfjsDoc, whichPages[i].index, Number(scale));
          const blob = await new Promise(res => canvas.toBlob(res, mimeType, 0.95));
          zip.file(`page-${whichPages[i].index}.${format}`, await blob.arrayBuffer());
          setExportProgress(Math.round(((i + 1) / whichPages.length) * 100));
        }
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        Object.assign(document.createElement('a'), { href: url, download: 'pdf-images.zip' }).click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (err) { setError('Export failed: ' + err.message); }
    finally { setIsExporting(false); setExportProgress(0); }
  };

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className={`bi ${headingIcon} me-2`}></i>{heading}</h1>
          <p className="lead opacity-90 mb-0">{subtitle}</p>
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
              <small className="text-muted">{pages.length} pages loaded</small>
            </div>
            <Button variant="outline-secondary" size="sm" className="d-inline-flex align-items-center gap-1" onClick={() => { setPdfFile(null); setPages([]); setPdfjsDoc(null); }}><i className="bi bi-arrow-repeat" /> Change File</Button>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {isLoading && <div className="text-center py-5"><Spinner variant="primary" style={{ width: '3rem', height: '3rem' }} /><p className="mt-3 text-muted">Loading PDF pages…</p></div>}

        {pages.length > 0 && (
          <>
            <div className="settings-panel mb-4">
              <Row className="g-3 align-items-end">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label htmlFor="pti-format" className="fw-semibold small">Format</Form.Label>
                    <Form.Select id="pti-format" value={format} onChange={e => setFormat(e.target.value)}>
                      <option value="png">PNG (Lossless)</option>
                      <option value="jpg">JPEG (Smaller)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label htmlFor="pti-scale" className="fw-semibold small">Resolution Scale: {scale}× ({Math.round(595 * scale)}×{Math.round(842 * scale)} px approx.)</Form.Label>
                    <Form.Range id="pti-scale" min="1" max="4" step="0.5" value={scale} onChange={e => setScale(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={5} className="d-flex gap-2 align-items-end">
                  <Button variant="outline-primary" size="sm" onClick={selectAll}>Select All</Button>
                  <Button variant="outline-secondary" size="sm" onClick={deselectAll}>Deselect All</Button>
                  <span className="text-muted small ms-auto align-self-center">{selectedPages.length}/{pages.length} selected</span>
                </Col>
              </Row>
            </div>

            <p className="text-muted small mb-3">Click a page to select / deselect it.</p>
            <Row className="g-3 mb-4">
              {pages.map(page => (
                <Col key={page.index} xs={6} sm={4} md={3} lg={2}>
                  <div
                    className={`page-thumbnail${page.selected ? ' selected' : ''}`}
                    onClick={() => togglePage(page.index)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePage(page.index); } }}
                    role="checkbox"
                    aria-checked={page.selected}
                    aria-label={`Page ${page.index}`}
                    tabIndex={0}
                  >
                    <img src={page.thumbnail} alt="" className="w-100 rounded" />
                    <div className="text-center mt-1 small fw-semibold">Page {page.index}</div>
                    {page.selected && <div className="text-center"><Badge bg="primary" pill><i className="bi bi-check-lg" aria-hidden="true"></i></Badge></div>}
                  </div>
                </Col>
              ))}
            </Row>

            {isExporting && exportProgress > 0 && (
              <div className="mb-3">
                <div className="progress"><div className="progress-bar" style={{ width: `${exportProgress}%` }}>{exportProgress}%</div></div>
              </div>
            )}

            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button variant="primary" size="lg" disabled={isExporting || selectedPages.length === 0} onClick={() => exportImages(selectedPages)} className="px-4">
                {isExporting ? <><Spinner size="sm" className="me-2" />Exporting…</> : <><i className="bi bi-download me-2"></i>Download Selected ({selectedPages.length}){selectedPages.length > 1 ? ' as ZIP' : ''}</>}
              </Button>
              <Button variant="outline-primary" size="lg" disabled={isExporting} onClick={() => exportImages(pages)} className="px-4">
                <i className="bi bi-archive me-2"></i>Download All as ZIP
              </Button>
            </div>
          </>
        )}
      </Container>
      <SeoContent slug={slug} />
    </>
  );
}
