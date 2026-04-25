'use client';
import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const Section = ({ title, children }) => (
  <section className="mb-4">
    <h2 className="fw-bold mb-2" style={{ fontSize: '1.15rem' }}>{title}</h2>
    <div className="text-muted lh-lg small">{children}</div>
  </section>
);

export default function PrivacyPageClient() {
  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-shield-lock me-2"></i>Privacy Policy</h1>
          <p className="lead opacity-90 mb-0">Last updated: January 2026</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 760 }}>
        <Alert variant="success" className="d-flex align-items-start gap-3 mb-5 rounded-3">
          <i className="bi bi-check-circle-fill text-success flex-shrink-0 mt-1" style={{ fontSize: '1.2rem' }}></i>
          <div>
            <strong>Short version:</strong> We never see your files. All PDF processing runs inside your browser.
            No file uploads, no data collection. This site does display ads (Google AdSense) — see Section 6 for full details.
          </div>
        </Alert>

        <Section title="1. Overview">
          MyEasyPDF is a client-side web application. All PDF and image processing is performed entirely
          within your web browser using JavaScript. No file data, document contents, or personal information
          relating to your documents is transmitted to any server operated by us.
        </Section>

        <Section title="2. File Processing">
          <p>When you use any tool on MyEasyPDF:</p>
          <ul>
            <li>Your files are loaded into your browser&apos;s local memory only.</li>
            <li>All processing (conversion, merging, splitting, rotating, extraction) happens locally on your device.</li>
            <li>Output files are generated in your browser and downloaded directly to your device.</li>
            <li>No file contents, metadata, or names are sent to any server.</li>
            <li>Files are not stored in any cloud, database, or third-party service by us.</li>
          </ul>
        </Section>

        <Section title="3. Information We Do Not Collect">
          We do not collect, store, or process:
          <ul className="mt-1">
            <li>File contents or file names</li>
            <li>Personal information such as names, email addresses, or account details</li>
            <li>Browsing history or session data tied to individual users</li>
            <li>Any data that would allow us to identify you as an individual</li>
          </ul>
        </Section>

        <Section title="4. Analytics">
          MyEasyPDF may collect anonymous, aggregated page-view statistics (e.g. which tools are visited most)
          solely to understand general usage and improve the service. No personally identifiable information
          is included in these statistics.
        </Section>

        <Section title="5. Cookies">
          <p>
            MyEasyPDF itself does not set cookies for tracking or personalisation purposes. However,
            third-party services used on this site — specifically Google AdSense (see Section 6) — may set
            cookies on your device. These cookies are governed by those third parties&apos; privacy policies,
            not ours.
          </p>
          <p className="mb-0">
            You can control or delete cookies at any time through your browser settings. Most browsers
            allow you to refuse cookies; doing so will not affect the core PDF-processing functionality
            of this site.
          </p>
        </Section>

        <Section title="6. Advertising — Google AdSense">
          <p>
            This website uses <strong>Google AdSense</strong>, an advertising service provided by
            Google LLC (&ldquo;Google&rdquo;). Google AdSense displays advertisements on this site and
            may use cookies and web beacons to serve ads based on your prior visits to this and other
            websites.
          </p>
          <p>What this means in practice:</p>
          <ul>
            <li>
              Google may use the <strong>DoubleClick cookie</strong> (and similar technologies) to serve
              ads that are relevant to your interests, based on your browsing history across websites that
              use Google services.
            </li>
            <li>
              We do <strong>not</strong> control what data Google collects through AdSense — that is
              governed entirely by{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                className="text-primary">
                Google&apos;s Privacy Policy
              </a>.
            </li>
            <li>
              We do <strong>not</strong> receive any personally identifiable information from Google as
              part of the ad-serving process.
            </li>
          </ul>
          <p>
            <strong>How to opt out:</strong> You can opt out of personalised advertising by visiting{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer"
              className="text-primary">
              Google Ad Settings
            </a>
            {' '}or by visiting{' '}
            <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer"
              className="text-primary">
              aboutads.info
            </a>
            . You can also use the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer"
              className="text-primary">
              Google Analytics Opt-out Browser Add-on
            </a>
            {' '}if applicable.
          </p>
          <p className="mb-0">
            For more information on how Google uses data from sites that use Google services, please visit:{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer"
              className="text-primary">
              How Google uses information from sites or apps that use our services
            </a>.
          </p>
        </Section>

        <Section title="7. Third-Party Services">
          Beyond Google AdSense, MyEasyPDF may load static assets (fonts, icons) from trusted CDN providers
          for performance. These are standard asset requests; no personal data or file contents are shared
          with these providers.
        </Section>

        <Section title="8. Children&apos;s Privacy">
          MyEasyPDF does not knowingly collect any information from children under the age of 13.
          The service requires no registration or data submission of any kind.
        </Section>

        <Section title="9. Your Rights (GDPR / CCPA)">
          <p>
            If you are located in the European Economic Area or California, you have certain rights over
            your personal data. Because we do not collect personal data directly, most of these rights
            apply to data held by third-party services such as Google. To exercise rights relating to
            Google&apos;s data use, please refer to Google&apos;s privacy controls at{' '}
            <a href="https://myaccount.google.com/privacy" target="_blank" rel="noopener noreferrer"
              className="text-primary">
              myaccount.google.com/privacy
            </a>.
          </p>
          <p className="mb-0">
            For any privacy-related queries about MyEasyPDF itself, contact us at the email address below.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          We may update this policy from time to time to reflect changes in our practices or applicable law.
          Any changes will be reflected with an updated &ldquo;Last updated&rdquo; date at the top of this page.
          Continued use of the site after a change constitutes acceptance of the updated policy.
        </Section>

        <Section title="11. Contact">
          Questions about this privacy policy? Reach the developer by email:{' '}
          <a href="mailto:ritikverma210@gmail.com" className="text-primary fw-semibold">
            ritikverma210@gmail.com
          </a>
        </Section>
      </Container>
    </>
  );
}
