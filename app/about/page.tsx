"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About ChatGPTMCQ</h1>

          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is ChatGPTMCQ?</h2>
              <p className="text-gray-600 mb-4">
                ChatGPTMCQ is a free, user-friendly web application designed to help students, teachers, and professionals create custom multiple-choice quizzes using AI technology. Our platform simplifies the process of quiz generation and testing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">🎯 Dynamic Prompt Generation</h3>
                  <p className="text-sm text-gray-700">Create customized ChatGPT prompts with your topic and desired number of questions.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">⏱️ Built-in Timer</h3>
                  <p className="text-sm text-gray-700">Configurable quiz timer with pause/resume functionality for realistic test conditions.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">📊 Instant Results</h3>
                  <p className="text-sm text-gray-700">Get immediate feedback with detailed explanations for each answer.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">🔒 Privacy First</h3>
                  <p className="text-sm text-gray-700">All quiz data processed locally in your browser. No data collection or storage.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
              <ol className="list-decimal list-inside text-gray-600 space-y-3 ml-4">
                <li><strong>Enter Your Topic:</strong> Specify what subject you want to be quizzed on</li>
                <li><strong>Set Question Count:</strong> Choose how many questions (1-100)</li>
                <li><strong>Generate Prompt:</strong> Get a formatted prompt to use in ChatGPT</li>
                <li><strong>Copy & Paste:</strong> Use the prompt in ChatGPT to generate quiz questions</li>
                <li><strong>Start Quiz:</strong> Paste the JSON output back and begin your quiz</li>
                <li><strong>Get Results:</strong> See your score with detailed explanations</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                We believe that education should be accessible to everyone. ChatGPTMCQ aims to democratize quiz creation by leveraging AI technology, making it easy for anyone to create high-quality educational content without technical expertise.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technology Stack</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Next.js 15:</strong> Modern React framework for optimal performance</li>
                <li><strong>TypeScript:</strong> Type-safe development for reliability</li>
                <li><strong>Tailwind CSS:</strong> Beautiful, responsive design</li>
                <li><strong>Client-side Processing:</strong> Your data never leaves your browser</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Created By</h2>
              <p className="text-gray-600 mb-4">
                ChatGPTMCQ was created with ✨❤️ by <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Rahulanshu</span>, a passionate developer committed to making education more accessible through technology.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Open Source</h2>
              <p className="text-gray-600 mb-4">
                This project is open source! Check out the code, contribute, or report issues on GitHub.
              </p>
              <a 
                href="https://github.com/itsrahulanshu/mcq-quiz-" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-black transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </section>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
