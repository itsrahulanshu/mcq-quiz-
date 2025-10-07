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
  const [copied, setCopied] = useState(false);
  
  // New states for dynamic prompt generation
  const [topicName, setTopicName] = useState("");
  const [numQuestions, setNumQuestions] = useState<number | "">(20);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [promptCopied, setPromptCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

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

  const handleGeneratePrompt = () => {
    if (!topicName.trim()) {
      setError("Please enter a topic name");
      return;
    }
    
    if (!numQuestions || numQuestions < 1 || numQuestions > 100) {
      setError("Please enter number of questions between 1 and 100");
      return;
    }
    
    const prompt = `Generate ${numQuestions} MCQ questions on ${topicName} in this exact JSON format that i can copy paste :
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
]`;
    
    setGeneratedPrompt(prompt);
    setError("");
    setActiveStep(2);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

        {/* Step Indicators */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {[
              { num: 1, title: "Generate Prompt", icon: "✨" },
              { num: 2, title: "Copy to ChatGPT", icon: "📋" },
              { num: 3, title: "Paste JSON", icon: "📝" },
              { num: 4, title: "Start Quiz", icon: "🚀" }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    activeStep >= step.num 
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110" 
                      : "bg-gray-200 text-gray-400"
                  }`}>
                    <span className="text-xl">{step.icon}</span>
                  </div>
                  <p className={`mt-2 text-xs sm:text-sm font-medium text-center ${
                    activeStep >= step.num ? "text-blue-600" : "text-gray-400"
                  }`}>
                    {step.title}
                  </p>
                </div>
                {idx < 3 && (
                  <div className={`hidden sm:block h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                    activeStep > step.num ? "bg-blue-500" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* STEP 1: Generate ChatGPT Prompt */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Generate Your ChatGPT Prompt</h2>
                <p className="text-gray-600 text-sm sm:text-base">Enter your topic and number of questions to generate a custom prompt</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📚 Topic Name *
                </label>
                <input
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="e.g., Networking, DBMS, React.js"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔢 Number of Questions *
                </label>
                <input
                  type="number"
                  value={numQuestions}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setNumQuestions('');
                    } else {
                      const num = parseInt(val);
                      if (!isNaN(num)) {
                        setNumQuestions(num);
                      }
                    }
                  }}
                  onBlur={(e) => {
                    const val = e.target.value;
                    if (val === '' || val === '0') {
                      setNumQuestions(20);
                    } else {
                      const num = parseInt(val);
                      if (isNaN(num) || num < 1) {
                        setNumQuestions(1);
                      } else if (num > 100) {
                        setNumQuestions(100);
                      }
                    }
                  }}
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 font-medium"
                  placeholder="Enter 1-100"
                />
                <p className="text-xs text-gray-500 mt-1">Enter a number between 1 and 100</p>
              </div>
            </div>

            <button
              onClick={handleGeneratePrompt}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate ChatGPT Prompt
            </button>
          </div>

          {/* STEP 2: Generated Prompt Display */}
          {generatedPrompt && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 animate-fadeIn">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">✅ Prompt Generated!</h2>
                  <p className="text-gray-600 text-sm sm:text-base">Copy this text and paste it in ChatGPT</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-gray-200 mb-4">
                <pre className="text-xs sm:text-sm text-gray-800 font-mono whitespace-pre-wrap break-words">
                  {generatedPrompt}
                </pre>
              </div>

              <button
                onClick={handleCopyPrompt}
                className={`w-full px-6 py-4 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                  promptCopied 
                    ? "bg-green-600 text-white" 
                    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                }`}
              >
                {promptCopied ? (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied! Now Paste in ChatGPT
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                  </>
                )}
              </button>

              <div className="mt-4 p-4 bg-blue-100 rounded-xl border border-blue-300">
                <p className="text-sm text-blue-900 font-medium flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Next Step:</strong> Go to <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700">chat.openai.com</a>, paste this prompt, and ChatGPT will generate the JSON for you!</span>
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Paste JSON from ChatGPT */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Paste JSON from ChatGPT</h2>
                <p className="text-gray-600 text-sm sm:text-base">After ChatGPT generates the questions, copy and paste the JSON here</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ⏱️ Set Quiz Timer (Minutes)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-3">
                {[5, 10, 15, 20, 30, 45, 60, 90].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setTimerMinutes(mins)}
                    className={`px-3 py-2 rounded-lg font-bold transition-all duration-200 ${
                      timerMinutes === mins
                        ? "bg-purple-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-purple-100 border border-gray-300"
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Custom:</label>
                <input
                  type="number"
                  value={timerMinutes}
                  onChange={(e) => setTimerMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="180"
                  className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700 font-medium"
                />
                <span className="text-sm text-gray-500">minutes</span>
              </div>
            </div>

            <textarea
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                setActiveStep(3);
              }}
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-xl font-mono text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-800 resize-none mb-4"
              placeholder={`Paste ChatGPT's JSON output here...\n\n[\n  {\n    "id": 1,\n    "question": "Question text",\n    "options": {"A":"Option1", "B":"Option2", "C":"Option3", "D":"Option4"},\n    "answer":"A",\n    "explanation": "Why A is correct"\n  }\n]`}
            />

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base font-medium">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleLoadQuestions}
                className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Quiz
              </button>
              
              <button
                onClick={loadSampleQuestions}
                className="px-6 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-purple-300 transition-all duration-200 font-bold text-lg shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try Sample Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
