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

const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const ROTATE_BTNS = [
  { angle: -90, label: '↺ 90°', title: 'Rotate 90° counter-clockwise' },
  { angle:  90, label: '↻ 90°', title: 'Rotate 90° clockwise' },
];

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
  const selectAll   = () => setPages(prev => prev.map(p => ({ ...p, selected: true  })));
  const deselectAll = () => setPages(prev => prev.map(p => ({ ...p, selected: false })));

  /* ── Rotate helpers ── */
  const rotate = (angle, target) => setPages(prev => prev.map(p => {
    if (target === 'all' || (target === 'selected' && p.selected) || target === p.index)
      return { ...p, rotation: ((p.rotation + angle) % 360 + 360) % 360 };
    return p;
  }));

  /* ── Reset helpers ── */
  const resetAll  = () => setPages(prev => prev.map(p => ({ ...p, rotation: 0 })));
  const resetPage = (index) => setPages(prev => prev.map(p => p.index === index ? { ...p, rotation: 0 } : p));

  const selectedCount = pages.filter(p => p.selected).length;
  const hasRotations  = pages.some(p => p.rotation !== 0);

  const applyAndDownload = async () => {
    if (!pdfFile) return;
    setIsProcessing(true); setError('');
    try {
      const pdf = await PDFDocument.load(await pdfFile.arrayBuffer());
      pages.forEach(({ index, rotation }) => {
        if (rotation !== 0) {
          const page = pdf.getPage(index - 1);
          page.setRotation(degrees((page.getRotation().angle + rotation) % 360));
        }
      });
      const baseName = pdfFile.name.replace(/\.pdf$/i, '');
      const url = URL.createObjectURL(new Blob([await pdf.save()], { type: 'application/pdf' }));
      Object.assign(document.createElement('a'), { href: url, download: `${baseName}-rotated.pdf` }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError('Failed to process PDF: ' + err.message); }
    finally { setIsProcessing(false); }
  };

  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-arrow-clockwise me-2"></i>Rotate PDF</h1>
          <p className="lead opacity-90 mb-0">Rotate pages individually or all at once — preview updates instantly</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5">
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
                onClick={() => { setPdfFile(null); setPages([]); }}
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

        {pages.length > 0 && (
          <>
            {/* ── Global toolbar ── */}
            <div className="settings-panel mb-3">
              {/* Row 1 — selection + reset */}
              <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                <Button variant="outline-primary"    size="sm" onClick={selectAll}>Select All</Button>
                <Button variant="outline-secondary"  size="sm" onClick={deselectAll}>Deselect All</Button>
                <div className="ms-auto d-flex gap-2">
                  {hasRotations && (
                    <Button
                      variant="outline-danger" size="sm"
                      className="d-inline-flex align-items-center gap-1"
                      onClick={resetAll}
                      title="Reset all rotations to original"
                    >
                      <i className="bi bi-arrow-counterclockwise" /> Reset All
                    </Button>
                  )}
                </div>
              </div>

              {/* Row 2 — rotate selected + rotate all (side-by-side on desktop) */}
              <div className="d-flex flex-column flex-sm-row gap-3">
                {selectedCount > 0 && (
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span className="text-muted small fw-semibold">Rotate selected ({selectedCount}):</span>
                    <ButtonGroup size="sm">
                      {ROTATE_BTNS.map(btn => (
                        <Button key={btn.angle} variant="outline-primary" title={btn.title} onClick={() => rotate(btn.angle, 'selected')}>
                          {btn.label}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </div>
                )}

                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <span className="text-muted small fw-semibold">Rotate all:</span>
                  <ButtonGroup size="sm">
                    {ROTATE_BTNS.map(btn => (
                      <Button key={btn.angle} variant="primary" title={btn.title} onClick={() => rotate(btn.angle, 'all')}>
                        {btn.label}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </div>
            </div>

            <p className="text-muted small mb-3">
              <i className="bi bi-info-circle me-1" />
              Click a page to select it for bulk rotation. Use the per-page buttons below each thumbnail for individual control.
            </p>

            {/* ── Page grid ── */}
            <Row className="g-3 mb-4">
              {pages.map(page => (
                <Col key={page.index} xs={6} sm={4} md={3} lg={2}>
                  <div
                    className={`page-thumbnail${page.selected ? ' selected' : ''}`}
                    onClick={() => togglePage(page.index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Thumbnail preview */}
                    <div style={{
                      overflow: 'hidden', borderRadius: 6, aspectRatio: '1/1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: palette.surface.overlay,
                    }}>
                      <img
                        src={page.thumbnail}
                        alt={`Page ${page.index}`}
                        style={{
                          maxWidth: '100%', maxHeight: '100%',
                          transform: `rotate(${page.rotation}deg)`,
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </div>

                    {/* Page label + badges */}
                    <div className="text-center mt-1 small fw-semibold">Page {page.index}</div>
                    <div className="text-center mb-1" style={{ minHeight: 22 }}>
                      {page.rotation !== 0 && (
                        <Badge bg="warning" text="dark" pill className="me-1">
                          <i className="bi bi-arrow-clockwise me-1" />{page.rotation}°
                        </Badge>
                      )}
                      {page.selected && <Badge bg="primary" pill><i className="bi bi-check-lg" /></Badge>}
                    </div>

                    {/* Per-page rotate buttons — stop click from toggling selection */}
                    <div
                      className="d-flex justify-content-center flex-wrap gap-1"
                      onClick={e => e.stopPropagation()}
                    >
                      {[
                        { angle: -90, title: '↺ 90°' },
                        { angle:  90, title: '↻ 90°' },
                      ].map(btn => (
                        <Button
                          key={btn.angle}
                          size="sm"
                          variant="outline-secondary"
                          title={btn.title}
                          onClick={() => rotate(btn.angle, page.index)}
                          style={{ padding: '1px 5px', fontSize: '0.7rem' }}
                        >
                          {btn.title}
                        </Button>
                      ))}

                      {/* Per-page reset — only shown when rotated */}
                      {page.rotation !== 0 && (
                        <Button
                          size="sm"
                          variant="outline-danger"
                          title="Reset rotation"
                          onClick={() => resetPage(page.index)}
                          style={{ padding: '1px 5px', fontSize: '0.7rem' }}
                        >
                          <i className="bi bi-x-circle" /> Reset
                        </Button>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* ── Download ── */}
            <div className="text-center">
              <Button
                size="lg"
                onClick={applyAndDownload}
                disabled={isProcessing || !hasRotations}
                className="px-5"
                style={{ background: palette.gradient.primary, border: 'none', color: '#fff' }}
              >
                {isProcessing
                  ? <><Spinner size="sm" className="me-2" />Processing…</>
                  : <><i className="bi bi-file-earmark-arrow-down me-2" />Apply Rotation &amp; Download</>
                }
              </Button>
              {!hasRotations && <p className="text-muted small mt-2">Rotate at least one page to enable download.</p>}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
