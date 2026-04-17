import React, { useState } from 'react';
import { Container, Button, Alert, Spinner, Form } from 'react-bootstrap';
import { PDFDocument } from 'pdf-lib';
import DropZone from '../components/common/DropZone';
import SEO from '../components/SEO';

// Parse "1-3, 5, 7-9" into groups of 0-based page indices
const parseRanges = (input, total) => {
  const groups = [];
  const parts = input.split(',').map(s => s.trim()).filter(Boolean);
  for (const part of parts) {
    if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number);
      if (Number.isInteger(a) && Number.isInteger(b) && a >= 1 && b <= total && a <= b) {
        const indices = Array.from({ length: b - a + 1 }, (_, i) => a - 1 + i);
        groups.push({ label: `pages_${a}-${b}`, indices });
      }
    } else {
      const n = Number(part);
      if (Number.isInteger(n) && n >= 1 && n <= total) {
        groups.push({ label: `page_${n}`, indices: [n - 1] });
      }
    }
  }
  return groups;
};

const SplitPDFPage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [splitMode, setSplitMode] = useState('all');
  const [rangeInput, setRangeInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFiles = async (files) => {
    const file = files.find(f => f.type === 'application/pdf');
    if (!file) { setError('Please upload a PDF file.'); return; }
    setError('');
    setSuccess('');
    setPdfFile(file);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      setPageCount(pdf.getPageCount());
    } catch (err) {
      setError('Failed to read PDF: ' + err.message);
      setPdfFile(null);
    }
  };

  const splitPDF = async () => {
    if (!pdfFile) return;
    setIsProcessing(true);
    setError('');
    setSuccess('');

    try {
      const bytes = await pdfFile.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      let groups;
      if (splitMode === 'all') {
        groups = pdf.getPageIndices().map(i => ({ label: `page_${i + 1}`, indices: [i] }));
      } else {
        groups = parseRanges(rangeInput, pageCount);
        if (groups.length === 0) {
          setError(`Invalid ranges. Use format like: 1-3, 5, 7-9  (PDF has ${pageCount} pages)`);
          setIsProcessing(false);
          return;
        }
      }

      for (const group of groups) {
        const newPdf = await PDFDocument.create();
        const copied = await newPdf.copyPages(pdf, group.indices);
        copied.forEach(p => newPdf.addPage(p));
        zip.file(`${group.label}.pdf`, await newPdf.save());
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'split-pdfs.zip';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSuccess(`Done! Downloaded ${groups.length} PDF file${groups.length > 1 ? 's' : ''} as ZIP.`);
    } catch (err) {
      setError('Failed to split PDF: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEO
        canonical="/split-pdf"
        title="Split PDF Online Free — Extract Pages or Custom Ranges"
        description="Split a PDF into individual pages or custom page ranges online for free. Download results as a ZIP file. No upload, no account required."
        keywords="split PDF, separate PDF pages, extract PDF pages, PDF splitter online free, divide PDF"
      />
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2">
            <i className="bi bi-scissors me-2"></i>Split PDF
          </h1>
          <p className="lead opacity-90 mb-0">Split a PDF into individual pages or custom page ranges</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 680 }}>
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
              <small className="text-muted">{pageCount} pages</small>
            </div>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => { setPdfFile(null); setPageCount(0); setSuccess(''); }}
            >
              Change File
            </Button>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3"><i className="bi bi-check-circle me-2"></i>{success}</Alert>}

        {pdfFile && pageCount > 0 && (
          <div className="settings-panel">
            <h6 className="fw-bold mb-4">Split Options</h6>

            <Form.Check
              type="radio"
              id="split-all"
              label={`Extract each page as a separate PDF (${pageCount} files)`}
              checked={splitMode === 'all'}
              onChange={() => setSplitMode('all')}
              className="mb-3"
            />

            <Form.Check
              type="radio"
              id="split-range"
              label="Split by custom page ranges"
              checked={splitMode === 'range'}
              onChange={() => setSplitMode('range')}
              className="mb-3"
            />

            {splitMode === 'range' && (
              <Form.Group className="mb-4 ms-4">
                <Form.Control
                  type="text"
                  placeholder="e.g. 1-3, 5, 7-9"
                  value={rangeInput}
                  onChange={e => setRangeInput(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Each entry becomes a separate PDF. This PDF has {pageCount} pages.
                  Example: <code>1-3, 5, 7-9</code> creates 3 files.
                </Form.Text>
              </Form.Group>
            )}

            <div className="text-center mt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={splitPDF}
                disabled={isProcessing}
                className="px-5"
              >
                {isProcessing
                  ? <><Spinner size="sm" className="me-2" />Splitting…</>
                  : <><i className="bi bi-archive me-2"></i>Split &amp; Download ZIP</>
                }
              </Button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default SplitPDFPage;
