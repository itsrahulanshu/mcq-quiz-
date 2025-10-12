"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-6 mobile:py-4 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-3 mobile:px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="bg-white rounded-xl mobile:rounded-lg sm:rounded-2xl shadow-xl p-4 mobile:p-3 sm:p-6 md:p-8">
            <Link href="/" className="inline-flex items-center gap-2 mobile:gap-1 sm:gap-2 text-blue-600 hover:text-blue-800 mb-4 mobile:mb-3 sm:mb-6 text-sm mobile:text-xs sm:text-base">
              <svg className="w-4 h-4 mobile:w-3 mobile:h-3 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>

          <h1 className="text-2xl mobile:text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 mobile:mb-3 sm:mb-6">Privacy Policy</h1>
          <p className="text-sm mobile:text-xs sm:text-sm text-gray-500 mb-6 mobile:mb-4 sm:mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-blue max-w-none">
            <section className="mb-6 mobile:mb-4 sm:mb-8">
              <h2 className="text-xl mobile:text-lg sm:text-2xl font-semibold text-gray-800 mb-3 mobile:mb-2 sm:mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-3 mobile:mb-2 sm:mb-4 text-sm mobile:text-xs sm:text-base">
                ChatGPTMCQ does not collect or store any personal information. This website operates entirely in your browser:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mobile:space-y-1 sm:space-y-2 ml-3 mobile:ml-2 sm:ml-4 text-sm mobile:text-xs sm:text-base">
                <li>No user accounts or registration required</li>
                <li>No personal data is collected or stored</li>
                <li>Quiz data remains in your browser session only</li>
                <li>No cookies are used for tracking</li>
              </ul>
            </section>

            <section className="mb-6 mobile:mb-4 sm:mb-8">
              <h2 className="text-xl mobile:text-lg sm:text-2xl font-semibold text-gray-800 mb-3 mobile:mb-2 sm:mb-4">2. How We Use Information</h2>
              <p className="text-gray-600 mb-3 mobile:mb-2 sm:mb-4 text-sm mobile:text-xs sm:text-base">
                Since we don't collect personal information, we don't use or share any user data. All quiz generation and processing happens locally in your browser.
              </p>
            </section>

            <section className="mb-6 mobile:mb-4 sm:mb-8">
              <h2 className="text-xl mobile:text-lg sm:text-2xl font-semibold text-gray-800 mb-3 mobile:mb-2 sm:mb-4">3. Third-Party Services</h2>
              <p className="text-gray-600 mb-3 mobile:mb-2 sm:mb-4 text-sm mobile:text-xs sm:text-base">
                ChatGPTMCQ may use the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mobile:space-y-1 sm:space-y-2 ml-3 mobile:ml-2 sm:ml-4 text-sm mobile:text-xs sm:text-base">
                <li><strong>ChatGPT/OpenAI:</strong> Users manually copy prompts to ChatGPT. Please refer to OpenAI's privacy policy for their data practices.</li>
                <li><strong>Hosting:</strong> This website is hosted on Vercel. Please refer to Vercel's privacy policy.</li>
              </ul>
            </section>

            <section className="mb-6 mobile:mb-4 sm:mb-8">
              <h2 className="text-xl mobile:text-lg sm:text-2xl font-semibold text-gray-800 mb-3 mobile:mb-2 sm:mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-3 mobile:mb-2 sm:mb-4 text-sm mobile:text-xs sm:text-base">
                All quiz data and user inputs are processed locally in your browser and are never transmitted to our servers. Your data is as secure as your local browser environment.
              </p>
            </section>

            <section className="mb-6 mobile:mb-4 sm:mb-8">
              <h2 className="text-xl mobile:text-lg sm:text-2xl font-semibold text-gray-800 mb-3 mobile:mb-2 sm:mb-4">5. Children's Privacy</h2>
              <p className="text-gray-600 mb-3 mobile:mb-2 sm:mb-4 text-sm mobile:text-xs sm:text-base">
                Our service does not knowingly collect information from children under 13. Since we don't collect any personal data, the service can be used by anyone.
              </p>
            </section>

            <section className="mb-6 mobile:mb-4 sm:mb-8">
              <h2 className="text-xl mobile:text-lg sm:text-2xl font-semibold text-gray-800 mb-3 mobile:mb-2 sm:mb-4">6. Changes to This Policy</h2>
              <p className="text-gray-600 mb-3 mobile:mb-2 sm:mb-4 text-sm mobile:text-xs sm:text-base">
                We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section className="mb-6 mobile:mb-4 sm:mb-8">
              <h2 className="text-xl mobile:text-lg sm:text-2xl font-semibold text-gray-800 mb-3 mobile:mb-2 sm:mb-4">7. Contact Us</h2>
              <p className="text-gray-600 mb-3 mobile:mb-2 sm:mb-4 text-sm mobile:text-xs sm:text-base">
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
