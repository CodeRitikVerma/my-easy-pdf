'use client';
import React, { useState, useRef } from 'react';
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

export default function OrganizePDFClient() {
  const [pdfFile,      setPdfFile]      = useState(null);
  const [pages,        setPages]        = useState([]);
  const [isLoading,    setIsLoading]    = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error,        setError]        = useState('');
  const [dragId,       setDragId]       = useState(null);
  const dragOverId = useRef(null);

  const handleFiles = async (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError(''); setPdfFile(file); setPages([]); setIsLoading(true);
    try {
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const pageData = [];
      for (let i = 1; i <= pdf.numPages; i++)
        pageData.push({ id: i, originalIndex: i, thumbnail: await renderThumbnail(pdf, i) });
      setPages(pageData);
    } catch (err) { setError('Failed to load PDF: ' + err.message); }
    finally { setIsLoading(false); }
  };

  const movePage = (pos, direction) => {
    setPages(prev => {
      const arr = [...prev];
      const target = pos + direction;
      if (target < 0 || target >= arr.length) return arr;
      [arr[pos], arr[target]] = [arr[target], arr[pos]];
      return arr;
    });
  };

  /* ── Drag-to-reorder ── */
  const onDragStart = (id) => setDragId(id);

  const onDragOver = (e, id) => {
    e.preventDefault();
    if (!dragId || dragId === id || dragOverId.current === id) return;
    dragOverId.current = id;
    setPages(prev => {
      const arr  = [...prev];
      const from = arr.findIndex(p => p.id === dragId);
      const to   = arr.findIndex(p => p.id === id);
      if (from === -1 || to === -1) return prev;
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  const onDragEnd = () => { setDragId(null); dragOverId.current = null; };

  const handleSave = async () => {
    if (!pdfFile) return;
    setIsProcessing(true); setError('');
    try {
      const pdf = await PDFDocument.load(await pdfFile.arrayBuffer());
      const newPdf = await PDFDocument.create();
      const indices = pages.map(p => p.originalIndex - 1);
      const copied = await newPdf.copyPages(pdf, indices);
      copied.forEach(page => newPdf.addPage(page));
      const bytes = await newPdf.save();
      const baseName = pdfFile.name.replace(/\.pdf$/i, '');
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      Object.assign(document.createElement('a'), { href: url, download: `${baseName}-organized.pdf` }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError('Failed to process PDF: ' + err.message); }
    finally { setIsProcessing(false); }
  };

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-grid me-2"></i>Organize PDF</h1>
          <p className="lead opacity-90 mb-0">Drag pages to reorder or use the arrow buttons, then save your PDF</p>
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
            <p className="text-muted small mb-3">
              <i className="bi bi-grip-horizontal me-1" />Drag pages to reorder, or use the ← → buttons. The number shown is the new position in the output PDF.
            </p>

            <Row className="g-3 mb-4">
              {pages.map((page, pos) => (
                <Col key={page.id} xs={6} sm={4} md={3}>
                  <div
                    draggable
                    onDragStart={() => onDragStart(page.id)}
                    onDragOver={(e) => onDragOver(e, page.id)}
                    onDragEnd={onDragEnd}
                    style={{
                      borderRadius: 10,
                      border: dragId === page.id ? '2px dashed #6366f1' : '2px solid #e5e7eb',
                      background: '#fff',
                      padding: 6,
                      position: 'relative',
                      opacity: dragId === page.id ? 0.4 : 1,
                      cursor: 'grab',
                      transition: 'border-color 0.15s, box-shadow 0.15s, opacity 0.15s',
                      boxShadow: dragId === page.id ? 'none' : '0 1px 4px rgba(0,0,0,0.05)',
                      userSelect: 'none',
                    }}
                    onMouseEnter={e => { if (dragId !== page.id) e.currentTarget.style.boxShadow = '0 4px 14px rgba(99,102,241,0.14)'; e.currentTarget.style.borderColor = '#c7d2fe'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; if (dragId !== page.id) e.currentTarget.style.borderColor = '#e5e7eb'; }}
                  >
                    {/* Drag handle hint */}
                    <div style={{ textAlign: 'center', fontSize: '0.65rem', color: '#c4b5fd', marginBottom: 3, letterSpacing: 2, lineHeight: 1 }}>
                      ⠿
                    </div>
                    <img
                      src={page.thumbnail}
                      alt={`Page ${pos + 1}`}
                      draggable={false}
                      style={{ width: '100%', borderRadius: 6, display: 'block' }}
                    />
                    <div className="text-center mt-1 small fw-semibold" style={{ color: palette.text.secondary }}>
                      Page {pos + 1}
                      {page.originalIndex !== pos + 1 && (
                        <span className="ms-1" style={{ color: palette.indigo?.[500] ?? '#6366f1', fontSize: '0.75em' }}>
                          (was {page.originalIndex})
                        </span>
                      )}
                    </div>
                    <div className="d-flex justify-content-center gap-1 mt-1">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        disabled={pos === 0}
                        onClick={() => movePage(pos, -1)}
                        style={{ padding: '2px 8px', fontSize: '0.8rem' }}
                        title="Move left"
                      >
                        <i className="bi bi-arrow-left" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        disabled={pos === pages.length - 1}
                        onClick={() => movePage(pos, 1)}
                        style={{ padding: '2px 8px', fontSize: '0.8rem' }}
                        title="Move right"
                      >
                        <i className="bi bi-arrow-right" />
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <div className="text-center">
              <Button
                size="lg"
                onClick={handleSave}
                disabled={isProcessing}
                className="px-5"
                style={{ background: palette.gradient.primary, border: 'none', color: '#fff' }}
              >
                {isProcessing
                  ? <><Spinner size="sm" className="me-2" />Processing…</>
                  : <><i className="bi bi-file-earmark-arrow-down me-2"></i>Save PDF</>
                }
              </Button>
            </div>
          </>
        )}
      </Container>
      <SeoContent slug="organize-pdf" />
    </>
  );
}
