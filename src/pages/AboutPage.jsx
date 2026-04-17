import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import palette from '../theme/palette';

const tools = [
  { icon: 'bi-images',          ...palette.tools.imageToPdf,  title: 'Image to PDF',  href: '/image-to-pdf'  },
  { icon: 'bi-layers-fill',     ...palette.tools.mergePdf,    title: 'Merge PDF',     href: '/merge-pdf'     },
  { icon: 'bi-card-image',      ...palette.tools.pdfToImage,  title: 'PDF to Image',  href: '/pdf-to-image'  },
  { icon: 'bi-scissors',        ...palette.tools.splitPdf,    title: 'Split PDF',     href: '/split-pdf'     },
  { icon: 'bi-arrow-clockwise', ...palette.tools.rotatePdf,   title: 'Rotate PDF',    href: '/rotate-pdf'    },
  { icon: 'bi-camera-fill',     ...palette.tools.cameraPdf,   title: 'Camera to PDF', href: '/camera-to-pdf' },
];

const values = [
  { icon: 'bi-shield-lock-fill',       color: palette.values.privacy, title: 'Privacy First',
    text: 'Every file stays on your device. Nothing is ever sent to a server. We don\'t store, read, or transmit your documents.' },
  { icon: 'bi-gift-fill',              color: palette.values.free,    title: 'Always Free',
    text: 'No subscriptions, no paywalls, no watermarks. Every tool is completely free — today and forever.' },
  { icon: 'bi-lightning-charge-fill',  color: palette.values.speed,   title: 'Instant & Offline',
    text: 'All processing happens locally in your browser. Works fast, even without an internet connection.' },
  { icon: 'bi-code-slash',             color: palette.values.craft,   title: 'Built with Care',
    text: 'Crafted by a developer who values clean tools, great UX, and respecting the user\'s time and data.' },
];

const AboutPage = () => {
  return (
    <>
      <SEO
        canonical="/about"
        title="About MyEasyPDF — Free Privacy-First PDF Tools"
        description="Learn about MyEasyPDF — a free, browser-based PDF toolkit built by developer Ritik Verma. Your files never leave your device."
        keywords="about MyEasyPDF, free PDF tools, privacy PDF tools, browser PDF"
      />
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-info-circle me-2"></i>About MyEasyPDF</h1>
          <p className="lead opacity-90 mb-0">Free, private, and powerful PDF tools built for everyone</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 860 }}>

        {/* Mission */}
        <section className="mb-5">
          <h2 className="fw-bold mb-3">Our Mission</h2>
          <p className="text-muted fs-5 lh-lg">
            MyEasyPDF exists to give everyone access to professional-grade PDF tools — completely free,
            with zero compromise on privacy. Most online PDF tools upload your files to remote servers,
            where they can be stored, processed, or even shared without your knowledge.
          </p>
          <p className="text-muted fs-5 lh-lg mb-0">
            We believe that's wrong. Every tool on MyEasyPDF runs entirely inside your browser.
            Your files <strong>never leave your device</strong> — not for a millisecond.
          </p>
        </section>

        {/* Values */}
        <section className="mb-5">
          <h2 className="fw-bold mb-4">What We Stand For</h2>
          <Row className="g-4">
            {values.map((v, i) => (
              <Col key={i} sm={6}>
                <div className="d-flex gap-3 align-items-start">
                  <div className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-3"
                    style={{ width: 48, height: 48, background: palette.surface.overlay }}>
                    <i className={`bi ${v.icon}`} style={{ fontSize: '1.35rem', color: v.color }}></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">{v.title}</h6>
                    <p className="text-muted small mb-0">{v.text}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Developer */}
        <section className="mb-5">
          <h2 className="fw-bold mb-4">Meet the Developer</h2>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Body className="p-4 p-md-5">
              <Row className="g-4 align-items-center">
                <Col xs="auto">
                  <div className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: 80, height: 80, background: palette.gradient.developer, color: 'white', fontSize: '2rem', fontWeight: 700 }}>
                    RV
                  </div>
                </Col>
                <Col>
                  <h4 className="fw-bold mb-1">Ritik Verma</h4>
                  <p className="text-muted mb-3 small">Software Developer &nbsp;·&nbsp; Artist &nbsp;·&nbsp; Creator</p>
                  <p className="text-muted mb-3 small lh-lg">
                    Passionate about building tools that respect users' privacy and just work. MyEasyPDF
                    was born from frustration with clunky, ad-ridden PDF sites that upload your sensitive
                    documents to unknown servers. This is the alternative.
                  </p>
                  <a
                    href="https://www.instagram.com/ritikvermaofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm px-3"
                    style={{ background: palette.gradient.instagram, color: 'white', border: 'none' }}
                  >
                    <i className="bi bi-instagram me-2"></i>@ritikvermaofficial
                  </a>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </section>

        {/* Tools */}
        <section>
          <h2 className="fw-bold mb-4">All Available Tools</h2>
          <Row className="g-3">
            {tools.map((t, i) => (
              <Col key={i} xs={6} md={4}>
                <Link to={t.href}
                  className="d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none border"
                  style={{ transition: 'background .15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = t.bg}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <i className={`bi ${t.icon}`} style={{ fontSize: '1.4rem', color: t.color }}></i>
                  <span className="fw-semibold text-dark small">{t.title}</span>
                </Link>
              </Col>
            ))}
          </Row>
        </section>

      </Container>
    </>
  );
};

export default AboutPage;
