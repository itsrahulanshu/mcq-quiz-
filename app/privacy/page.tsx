"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                ChatGPTMCQ does not collect or store any personal information. This website operates entirely in your browser:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>No user accounts or registration required</li>
                <li>No personal data is collected or stored</li>
                <li>Quiz data remains in your browser session only</li>
                <li>No cookies are used for tracking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Information</h2>
              <p className="text-gray-600 mb-4">
                Since we don't collect personal information, we don't use or share any user data. All quiz generation and processing happens locally in your browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Third-Party Services</h2>
              <p className="text-gray-600 mb-4">
                ChatGPTMCQ may use the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>ChatGPT/OpenAI:</strong> Users manually copy prompts to ChatGPT. Please refer to OpenAI's privacy policy for their data practices.</li>
                <li><strong>Hosting:</strong> This website is hosted on Vercel. Please refer to Vercel's privacy policy.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-4">
                All quiz data and user inputs are processed locally in your browser and are never transmitted to our servers. Your data is as secure as your local browser environment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our service does not knowingly collect information from children under 13. Since we don't collect any personal data, the service can be used by anyone.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us through our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link>.
              </p>
            </section>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
