'use client';
import React, { useState, useRef } from 'react';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import { PDFDocument } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import palette from '@/theme/palette';
import SeoContent from '@/components/common/SeoContent';

/* ── PDF.js lazy loader ── */
const getPdfJs = async () => {
  const lib = await import('pdfjs-dist');
  lib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  return lib;
};

const THUMB_SCALE   = 0.28;   // small + fast
const THUMB_QUALITY = 0.78;
const BATCH_SIZE    = 4;       // pages flushed to state at once

/* ═══════════════════════════════════════
   Component
═══════════════════════════════════════ */
export default function MergePDFClient() {
  const [pages,       setPages]       = useState([]);   // ordered flat page list
  const pdfDocsRef = useRef(new Map()); // fileId → { doc: PDFDocument, name }

  const [loading,     setLoading]     = useState(false);
  const [loadProg,    setLoadProg]    = useState({ done: 0, total: 0 });
  const [dragId,      setDragId]      = useState(null);
  const [isProcessing,setIsProcessing]= useState(false);
  const [error,       setError]       = useState('');
  const [success,     setSuccess]     = useState(false);
  const addMoreRef = useRef(null);

  /* ── Load PDFs → thumbnails ── */
  const handleFiles = async (rawFiles) => {
    const files = Array.from(rawFiles).filter(f => f.type === 'application/pdf');
    if (!files.length) { setError('Please upload PDF files only.'); return; }
    setError(''); setSuccess(false);
    setLoading(true);

    try {
      const pdfjsLib = await getPdfJs();

      /* Pre-load every PDF so we know total page count upfront */
      const loaded = await Promise.all(
        files.map(async (file) => {
          const ab        = await file.arrayBuffer();
          const fileId    = crypto.randomUUID();
          const pdfLibDoc = await PDFDocument.load(new Uint8Array(ab));
          const pdfjsDoc  = await pdfjsLib.getDocument({ data: new Uint8Array(ab) }).promise;
          return { file, fileId, pdfLibDoc, pdfjsDoc };
        }),
      );

      const total = loaded.reduce((s, l) => s + l.pdfjsDoc.numPages, 0);
      setLoadProg({ done: 0, total });

      /* Register pdf-lib docs for later merging */
      for (const { fileId, pdfLibDoc, file } of loaded) {
        pdfDocsRef.current.set(fileId, { doc: pdfLibDoc, name: file.name });
      }

      /* Render thumbnails page-by-page, batch state flushes */
      let done = 0;
      for (const { file, fileId, pdfjsDoc } of loaded) {
        let batch = [];
        for (let i = 0; i < pdfjsDoc.numPages; i++) {
          const page = await pdfjsDoc.getPage(i + 1);
          const vp   = page.getViewport({ scale: THUMB_SCALE });
          const cvs  = document.createElement('canvas');
          cvs.width  = vp.width;
          cvs.height = vp.height;
          await page.render({ canvasContext: cvs.getContext('2d'), viewport: vp }).promise;

          batch.push({
            id:        crypto.randomUUID(),
            fileId,
            fileName:  file.name,
            pageIndex: i,
            thumbnail: cvs.toDataURL('image/jpeg', THUMB_QUALITY),
          });

          done++;
          setLoadProg({ done, total });

          if (batch.length >= BATCH_SIZE || i === pdfjsDoc.numPages - 1) {
            const snap = [...batch]; batch = [];
            setPages(prev => [...prev, ...snap]);
          }
        }
      }
    } catch (e) {
      setError('Failed to load PDF: ' + e.message);
    } finally {
      setLoading(false);
      setLoadProg({ done: 0, total: 0 });
    }
  };

  /* ── Page actions ── */
  const removePage = (id) => setPages(prev => prev.filter(p => p.id !== id));

  const movePage = (id, dir /* 'left' | 'right' */) => {
    setPages(prev => {
      const arr = [...prev];
      const i   = arr.findIndex(p => p.id === id);
      if (dir === 'left'  && i > 0)              [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      if (dir === 'right' && i < arr.length - 1) [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      return arr;
    });
  };

  const clearAll = () => {
    setPages([]); pdfDocsRef.current.clear();
    setError(''); setSuccess(false);
  };

  /* ── Drag-to-reorder ── */
  const onDragStart = (id) => setDragId(id);

  const onDragOver = (e, targetId) => {
    e.preventDefault();
    if (!dragId || dragId === targetId) return;
    setPages(prev => {
      const arr  = [...prev];
      const from = arr.findIndex(p => p.id === dragId);
      const to   = arr.findIndex(p => p.id === targetId);
      if (from === -1 || to === -1) return prev;
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  const onDragEnd = () => setDragId(null);

  /* ── Merge ── */
  const handleMerge = async () => {
    if (pages.length < 2) { setError('Add at least 2 pages to merge.'); return; }
    setIsProcessing(true); setError(''); setSuccess(false);
    try {
      const merged = await PDFDocument.create();
      for (const page of pages) {
        const src = pdfDocsRef.current.get(page.fileId);
        if (!src) throw new Error('Source PDF missing — please re-add the file.');
        const [copied] = await merged.copyPages(src.doc, [page.pageIndex]);
        merged.addPage(copied);
      }
      const url = URL.createObjectURL(
        new Blob([await merged.save()], { type: 'application/pdf' }),
      );
      Object.assign(document.createElement('a'), { href: url, download: 'merged.pdf' }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSuccess(true);
    } catch (e) {
      setError('Merge failed: ' + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  /* ── Derived ── */
  const fileCount = new Set(pages.map(p => p.fileId)).size;
  const pct       = loadProg.total > 0 ? Math.round((loadProg.done / loadProg.total) * 100) : 0;

  /* ════════════════════════ Render ════════════════════════ */
  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-layers-fill me-2" />Merge PDFs</h1>
          <p className="lead opacity-90 mb-0">
            Add PDFs, rearrange or remove any page, then download the merged file
          </p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 1100 }}>

        {/* Empty state — full drop zone */}
        {pages.length === 0 && !loading && (
          <DropZone
            onFiles={handleFiles}
            accept="application/pdf"
            label="Drop PDF files here or click to browse"
            multiple
          />
        )}

        {/* Once files exist — compact "Add more" strip */}
        {(pages.length > 0 || loading) && (
          <button
            className="merge-add-strip"
            onClick={() => addMoreRef.current?.click()}
            disabled={loading}
          >
            <i className="bi bi-plus-circle-fill" style={{ color: palette.primary, fontSize: '1.2rem' }} />
            <span style={{ fontWeight: 600, color: palette.primary }}>Add more PDFs</span>
            <span className="text-muted small ms-auto d-none d-sm-inline">drag files anywhere</span>
            <input
              ref={addMoreRef} type="file" accept="application/pdf" multiple
              style={{ display: 'none' }}
              onChange={e => { handleFiles(Array.from(e.target.files)); e.target.value = ''; }}
            />
          </button>
        )}

        {/* Loading progress */}
        {loading && (
          <div className="settings-panel mb-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="fw-semibold d-flex align-items-center gap-2">
                <Spinner size="sm" />
                Generating page previews…
              </span>
              <span className="text-muted small">{loadProg.done} / {loadProg.total} pages</span>
            </div>
            <div style={{ height: 6, borderRadius: 6, background: '#e5e7eb', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%', borderRadius: 6,
                  width: `${pct}%`,
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  transition: 'width 0.25s ease',
                }}
              />
            </div>
          </div>
        )}

        {/* Alerts */}
        {error && (
          <Alert variant="danger" className="mt-3" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="mt-3" dismissible onClose={() => setSuccess(false)}>
            <i className="bi bi-check-circle me-2" />
            PDF merged and downloaded successfully!
          </Alert>
        )}

        {/* ── Page thumbnail grid ── */}
        {pages.length > 0 && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-1">
              <div>
                <span className="fw-bold" style={{ color: '#1e1b4b' }}>
                  {pages.length} page{pages.length !== 1 ? 's' : ''}
                </span>
                <span className="text-muted small ms-2">
                  from {fileCount} file{fileCount !== 1 ? 's' : ''}
                  &nbsp;·&nbsp;drag or use &nbsp;<i className="bi bi-chevron-left" /><i className="bi bi-chevron-right" />&nbsp; to reorder
                </span>
              </div>
              <Button variant="outline-danger" size="sm" onClick={clearAll}>
                <i className="bi bi-trash me-1" />Clear All
              </Button>
            </div>

            <div className="merge-grid">
              {pages.map((page, idx) => (
                <div
                  key={page.id}
                  className={`merge-thumb${dragId === page.id ? ' is-dragging' : ''}`}
                  draggable
                  onDragStart={() => onDragStart(page.id)}
                  onDragOver={(e) => onDragOver(e, page.id)}
                  onDragEnd={onDragEnd}
                >
                  {/* Preview image */}
                  <div className="merge-thumb-img">
                    <img src={page.thumbnail} alt={`Page ${idx + 1}`} draggable={false} />
                  </div>

                  {/* Footer */}
                  <div className="merge-thumb-footer">
                    <div className="merge-thumb-num">p.{idx + 1}</div>
                    <div className="merge-thumb-file" title={page.fileName}>{page.fileName}</div>
                  </div>

                  {/* Reorder buttons row */}
                  <div className="merge-thumb-reorder">
                    <button
                      className="mtr-btn"
                      onClick={() => movePage(page.id, 'left')}
                      disabled={idx === 0}
                      title="Move left"
                      aria-label="Move page left"
                    >
                      <i className="bi bi-chevron-left" />
                    </button>
                    <button
                      className="mtr-btn"
                      onClick={() => movePage(page.id, 'right')}
                      disabled={idx === pages.length - 1}
                      title="Move right"
                      aria-label="Move page right"
                    >
                      <i className="bi bi-chevron-right" />
                    </button>
                  </div>

                  {/* Position badge — top left */}
                  <div className="merge-thumb-badge">{idx + 1}</div>

                  {/* Remove — top right */}
                  <button
                    className="merge-thumb-remove"
                    onClick={() => removePage(page.id)}
                    title="Remove this page"
                    aria-label="Remove page"
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
              ))}
            </div>

            {/* Merge button */}
            <div className="text-center mt-5">
              <Button
                size="lg"
                onClick={handleMerge}
                disabled={isProcessing || pages.length < 2}
                className="px-5"
                style={{
                  background: palette.gradient.primary,
                  border: 'none', color: '#fff', minWidth: 260,
                }}
              >
                {isProcessing
                  ? <><Spinner size="sm" className="me-2" />Merging…</>
                  : <><i className="bi bi-file-earmark-arrow-down me-2" />Merge &amp; Download PDF</>
                }
              </Button>
              {pages.length < 2 && !loading && (
                <p className="text-muted small mt-2">Add at least 2 pages to merge.</p>
              )}
            </div>
          </>
        )}
      </Container>
      <SeoContent slug="merge-pdf" />
    </>
  );
}
