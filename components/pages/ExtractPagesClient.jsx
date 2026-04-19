'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { PDFDocument } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import palette from '@/theme/palette';
import SeoContent from '@/components/common/SeoContent';

const getPdfJs = async () => {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  return pdfjsLib;
};

const renderThumbnail = async (pdfjsDoc, pageNum) => {
  const page = await pdfjsDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale: 0.4 });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  return canvas.toDataURL();
};

const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

export default function ExtractPagesClient() {
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
        pageData.push({ index: i, thumbnail: await renderThumbnail(pdf, i), selected: false });
      setPages(pageData);
    } catch (err) { setError('Failed to load PDF: ' + err.message); }
    finally { setIsLoading(false); }
  };

  const togglePage = (index) =>
    setPages(prev => prev.map(p => p.index === index ? { ...p, selected: !p.selected } : p));

  const selectAll   = () => setPages(prev => prev.map(p => ({ ...p, selected: true })));
  const deselectAll = () => setPages(prev => prev.map(p => ({ ...p, selected: false })));

  const selectedCount = pages.filter(p => p.selected).length;

  const handleExtract = async () => {
    if (!pdfFile || selectedCount === 0) return;
    setIsProcessing(true); setError('');
    try {
      const pdf = await PDFDocument.load(await pdfFile.arrayBuffer());
      const newPdf = await PDFDocument.create();
      const selectedIndices = pages.filter(p => p.selected).map(p => p.index - 1);
      const copied = await newPdf.copyPages(pdf, selectedIndices);
      copied.forEach(page => newPdf.addPage(page));
      const bytes = await newPdf.save();
      const baseName = pdfFile.name.replace(/\.pdf$/i, '');
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      Object.assign(document.createElement('a'), { href: url, download: `${baseName}-extracted.pdf` }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError('Failed to process PDF: ' + err.message); }
    finally { setIsProcessing(false); }
  };

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-file-earmark-plus me-2"></i>Extract Pages</h1>
          <p className="lead opacity-90 mb-0">Select pages to keep and extract them into a new PDF</p>
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
              <small className="text-muted">{pages.length} pages &middot; {formatBytes(pdfFile.size)}</small>
            </div>
            <Button variant="outline-secondary" size="sm" className="d-inline-flex align-items-center gap-1" onClick={() => { setPdfFile(null); setPages([]); }}><i className="bi bi-arrow-repeat" /> Change File</Button>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3" dismissible onClose={() => setError('')}>{error}</Alert>}

        {isLoading && (
          <div className="text-center py-5">
            <Spinner variant="primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted">Loading PDF pages…</p>
          </div>
        )}

        {pages.length > 0 && (
          <>
            <div className="d-flex gap-2 mb-3 flex-wrap align-items-center">
              <Button variant="outline-primary" size="sm" onClick={selectAll}>Select All</Button>
              <Button variant="outline-secondary" size="sm" onClick={deselectAll}>Deselect All</Button>
              <span className="text-muted small ms-auto">{selectedCount} of {pages.length} selected</span>
            </div>

            <p className="text-muted small mb-3">
              Click a page to select it (green border). Only selected pages will appear in the extracted PDF.
            </p>

            <Row className="g-3 mb-4">
              {pages.map(page => (
                <Col key={page.index} xs={6} sm={4} md={3}>
                  <div
                    onClick={() => togglePage(page.index)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: 10,
                      border: page.selected ? '3px solid #10b981' : '2px solid #e5e7eb',
                      background: page.selected ? '#ecfdf5' : '#fff',
                      padding: 6,
                      position: 'relative',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                  >
                    <img
                      src={page.thumbnail}
                      alt={`Page ${page.index}`}
                      style={{ width: '100%', borderRadius: 6, display: 'block' }}
                    />
                    {page.selected && (
                      <div style={{
                        position: 'absolute', top: 8, right: 8,
                        background: '#10b981', borderRadius: '50%',
                        width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <i className="bi bi-check-lg text-white" style={{ fontSize: '0.85rem' }}></i>
                      </div>
                    )}
                    <div className="text-center mt-1 small fw-semibold" style={{ color: page.selected ? '#10b981' : palette.text.secondary }}>
                      Page {page.index}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <div className="text-center">
              <Button
                size="lg"
                disabled={isProcessing || selectedCount === 0}
                onClick={handleExtract}
                className="px-5"
                style={{ background: palette.gradient.primary, border: 'none', color: '#fff' }}
              >
                {isProcessing
                  ? <><Spinner size="sm" className="me-2" />Processing…</>
                  : <><i className="bi bi-file-earmark-arrow-down me-2"></i>
                    {selectedCount === 0 ? 'Select pages to extract' : `Extract ${selectedCount} Page${selectedCount !== 1 ? 's' : ''}`}
                  </>
                }
              </Button>
            </div>
          </>
        )}
      </Container>
      <SeoContent slug="extract-pages" />
    </>
  );
}
