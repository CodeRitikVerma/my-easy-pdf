'use client';
import React from 'react';
import { Container, Alert, Table } from 'react-bootstrap';
import Link from 'next/link';

const Section = ({ title, children }) => (
  <section className="mb-4">
    <h5 className="fw-bold mb-2">{title}</h5>
    <div className="text-muted lh-lg small">{children}</div>
  </section>
);

export default function CookiePolicyClient() {
  return (
    <>
      <div className="page-header text-center">
        <Container>
          <h1 className="fw-bold mb-2"><i className="bi bi-cookie me-2"></i>Cookie Policy</h1>
          <p className="lead opacity-90 mb-0">Last updated: January 2026</p>
        </Container>
      </div>

      <Container className="py-4 py-md-5" style={{ maxWidth: 760 }}>
        <Alert variant="info" className="d-flex align-items-start gap-3 mb-5 rounded-3">
          <i className="bi bi-info-circle-fill flex-shrink-0 mt-1" style={{ fontSize: '1.2rem', color: '#5b5ef4' }}></i>
          <div>
            <strong>Short version:</strong> MyEasyPDF itself does not set tracking cookies. Our advertising
            partner (Google AdSense) may set cookies to serve relevant ads. You can opt out at any time.
          </div>
        </Alert>

        <Section title="1. What Are Cookies?">
          Cookies are small text files placed on your device when you visit a website. They are widely used
          to make websites work, remember your preferences, and provide information to website owners about
          how their site is used. Cookies cannot access other files on your device or execute programs.
        </Section>

        <Section title="2. How MyEasyPDF Uses Cookies">
          <p>
            MyEasyPDF <strong>does not set any first-party cookies</strong> for tracking, analytics, or
            personalisation. The core PDF tools run entirely in your browser and require no cookies to function.
          </p>
          <p className="mb-0">
            However, we use Google AdSense to display advertisements, and Google may set third-party cookies
            on your device as described below.
          </p>
        </Section>

        <Section title="3. Third-Party Cookies — Google AdSense">
          <p>
            We use <strong>Google AdSense</strong>, operated by Google LLC (1600 Amphitheatre Parkway,
            Mountain View, CA 94043, USA), to display advertisements on this website. Google AdSense uses
            cookies and similar tracking technologies to:
          </p>
          <ul>
            <li>Display advertisements relevant to your interests</li>
            <li>Limit the number of times you see a particular ad</li>
            <li>Measure the effectiveness of advertising campaigns</li>
            <li>Understand your browsing behaviour across websites that use Google services</li>
          </ul>

          <div className="mt-3 mb-3" style={{ overflowX: 'auto' }}>
            <Table bordered size="sm" className="small">
              <thead style={{ background: '#f9fafb' }}>
                <tr>
                  <th>Cookie Name</th>
                  <th>Provider</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>IDE</code></td>
                  <td>Google (doubleclick.net)</td>
                  <td>Used to target ads based on browsing history</td>
                  <td>13 months</td>
                </tr>
                <tr>
                  <td><code>DSID</code></td>
                  <td>Google</td>
                  <td>Identifies signed-in Google users for ad personalisation</td>
                  <td>2 weeks</td>
                </tr>
                <tr>
                  <td><code>test_cookie</code></td>
                  <td>Google (doubleclick.net)</td>
                  <td>Checks if the browser accepts cookies</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td><code>NID</code></td>
                  <td>Google</td>
                  <td>Stores preferences and other information (e.g. language)</td>
                  <td>6 months</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <p className="mb-0">
            This list is not exhaustive — Google may use additional cookies or update cookie names over time.
            For a full and current list, see{' '}
            <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer"
              className="text-primary">
              Google&apos;s Cookie Policy
            </a>.
          </p>
        </Section>

        <Section title="4. How to Control Cookies">
          <p>You have several options to control or limit how cookies are used:</p>

          <p><strong>Browser settings:</strong><br />
            Most browsers let you view, manage, and delete cookies. Visit your browser&apos;s help section
            for instructions:
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary">Mozilla Firefox</a></li>
            <li><a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-primary">Microsoft Edge</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary">Apple Safari</a></li>
          </ul>

          <p><strong>Opt out of Google personalised ads:</strong><br />
            Visit{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary">
              Google Ad Settings
            </a>
            {' '}to opt out of interest-based advertising from Google.
          </p>

          <p className="mb-0"><strong>Opt out of interest-based advertising (industry-wide):</strong><br />
            Visit{' '}
            <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary">
              aboutads.info
            </a>
            {' '}or{' '}
            <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary">
              networkadvertising.org/choices
            </a>
            {' '}to opt out of interest-based advertising from participating companies.
          </p>
        </Section>

        <Section title="5. Do Not Track">
          Some browsers offer a &ldquo;Do Not Track&rdquo; (DNT) signal. MyEasyPDF itself does not use
          tracking cookies, so DNT has no practical effect on our first-party behaviour. However, we cannot
          guarantee that Google AdSense respects the DNT signal.
        </Section>

        <Section title="6. Changes to This Policy">
          We may update this Cookie Policy from time to time, for example if we add new third-party services
          or if regulations change. The &ldquo;Last updated&rdquo; date at the top of this page will always
          reflect the most recent version.
        </Section>

        <Section title="7. More Information">
          <p className="mb-0">
            For information on how we handle your data more broadly, see our{' '}
            <Link href="/privacy" className="text-primary">Privacy Policy</Link>.
            For questions about this Cookie Policy, contact the developer at{' '}
            <a href="mailto:ritikverma210@gmail.com" className="text-primary fw-semibold">
              ritikverma210@gmail.com
            </a>.
          </p>
        </Section>
      </Container>
    </>
  );
}
