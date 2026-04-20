'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { PDFDocument } from 'pdf-lib';
import DropZone from '@/components/common/DropZone';
import SeoContent from '@/components/common/SeoContent';

const PAGE_SIZES = {
  'A4': [595.28, 841.89],
  'A3': [841.89, 1190.55],
  'Letter': [612, 792],
  'Legal': [612, 1008],
  'Image Size': null,
};

export default function ImageToPDFClient({
  slug = 'image-to-pdf',
  heading = 'Image to PDF',
  subtitle = 'Upload photos and convert them into a single PDF file',
  headingIcon = 'bi-images',
} = {}) {
  const [images, setImages] = useState([]);
  const [pageSize, setPageSize] = useState('A4');
  const [orientation, setOrientation] = useState('portrait');
  const [margin, setMargin] = useState(20);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [dragIndex, setDragIndex] = useState(null);

  const handleFiles = (files) => {
    const valid = files.filter(f => f.type.startsWith('image/'));
    if (valid.length === 0) { setError('Please upload image files (JPG, PNG, WebP, etc.).'); return; }
    setImages(prev => [...prev, ...valid.map(file => ({ file, id: crypto.randomUUID(), preview: URL.createObjectURL(file), name: file.name, size: file.size }))]);
    setError('');
  };

  const removeImage = (id) => {
    setImages(prev => { const img = prev.find(i => i.id === id); if (img) URL.revokeObjectURL(img.preview); return prev.filter(i => i.id !== id); });
  };

  const clearAll = () => { images.forEach(img => URL.revokeObjectURL(img.preview)); setImages([]); };

  const handleDragStart = (index) => setDragIndex(index);
  const handleDragOver  = (e, index) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setImages(prev => { const arr = [...prev]; const [moved] = arr.splice(dragIndex, 1); arr.splice(index, 0, moved); setDragIndex(index); return arr; });
  };
  const handleDragEnd   = () => setDragIndex(null);
  const moveUp   = (i) => setImages(prev => { const a = [...prev]; [a[i-1], a[i]] = [a[i], a[i-1]]; return a; });
  const moveDown = (i) => setImages(prev => { const a = [...prev]; [a[i], a[i+1]] = [a[i+1], a[i]]; return a; });

  const convertToPDF = async () => {
    if (images.length === 0) { setError('Please add at least one image.'); return; }
    setIsProcessing(true); setError('');
    try {
      const pdfDoc = await PDFDocument.create();
      for (const imgData of images) {
        const arrayBuffer = await imgData.file.arrayBuffer();
        let embeddedImage;
        if (imgData.file.type === 'image/jpeg' || imgData.file.type === 'image/jpg') {
          embeddedImage = await pdfDoc.embedJpg(arrayBuffer);
        } else if (imgData.file.type === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(arrayBuffer);
        } else {
          const img = new Image(); const blobUrl = URL.createObjectURL(imgData.file);
          await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; img.src = blobUrl; });
          URL.revokeObjectURL(blobUrl);
          const canvas = document.createElement('canvas'); canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
          canvas.getContext('2d').drawImage(img, 0, 0);
          const pngBlob = await new Promise(res => canvas.toBlob(res, 'image/png'));
          embeddedImage = await pdfDoc.embedPng(await pngBlob.arrayBuffer());
        }
        const imgW = embeddedImage.width, imgH = embeddedImage.height;
        let pageW, pageH;
        if (pageSize === 'Image Size') { pageW = imgW; pageH = imgH; }
        else { [pageW, pageH] = PAGE_SIZES[pageSize]; if (orientation === 'landscape') [pageW, pageH] = [pageH, pageW]; }
        const page = pdfDoc.addPage([pageW, pageH]);
        const m = Number(margin), maxW = pageW - m*2, maxH = pageH - m*2;
        const scale = Math.min(maxW / imgW, maxH / imgH, 1);
        page.drawImage(embeddedImage, { x: (pageW - imgW*scale)/2, y: (pageH - imgH*scale)/2, width: imgW*scale, height: imgH*scale });
      }
      const pdfBytes = await pdfDoc.save();
      const url = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
      Object.assign(document.createElement('a'), { href: url, download: 'images-to-pdf.pdf' }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError('Failed to create PDF: ' + err.message); }
    finally { setIsProcessing(false); }
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
        <DropZone onFiles={handleFiles} accept="image/jpeg, image/png, image/webp, image/gif, image/bmp" label="Drop images here or click to browse" multiple={true} />

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        {images.length > 0 && (
          <>
            <div className="mt-4 mb-3 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Images <Badge bg="primary" pill>{images.length}</Badge>
                <span className="text-muted fw-normal fs-6 ms-2">— tap ↑↓ or drag to reorder</span>
              </h5>
              <Button variant="outline-danger" size="sm" onClick={clearAll}><i className="bi bi-trash me-1"></i>Clear All</Button>
            </div>

            <div className="mb-4">
              {images.map((img, index) => (
                <div key={img.id} className={`file-item${dragIndex === index ? ' dragging' : ''}`}
                  draggable onDragStart={() => handleDragStart(index)} onDragOver={(e) => handleDragOver(e, index)} onDragEnd={handleDragEnd}>
                  <div className="d-flex flex-column gap-1 me-2 flex-shrink-0">
                    <button className="btn-reorder" onClick={() => moveUp(index)} disabled={index === 0} title="Move up"><i className="bi bi-chevron-up"></i></button>
                    <button className="btn-reorder" onClick={() => moveDown(index)} disabled={index === images.length - 1} title="Move down"><i className="bi bi-chevron-down"></i></button>
                  </div>
                  <i className="bi bi-grip-vertical text-muted me-2 fs-5 d-none d-md-block" style={{ cursor: 'grab' }}></i>
                  <img src={img.preview} alt={img.name} className="rounded me-3" style={{ width: 52, height: 52, objectFit: 'cover', flexShrink: 0 }} />
                  <div className="flex-grow-1 min-w-0">
                    <div className="fw-semibold text-truncate">{img.name}</div>
                    <small className="text-muted">{(img.size / 1024).toFixed(1)} KB</small>
                  </div>
                  <Badge bg="secondary" className="me-2">#{index + 1}</Badge>
                  <Button variant="outline-danger" size="sm" onClick={() => removeImage(img.id)}><i className="bi bi-trash"></i></Button>
                </div>
              ))}
            </div>

            <div className="settings-panel mb-4">
              <h6 className="fw-bold mb-3">PDF Settings</h6>
              <Row className="g-3 align-items-end">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">Page Size</Form.Label>
                    <Form.Select value={pageSize} onChange={e => setPageSize(e.target.value)}>
                      {Object.keys(PAGE_SIZES).map(s => <option key={s}>{s}</option>)}
                    </Form.Select>
                  </Form.Group>
                </Col>
                {pageSize !== 'Image Size' && (
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-semibold small">Orientation</Form.Label>
                      <Form.Select value={orientation} onChange={e => setOrientation(e.target.value)}>
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                )}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">Margin: {margin} pt</Form.Label>
                    <Form.Range min="0" max="72" value={margin} onChange={e => setMargin(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div className="text-center">
              <Button variant="primary" size="lg" onClick={convertToPDF} disabled={isProcessing} className="px-5">
                {isProcessing ? <><Spinner size="sm" className="me-2" />Converting…</> : <><i className="bi bi-file-earmark-arrow-down me-2"></i>Convert &amp; Download PDF</>}
              </Button>
            </div>
          </>
        )}
      </Container>
      <SeoContent slug={slug} />
    </>
  );
}
