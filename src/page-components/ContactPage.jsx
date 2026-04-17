import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import palette from '../theme/palette';

const ContactPage = () => {
  return (
    <>
      <SEO
        canonical="/contact"
        title="Contact — MyEasyPDF"
        description="Get in touch with Ritik Verma, the developer of MyEasyPDF, for questions, bug reports, feature requests, or just to say hi."
        keywords="contact MyEasyPDF, MyEasyPDF support, Ritik Verma"
      />
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-envelope me-2"></i>Contact</h1>
          <p className="lead opacity-90 mb-0">Have a question, suggestion, or just want to say hi?</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 760 }}>

        {/* Developer card */}
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div style={{ background: palette.gradient.developer, height: 8 }} />
          <Card.Body className="p-4 p-md-5">
            <Row className="g-4 align-items-center">
              <Col xs="auto">
                <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{ width: 90, height: 90, background: palette.gradient.developer, color: 'white', fontSize: '2.2rem', fontWeight: 700 }}>
                  RV
                </div>
              </Col>
              <Col>
                <h3 className="fw-bold mb-1">Ritik Verma</h3>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="badge rounded-pill" style={{ background: palette.tools.imageToPdf.bg, color: palette.tools.imageToPdf.color }}>Software Developer</span>
                  <span className="badge rounded-pill" style={{ background: palette.tools.pdfToImage.bg, color: palette.tools.pdfToImage.color }}>Artist</span>
                  <span className="badge rounded-pill" style={{ background: palette.tools.mergePdf.bg, color: palette.tools.mergePdf.color }}>Creator</span>
                </div>
                <p className="text-muted mb-4 lh-lg">
                  I'm the developer behind MyEasyPDF. Whether you've found a bug, have a feature request,
                  want to collaborate, or just want to connect — feel free to reach out on Instagram!
                </p>
                <a
                  href="https://www.instagram.com/ritikvermaofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg px-4 fw-semibold d-inline-flex align-items-center gap-2"
                  style={{ background: palette.gradient.instagram, color: 'white', border: 'none' }}
                >
                  <i className="bi bi-instagram fs-5"></i>
                  @ritikvermaofficial
                </a>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Quick help cards */}
        <h5 className="fw-bold mb-3">Before you reach out…</h5>
        <Row className="g-3">
          {[
            {
              icon: 'bi-question-circle-fill',
              color: palette.tools.imageToPdf.color,
              bg: palette.tools.imageToPdf.bg,
              title: 'Common Questions',
              text: 'Check the FAQ — your question is probably already answered there.',
              href: '/faq',
              label: 'View FAQ'
            },
            {
              icon: 'bi-shield-fill-check',
              color: palette.status.success,
              bg: palette.status.successBg,
              title: 'Privacy Concerns',
              text: 'All files stay in your browser. Read our privacy policy for full details.',
              href: '/privacy',
              label: 'Privacy Policy'
            },
            {
              icon: 'bi-tools',
              color: palette.status.warning,
              bg: palette.status.warningBg,
              title: 'Tool Not Working?',
              text: 'Try a different browser (Chrome recommended) or check the file format.',
              href: '/faq',
              label: 'Troubleshooting'
            }
          ].map((item, i) => (
            <Col key={i} sm={4}>
              <div className="p-3 rounded-3 h-100 border" style={{ background: item.bg, borderColor: `${item.color}30 !important` }}>
                <i className={`bi ${item.icon} mb-2 d-block`} style={{ fontSize: '1.5rem', color: item.color }}></i>
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <p className="text-muted small mb-2">{item.text}</p>
                <Link to={item.href} className="small fw-semibold text-decoration-none" style={{ color: item.color }}>
                  {item.label} <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </Col>
          ))}
        </Row>

      </Container>
    </>
  );
};

export default ContactPage;
