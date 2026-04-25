import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import Link from 'next/link';
import seoContent from '@/json_utils/seoContent';

/**
 * SEO-friendly content block rendered below every tool page.
 *
 * It adds genuine, keyword-rich, crawlable content so Google can
 * rank the page for its target queries. Pure server-rendered —
 * no client JS, no state, no hooks.
 *
 * Usage:
 *   <SeoContent slug="merge-pdf" />
 *
 * Content lives in `json_utils/seoContent.js` keyed by slug.
 */
const SeoContent = ({ slug }) => {
  const data = seoContent[slug];
  if (!data) return null;

  const { h1, intro, howTo, features, whyUs, faqs, related } = data;

  /* FAQPage JSON-LD (only if FAQs exist) */
  const faqJsonLd = faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type':    'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name:    f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  /* HowTo JSON-LD (only if steps exist) */
  const howToJsonLd = howTo?.steps?.length
    ? {
        '@context': 'https://schema.org',
        '@type':    'HowTo',
        name:       howTo.title || h1,
        step: howTo.steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name:    s.title,
          text:    s.text,
        })),
      }
    : null;

  return (
    <section style={{ background: '#f8fafc', padding: '56px 0 40px', marginTop: 24 }}>
      <Container style={{ maxWidth: 960 }}>

        {/* ── Intro ── */}
        {intro && (
          <div className="mb-5">
            {h1 && <h2 className="fw-bold mb-3" style={{ color: '#1e1b4b', letterSpacing: '-0.02em' }}>{h1}</h2>}
            {intro.map((p, i) => (
              <p key={i} style={{ color: '#4b5563', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                {p}
              </p>
            ))}
          </div>
        )}

        {/* ── How-To ── */}
        {howTo?.steps?.length > 0 && (
          <div className="mb-5">
            <h2 className="fw-bold mb-4" style={{ color: '#1e1b4b' }}>
              {howTo.title || 'How it works'}
            </h2>
            <ol style={{ paddingLeft: 0, listStyle: 'none', counterReset: 'step' }}>
              {howTo.steps.map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' }}>
                  <span style={{
                    flexShrink: 0, width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    color: '#fff', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem',
                  }}>{i + 1}</span>
                  <div>
                    <h3 className="fw-bold mb-1" style={{ fontSize: '1.05rem', color: '#111827' }}>{s.title}</h3>
                    <p className="mb-0" style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.65 }}>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* ── Features ── */}
        {features?.length > 0 && (
          <div className="mb-5">
            <h2 className="fw-bold mb-4" style={{ color: '#1e1b4b' }}>Why use this tool</h2>
            <Row className="g-4">
              {features.map((f, i) => (
                <Col key={i} md={6}>
                  <div className="d-flex gap-3">
                    <span style={{
                      flexShrink: 0, width: 40, height: 40, borderRadius: 10,
                      background: '#eef2ff', color: '#4f46e5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem',
                    }}>
                      <i className={`bi ${f.icon || 'bi-check2-circle'}`} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="fw-bold mb-1" style={{ fontSize: '1rem', color: '#111827' }}>{f.title}</h3>
                      <p className="mb-0" style={{ color: '#4b5563', fontSize: '0.92rem', lineHeight: 1.6 }}>{f.text}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* ── Why Us (extra trust paragraph) ── */}
        {whyUs && (
          <div className="mb-5 p-4 rounded-3" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
            <h2 className="fw-bold mb-3" style={{ color: '#1e1b4b', fontSize: '1.25rem' }}>
              {whyUs.title || 'Privacy-first PDF tools'}
            </h2>
            {whyUs.paragraphs.map((p, i) => (
              <p key={i} className="mb-2" style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.7 }}>{p}</p>
            ))}
          </div>
        )}

        {/* ── FAQs ── */}
        {faqs?.length > 0 && (
          <div className="mb-4">
            <h2 className="fw-bold mb-3" style={{ color: '#1e1b4b' }}>Frequently asked questions</h2>
            <Accordion flush>
              {faqs.map((f, i) => (
                <Accordion.Item eventKey={String(i)} key={i} className="mb-2" style={{ border: '1px solid #e5e7eb', borderRadius: 10, background: '#fff' }}>
                  <Accordion.Header>
                    <span className="fw-semibold" style={{ color: '#111827' }}>{f.q}</span>
                  </Accordion.Header>
                  <Accordion.Body style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {f.a}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        )}

        {/* ── Related tools (internal links help SEO) ── */}
        {related?.length > 0 && (
          <div className="pt-4" style={{ borderTop: '1px solid #e5e7eb' }}>
            <h2 className="fw-bold mb-3" style={{ color: '#1e1b4b', fontSize: '1.15rem' }}>Related PDF tools</h2>
            <div className="d-flex flex-wrap gap-2">
              {related.map((r, i) => (
                <Link
                  key={i}
                  href={r.href}
                  className="text-decoration-none"
                  style={{
                    padding: '8px 14px', borderRadius: 20, background: '#fff',
                    border: '1px solid #e5e7eb', color: '#4f46e5',
                    fontSize: '0.88rem', fontWeight: 500,
                  }}
                >
                  <i className={`bi ${r.icon || 'bi-arrow-right'} me-2`} aria-hidden="true" style={{ fontSize: '0.85rem' }} />
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* Structured data */}
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      {howToJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      )}
    </section>
  );
};

export default SeoContent;
