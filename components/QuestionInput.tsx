"use client";

import { useState, useEffect } from "react";
import { Question } from "@/types/quiz";
// Removed QuizSettingsModal import - using inline collapsible settings instead

interface QuestionInputProps {
  onQuestionsLoaded: (questions: Question[], timerMinutes: number, negativeMarks: number) => void;
}

export default function QuestionInput({ onQuestionsLoaded }: QuestionInputProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [timerMinutes, setTimerMinutes] = useState<number | "">(0);
  const [copied, setCopied] = useState(false);
  
  // New states for dynamic prompt generation
  const [topicName, setTopicName] = useState("");
  const [numQuestions, setNumQuestions] = useState<number | "">(20);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [promptCopied, setPromptCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  
  // AI Auto-generation states
  const [isAIMode, setIsAIMode] = useState(false); // Default to Manual mode
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedJson, setAiGeneratedJson] = useState("");
  const [generationProgress, setGenerationProgress] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(0);
  
  // Negative marking states
  const [negativeMarks, setNegativeMarks] = useState<number | "">(0.25);
  
  // Progressive disclosure state
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [immediateMessage, setImmediateMessage] = useState('');
  

  
  // Auto-calculate timer based on number of questions
  const calculateAutoTimer = (numQ: number | "") => {
    if (!numQ || typeof numQ !== 'number') return 0;
    // Formula: exactly 1 minute per question, maximum 180 minutes
    const calculatedTime = Math.min(180, numQ);
    return calculatedTime;
  };

  const getTimeWarning = (numQ: number | "") => {
    if (!numQ || numQ < 1) return null;
    
    if (numQ <= 5) return { type: "info", message: "⚡ Quick generation (5-15 seconds)" };
    if (numQ <= 15) return { type: "info", message: "⏱️ Moderate generation (15-40 seconds)" };
    if (numQ <= 30) return { type: "warning", message: "⏳ Longer generation (40-75 seconds)" };
    if (numQ <= 50) return { type: "warning", message: "⏰ Extended generation (1-2 minutes)" };
    return { type: "error", message: "🕐 Very long generation (2+ minutes)" };
  };

  const handleJsonInputChange = (value: string) => {
    setJsonInput(value);
    setError('');
    
    // Display immediate message and update timer when JSON is pasted
    if (value.trim()) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const autoDetectedTime = calculateAutoTimer(parsed.length);
          setTimerMinutes(autoDetectedTime); // Update timer display immediately
          setImmediateMessage(`Default quiz time is ${autoDetectedTime} minutes, auto-detected based on ${parsed.length} questions.`);
        } else {
          setImmediateMessage('');
        }
      } catch (e) {
        setImmediateMessage('');
      }
    } else {
      setImmediateMessage('');
    }
  };

  const handleLoadQuestions = () => {
    try {
      setError("");
      const jsonToLoad = isAIMode ? aiGeneratedJson : jsonInput;
      const parsed = JSON.parse(jsonToLoad);
      
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

      // Auto-calculate timer based on number of questions
      const autoTimer = calculateAutoTimer(parsed.length);
      setTimerMinutes(autoTimer);
      
      // Ensure negative marks is a valid number
      const negativeMarksValue = typeof negativeMarks === 'number' ? negativeMarks : 0.25;
      
      onQuestionsLoaded(parsed, autoTimer, negativeMarksValue);
      
      // Clear AI-generated JSON after successful loading
      if (isAIMode && aiGeneratedJson) {
        setAiGeneratedJson("");
      }
      
      setImmediateMessage(''); // Clear immediate message after processing
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format");
      setImmediateMessage('');
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

  const handleAIGenerate = async () => {
    if (!topicName.trim()) {
      setError("Please enter a topic name");
      return;
    }
    
    if (!numQuestions || numQuestions < 1 || numQuestions > 100) {
      setError("Please enter number of questions between 1 and 100");
      return;
    }

    // Calculate estimated time (roughly 2-3 seconds per question)
    const estimatedSeconds = Math.max(10, (numQuestions as number) * 2.5);
    setEstimatedTime(estimatedSeconds);
    setIsGenerating(true);
    setError("");
    setGenerationProgress("Preparing your request...");

    try {
      // Progress update
      setGenerationProgress("Connecting to AI service...");
      
      const prompt = `Generate ${numQuestions} multiple choice questions about ${topicName}. Return ONLY a valid JSON array in this exact format:
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
    "answer": "A",
    "explanation": "Why this answer is correct"
  }
]

Make sure each question has a clear correct answer and helpful explanation. Return only the JSON array, no other text.`;

      setGenerationProgress("Sending request to AI...");
      
      const response = await fetch('https://apifreellm.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt
        })
      });

      setGenerationProgress("AI is generating your questions...");
      
      const data = await response.json();
      
      if (data.status === 'success' && data.response) {
        setGenerationProgress("Processing AI response...");
        
        // Try to extract JSON from the response
        let jsonText = data.response.trim();
        
        // Remove any markdown code blocks if present
        jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
        
        // Try to find JSON array in the response
        const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          jsonText = jsonMatch[0];
        }
        
        setGenerationProgress("Validating questions...");
        
        // Validate the JSON
        try {
          const parsed = JSON.parse(jsonText);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Validate structure
            for (const q of parsed) {
              if (!q.question || !q.options || !q.answer) {
                throw new Error("Invalid question structure");
              }
            }
            
            setGenerationProgress(`✅ Successfully generated ${parsed.length} questions!`);
            setAiGeneratedJson(JSON.stringify(parsed, null, 2));
            setJsonInput(JSON.stringify(parsed, null, 2));
            setActiveStep(3);
            
            // Clear progress after a short delay
            setTimeout(() => {
              setGenerationProgress("");
            }, 2000);
          } else {
            throw new Error("Invalid JSON structure");
          }
        } catch (parseError) {
          throw new Error("Failed to parse AI response as valid JSON");
        }
      } else {
        throw new Error(data.error || "Failed to generate questions");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate questions. Please try again.");
      setGenerationProgress("");
    } finally {
      setIsGenerating(false);
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

        {/* Mode Toggle */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 mobile:p-2 sm:p-4 md:p-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4 mobile:mb-3 sm:mb-6">
                <div className="bg-white rounded-xl mobile:rounded-lg p-1 mobile:p-0.5 sm:p-2 shadow-lg border-2 border-gray-200 w-full max-w-md">
                  <div className="flex items-center gap-1 mobile:gap-0.5 sm:gap-2">
                    <button
                      onClick={() => setIsAIMode(false)}
                      className={`flex-1 px-3 mobile:px-2 sm:px-4 py-2 mobile:py-1.5 sm:py-2 rounded-lg mobile:rounded-md font-semibold text-sm mobile:text-xs sm:text-base transition-all duration-200 ${
                        !isAIMode 
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="hidden xs:inline">📋 Manual (ChatGPT)</span>
                      <span className="xs:hidden">📋 Manual</span>
                    </button>
                    <button
                      onClick={() => setIsAIMode(true)}
                      className={`flex-1 px-3 mobile:px-2 sm:px-4 py-2 mobile:py-1.5 sm:py-2 rounded-lg mobile:rounded-md font-semibold text-sm mobile:text-xs sm:text-base transition-all duration-200 ${
                        isAIMode 
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md" 
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      🤖 Auto Generate (AI)
                    </button>
                  </div>
                </div>
              </div>

            {/* Step Indicators - Only show for manual mode */}
            {!isAIMode && (
              <div className="flex items-center justify-between">
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
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* AI AUTO-GENERATION MODE */}
          {isAIMode && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl mobile:rounded-lg sm:rounded-2xl p-4 mobile:p-3 sm:p-6 border-2 border-green-200">
              <div className="flex items-start gap-2 mobile:gap-1.5 sm:gap-3 mb-3 mobile:mb-2 sm:mb-4">
                <div className="w-6 h-6 mobile:w-5 mobile:h-5 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm mobile:text-xs sm:text-base">🤖</div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg mobile:text-base sm:text-xl md:text-2xl font-bold text-gray-800 mb-1">AI Auto-Generate Quiz</h2>
                  <p className="text-gray-600 text-sm mobile:text-xs sm:text-base">Let AI automatically create quiz questions for you</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mobile:gap-2 sm:gap-4 mb-3 mobile:mb-2 sm:mb-4">
                <div>
                  <label className="block text-sm mobile:text-xs sm:text-sm font-semibold text-gray-700 mb-2 mobile:mb-1 sm:mb-2">
                    📚 Topic Name *
                  </label>
                  <input
                    type="text"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    placeholder="e.g., JavaScript, Biology, History"
                    className="w-full px-3 mobile:px-2 sm:px-4 py-2 mobile:py-1.5 sm:py-3 border-2 border-gray-300 rounded-lg mobile:rounded-md sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 font-medium text-sm mobile:text-xs sm:text-base"
                    disabled={isGenerating}
                  />
                </div>
                
                <div>
                  <label className="block text-sm mobile:text-xs sm:text-sm font-semibold text-gray-700 mb-2 mobile:mb-1 sm:mb-2">
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
                    className="w-full px-3 mobile:px-2 sm:px-4 py-2 mobile:py-1.5 sm:py-3 border-2 border-gray-300 rounded-lg mobile:rounded-md sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 font-medium text-sm mobile:text-xs sm:text-base"
                    placeholder="Enter 1-100"
                    disabled={isGenerating}
                  />
                  <p className="text-xs mobile:text-xs sm:text-xs text-gray-500 mt-1">Enter a number between 1 and 100</p>
                </div>
              </div>

              {/* Time Warning */}
              {numQuestions && getTimeWarning(numQuestions) && (
                <div className={`mb-3 mobile:mb-2 sm:mb-4 p-2 mobile:p-1.5 sm:p-3 rounded-lg mobile:rounded-md sm:rounded-xl border-2 flex items-center gap-2 mobile:gap-1 sm:gap-2 ${
                  getTimeWarning(numQuestions)?.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                  getTimeWarning(numQuestions)?.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                  'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <svg className="w-4 h-4 mobile:w-3 mobile:h-3 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm mobile:text-xs sm:text-sm font-medium">{getTimeWarning(numQuestions)?.message}</span>
                </div>
              )}

              <button
                onClick={handleAIGenerate}
                disabled={isGenerating}
                className={`w-full px-4 mobile:px-3 sm:px-6 py-3 mobile:py-2 sm:py-4 rounded-lg mobile:rounded-md sm:rounded-xl transition-all duration-200 font-bold text-base mobile:text-sm sm:text-lg shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2 mobile:gap-1 sm:gap-2 ${
                  isGenerating 
                    ? "bg-gray-400 text-white cursor-not-allowed" 
                    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="w-5 h-5 mobile:w-4 mobile:h-4 sm:w-6 sm:h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="hidden xs:inline">Generating Questions...</span>
                    <span className="xs:hidden">Generating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mobile:w-4 mobile:h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="hidden xs:inline">Generate Quiz with AI</span>
                    <span className="xs:hidden">Generate Quiz</span>
                  </>
                )}
              </button>

              {/* Real-time Progress Display */}
              {isGenerating && generationProgress && (
                <div className="mt-3 mobile:mt-2 sm:mt-4 p-3 mobile:p-2 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mobile:rounded-md sm:rounded-xl border-2 border-blue-200 animate-pulse">
                  <div className="flex items-center gap-2 mobile:gap-1 sm:gap-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 mobile:w-1.5 mobile:h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 mobile:w-1.5 mobile:h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 mobile:w-1.5 mobile:h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-blue-800 font-medium text-sm mobile:text-xs sm:text-base">{generationProgress}</span>
                  </div>
                  {estimatedTime > 0 && (
                    <div className="mt-2 mobile:mt-1 sm:mt-2 text-sm mobile:text-xs sm:text-sm text-blue-600">
                      Estimated time: ~{Math.ceil(estimatedTime)} seconds
                    </div>
                  )}
                </div>
              )}


            </div>
          )}
          
          {/* MANUAL MODE - STEP 1: Generate ChatGPT Prompt */}
          {!isAIMode && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mobile:rounded-lg sm:rounded-2xl p-4 mobile:p-3 sm:p-6 border-2 border-blue-200">
            <div className="flex items-start gap-2 mobile:gap-1 sm:gap-3 mb-3 mobile:mb-2 sm:mb-4">
              <div className="w-7 h-7 mobile:w-6 mobile:h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm mobile:text-xs sm:text-base">1</div>
              <div>
                <h2 className="text-lg mobile:text-base sm:text-xl md:text-2xl font-bold text-gray-800 mb-1">Generate Your ChatGPT Prompt</h2>
                <p className="text-gray-600 text-sm mobile:text-xs sm:text-sm md:text-base">Enter your topic and number of questions to generate a custom prompt</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mobile:gap-2 sm:gap-4 mb-3 mobile:mb-2 sm:mb-4">
              <div>
                <label className="block text-sm mobile:text-xs sm:text-sm font-semibold text-gray-700 mb-2 mobile:mb-1 sm:mb-2">
                  📚 Topic Name *
                </label>
                <input
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="e.g., Networking, DBMS, React.js"
                  className="w-full px-3 mobile:px-2 sm:px-4 py-2 mobile:py-1.5 sm:py-3 border-2 border-gray-300 rounded-lg mobile:rounded-md sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 font-medium text-sm mobile:text-xs sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm mobile:text-xs sm:text-sm font-semibold text-gray-700 mb-2 mobile:mb-1 sm:mb-2">
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
                  className="w-full px-3 mobile:px-2 sm:px-4 py-2 mobile:py-1.5 sm:py-3 border-2 border-gray-300 rounded-lg mobile:rounded-md sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 font-medium text-sm mobile:text-xs sm:text-base"
                  placeholder="Enter 1-100"
                />
                <p className="text-xs mobile:text-xs sm:text-xs text-gray-500 mt-1">Enter a number between 1 and 100</p>
              </div>
            </div>

            <button
              onClick={handleGeneratePrompt}
              className="w-full px-4 mobile:px-3 sm:px-6 py-3 mobile:py-2 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg mobile:rounded-md sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-bold text-base mobile:text-sm sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 mobile:gap-1 sm:gap-2"
            >
              <svg className="w-5 h-5 mobile:w-4 mobile:h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="hidden xs:inline">Generate ChatGPT Prompt</span>
              <span className="xs:hidden">Generate Prompt</span>
            </button>
          </div>
          )}

          {/* MANUAL MODE - STEP 2: Generated Prompt Display */}
          {!isAIMode && generatedPrompt && (
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

          {/* Timer and JSON Input Section - Show for both modes */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {isAIMode ? "2" : "3"}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                  {isAIMode ? "Review & Load Questions" : "Paste JSON from ChatGPT"}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {isAIMode 
                    ? "Review the AI-generated questions below and set your timer" 
                    : "After ChatGPT generates the questions, copy and paste the JSON here"
                  }
                </p>
              </div>
            </div>

            {/* Try Sample Quiz Button - Above Textarea - Only show in Manual Mode */}
            {!isAIMode && (
              <div className="mb-4">
                <button
                  onClick={loadSampleQuestions}
                  className="group relative w-full px-6 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Border gradient effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <div className="absolute inset-[2px] rounded-2xl bg-white group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:via-blue-50 group-hover:to-emerald-50"></div>
                  
                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:via-blue-700 group-hover:to-emerald-700 transition-all duration-300">
                      Try Sample Quiz
                    </span>
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center group-hover:animate-bounce">
                      <span className="text-sm">✨</span>
                    </div>
                  </div>
                </button>
              </div>
            )}

            <div className="relative group">
              <textarea
                value={isAIMode ? aiGeneratedJson : jsonInput}
                onChange={(e) => {
                  if (!isAIMode) {
                    handleJsonInputChange(e.target.value);
                    setActiveStep(3);
                  }
                }}
                className={`w-full h-64 sm:h-72 md:h-80 p-4 sm:p-6 border-2 rounded-2xl font-mono text-xs sm:text-sm focus:ring-4 focus:ring-purple-200 focus:border-purple-500 text-gray-800 resize-none mb-4 transition-all duration-300 shadow-sm hover:shadow-md ${
                  isAIMode 
                    ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 cursor-not-allowed' 
                    : 'bg-white border-gray-300 hover:border-purple-400'
                }`}
                placeholder={isAIMode 
                  ? "🤖 AI-generated questions will appear here automatically..." 
                  : `📋 Paste ChatGPT's JSON output here...\n\n💡 Example format:\n[\n  {\n    "id": 1,\n    "question": "Your question text here",\n    "options": {\n      "A": "First option",\n      "B": "Second option", \n      "C": "Third option",\n      "D": "Fourth option"\n    },\n    "answer": "A",\n    "explanation": "Why A is the correct answer"\n  }\n]\n\n✨ Tip: Make sure your JSON is properly formatted!`
                }
                readOnly={isAIMode}
              />
              
              {/* Character count and status indicator */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  {!isAIMode && (
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                      <span className="text-xs text-gray-500 font-medium">
                        {jsonInput.length} characters
                      </span>
                    </div>
                  )}
                  
                  {/* Status indicator */}
                  <div className={`w-3 h-3 rounded-full ${
                    isAIMode 
                      ? 'bg-blue-400 animate-pulse' 
                      : jsonInput.length > 0 
                        ? 'bg-green-400' 
                        : 'bg-gray-300'
                  }`} title={
                    isAIMode 
                      ? 'AI Mode Active' 
                      : jsonInput.length > 0 
                        ? 'Content Added' 
                        : 'Waiting for Input'
                  }></div>
                </div>
              
              {/* Copy button for AI mode */}
              {isAIMode && aiGeneratedJson && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(aiGeneratedJson);
                    // Could add a toast notification here
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group/copy"
                  title="Copy to clipboard"
                >
                  <svg className="w-4 h-4 text-gray-600 group-hover/copy:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              )}
              
              {/* Format validation indicator */}
              {!isAIMode && jsonInput && (
                <div className="absolute top-4 left-4">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    (() => {
                      try {
                        JSON.parse(jsonInput);
                        return 'bg-green-100 text-green-800 border border-green-200';
                      } catch {
                        return 'bg-red-100 text-red-800 border border-red-200';
                      }
                    })()
                  }`}>
                    {(() => {
                      try {
                        JSON.parse(jsonInput);
                        return '✓ Valid JSON';
                      } catch {
                        return '⚠ Invalid JSON';
                      }
                    })()}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-6 p-5 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-800 rounded-2xl shadow-lg animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-red-900 mb-1">Input Error</h4>
                    <p className="text-sm sm:text-base font-medium leading-relaxed">{error}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-red-600">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Please check your JSON format and try again</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setError('')}
                    className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                    title="Dismiss error"
                  >
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Settings Summary - Default Values Display */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  {/* Timer Display */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Timer:</span>
                    <div key={`timer-${timerMinutes}`} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap">
                      {!timerMinutes || timerMinutes === 0 ? "00" : String(timerMinutes).padStart(2, '0')} min
                    </div>
                  </div>
                  
                  {/* Negative Marking Display */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Negative Marking:</span>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap">
                      -{negativeMarks}
                    </div>
                  </div>
                </div>
                
                {/* Settings Button */}
                <button
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
                  title={showAdvancedSettings ? "Hide quiz settings" : "Show quiz settings"}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showAdvancedSettings ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {/* Dynamic Message Display */}
            {immediateMessage && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-green-800">{immediateMessage}</span>
                </div>
              </div>
            )}

            {/* Collapsible Settings Section */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showAdvancedSettings ? 'max-h-[400px] sm:max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="mt-3 p-3 sm:p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3 sm:space-y-4">
                {/* Timer Settings */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Timer Configuration</h3>
                  </div>
                  
                  {/* Custom Timer */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Timer</h4>
                    <div className="flex items-center gap-3">
                      <div key={`settings-timer-${timerMinutes}`} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-sm min-w-0 flex items-center gap-1">
                        <span>{!timerMinutes || timerMinutes === 0 ? "00" : String(timerMinutes).padStart(2, '0')}</span>
                        <span className="text-xs opacity-90">min</span>
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          value={timerMinutes}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              setTimerMinutes('');
                            } else {
                              const num = parseInt(val);
                              if (!isNaN(num)) {
                                setTimerMinutes(num);
                              }
                            }
                          }}
                          onBlur={(e) => {
                            const val = e.target.value;
                            if (val === '' || val === '0') {
                              setTimerMinutes(0);
                            } else {
                              const num = parseInt(val);
                              if (isNaN(num) || num < 0) {
                                setTimerMinutes(0);
                              } else if (num > 180) {
                                setTimerMinutes(180);
                              }
                            }
                          }}
                          min="0"
                          max="180"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          placeholder="0"
                          title="Set custom timer duration (0-180 minutes)"
                        />
                        <p className="text-xs text-gray-500 mt-1 text-center">Enter 0-180 minutes</p>
                        
                        {/* Timer Preset Buttons */}
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setTimerMinutes(20)}
                            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              timerMinutes === 20
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            20m
                          </button>
                          <button
                            onClick={() => setTimerMinutes(30)}
                            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              timerMinutes === 30
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            30m
                          </button>
                          <button
                            onClick={() => setTimerMinutes(60)}
                            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              timerMinutes === 60
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            60m
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Negative Marking Settings */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">Negative Marking</h3>
                  </div>
                  
                  {/* Preset Options */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Common Options</h4>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <button
                        onClick={() => setNegativeMarks(0.25)}
                        className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                          negativeMarks === 0.25
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-300 hover:border-red-300"
                        }`}
                        title="Standard negative marking"
                      >
                        Standard (0.25)
                      </button>
                      <button
                        onClick={() => setNegativeMarks(0.5)}
                        className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                          negativeMarks === 0.5
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-300 hover:border-red-300"
                        }`}
                        title="Half point negative marking"
                      >
                        Half (0.5)
                      </button>
                      <button
                        onClick={() => setNegativeMarks(1)}
                        className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                          negativeMarks === 1
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-300 hover:border-red-300"
                        }`}
                        title="Full point negative marking"
                      >
                        Full (1)
                      </button>
                      <button
                        onClick={() => setNegativeMarks(0)}
                        className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                          negativeMarks === 0
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-300 hover:border-red-300"
                        }`}
                        title="No negative marking"
                      >
                        None (0)
                      </button>
                    </div>
                  </div>
                  
                  {/* Custom Negative Marking */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Custom Negative Marking</h4>
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-bold text-lg shadow-sm min-w-0 flex items-center gap-1">
                        <span>{negativeMarks}</span>
                        <span className="text-sm opacity-90">pts</span>
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          value={negativeMarks}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              setNegativeMarks('');
                            } else {
                              const num = parseFloat(val);
                              if (!isNaN(num)) {
                                setNegativeMarks(num);
                              }
                            }
                          }}
                          onBlur={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              setNegativeMarks(0);
                            } else {
                              const num = parseFloat(val);
                              if (isNaN(num) || num < 0) {
                                setNegativeMarks(0);
                              } else if (num > 5) {
                                setNegativeMarks(5);
                              }
                            }
                          }}
                          min="0"
                          max="5"
                          step="0.1"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center font-medium focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                          placeholder="0"
                          title="Set custom negative marking (0-5 points)"
                        />
                        <p className="text-xs text-gray-500 mt-2 text-center">Enter 0-5 points</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              
              {/* Auto-detection Message */}
              {jsonInput && (() => {
                try {
                  const parsed = JSON.parse(jsonInput);
                  if (Array.isArray(parsed) && parsed.length > 0) {
                    const autoDetectedTime = Math.max(1, Math.min(180, parsed.length));
                    return (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium text-green-800">
                            Default quiz time is {autoDetectedTime} minutes, auto-detected based on {parsed.length} questions (1 minute per question).
                          </span>
                        </div>
                      </div>
                    );
                  }
                } catch (e) {
                  return null;
                }
                return null;
              })()}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              {/* Primary Start Quiz Button */}
              <button
                onClick={handleLoadQuestions}
                className="group relative w-full px-8 py-5 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button content */}
                <div className="relative flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <span className="tracking-wide">Start Quiz</span>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:animate-pulse">
                    <span className="text-lg">🚀</span>
                  </div>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
              </button>
              
              {/* Helper text */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Paste your quiz JSON above or try our sample quiz to get started
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal removed - using inline collapsible settings instead */}
    </div>
  );
}
