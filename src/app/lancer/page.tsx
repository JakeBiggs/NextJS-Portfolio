"use client";

import Image from "next/image";
import Link from "next/link";

export default function LancerLanding() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                PDF Invoices, Quotes &amp; Documents
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Professional documents generated directly in your browser.
                <strong className="text-light-secondary dark:text-dark-secondary"> No signup, no servers, no data collection.</strong>
                Everything stays on your machine.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://chromewebstore.google.com/detail/ndcoooeamhkbdbfbjgmklefcmlligbda?utm_source=item-share-cb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-light-secondary dark:bg-dark-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-light-accent dark:hover:bg-dark-accent transition"
                >
                  Install from Chrome Web Store
                </a>
                <a
                  href="#features"
                  className="inline-block border border-light-secondary dark:border-dark-secondary text-light-secondary dark:text-dark-secondary px-6 py-3 rounded-lg font-semibold hover:bg-light-secondary/10 dark:hover:bg-dark-secondary/10 transition"
                >
                  See Features
                </a>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                £7.99 &middot; One-time purchase &middot; Lifetime license
              </p>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
                <Image
                  src="/images/lancer1.png"
                  alt="Lancer extension popup showing invoice creation"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        {/* subtle gradient bg */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-light-secondary/10 dark:bg-dark-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-light-accent/5 dark:bg-dark-accent/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ── Screenshots strip ─────────────────── */}
      <section className="bg-light-background_tertiary dark:bg-dark-background_tertiary py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
              <Image
                src="/images/lancer2.png"
                alt="Lancer invoice preview"
                width={280}
                height={200}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
              <Image
                src="/images/lancer3.png"
                alt="Lancer feature overview"
                width={280}
                height={200}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
              <Image
                src="/images/lancer4.png"
                alt="Lancer tax configuration"
                width={280}
                height={200}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
              <Image
                src="/images/lancer1.png"
                alt="Lancer extension popup"
                width={280}
                height={200}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────── */}
      <section id="features" className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need, nothing you don&apos;t</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Multi-Currency & Tax",
              desc: "Support for GBP, USD, EUR, AUD, CAD with configurable VAT, sales tax, and GST rates per region. Tax rates update declaratively.",
            },
            {
              title: "Privacy First",
              desc: "Zero data collection. All documents and client info stored exclusively in your browser. The only network call is optional license verification.",
            },
            {
              title: "Professional PDFs",
              desc: "Clean, print-ready PDF quotes, invoices, and receipts generated client-side with pdf-lib. Custom branding, line items, and notes.",
            },
            {
              title: "No Signup Required",
              desc: "Install and start invoicing immediately. No accounts, no passwords, no email verification. Just click and go.",
            },
            {
              title: "One-Time Purchase",
              desc: "£7.99 lifetime license. No subscriptions, no recurring fees, no upsells. Pay once, use forever.",
            },
            {
              title: "Offline-capable",
              desc: "Works without an internet connection. Your data never leaves your device. Generate and download PDFs anywhere.",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-light-background_secondary dark:bg-dark-background_secondary p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-light-secondary dark:text-dark-secondary">
                {feat.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ───────────────────────────── */}
      <section className="bg-light-background_tertiary dark:bg-dark-background_tertiary py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Simple pricing</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
            One product, one price. No tiers, no hidden fees.
          </p>
          <div className="max-w-sm mx-auto bg-light-background dark:bg-dark-background rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Lancer Pro</p>
            <p className="text-5xl font-bold mb-2">
              <span className="text-2xl align-top">£</span>7.99
            </p>
            <p className="text-sm text-gray-500 mb-6">one-time &middot; lifetime license</p>
            <ul className="text-left space-y-3 mb-8 text-sm">
              {[
                "PDF quotes, invoices & receipts",
                "Multi-currency with regional tax",
                "Custom branding & notes",
                "Privacy-first, no servers",
                "Lifetime updates",
                "License for 5 devices",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-light-secondary dark:text-dark-secondary mt-0.5">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://chromewebstore.google.com/detail/ndcoooeamhkbdbfbjgmklefcmlligbda?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-light-secondary dark:bg-dark-secondary text-white py-3 rounded-lg font-semibold hover:bg-light-accent dark:hover:bg-dark-accent transition"
            >
              Install from Chrome Web Store
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────── */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How does the license work?",
              a: "Purchase a license key via Lemon Squeezy. Enter it once in the extension to unlock Pro features. The license covers up to 5 devices and never expires.",
            },
            {
              q: "Is my data safe?",
              a: "Absolutely. All documents and client data are stored in your browser's local storage. Nothing is ever sent to a server. The only network request is an optional license key verification.",
            },
            {
              q: "What currencies and tax rates are supported?",
              a: "GBP, USD, EUR, AUD, and CAD are built-in with configurable VAT, sales tax, and GST. Tax configurations are declarative and easy to customise.",
            },
            {
              q: "Can I customise the branding on documents?",
              a: "Yes. Set your business name, address, email, and add notes or terms that appear on every document.",
            },
            {
              q: "Does it work offline?",
              a: "Yes. Once installed, Lancer works fully offline. Generate and download PDFs with no internet connection required.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group bg-light-background_secondary dark:bg-dark-background_secondary p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <summary className="font-semibold text-lg flex justify-between items-center">
                {faq.q}
                <span className="text-light-secondary dark:text-dark-secondary group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Footer ──────────────────────────── */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 text-center text-sm text-gray-500 dark:text-gray-500">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/lancer/privacy" className="hover:text-light-secondary dark:hover:text-dark-secondary transition">
            Privacy Policy
          </Link>
          <a href="https://www.jacobbiggs.co.uk/lancer" className="hover:text-light-secondary dark:hover:text-dark-secondary transition">
            License
          </a>
          <a href="mailto:jakejbiggs1@gmail.com" className="hover:text-light-secondary dark:hover:text-dark-secondary transition">
            Contact
          </a>
          <span className="text-gray-400">&copy; {new Date().getFullYear()} Jacob Biggs</span>
        </div>
      </footer>
    </div>
  );
}