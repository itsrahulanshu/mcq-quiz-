"use client";

import { QuizResult } from "@/types/quiz";
import { useState, useEffect } from "react";
import { getPerformanceBasedQuote } from "@/utils/motivationalQuotes";

interface ResultCardProps {
  result: QuizResult;
  onRestart: () => void;
  allQuestionsData: string;
}

export default function ResultCard({ result, onRestart, allQuestionsData }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState<{quote: string, author: string} | null>(null);

  useEffect(() => {
    // Get a performance-based motivational quote
    const quote = getPerformanceBasedQuote(result.percentage);
    setMotivationalQuote(quote);
  }, [result.percentage]);

  const getPerformanceMessage = () => {
    const percentage = result.percentage;
    if (percentage >= 90) return { message: "Outstanding! 🌟", color: "from-green-500 to-emerald-600", textColor: "text-green-600" };
    if (percentage >= 75) return { message: "Great job! 👏", color: "from-blue-500 to-indigo-600", textColor: "text-blue-600" };
    if (percentage >= 60) return { message: "Good effort! 👍", color: "from-yellow-500 to-orange-500", textColor: "text-yellow-600" };
    if (percentage >= 40) return { message: "Keep practicing! 💪", color: "from-orange-500 to-red-500", textColor: "text-orange-600" };
    return { message: "Don't give up! 📚", color: "from-red-500 to-pink-600", textColor: "text-red-600" };
  };

  const performance = getPerformanceMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(allQuestionsData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(JSON.parse(allQuestionsData), null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quiz-questions.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${performance.color} p-4 sm:p-5 md:p-6 lg:p-8 text-white`}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">🎉 Quiz Completed!</h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold opacity-95">
              {performance.message}
            </p>
          </div>
        </div>

        {/* Motivational Quote Section */}
        {motivationalQuote && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-5 md:p-6 border-l-4 border-purple-500">
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 italic">
                "{motivationalQuote.quote}"
              </div>
              <div className="text-sm sm:text-base text-purple-600 font-medium">
                — {motivationalQuote.author}
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl text-center border border-blue-100 shadow-lg">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {result.score.toFixed(1)}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1.5 sm:mt-2 font-medium">Final Score</div>
              <div className="text-xs text-gray-500 mt-1">out of {result.maxScore}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl text-center border border-green-100 shadow-lg">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {result.correctAnswers}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1.5 sm:mt-2 font-medium">Correct</div>
              <div className="text-xs text-green-600 mt-1 font-semibold">+{result.correctAnswers} marks</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl text-center border border-red-100 shadow-lg">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {result.wrongAnswers}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1.5 sm:mt-2 font-medium">Wrong</div>
              <div className="text-xs text-red-600 mt-1 font-semibold">
                {result.negativeMarks > 0 ? `-${(result.wrongAnswers * result.negativeMarks).toFixed(1)} marks` : 'No penalty'}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl text-center border border-orange-100 shadow-lg">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                {result.notAttempted}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1.5 sm:mt-2 font-medium">Not Attempted</div>
              <div className="text-xs text-orange-600 mt-1 font-semibold">0 marks</div>
            </div>
          </div>

          {/* Accuracy Bar */}
          <div className="mb-5 sm:mb-6 md:mb-8 bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700">Accuracy Rate</span>
              <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${performance.textColor}`}>
                {result.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 md:h-5 overflow-hidden shadow-inner">
              <div
                className={`h-full bg-gradient-to-r ${performance.color} transition-all duration-1000 shadow-md`}
                style={{ width: `${result.percentage}%` }}
              />
            </div>
          </div>

          {/* Wrong Answers Review */}
          {result.wrongQuestions.length > 0 && (
            <div className="mb-5 sm:mb-6 md:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <span className="text-red-500">❌</span> Review Wrong Answers
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {result.wrongQuestions.map((item, index) => (
                  <div key={index} className="border-2 border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 bg-gradient-to-br from-red-50 to-pink-50 shadow-md">
                    <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <p className="font-semibold text-gray-800 flex-1 text-sm sm:text-base md:text-lg">{item.question.question}</p>
                      {item.question.id && (
                        <span className="text-xs sm:text-sm bg-red-200 text-red-700 px-2.5 sm:px-3 py-1 rounded-lg font-bold flex-shrink-0 self-start">
                          #{item.question.id}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      {Object.entries(item.question.options).map(([key, value]) => (
                        <div
                          key={key}
                          className={`p-2 sm:p-2.5 md:p-3 rounded-lg transition-all text-xs sm:text-sm md:text-base ${
                            key === item.correctAnswer
                              ? "bg-green-100 border-2 border-green-500 shadow-sm"
                              : key === item.userAnswer
                              ? "bg-red-100 border-2 border-red-500 shadow-sm"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <span className="font-bold">{key}:</span> <span className="text-gray-800">{value}</span>
                          {key === item.correctAnswer && (
                            <span className="ml-1 sm:ml-2 text-green-700 text-xs sm:text-sm font-bold">✓ Correct Answer</span>
                          )}
                          {key === item.userAnswer && key !== item.correctAnswer && (
                            <span className="ml-1 sm:ml-2 text-red-700 text-xs sm:text-sm font-bold">✗ Your answer</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {!item.userAnswer && (
                      <div className="bg-orange-100 border border-orange-300 rounded-lg p-2 sm:p-2.5 md:p-3 text-orange-700 text-xs sm:text-sm font-semibold mb-2">
                        ⚠️ You did not answer this question
                      </div>
                    )}
                    {item.explanation && (
                      <div className="mt-2 sm:mt-3 p-3 sm:p-3.5 md:p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
                        <div className="flex items-start gap-1.5 sm:gap-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-blue-800 mb-1">💡 Explanation:</p>
                            <p className="text-xs sm:text-sm md:text-base text-blue-700">{item.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Correct Answers */}
          {result.correctQuestions.length > 0 && (
            <div className="mb-5 sm:mb-6 md:mb-8">
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-green-500">✅</span> Correct Answers
                </h3>
                <button
                  onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
                  className="text-xs sm:text-sm md:text-base text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1.5 sm:gap-2 bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-100 transition-all self-start"
                >
                  {showCorrectAnswers ? "Hide" : "Show"} ({result.correctAnswers})
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showCorrectAnswers ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {showCorrectAnswers && (
                <div className="space-y-3 sm:space-y-4">
                  {result.correctQuestions.map((item, index) => (
                    <div key={index} className="border-2 border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md">
                      <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <p className="font-semibold text-gray-800 flex-1 text-sm sm:text-base md:text-lg">{item.question.question}</p>
                        {item.question.id && (
                          <span className="text-xs sm:text-sm bg-green-200 text-green-700 px-2.5 sm:px-3 py-1 rounded-lg font-bold flex-shrink-0 self-start">
                            #{item.question.id}
                          </span>
                        )}
                      </div>
                      <div className="mb-2">
                        <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-xs sm:text-sm font-bold shadow-md">
                          ✓ Your Answer: {item.userAnswer} - {item.question.options[item.userAnswer as "A" | "B" | "C" | "D"]}
                        </span>
                      </div>
                      {item.explanation && (
                        <div className="mt-2 sm:mt-3 p-3 sm:p-3.5 md:p-4 bg-white border-l-4 border-green-500 rounded-lg shadow-sm">
                          <div className="flex items-start gap-1.5 sm:gap-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-green-800 mb-1">💡 Explanation:</p>
                              <p className="text-xs sm:text-sm md:text-base text-green-700">{item.explanation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
            <button
              onClick={onRestart}
              className="px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Restart Quiz
            </button>
            <button
              onClick={handleCopy}
              className="px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? "Copied! ✓" : "Copy Data"}
            </button>
            <button
              onClick={exportAsJSON}
              className="px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg sm:rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export JSON
            </button>
          </div>

          {/* Performance Summary */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg md:text-xl flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Performance Analysis
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {/* Quiz Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ul className="text-xs sm:text-sm md:text-base text-gray-700 space-y-1.5 sm:space-y-2">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      Total Questions:
                    </span>
                    <strong>{result.totalQuestions}</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                      Questions Attempted:
                    </span>
                    <strong>{result.correctAnswers + result.wrongAnswers}</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                      Not Attempted:
                    </span>
                    <strong>{result.notAttempted}</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full flex-shrink-0"></span>
                      Accuracy Rate:
                    </span>
                    <strong>{result.percentage.toFixed(1)}%</strong>
                  </li>
                </ul>
                
                {/* Marking Scheme */}
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <h5 className="font-semibold text-gray-800 mb-2 text-sm">Marking Scheme</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex justify-between">
                      <span>Correct Answer:</span>
                      <span className="text-green-600 font-semibold">+1 mark</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Wrong Answer:</span>
                      <span className="text-red-600 font-semibold">
                        {result.negativeMarks > 0 ? `-${result.negativeMarks} marks` : 'No penalty'}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Not Attempted:</span>
                      <span className="text-orange-600 font-semibold">0 marks</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Performance Tips */}
              {result.percentage < 60 && (
                <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 sm:p-4 text-orange-700">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💡</span>
                    <div>
                      <h6 className="font-semibold mb-1">Improvement Tips:</h6>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Review the wrong answers above and understand the explanations</li>
                        <li>• Practice more questions on similar topics</li>
                        {result.notAttempted > 0 && <li>• Try to attempt all questions next time</li>}
                        <li>• Take your time to read questions carefully</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {result.percentage >= 80 && (
                <div className="bg-green-100 border border-green-300 rounded-lg p-3 sm:p-4 text-green-700">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎉</span>
                    <div>
                      <h6 className="font-semibold mb-1">Excellent Performance!</h6>
                      <p className="text-xs sm:text-sm">You've demonstrated strong understanding of the subject. Keep up the great work!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
