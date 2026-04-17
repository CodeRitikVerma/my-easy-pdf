import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Badge, Form } from 'react-bootstrap';
import * as pdfjsLib from 'pdfjs-dist';
import DropZone from '../components/common/DropZone';
import SEO from '../components/SEO';

// Set up pdfjs worker using Vite's asset URL import
import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const renderPage = async (pdfjsDoc, pageNum, scale) => {
  const page = await pdfjsDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  return canvas;
};

const PDFToImagePage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfjsDoc, setPdfjsDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [error, setError] = useState('');
  const [format, setFormat] = useState('png');
  const [scale, setScale] = useState(2);

  const handleFiles = async (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) {
      setError('Please upload a PDF file.');
      return;
    }
    setError('');
    setPdfFile(file);
    setPages([]);
    setPdfjsDoc(null);
    setIsLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfjsDoc(pdf);

      const pageData = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const canvas = await renderPage(pdf, i, 0.4); // small thumbnails
        pageData.push({ index: i, thumbnail: canvas.toDataURL(), selected: true });
      }
      setPages(pageData);
    } catch (err) {
      setError('Failed to load PDF: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePage = (index) =>
    setPages(prev => prev.map(p => p.index === index ? { ...p, selected: !p.selected } : p));

  const selectAll = () => setPages(prev => prev.map(p => ({ ...p, selected: true })));
  const deselectAll = () => setPages(prev => prev.map(p => ({ ...p, selected: false })));

  const selectedPages = pages.filter(p => p.selected);

  const exportImages = async (whichPages) => {
    if (whichPages.length === 0) {
      setError('Please select at least one page.');
      return;
    }
    setIsExporting(true);
    setExportProgress(0);
    setError('');

    try {
      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';

      if (whichPages.length === 1) {
        // Single page — direct download
        const canvas = await renderPage(pdfjsDoc, whichPages[0].index, Number(scale));
        const blob = await new Promise(res => canvas.toBlob(res, mimeType, 0.95));
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `page-${whichPages[0].index}.${format}`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } else {
        // Multiple pages — ZIP
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
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pdf-images.zip';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (err) {
      setError('Export failed: ' + err.message);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <>
      <SEO
        canonical="/pdf-to-image"
        title="PDF to Image Converter — Extract Pages as PNG or JPEG"
        description="Extract every page of a PDF as PNG or JPEG images. Download pages individually or as a ZIP file. Free, private, no upload — works in your browser."
        keywords="PDF to image, PDF to PNG, PDF to JPEG, extract PDF pages, convert PDF to image online free"
      />
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2">
            <i className="bi bi-card-image me-2"></i>PDF to Image
          </h1>
          <p className="lead opacity-90 mb-0">Extract PDF pages as PNG or JPEG images</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5">
        {!pdfFile ? (
          <DropZone
            onFiles={handleFiles}
            accept="application/pdf"
            multiple={false}
            label="Drop a PDF file here or click to browse"
          />
        ) : (
          <div className="d-flex align-items-center settings-panel mb-4">
            <i className="bi bi-file-earmark-pdf-fill text-danger me-3" style={{ fontSize: '2rem' }}></i>
            <div className="flex-grow-1 min-w-0">
              <div className="fw-semibold text-truncate">{pdfFile.name}</div>
              <small className="text-muted">{pages.length} pages loaded</small>
            </div>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => { setPdfFile(null); setPages([]); setPdfjsDoc(null); }}
            >
              Change File
            </Button>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        {isLoading && (
          <div className="text-center py-5">
            <Spinner variant="primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted">Loading PDF pages…</p>
          </div>
        )}

        {pages.length > 0 && (
          <>
            {/* Settings bar */}
            <div className="settings-panel mb-4">
              <Row className="g-3 align-items-end">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">Format</Form.Label>
                    <Form.Select value={format} onChange={e => setFormat(e.target.value)}>
                      <option value="png">PNG (Lossless)</option>
                      <option value="jpg">JPEG (Smaller)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Resolution Scale: {scale}× ({Math.round(595 * scale)}×{Math.round(842 * scale)} px approx.)
                    </Form.Label>
                    <Form.Range min="1" max="4" step="0.5" value={scale} onChange={e => setScale(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={5} className="d-flex gap-2 align-items-end">
                  <Button variant="outline-primary" size="sm" onClick={selectAll}>Select All</Button>
                  <Button variant="outline-secondary" size="sm" onClick={deselectAll}>Deselect All</Button>
                  <span className="text-muted small ms-auto align-self-center">
                    {selectedPages.length}/{pages.length} selected
                  </span>
                </Col>
              </Row>
            </div>

            {/* Page grid */}
            <p className="text-muted small mb-3">Click a page to select / deselect it.</p>
            <Row className="g-3 mb-4">
              {pages.map(page => (
                <Col key={page.index} xs={6} sm={4} md={3} lg={2}>
                  <div
                    className={`page-thumbnail${page.selected ? ' selected' : ''}`}
                    onClick={() => togglePage(page.index)}
                  >
                    <img
                      src={page.thumbnail}
                      alt={`Page ${page.index}`}
                      className="w-100 rounded"
                    />
                    <div className="text-center mt-1 small fw-semibold">Page {page.index}</div>
                    {page.selected && (
                      <div className="text-center">
                        <Badge bg="primary" pill><i className="bi bi-check-lg"></i></Badge>
                      </div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>

            {/* Export progress */}
            {isExporting && exportProgress > 0 && (
              <div className="mb-3">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${exportProgress}%` }}
                  >
                    {exportProgress}%
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button
                variant="primary"
                size="lg"
                disabled={isExporting || selectedPages.length === 0}
                onClick={() => exportImages(selectedPages)}
                className="px-4"
              >
                {isExporting
                  ? <><Spinner size="sm" className="me-2" />Exporting…</>
                  : <><i className="bi bi-download me-2"></i>
                    Download Selected ({selectedPages.length})
                    {selectedPages.length > 1 ? ' as ZIP' : ''}
                  </>
                }
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                disabled={isExporting}
                onClick={() => exportImages(pages)}
                className="px-4"
              >
                <i className="bi bi-archive me-2"></i>Download All as ZIP
              </Button>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default PDFToImagePage;
