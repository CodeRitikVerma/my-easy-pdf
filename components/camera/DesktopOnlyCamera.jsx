'use client';
import React from 'react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import palette from '@/theme/palette';

const steps = [
  { icon: 'bi-link-45deg',             color: palette.tools.imageToPdf.color, text: 'Open myeasypdf.com on your phone browser'          },
  { icon: 'bi-camera-fill',            color: palette.tools.cameraPdf.color,  text: 'Navigate to Camera to PDF'                         },
  { icon: 'bi-circle-fill',            color: palette.accent,                 text: 'Tap the shutter — review each shot before keeping'  },
  { icon: 'bi-file-earmark-arrow-down',color: palette.status.success,         text: 'Name your PDF and download it instantly'            },
];

const DesktopOnlyCamera = () => (
  <>
    <div className="page-header text-center">
      <Container>
        <h1 className="fw-bold mb-2"><i className="bi bi-camera-fill me-2"></i>Camera to PDF</h1>
        <p className="lead opacity-90 mb-0">Capture photos with your camera and turn them into a PDF instantly</p>
      </Container>
    </div>

    <Container className="py-5 text-center" style={{ maxWidth: 520 }}>
      <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-3"
        style={{ width: 96, height: 96, background: palette.tools.cameraPdf.bg, border: `2px solid ${palette.tools.cameraPdf.color}44` }}>
        <i className="bi bi-phone-fill" style={{ fontSize: '2.8rem', color: palette.tools.cameraPdf.color }}></i>
      </div>

      <h3 className="fw-bold mb-2">Mobile Only Feature</h3>
      <p className="text-muted mb-4 lh-lg">
        Camera to PDF is designed exclusively for smartphones and tablets.
        Open this page on your mobile device to start capturing.
      </p>

      <div className="p-4 rounded-3 text-start mb-4"
        style={{ background: palette.surface.inset, border: `1px solid ${palette.indigo[100]}` }}>
        <h6 className="fw-bold mb-3"><i className="bi bi-info-circle me-2 text-primary"></i>How to use on mobile</h6>
        <div className="d-flex flex-column gap-2">
          {steps.map((s, i) => (
            <div key={i} className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{ width: 32, height: 32, background: `${s.color}15` }}>
                <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: '0.9rem' }}></i>
              </div>
              <span className="small text-muted">{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-muted small">
        Looking to convert existing images?&nbsp;
        <Link href="/image-to-pdf" className="fw-semibold" style={{ color: palette.tools.imageToPdf.color }}>
          Use Image to PDF instead <i className="bi bi-arrow-right"></i>
        </Link>
      </p>
    </Container>
  </>
);

export default DesktopOnlyCamera;
