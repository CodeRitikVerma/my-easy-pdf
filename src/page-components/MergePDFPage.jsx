import React, { useState } from 'react';
import { Container, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { PDFDocument } from 'pdf-lib';
import DropZone from '../components/common/DropZone';
import SEO from '../components/SEO';

const MergePDFPage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [dragIndex, setDragIndex] = useState(null);

  const handleFiles = (files) => {
    const valid = files.filter(f => f.type === 'application/pdf');
    if (valid.length === 0) {
      setError('Please upload PDF files only.');
      return;
    }
    const newPdfs = valid.map(file => ({
      file,
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size
    }));
    setPdfs(prev => [...prev, ...newPdfs]);
    setError('');
  };

  const removePdf = (id) => setPdfs(prev => prev.filter(p => p.id !== id));

  const handleDragStart = (index) => setDragIndex(index);
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setPdfs(prev => {
      const arr = [...prev];
      const [moved] = arr.splice(dragIndex, 1);
      arr.splice(index, 0, moved);
      setDragIndex(index);
      return arr;
    });
  };
  const handleDragEnd = () => setDragIndex(null);

  // Up/Down reorder (touch-friendly)
  const moveUp   = (i) => setPdfs(prev => { const a = [...prev]; [a[i-1], a[i]] = [a[i], a[i-1]]; return a; });
  const moveDown = (i) => setPdfs(prev => { const a = [...prev]; [a[i], a[i+1]] = [a[i+1], a[i]]; return a; });

  const mergePDFs = async () => {
    if (pdfs.length < 2) {
      setError('Please add at least 2 PDF files to merge.');
      return;
    }
    setIsProcessing(true);
    setError('');
    try {
      const mergedPdf = await PDFDocument.create();
      for (const pdfData of pdfs) {
        const bytes = await pdfData.file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      }
      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      setError('Failed to merge PDFs: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPages = pdfs.length;

  return (
    <>
      <SEO
        canonical="/merge-pdf"
        title="Merge PDF Files Online Free"
        description="Combine multiple PDF files into one document online for free. Drag to reorder pages before merging. No upload, no sign-up — runs entirely in your browser."
        keywords="merge PDF, combine PDF, join PDF files online free, merge multiple PDF, PDF combiner"
      />
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2">
            <i className="bi bi-layers-fill me-2"></i>Merge PDFs
          </h1>
          <p className="lead opacity-90 mb-0">Combine multiple PDF files into one document</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 760 }}>
        <DropZone
          onFiles={handleFiles}
          accept="application/pdf"
          label="Drop PDF files here or click to browse"
          multiple={true}
        />

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        {pdfs.length > 0 && (
          <>
            <div className="mt-4 mb-3 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">
                PDF Files <Badge bg="primary" pill>{totalPages}</Badge>
                <span className="text-muted fw-normal fs-6 ms-2">— tap ↑↓ or drag to reorder</span>
              </h5>
              <Button variant="outline-danger" size="sm" onClick={() => setPdfs([])}>
                <i className="bi bi-trash me-1"></i>Clear All
              </Button>
            </div>

            <div className="mb-4">
              {pdfs.map((pdf, index) => (
                <div
                  key={pdf.id}
                  className={`file-item${dragIndex === index ? ' dragging' : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  {/* Up / Down reorder */}
                  <div className="d-flex flex-column gap-1 me-2 flex-shrink-0">
                    <button className="btn-reorder" onClick={() => moveUp(index)} disabled={index === 0} title="Move up">
                      <i className="bi bi-chevron-up"></i>
                    </button>
                    <button className="btn-reorder" onClick={() => moveDown(index)} disabled={index === pdfs.length - 1} title="Move down">
                      <i className="bi bi-chevron-down"></i>
                    </button>
                  </div>
                  <i className="bi bi-grip-vertical text-muted me-2 fs-5 d-none d-md-block" style={{ cursor: 'grab' }}></i>
                  <i className="bi bi-file-earmark-pdf-fill text-danger me-3" style={{ fontSize: '2rem', flexShrink: 0 }}></i>
                  <div className="flex-grow-1 min-w-0">
                    <div className="fw-semibold text-truncate">{pdf.name}</div>
                    <small className="text-muted">{(pdf.size / 1024).toFixed(1)} KB</small>
                  </div>
                  <Badge bg="secondary" className="me-2">#{index + 1}</Badge>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removePdf(pdf.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                onClick={mergePDFs}
                disabled={isProcessing || pdfs.length < 2}
                className="px-5"
              >
                {isProcessing
                  ? <><Spinner size="sm" className="me-2" />Merging…</>
                  : <><i className="bi bi-file-earmark-arrow-down me-2"></i>Merge &amp; Download PDF</>
                }
              </Button>
              {pdfs.length < 2 && (
                <p className="text-muted small mt-2">Add at least 2 PDF files to merge.</p>
              )}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default MergePDFPage;
