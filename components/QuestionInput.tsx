"use client";

import { useState } from "react";
import { Question } from "@/types/quiz";

interface QuestionInputProps {
  onQuestionsLoaded: (questions: Question[], timerMinutes: number) => void;
}

export default function QuestionInput({ onQuestionsLoaded }: QuestionInputProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [timerMinutes, setTimerMinutes] = useState(10);
  const [showHelp, setShowHelp] = useState(false);

  const handleLoadQuestions = () => {
    try {
      setError("");
      const parsed = JSON.parse(jsonInput);
      
      // Validate the format
      if (!Array.isArray(parsed)) {
        throw new Error("Input must be an array of questions");
      }

      for (const q of parsed) {
        if (!q.question || !q.options || !q.answer) {
          throw new Error("Each question must have 'question', 'options', and 'answer' fields");
        }
        if (!q.options.A || !q.options.B || !q.options.C || !q.options.D) {
          throw new Error("Options must have A, B, C, and D keys");
        }
        if (!["A", "B", "C", "D"].includes(q.answer)) {
          throw new Error("Answer must be A, B, C, or D");
        }
      }

      onQuestionsLoaded(parsed, timerMinutes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format");
    }
  };

  const loadSampleQuestions = () => {
    const sample = [
      {
        id: 1,
        question: "What is the capital of France?",
        options: { A: "London", B: "Berlin", C: "Paris", D: "Madrid" },
        answer: "C",
        explanation: "Paris is the capital and largest city of France, known for the Eiffel Tower and rich cultural heritage."
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: { A: "Venus", B: "Mars", C: "Jupiter", D: "Saturn" },
        answer: "B",
        explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface, giving it a reddish appearance."
      },
      {
        id: 3,
        question: "What is 2 + 2?",
        options: { A: "3", B: "4", C: "5", D: "6" },
        answer: "B",
        explanation: "Basic arithmetic: 2 + 2 equals 4."
      },
      {
        id: 4,
        question: "Who painted the Mona Lisa?",
        options: { A: "Van Gogh", B: "Picasso", C: "Da Vinci", D: "Rembrandt" },
        answer: "C",
        explanation: "Leonardo da Vinci painted the Mona Lisa in the early 16th century. It's one of the most famous paintings in the world."
      },
      {
        id: 5,
        question: "What is the largest ocean on Earth?",
        options: { A: "Atlantic", B: "Indian", C: "Arctic", D: "Pacific" },
        answer: "D",
        explanation: "The Pacific Ocean is the largest ocean, covering about 63 million square miles."
      }
    ];
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Load Quiz Questions</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Paste your questions in JSON format or load sample questions to get started.
              </p>
            </div>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md border border-blue-100 self-start sm:self-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">How to Use</span>
            </button>
          </div>
        </div>

        {/* Help Section */}
        {showHelp && (
          <div className="bg-blue-50 border-b border-blue-100 p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  How to Generate Questions with ChatGPT
                </h3>
                <div className="bg-white rounded-xl p-4 border border-blue-200">
                  <p className="text-sm text-gray-700 mb-3">Copy this prompt and use in ChatGPT:</p>
                  <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs sm:text-sm text-gray-800 overflow-x-auto">
                    {`Generate 20 MCQ questions on [YOUR TOPIC] in this exact JSON format:
[
  {
    "id": 1,
    "question": "Question text here?",
    "options": {
      "A": "Option 1",
      "B": "Option 2", 
      "C": "Option 3",
      "D": "Option 4"
    },
    "answer": "C",
    "explanation": "Why this answer is correct"
  }
]`}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`Generate 20 MCQ questions on [YOUR TOPIC] in this exact JSON format:\n[\n  {\n    "id": 1,\n    "question": "Question text here?",\n    "options": {\n      "A": "Option 1",\n      "B": "Option 2",\n      "C": "Option 3",\n      "D": "Option 4"\n    },\n    "answer": "C",\n    "explanation": "Why this answer is correct"\n  }\n]`);
                    }}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy ChatGPT Prompt
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-blue-900 mb-2">📋 Quick Steps:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                  <li>Copy the ChatGPT prompt above</li>
                  <li>Replace [YOUR TOPIC] with your subject (e.g., "OSI Model", "DBMS", etc.)</li>
                  <li>Paste in ChatGPT and generate questions</li>
                  <li>Copy the JSON output from ChatGPT</li>
                  <li>Paste it in the text area below</li>
                  <li>Set timer duration and click "Load Questions"</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Timer Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              ⏱️ Set Quiz Timer (Minutes)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
              {[5, 10, 15, 20, 30, 45, 60, 90].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setTimerMinutes(mins)}
                  className={`px-3 sm:px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    timerMinutes === mins
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <label className="text-sm text-gray-600">Custom:</label>
              <input
                type="number"
                value={timerMinutes}
                onChange={(e) => setTimerMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="180"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
              <span className="text-sm text-gray-500">minutes</span>
            </div>
          </div>

          {/* JSON Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              📝 Questions JSON:
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-64 sm:h-80 p-4 border border-gray-300 rounded-xl font-mono text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800 resize-none"
              placeholder={`[\n  {\n    "id": 1,\n    "question": "Question text",\n    "options": {"A":"Option1","B":"Option2","C":"Option3","D":"Option4"},\n    "answer":"A",\n    "explanation": "Why A is correct (optional)"\n  }\n]`}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base">{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleLoadQuestions}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Load Questions
              </span>
            </button>
            <button
              onClick={loadSampleQuestions}
              className="flex-1 px-6 py-3.5 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Load Sample Questions
              </span>
            </button>
          </div>
        </div>

        {/* Format Guide */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-6 border-t border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Expected JSON Format:
          </h3>
          <pre className="text-xs sm:text-sm bg-white p-4 rounded-xl overflow-x-auto text-gray-800 border border-gray-200 font-mono">
{`[
  {
    "id": 1,
    "question": "Question text",
    "options": {
      "A": "Option 1",
      "B": "Option 2",
      "C": "Option 3",
      "D": "Option 4"
    },
    "answer": "A",
    "explanation": "Explanation text (optional)"
  }
]`}
          </pre>
          <p className="text-xs sm:text-sm text-gray-600 mt-3">
            <strong className="text-gray-700">Note:</strong> "id" and "explanation" fields are optional but recommended for better tracking and learning.
          </p>
        </div>
      </div>
    </div>
  );
}
