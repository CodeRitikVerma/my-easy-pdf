'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Badge, Form } from 'react-bootstrap';
import { PDFDocument } from 'pdf-lib';
import useIsMobile from '@/hooks/useIsMobile';
import palette from '@/theme/palette';
import CameraOverlay     from '@/components/camera/CameraOverlay';
import PhotoCard         from '@/components/camera/PhotoCard';
import PhotoPreview      from '@/components/camera/PhotoPreview';
import DesktopOnlyCamera from '@/components/camera/DesktopOnlyCamera';
import { PAGE_SIZES, FILTERS, moveItem, renderWithFilter } from '@/components/camera/cameraUtils';

const HOW_IT_WORKS = [
  { icon: 'bi-camera-fill',  color: palette.primary,        text: 'Tap the zone below to open your back camera full-screen'   },
  { icon: 'bi-grid-3x3',    color: palette.text.muted,     text: 'A rule-of-thirds grid helps you align your shots'           },
  { icon: 'bi-circle-fill', color: palette.accent,         text: 'Press the shutter — review each shot, then Keep or Retake'  },
  { icon: 'bi-palette',     color: palette.secondary,      text: 'Apply a filter per photo: Enhance, Grayscale, or Document'  },
  { icon: 'bi-pencil',      color: palette.status.warning, text: 'Name your PDF, choose a page size, and download'            },
];

export default function CameraToPDFClient() {
  const isMobile        = useIsMobile();
  const videoRef        = useRef(null);
  const canvasRef       = useRef(null);
  const streamRef       = useRef(null);
  const captureGuardRef = useRef(false);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [pendingPhoto,   setPendingPhoto]   = useState(null);
  const [photos,         setPhotos]         = useState([]);
  const [error,          setError]          = useState('');
  const [isProcessing,   setIsProcessing]   = useState(false);
  const [pageSize,       setPageSize]       = useState('Photo Size');
  const [orientation,    setOrientation]    = useState('portrait');
  const [flashActive,    setFlashActive]    = useState(false);
  const [showGrid,       setShowGrid]       = useState(true);
  const [pdfName,        setPdfName]        = useState('');
  const [previewPhotoId, setPreviewPhotoId] = useState(null);

  useEffect(() => { document.body.classList.toggle('camera-open', isCameraActive); return () => document.body.classList.remove('camera-open'); }, [isCameraActive]);
  useEffect(() => { if (isCameraActive && videoRef.current && streamRef.current) { videoRef.current.srcObject = streamRef.current; videoRef.current.play().catch(() => {}); } }, [isCameraActive]);
  useEffect(() => () => { stopStream(); document.body.classList.remove('camera-open'); }, []);

  const stopStream = () => { streamRef.current?.getTracks().forEach(t => t.stop()); streamRef.current = null; if (videoRef.current) videoRef.current.srcObject = null; };

  const startCamera = async () => {
    try {
      if (streamRef.current) stopStream();
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
      setIsCameraActive(true); setError('');
    } catch (err) {
      const msgs = { NotAllowedError: 'Camera access denied. Allow permission in browser settings.', NotFoundError: 'No camera found on this device.', NotReadableError: 'Camera is in use by another app.' };
      setError(msgs[err.name] || 'Could not start camera: ' + err.message);
    }
  };

  const stopCamera  = () => { stopStream(); setIsCameraActive(false); setPendingPhoto(null); };

  const capturePhoto = () => {
    if (captureGuardRef.current) return;
    captureGuardRef.current = true; setTimeout(() => { captureGuardRef.current = false; }, 700);
    const video = videoRef.current, canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    setPendingPhoto({ id: crypto.randomUUID(), dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height });
    setFlashActive(true); setTimeout(() => setFlashActive(false), 150);
  };

  const keepPhoto   = () => { if (pendingPhoto) { setPhotos(p => [...p, { ...pendingPhoto, filter: 'none' }]); setPendingPhoto(null); } };
  const retakePhoto = () => setPendingPhoto(null);

  const setPhotoFilter = (id, filterId) => setPhotos(prev => prev.map(p => p.id === id ? { ...p, filter: filterId } : p));
  const moveUp         = (i) => setPhotos(prev => moveItem(prev, i, i - 1));
  const moveDown       = (i) => setPhotos(prev => moveItem(prev, i, i + 1));
  const deletePhoto    = (id) => setPhotos(prev => prev.filter(p => p.id !== id));

  const createPDF = async () => {
    if (!photos.length) { setError('Capture at least one photo first.'); return; }
    setIsProcessing(true); setError('');
    try {
      const pdfDoc = await PDFDocument.create();
      for (const photo of photos) {
        const fDef = FILTERS.find(f => f.id === photo.filter) || FILTERS[0];
        const src  = fDef.id !== 'none' ? await renderWithFilter(photo.dataUrl, fDef.css) : photo.dataUrl;
        const img  = await pdfDoc.embedPng(await (await fetch(src)).arrayBuffer());
        let [pageW, pageH] = pageSize === 'Photo Size' ? [img.width, img.height] : PAGE_SIZES[pageSize];
        if (pageSize !== 'Photo Size' && orientation === 'landscape') [pageW, pageH] = [pageH, pageW];
        const scale = Math.min(pageW / img.width, pageH / img.height);
        pdfDoc.addPage([pageW, pageH]).drawImage(img, { x: (pageW - img.width*scale)/2, y: (pageH - img.height*scale)/2, width: img.width*scale, height: img.height*scale });
      }
      const url = URL.createObjectURL(new Blob([await pdfDoc.save()], { type: 'application/pdf' }));
      Object.assign(document.createElement('a'), { href: url, download: (pdfName.trim() || 'camera-scan') + '.pdf' }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError('Failed to create PDF: ' + err.message); }
    finally { setIsProcessing(false); }
  };

  if (!isMobile) return <DesktopOnlyCamera />;

  return (
    <>
      {previewPhotoId && (() => {
        const photo = photos.find(p => p.id === previewPhotoId);
        return photo ? <PhotoPreview photo={photo} onClose={() => setPreviewPhotoId(null)} onFilterChange={setPhotoFilter} /> : null;
      })()}

      {isCameraActive && (
        <CameraOverlay videoRef={videoRef} pendingPhoto={pendingPhoto} photos={photos} flashActive={flashActive} showGrid={showGrid} setShowGrid={setShowGrid} capturePhoto={capturePhoto} keepPhoto={keepPhoto} retakePhoto={retakePhoto} stopCamera={stopCamera} />
      )}

      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-camera-fill me-2"></i>Camera to PDF</h1>
          <p className="lead opacity-90 mb-0">Capture photos with your camera and turn them into a PDF instantly</p>
        </Container>
      </div>

      <Container className="py-4" style={{ maxWidth: 640 }}>
        {error && <Alert variant="danger" dismissible onClose={() => setError('')} className="mb-4"><i className="bi bi-exclamation-triangle me-2"></i>{error}</Alert>}

        {!isCameraActive && (
          <div className="drop-zone mb-4" onClick={startCamera}>
            <i className="bi bi-camera-fill" style={{ fontSize: '3.2rem', color: palette.primary }}></i>
            <p className="fw-semibold fs-5 mt-3 mb-1">Tap to open camera</p>
            <p className="text-muted small mb-0">Uses back camera · Requires camera permission</p>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {photos.length > 0 && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Photos <Badge bg="primary" pill>{photos.length}</Badge>
                <span className="text-muted fw-normal fs-6 ms-2">— tap arrows to reorder</span></h5>
              <Button variant="outline-danger" size="sm" onClick={() => setPhotos([])}><i className="bi bi-trash me-1"></i>Clear All</Button>
            </div>
            <div className="mb-4">
              {photos.map((photo, i) => (
                <PhotoCard key={photo.id} photo={photo} index={i} total={photos.length}
                  onMoveUp={() => moveUp(i)} onMoveDown={() => moveDown(i)}
                  onDelete={() => deletePhoto(photo.id)} onFilterChange={setPhotoFilter}
                  onPreview={() => setPreviewPhotoId(photo.id)} />
              ))}
            </div>
            <Button variant="outline-primary" className="w-100 mb-4" onClick={startCamera}><i className="bi bi-camera me-2"></i>Take More Photos</Button>
            <div className="settings-panel mb-4">
              <h6 className="fw-bold mb-3">PDF Settings</h6>
              <Row className="g-3">
                <Col xs={12}>
                  <Form.Label className="fw-semibold small"><i className="bi bi-pencil me-1 text-primary"></i>PDF Name</Form.Label>
                  <div className="input-group">
                    <Form.Control type="text" placeholder="camera-scan" value={pdfName} onChange={e => setPdfName(e.target.value)} maxLength={80} />
                    <span className="input-group-text text-muted small">.pdf</span>
                  </div>
                  <Form.Text className="text-muted">Leave blank to use "camera-scan.pdf"</Form.Text>
                </Col>
                <Col xs={6}>
                  <Form.Label className="fw-semibold small">Page Size</Form.Label>
                  <Form.Select value={pageSize} onChange={e => setPageSize(e.target.value)}>
                    {Object.keys(PAGE_SIZES).map(s => <option key={s}>{s}</option>)}
                  </Form.Select>
                </Col>
                {pageSize !== 'Photo Size' && (
                  <Col xs={6}>
                    <Form.Label className="fw-semibold small">Orientation</Form.Label>
                    <Form.Select value={orientation} onChange={e => setOrientation(e.target.value)}>
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </Form.Select>
                  </Col>
                )}
              </Row>
            </div>
            <Button variant="primary" size="lg" onClick={createPDF} disabled={isProcessing} className="px-4 w-100">
              {isProcessing ? <><Spinner size="sm" className="me-2" />Creating PDF…</> : <><i className="bi bi-file-earmark-arrow-down me-2"></i>{pdfName.trim() ? `Download "${pdfName.trim()}.pdf"` : 'Create & Download PDF'} ({photos.length} page{photos.length > 1 ? 's' : ''})</>}
            </Button>
          </>
        )}

        {!isCameraActive && photos.length === 0 && (
          <div className="p-4 rounded-3 border" style={{ background: palette.surface.inset }}>
            <h6 className="fw-bold mb-3">How it works</h6>
            <div className="d-flex flex-column gap-3">
              {HOW_IT_WORKS.map((s, i) => (
                <div key={i} className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: 36, height: 36, background: `${s.color}18` }}>
                    <i className={`bi ${s.icon}`} style={{ color: s.color }}></i>
                  </div>
                  <span className="small text-muted">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
