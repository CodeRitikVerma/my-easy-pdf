'use client';
import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import palette from '@/theme/palette';

const faqSections = [
  {
    title: 'General', icon: 'bi-info-circle',
    items: [
      { q: 'Is MyEasyPDF really free?', a: 'Yes — 100% free. No sign-up, no subscription, no watermarks, no hidden limits. Every tool is completely free to use, forever.' },
      { q: 'Do I need to create an account?', a: "No account needed. Just open the tool, upload your file, and download the result. That's it." },
      { q: 'Which browsers are supported?', a: 'MyEasyPDF works best in modern browsers: Chrome, Edge, Firefox, and Safari. For the best experience, we recommend using the latest version of Chrome or Edge.' },
      { q: "Is there a file size limit?", a: "There's no hard server-side limit since everything runs in your browser. Very large files (100 MB+) may be slow depending on your device's memory and CPU. For best performance, keep files under 50 MB." },
    ]
  },
  {
    title: 'Privacy & Security', icon: 'bi-shield-lock',
    items: [
      { q: 'Are my files uploaded to a server?', a: "Never. All processing happens entirely inside your browser using JavaScript. Your files never leave your device — not even for a millisecond. No data is sent to our servers (we don't even have a file-processing server)." },
      { q: 'Can I use this for confidential documents?', a: 'Yes. Because everything runs locally in your browser, your confidential PDFs, contracts, ID documents, and other sensitive files are never transmitted anywhere.' },
      { q: 'Do you store or log my files?', a: "No. We have no access to your files at any point. We don't log file names, contents, or any processing data." },
    ]
  },
  {
    title: 'Image to PDF', icon: 'bi-images',
    items: [
      { q: 'Which image formats are supported?', a: 'JPG, PNG, WebP, GIF, and BMP are all supported. WebP and GIF are automatically converted to PNG before embedding.' },
      { q: 'Can I reorder images before converting?', a: 'Yes! On desktop, drag the rows to rearrange the order. On mobile, use the ↑↓ arrow buttons on each item. The PDF pages will match the order shown.' },
      { q: 'What page sizes can I choose?', a: 'You can choose A4, A3, Letter, Legal, or "Image Size" (which makes each page exactly the size of the image). Portrait and landscape orientations are supported, plus a margin slider.' },
    ]
  },
  {
    title: 'Merge, Split & Rotate', icon: 'bi-layers',
    items: [
      { q: 'How many PDFs can I merge at once?', a: "There's no hard limit. You can merge as many PDFs as your browser can handle. Drag the files to set the order before merging." },
      { q: 'Can I split specific pages instead of every page?', a: 'Yes. On the Split PDF page, choose "custom page ranges" and enter ranges like 1-3, 5, 7-9. Each range produces a separate PDF file, all bundled in a ZIP.' },
      { q: 'Can I rotate only specific pages?', a: 'Yes. On the Rotate PDF page, click pages to select them, then use the rotation buttons to apply 90° or 180° rotation to just the selected pages.' },
    ]
  },
  {
    title: 'PDF to Image', icon: 'bi-card-image',
    items: [
      { q: 'What image formats can I export to?', a: 'PNG (lossless, best quality) and JPEG (smaller file size). You can also adjust the resolution scale from 1× up to 4×.' },
      { q: 'Can I download just specific pages?', a: 'Yes. Click to select the pages you want, then click "Download Selected". A single page downloads directly; multiple pages are bundled in a ZIP file.' },
      { q: "Why does rendering take a moment?", a: "Page thumbnails and exports are rendered entirely in your browser. High-resolution exports (3×–4×) on large PDFs may take a few seconds depending on your device's speed and memory." },
    ]
  },
];

export default function FAQPageClient() {
  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-question-circle me-2"></i>FAQ</h1>
          <p className="lead opacity-90 mb-0">Answers to the most common questions</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 780 }}>
        {faqSections.map((section, si) => (
          <div key={si} className="mb-5">
            <h2 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: palette.text.primary, fontSize: '1.15rem' }}>
              <i className={`bi ${section.icon} text-primary`}></i>{section.title}
            </h5>
            <Accordion flush className="border rounded-3 overflow-hidden">
              {section.items.map((item, ii) => (
                <Accordion.Item key={ii} eventKey={`${si}-${ii}`} className="border-0 border-bottom">
                  <Accordion.Header><span className="fw-semibold small">{item.q}</span></Accordion.Header>
                  <Accordion.Body className="text-muted small lh-lg pt-0">{item.a}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        ))}

        <div className="text-center p-4 rounded-4 border" style={{ background: palette.surface.inset }}>
          <i className="bi bi-chat-heart-fill text-primary mb-2 d-block" style={{ fontSize: '1.8rem' }}></i>
          <h3 className="fw-bold mb-1" style={{ fontSize: '1rem' }}>Still have a question?</h3>
          <p className="text-muted small mb-3">Reach out to the developer directly by email.</p>
          <a href="mailto:ritikverma210@gmail.com"
            className="btn btn-sm px-4 fw-semibold" style={{ background: palette.gradient.primary, color: 'white', border: 'none' }}>
            <i className="bi bi-envelope-fill me-2"></i>ritikverma210@gmail.com
          </a>
        </div>
      </Container>
    </>
  );
}
