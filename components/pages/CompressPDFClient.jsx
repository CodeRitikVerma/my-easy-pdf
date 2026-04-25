'use client';
import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Form } from 'react-bootstrap';
import { PDFDocument } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import palette from '@/theme/palette';
import SeoContent from '@/components/common/SeoContent';

/* ── PDF.js loader ── */
const getPdfJs = async () => {
  const lib = await import('pdfjs-dist');
  lib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  return lib;
};

/* ── Helpers ── */
const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
};

const toBytes = (value, unit) =>
  Math.round(parseFloat(value) * (unit === 'mb' ? 1048576 : 1024));

/* ── Preset definitions ──
   Each preset carries a JPEG quality + a list of scale fallbacks tried in
   order until the output is actually smaller than the original.
   Rasterising text PDFs can inflate size, so we step down resolution
   automatically rather than producing a larger file silently.              */
const PRESETS = [
  {
    key:        'high',
    label:      'High',
    icon:       'bi-camera-fill',
    quality:    0.80,
    scaleSteps: [0.80, 0.65, 0.52],
    desc:       'Good quality, moderate size',
  },
  {
    key:        'medium',
    label:      'Medium',
    icon:       'bi-speedometer2',
    quality:    0.58,
    scaleSteps: [0.65, 0.50, 0.38],
    desc:       'Balanced quality & size',
  },
  {
    key:        'low',
    label:      'Low',
    icon:       'bi-file-zip',
    quality:    0.30,
    scaleSteps: [0.50, 0.38, 0.28],
    desc:       'Smallest file, lower quality',
  },
];

/* ── Core compression function ──
   Renders every PDF page to JPEG at given quality + scale,
   packs them into a new PDF-lib document and returns the bytes.
   onProgress(currentPage, totalPages) is called after each page.        */
async function compressPages(pdfjsDoc, quality, scale, onProgress) {
  const newPdf = await PDFDocument.create();

  for (let i = 1; i <= pdfjsDoc.numPages; i++) {
    const page     = await pdfjsDoc.getPage(i);
    const vp       = page.getViewport({ scale });
    const canvas   = document.createElement('canvas');
    canvas.width   = vp.width;
    canvas.height  = vp.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;

    /* JPEG encode */
    const b64    = canvas.toDataURL('image/jpeg', quality).split(',')[1];
    const bin    = atob(b64);
    const imgBuf = new Uint8Array(bin.length);
    for (let j = 0; j < bin.length; j++) imgBuf[j] = bin.charCodeAt(j);

    /* Embed into pdf-lib at original page dimensions */
    const jpgImg   = await newPdf.embedJpg(imgBuf);
    const origVp   = page.getViewport({ scale: 1 });
    const newPage  = newPdf.addPage([origVp.width, origVp.height]);
    newPage.drawImage(jpgImg, { x: 0, y: 0, width: origVp.width, height: origVp.height });

    onProgress?.(i, pdfjsDoc.numPages);
  }

  return await newPdf.save();
}

/* ── Binary-search compression to hit a target byte count ──
   Tries progressively lower scales if target cannot be reached at scale 1.0.
   Returns { bytes, achieved } where achieved = false when even the minimum
   settings exceed the target.                                             */
async function compressToTarget(pdfjsDoc, targetBytes, onStatus) {
  const SCALE_STEPS = [0.90, 0.72, 0.56];

  for (const scale of SCALE_STEPS) {
    /* Pre-check: can minimum quality at this scale reach the target? */
    onStatus('Checking compressibility…');
    const floor = await compressPages(pdfjsDoc, 0.05, scale, null);
    if (floor.byteLength > targetBytes) continue; /* try smaller scale */

    /* Binary search quality [0.05 → 0.88] to find highest quality ≤ target */
    let lo = 0.05, hi = 0.88, best = floor;

    for (let iter = 0; iter < 8; iter++) {
      const mid   = (lo + hi) / 2;
      onStatus(`Optimising quality… pass ${iter + 1} / 8`);
      const bytes = await compressPages(pdfjsDoc, mid, scale, null);
      if (bytes.byteLength <= targetBytes) { best = bytes; lo = mid; }
      else                                 { hi = mid; }
    }

    return { bytes: best, achieved: true };
  }

  /* Target unreachable — return the absolute minimum we can produce */
  onStatus('Applying maximum compression…');
  const bytes = await compressPages(pdfjsDoc, 0.05, 0.50, null);
  return { bytes, achieved: false };
}

/* ═══════════════════════════════════════════════
   Component
═══════════════════════════════════════════════ */
export default function CompressPDFClient() {
  const [pdfFile,     setPdfFile]     = useState(null);
  const [processing,  setProcessing]  = useState(false);
  const [error,       setError]       = useState('');
  const [status,      setStatus]      = useState('');
  const [mode,        setMode]        = useState('preset');   /* 'preset' | 'target' */
  const [qualityKey,  setQualityKey]  = useState('medium');
  const [targetValue, setTargetValue] = useState('');
  const [targetUnit,  setTargetUnit]  = useState('kb');       /* 'kb' | 'mb' */
  const [result,      setResult]      = useState(null);       /* { bytes, size } */
  const pdfjsRef = useRef(null);

  /* Load file */
  const handleFiles = (files) => {
    const f = files.find(x => x.type === 'application/pdf');
    if (!f) { setError('Please upload a PDF file.'); return; }
    setError(''); setPdfFile(f); setResult(null); setStatus('');
  };

  /* Load PDF.js doc from file (cached instance) */
  const loadDoc = async () => {
    if (!pdfjsRef.current) pdfjsRef.current = await getPdfJs();
    const ab = await pdfFile.arrayBuffer();
    return pdfjsRef.current.getDocument({ data: ab }).promise;
  };

  /* Main compression handler */
  const handleCompress = async () => {
    if (!pdfFile) return;
    setProcessing(true); setError(''); setResult(null); setStatus('');

    try {
      const doc = await loadDoc();
      let compressedBytes;

      if (mode === 'preset') {
        const p = PRESETS.find(x => x.key === qualityKey);
        let best = null;

        for (let si = 0; si < p.scaleSteps.length; si++) {
          const scale = p.scaleSteps[si];
          const label = si === 0 ? 'Compressing' : `Adjusting resolution (pass ${si + 1})`;
          const attempt = await compressPages(
            doc, p.quality, scale,
            (i, n) => setStatus(`${label} — page ${i} / ${n}…`),
          );

          /* Keep whichever attempt produced the smallest file so far */
          if (!best || attempt.byteLength < best.byteLength) best = attempt;

          /* Stop as soon as we beat the original */
          if (attempt.byteLength < pdfFile.size) break;
        }

        compressedBytes = best;
      } else {
        /* Target-size mode */
        const targetBytes = toBytes(targetValue, targetUnit);
        if (!targetBytes || targetBytes <= 0) throw new Error('Enter a valid target size.');

        const { bytes, achieved } = await compressToTarget(doc, targetBytes, setStatus);
        compressedBytes = bytes;

        if (!achieved) {
          setError(
            `Could not reach ${targetValue} ${targetUnit.toUpperCase()} — ` +
            `showing the smallest possible result (${formatBytes(bytes.byteLength)}).`,
          );
        }
      }

      setResult({ bytes: compressedBytes, size: compressedBytes.byteLength });
    } catch (e) {
      setError('Compression failed: ' + e.message);
    } finally {
      setProcessing(false); setStatus('');
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const base = pdfFile.name.replace(/\.pdf$/i, '');
    const url  = URL.createObjectURL(new Blob([result.bytes], { type: 'application/pdf' }));
    Object.assign(document.createElement('a'), { href: url, download: `${base}-compressed.pdf` }).click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const savings = result ? Math.round((1 - result.size / pdfFile.size) * 100) : null;

  /* ── Render ── */
  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-file-zip me-2" />Compress PDF</h1>
          <p className="lead opacity-90 mb-0">
            Reduce PDF file size — choose a quality preset or set a target size
          </p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 860 }}>

        {/* ── Drop zone / file info ── */}
        {!pdfFile ? (
          <DropZone
            onFiles={handleFiles}
            accept="application/pdf"
            multiple={false}
            label="Drop a PDF file here or click to browse"
          />
        ) : (
          <div className="d-flex align-items-center settings-panel mb-4 gap-3">
            <i className="bi bi-file-earmark-pdf-fill text-danger flex-shrink-0" style={{ fontSize: '2rem' }} />
            <div className="flex-grow-1 min-w-0 d-flex flex-column flex-sm-row align-items-sm-center gap-2">
              <div className="min-w-0 flex-grow-1">
                <div className="fw-semibold text-truncate">{pdfFile.name}</div>
                <small className="text-muted">Original size: <strong>{formatBytes(pdfFile.size)}</strong></small>
              </div>
              <Button
                variant="outline-secondary" size="sm"
                className="d-inline-flex align-items-center gap-1 flex-shrink-0"
                onClick={() => { setPdfFile(null); setResult(null); setError(''); }}
              >
                <i className="bi bi-arrow-repeat" /> Change File
              </Button>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="mt-3" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* ── Settings panel ── */}
        {pdfFile && !result && (
          <div className="settings-panel mb-4">

            {/* Mode toggle */}
            <div className="d-flex gap-2 mb-4">
              {[
                { k: 'preset', label: 'Quality Preset',   icon: 'bi-sliders'   },
                { k: 'target', label: 'Target File Size',  icon: 'bi-bullseye'  },
              ].map(m => (
                <button
                  key={m.k}
                  onClick={() => setMode(m.k)}
                  style={{
                    flex: 1, padding: '11px 16px', borderRadius: 10, cursor: 'pointer',
                    border:      mode === m.k ? `2px solid ${palette.primary}` : '2px solid #e5e7eb',
                    background:  mode === m.k ? '#eef2ff' : '#fff',
                    fontWeight:  600, fontSize: '0.88rem',
                    color:       mode === m.k ? palette.primary : palette.text.muted,
                    transition:  'all 0.15s',
                  }}
                >
                  <i className={`bi ${m.icon} me-2`} />{m.label}
                </button>
              ))}
            </div>

            {/* ── Preset mode ── */}
            {mode === 'preset' && (
              <>
                <p className="text-muted small mb-3">
                  Choose how aggressively the PDF should be compressed.
                </p>
                <Row className="g-2 g-sm-3 mb-4">
                  {PRESETS.map(p => {
                    const active = qualityKey === p.key;
                    return (
                      <Col key={p.key} xs={4}>
                        <button
                          onClick={() => setQualityKey(p.key)}
                          style={{
                            width: '100%', height: '100%',
                            padding: '12px 8px',
                            borderRadius: 12, cursor: 'pointer',
                            border:     active ? `2px solid ${palette.primary}` : '2px solid #e5e7eb',
                            background: active ? '#eef2ff' : '#fff',
                            textAlign: 'center',
                            transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
                            boxShadow: active ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
                          }}
                        >
                          <i
                            className={`bi ${p.icon}`}
                            style={{ fontSize: '1.5rem', color: active ? palette.primary : palette.text.muted }}
                          />
                          <div
                            className="fw-bold mt-1"
                            style={{ color: active ? '#1e1b4b' : palette.text.primary, fontSize: '0.88rem' }}
                          >
                            {p.label}
                          </div>
                          <div
                            className="d-none d-sm-block"
                            style={{
                              fontSize: '0.72rem',
                              color: palette.text.muted,
                              marginTop: 3,
                              lineHeight: 1.3,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {p.desc}
                          </div>
                        </button>
                      </Col>
                    );
                  })}
                </Row>
              </>
            )}

            {/* ── Target size mode ── */}
            {mode === 'target' && (
              <div className="mb-4">
                <p className="text-muted small mb-3">
                  The tool automatically finds the highest quality that fits within your target.
                </p>

                <div className="d-flex align-items-center gap-3" style={{ maxWidth: 360 }}>
                  {/* Number input */}
                  <Form.Control
                    type="number"
                    min={1}
                    step={targetUnit === 'kb' ? 10 : 0.1}
                    placeholder={targetUnit === 'kb' ? 'e.g. 500' : 'e.g. 2.5'}
                    value={targetValue}
                    onChange={e => setTargetValue(e.target.value)}
                    aria-label={`Target file size in ${targetUnit.toUpperCase()}`}
                    style={{
                      flex: 1, height: 48, borderRadius: 10,
                      borderColor: '#d1d5db', fontSize: '1rem',
                    }}
                  />

                  {/* KB / MB pill toggle */}
                  <div style={{
                    display: 'flex', borderRadius: 10,
                    border: '2px solid #e5e7eb', overflow: 'hidden', flexShrink: 0,
                  }}>
                    {['kb', 'mb'].map(u => (
                      <button
                        key={u}
                        onClick={() => setTargetUnit(u)}
                        style={{
                          padding: '0 20px', height: 44, border: 'none', cursor: 'pointer',
                          background: targetUnit === u ? palette.primary : '#fff',
                          color:      targetUnit === u ? '#fff' : palette.text.muted,
                          fontWeight: 700, fontSize: '0.83rem', letterSpacing: '0.05em',
                          transition: 'background 0.15s, color 0.15s',
                        }}
                      >
                        {u.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live hint: show what the target equates to */}
                {targetValue && parseFloat(targetValue) > 0 && (
                  <p className="text-muted small mt-2 mb-0">
                    Target:{' '}
                    <strong>{formatBytes(toBytes(targetValue, targetUnit))}</strong>
                    {pdfFile && (
                      <> &nbsp;·&nbsp; Original is <strong>{formatBytes(pdfFile.size)}</strong></>
                    )}
                  </p>
                )}

                {/* Warn if target > original (pointless) */}
                {targetValue && pdfFile && toBytes(targetValue, targetUnit) >= pdfFile.size && (
                  <Alert variant="warning" className="mt-3 py-2 small mb-0">
                    Target is larger than the original file. Enter a smaller value to compress.
                  </Alert>
                )}
              </div>
            )}

            {/* Compress button */}
            <div className="text-center pt-1">
              <Button
                size="lg"
                onClick={handleCompress}
                disabled={
                  processing ||
                  (mode === 'target' && (!targetValue || parseFloat(targetValue) <= 0))
                }
                className="px-5"
                style={{ background: palette.gradient.primary, border: 'none', color: '#fff', minWidth: 220 }}
              >
                {processing ? (
                  <><Spinner size="sm" className="me-2" />{status || 'Compressing…'}</>
                ) : (
                  <><i className="bi bi-arrow-down-circle me-2" />Compress PDF</>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* ── Result panel ── */}
        {result && (
          <div className="settings-panel text-center">
            {savings > 0 ? (
              <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem', color: palette.status.success }} />
            ) : (
              <i className="bi bi-exclamation-circle-fill" style={{ fontSize: '3rem', color: '#f59e0b' }} />
            )}
            <h4 className="fw-bold mt-3 mb-1" style={{ color: '#1e1b4b' }}>
              {savings > 0 ? 'Compression Complete!' : 'Compression Finished'}
            </h4>
            {savings > 0 && (
              <p className="text-muted small mb-4">
                Reduced by <strong>{savings}%</strong> — {formatBytes(pdfFile.size - result.size)} saved
              </p>
            )}

            <Row className="g-3 justify-content-center mb-4">
              <Col xs={12} sm={4}>
                <div style={{ background: '#f9fafb', borderRadius: 12, padding: '16px 12px' }}>
                  <div className="text-muted small mb-1">Original Size</div>
                  <div className="fw-bold fs-5">{formatBytes(pdfFile.size)}</div>
                </div>
              </Col>
              <Col xs={12} sm={4}>
                <div style={{
                  background: savings > 0 ? palette.status.successBg : '#fef3c7',
                  borderRadius: 12, padding: '16px 12px',
                }}>
                  <div className="text-muted small mb-1">Compressed Size</div>
                  <div className="fw-bold fs-5" style={{ color: savings > 0 ? palette.status.success : '#92400e' }}>
                    {formatBytes(result.size)}
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={4}>
                <div style={{ background: '#eef2ff', borderRadius: 12, padding: '16px 12px' }}>
                  <div className="text-muted small mb-1">Space Saved</div>
                  <div className="fw-bold fs-5" style={{ color: savings > 0 ? palette.primary : '#6b7280' }}>
                    {savings > 0 ? `${savings}%` : '—'}
                  </div>
                </div>
              </Col>
            </Row>

            {savings <= 0 && (
              <Alert variant="warning" className="text-start mb-4">
                <i className="bi bi-info-circle me-2" />
                This PDF could not be reduced further — it likely contains highly optimised
                vector text or is already compressed. Browser-based tools work best on
                scanned / image-heavy PDFs. Try the <strong>Target File Size</strong> mode
                or the <strong>Low</strong> preset for a more aggressive attempt.
              </Alert>
            )}

            <div className="d-flex gap-2 justify-content-center flex-wrap">
              <Button
                size="lg"
                onClick={handleDownload}
                className="px-5"
                style={{ background: palette.gradient.primary, border: 'none', color: '#fff' }}
              >
                <i className="bi bi-file-earmark-arrow-down me-2" />Download Compressed PDF
              </Button>
              <Button
                size="lg" variant="outline-secondary"
                onClick={() => { setResult(null); setError(''); }}
                className="px-4"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </Container>
      <SeoContent slug="compress-pdf" />
    </>
  );
}
