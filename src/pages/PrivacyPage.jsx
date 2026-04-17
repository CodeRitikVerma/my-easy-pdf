import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import SEO from '../components/SEO';

const Section = ({ title, children }) => (
  <section className="mb-4">
    <h5 className="fw-bold mb-2">{title}</h5>
    <div className="text-muted lh-lg small">{children}</div>
  </section>
);

const PrivacyPage = () => {
  return (
    <>
      <SEO
        canonical="/privacy"
        title="Privacy Policy — MyEasyPDF"
        description="MyEasyPDF privacy policy. Your files never leave your device. No uploads, no tracking, no data collection. 100% private browser-based PDF processing."
        keywords="MyEasyPDF privacy policy, PDF privacy, no upload PDF"
      />
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-shield-lock me-2"></i>Privacy Policy</h1>
          <p className="lead opacity-90 mb-0">Last updated: January {new Date().getFullYear()}</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 760 }}>

        <Alert variant="success" className="d-flex align-items-start gap-3 mb-5 rounded-3">
          <i className="bi bi-check-circle-fill text-success flex-shrink-0 mt-1" style={{ fontSize: '1.2rem' }}></i>
          <div>
            <strong>Short version:</strong> We never see your files. Everything runs inside your browser. No uploads,
            no tracking of file contents, no data collection. Your documents stay 100% private.
          </div>
        </Alert>

        <Section title="1. Overview">
          MyEasyPDF ("we", "our", "the site") is a client-side web application. All PDF and image
          processing is performed entirely within your web browser using JavaScript. No file data,
          document contents, or personal information is transmitted to any external server operated by us.
        </Section>

        <Section title="2. File Processing">
          <p>When you use any tool on MyEasyPDF:</p>
          <ul>
            <li>Your files are loaded into your browser's local memory only.</li>
            <li>All processing (conversion, merging, splitting, rotating, extraction) happens locally on your device.</li>
            <li>Output files are generated in your browser and downloaded directly to your device.</li>
            <li>No file contents, metadata, or names are sent to any server.</li>
            <li>Files are not stored in any cloud, database, or third-party service.</li>
          </ul>
        </Section>

        <Section title="3. Data We Do Not Collect">
          We do not collect, store, or process:
          <ul className="mt-1">
            <li>File contents or file names</li>
            <li>Personal information such as names, email addresses, or accounts</li>
            <li>IP addresses linked to file activity</li>
            <li>Browsing history or session data tied to individual users</li>
          </ul>
        </Section>

        <Section title="4. Analytics & Cookies">
          MyEasyPDF may use minimal, privacy-respecting analytics (such as anonymous page view counts)
          to understand general usage. No cookies containing personal data are set. No cross-site tracking
          pixels or advertising networks are used.
        </Section>

        <Section title="5. Third-Party Services">
          MyEasyPDF may load static icon and font assets from a third-party content delivery network for
          performance purposes. These are static asset requests only — no personal data, file contents,
          or usage information is shared with any third party. No advertising networks, tracking pixels,
          or analytics services that collect personal data are used.
        </Section>

        <Section title="6. Children's Privacy">
          MyEasyPDF does not knowingly collect any information from children under the age of 13.
          The service contains no registration, accounts, or data collection of any kind.
        </Section>

        <Section title="7. Changes to This Policy">
          We may update this policy from time to time. Any changes will be reflected with an updated
          date at the top of this page.
        </Section>

        <Section title="8. Contact">
          If you have any questions about this privacy policy, you can reach the developer on Instagram:{' '}
          <a
            href="https://www.instagram.com/ritikvermaofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary fw-semibold"
          >
            @ritikvermaofficial
          </a>
        </Section>

      </Container>
    </>
  );
};

export default PrivacyPage;
