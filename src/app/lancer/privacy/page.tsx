import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Lancer",
  description: "Privacy policy for the Lancer Chrome extension",
};

export default function LancerPrivacyPage() {
  return (
    <div className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="mb-1">Privacy Policy</h1>
      <p className="text-muted mb-4">Lancer Chrome Extension — Last updated: June 2026</p>

      <h5>Data Collection</h5>
      <p>
        Lancer does <strong>not</strong> collect, store, or transmit any personal data.
        All business information, client records, documents, and settings are stored
        exclusively in your browser's <code>chrome.storage.local</code> and never leave your device.
      </p>

      <h5>Network Requests</h5>
      <p>
        The only network request Lancer makes is a license key verification
        <code> POST</code> to <code>jacobbiggs.co.uk/api/lancer/verify-license</code>.
        This occurs <strong>only</strong> when you manually enter a license key to activate the Pro tier.
        No analytics, no tracking, no telemetry, and no third-party services are used.
      </p>

      <h5>Third-Party Services</h5>
      <p>
        License key validation is proxied through a serverless function on Vercel to
        Lemon Squeezy's API. No personal data is included in this request — only the
        license key string you provided.
      </p>

      <h5>Data Retention & Deletion</h5>
      <p>
        Since all data is stored locally in your browser, you can delete it at any time
        by removing the extension or clearing browser storage. Lancer has no servers
        and holds no user data externally.
      </p>

      <h5>Changes</h5>
      <p>
        If this policy changes, the updated date at the top will reflect when.
      </p>

      <hr className="my-4" />
      <p className="text-muted small">
        Questions? Contact <a href="mailto:hello@jacobbiggs.co.uk">hello@jacobbiggs.co.uk</a>
      </p>
    </div>
  );
}
