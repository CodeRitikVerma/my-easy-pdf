'use client';
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import footerJson from '@/json_utils/footerJson';
import palette from '@/theme/palette';

const isInternal = (href) => href.startsWith('/');

const Footer = () => {
  const [openSections, setOpenSections] = useState([0]);
  const toggle = (i) => setOpenSections(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  const isOpen = (i) => openSections.includes(i);

  return (
    <footer className="site-footer">
      <Container>
        <Row className="g-4 g-md-5">
          <Col xs={12} md={4} lg={4}>
            <Link href="/" className="footer-brand">
              <i className="bi bi-file-earmark-pdf-fill" style={{ color: palette.indigo[400], fontSize: '1.4rem' }}></i>
              {footerJson.brand.name}
            </Link>
            <p className="footer-tagline">Free PDF tools that run entirely in your browser. Your files never leave your device.</p>
            <div className="d-flex flex-wrap gap-2 mt-3">
              {footerJson.social.map((s, i) => (
                <a key={i} href={s.href} className="footer-social-link" rel="noopener noreferrer">
                  <span>{s.icon}</span><span>{s.name}</span>
                </a>
              ))}
            </div>
          </Col>
          <Col xs={12} md={8}>
            <Row className="g-0 g-md-3">
              {footerJson.sections.map((section, i) => (
                <Col key={i} xs={12} md={3}>
                  <button className="footer-acc-toggle d-flex d-md-none" onClick={() => toggle(i)} aria-expanded={isOpen(i)}>
                    <span className="footer-heading mb-0">{section.title}</span>
                    <i className={`bi bi-chevron-${isOpen(i) ? 'up' : 'down'} footer-acc-icon`}></i>
                  </button>
                  <div className="footer-heading d-none d-md-block">{section.title}</div>
                  <div className={`footer-acc-body${isOpen(i) ? ' open' : ''}`}>
                    <ul className="list-unstyled mb-0 pb-2 pb-md-0">
                      {section.links.map((link, j) => (
                        <li key={j}>
                          {isInternal(link.href)
                            ? <Link href={link.href} className="footer-link">{link.name}</Link>
                            : <a href={link.href} className="footer-link">{link.name}</a>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <p className="footer-copyright mb-0">{footerJson.copyright}</p>
      </Container>
    </footer>
  );
};

export default Footer;
