'use client';
import React, { useState } from 'react';
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

const parseRanges = (input, pages) => {
  // pages is an array of { index } (1-based) that are still included
  const availableSet = new Set(pages.map(p => p.index));
  const groups = [];
  const parts = input.split(',').map(s => s.trim()).filter(Boolean);
  for (const part of parts) {
    if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number);
      if (Number.isInteger(a) && Number.isInteger(b) && a >= 1 && b >= a) {
        // remap to kept pages within that range
        const indices = pages
          .filter(p => p.index >= a && p.index <= b)
          .map(p => p.index - 1);
        if (indices.length > 0)
          groups.push({ label: `pages_${a}-${b}`, indices });
      }
    } else {
      const n = Number(part);
      if (Number.isInteger(n) && n >= 1 && availableSet.has(n))
        groups.push({ label: `page_${n}`, indices: [n - 1] });
    }
  }
  return groups;
};

export default function SplitPDFClient() {
  const [pdfFile,      setPdfFile]      = useState(null);
  const [pages,        setPages]        = useState([]);   // { index, thumbnail, removed }
  const [isLoading,    setIsLoading]    = useState(false);
  const [splitMode,    setSplitMode]    = useState('all');
  const [rangeInput,   setRangeInput]   = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error,        setError]        = useState('');
  const [success,      setSuccess]      = useState('');

  const handleFiles = async (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError(''); setSuccess(''); setPdfFile(file); setPages([]); setIsLoading(true);
    try {
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const pageData = [];
      for (let i = 1; i <= pdf.numPages; i++)
        pageData.push({ index: i, thumbnail: await renderThumbnail(pdf, i), removed: false });
      setPages(pageData);
    } catch (err) { setError('Failed to load PDF: ' + err.message); }
    finally { setIsLoading(false); }
  };

  const toggleRemove = (index) =>
    setPages(prev => prev.map(p => p.index === index ? { ...p, removed: !p.removed } : p));

  const keptPages    = pages.filter(p => !p.removed);
  const removedCount = pages.filter(p => p.removed).length;

  const splitPDF = async () => {
    if (!pdfFile || keptPages.length === 0) return;
    setIsProcessing(true); setError(''); setSuccess('');
    try {
      const pdf = await PDFDocument.load(await pdfFile.arrayBuffer());
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      let groups;

      if (splitMode === 'all') {
        groups = keptPages.map(p => ({ label: `page_${p.index}`, indices: [p.index - 1] }));
      } else {
        groups = parseRanges(rangeInput, keptPages);
        if (groups.length === 0) {
          setError(`Invalid ranges. Use format like: 1-3, 5, 7-9`);
          setIsProcessing(false); return;
        }
      }

      for (const group of groups) {
        const newPdf = await PDFDocument.create();
        const copied = await newPdf.copyPages(pdf, group.indices);
        copied.forEach(p => newPdf.addPage(p));
        zip.file(`${group.label}.pdf`, await newPdf.save());
      }

      const url = URL.createObjectURL(await zip.generateAsync({ type: 'blob' }));
      Object.assign(document.createElement('a'), { href: url, download: 'split-pdfs.zip' }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSuccess(`Done! Downloaded ${groups.length} PDF file${groups.length > 1 ? 's' : ''} as ZIP.`);
    } catch (err) { setError('Failed to split PDF: ' + err.message); }
    finally { setIsProcessing(false); }
  };

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-scissors me-2"></i>Split PDF</h1>
          <p className="lead opacity-90 mb-0">Remove pages you don't need, then split into separate PDFs</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 900 }}>
        {/* ── File picker ── */}
        {!pdfFile ? (
          <DropZone onFiles={handleFiles} accept="application/pdf" multiple={false} label="Drop a PDF file here or click to browse" />
        ) : (
          <div className="d-flex align-items-center settings-panel mb-4 gap-3">
            <i className="bi bi-file-earmark-pdf-fill text-danger flex-shrink-0" style={{ fontSize: '2rem' }} />
            <div className="flex-grow-1 min-w-0 d-flex flex-column flex-sm-row align-items-sm-center gap-2">
              <div className="min-w-0 flex-grow-1">
                <div className="fw-semibold text-truncate">{pdfFile.name}</div>
                <small className="text-muted">
                  {pages.length} pages &middot; {formatBytes(pdfFile.size)}
                  {removedCount > 0 && (
                    <span className="ms-2 text-danger fw-semibold">({removedCount} excluded)</span>
                  )}
                </small>
              </div>
              <Button
                variant="outline-secondary" size="sm"
                className="d-inline-flex align-items-center gap-1 flex-shrink-0"
                onClick={() => { setPdfFile(null); setPages([]); setSuccess(''); setError(''); }}
              >
                <i className="bi bi-arrow-repeat" /> Change File
              </Button>
            </div>
          </div>
        )}

        {error   && <Alert variant="danger"  className="mt-3" dismissible onClose={() => setError('')}>{error}</Alert>}
        {success && <Alert variant="success" className="mt-3"><i className="bi bi-check-circle me-2" />{success}</Alert>}

        {/* ── Loading spinner ── */}
        {isLoading && (
          <div className="text-center py-5">
            <Spinner variant="primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted">Loading PDF pages…</p>
          </div>
        )}

        {/* ── Page thumbnails ── */}
        {pages.length > 0 && (
          <>
            <p className="text-muted small mb-3">
              <i className="bi bi-x-circle me-1" />
              Click the <strong>✕</strong> on any page to exclude it from the output. Excluded pages are skipped when splitting.
            </p>

            <Row className="g-3 mb-4">
              {pages.map(page => (
                <Col key={page.index} xs={6} sm={4} md={3}>
                  <div
                    style={{
                      borderRadius: 10,
                      border: page.removed ? '2.5px solid #ef4444' : '2px solid #e5e7eb',
                      background: page.removed ? '#fef2f2' : '#fff',
                      padding: 6,
                      position: 'relative',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                  >
                    {/* Red X remove button */}
                    <button
                      onClick={() => toggleRemove(page.index)}
                      aria-label={page.removed ? 'Restore page' : 'Exclude page'}
                      style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        border: 'none',
                        background: page.removed ? '#ef4444' : 'rgba(239,68,68,0.85)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        lineHeight: 1,
                        zIndex: 2,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                        transition: 'background 0.15s, transform 0.15s',
                        padding: 0,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      <i className={`bi ${page.removed ? 'bi-arrow-counterclockwise' : 'bi-x-lg'}`} aria-hidden="true" />
                    </button>

                    <img
                      src={page.thumbnail}
                      alt={`Page ${page.index}`}
                      style={{
                        width: '100%',
                        borderRadius: 6,
                        display: 'block',
                        opacity: page.removed ? 0.35 : 1,
                        transition: 'opacity 0.15s',
                      }}
                    />
                    <div
                      className="text-center mt-1 small fw-semibold"
                      style={{ color: page.removed ? '#ef4444' : palette.text.secondary }}
                    >
                      {page.removed ? <s>Page {page.index}</s> : `Page ${page.index}`}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* ── Split options ── */}
            {keptPages.length > 0 && (
              <div className="settings-panel mb-4">
                <h6 className="fw-bold mb-3">Split Options</h6>
                <Form.Check
                  type="radio" id="split-all"
                  label={`Extract each page as a separate PDF (${keptPages.length} file${keptPages.length !== 1 ? 's' : ''})`}
                  checked={splitMode === 'all'}
                  onChange={() => setSplitMode('all')}
                  className="mb-3"
                />
                <Form.Check
                  type="radio" id="split-range"
                  label="Split by custom page ranges"
                  checked={splitMode === 'range'}
                  onChange={() => setSplitMode('range')}
                  className="mb-3"
                />
                {splitMode === 'range' && (
                  <Form.Group className="mb-3 ms-4">
                    <Form.Control
                      type="text"
                      placeholder="e.g. 1-3, 5, 7-9"
                      value={rangeInput}
                      onChange={e => setRangeInput(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Each entry becomes a separate PDF. Use original page numbers.
                      Kept pages: {keptPages.map(p => p.index).join(', ')}.
                    </Form.Text>
                  </Form.Group>
                )}

                <div className="text-center mt-3">
                  <Button
                    size="lg"
                    onClick={splitPDF}
                    disabled={isProcessing || keptPages.length === 0}
                    className="px-5"
                    style={{ background: palette.gradient.primary, border: 'none', color: '#fff' }}
                  >
                    {isProcessing
                      ? <><Spinner size="sm" className="me-2" />Splitting…</>
                      : <><i className="bi bi-archive me-2" />Split &amp; Download ZIP</>
                    }
                  </Button>
                </div>
              </div>
            )}

            {keptPages.length === 0 && (
              <Alert variant="warning">
                <i className="bi bi-exclamation-triangle me-2" />
                All pages are excluded. Restore at least one page to split.
              </Alert>
            )}
          </>
        )}
      </Container>
      <SeoContent slug="split-pdf" />
    </>
  );
}
