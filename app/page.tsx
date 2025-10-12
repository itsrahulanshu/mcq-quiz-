"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import dynamic from "next/dynamic";
import { Question, UserAnswer, QuizResult } from "@/types/quiz";
import { useTimer } from "@/context/TimerContext";

// Use dynamic import with no SSR for components that have client-side state
const QuestionInput = dynamic(() => import("@/components/QuestionInput"), { 
  ssr: false,
  loading: () => (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 mobile:p-2 sm:p-4 md:p-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4 mobile:mb-3 sm:mb-6">
              <div className="animate-pulse bg-gray-200 h-12 w-64 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

// Lazy load other components
const QuestionCard = lazy(() => import("@/components/QuestionCard"));
const QuizHeader = lazy(() => import("@/components/QuizHeader"));
const ResultCard = lazy(() => import("@/components/ResultCard"));
const Header = lazy(() => import("@/components/Header"));

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const { startTimer, stopTimer, isPaused, timeLeft } = useTimer();

  const handleQuestionsLoaded = (loadedQuestions: Question[], selectedTimerMinutes: number, negativeMarks: number) => {
    setQuestions(loadedQuestions);
    setUserAnswers(loadedQuestions.map((_, index) => ({ questionIndex: index, selectedOption: null })));
    setIsQuizStarted(true);
    setCurrentQuestionIndex(0);
    startTimer(selectedTimerMinutes);
    setIsQuizCompleted(false);
    // Store negative marks for scoring calculation
    localStorage.setItem('negativeMarks', negativeMarks.toString());
  };

  const handleSelectOption = (option: "A" | "B" | "C" | "D") => {
    if (isPaused || timeLeft === 0) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex].selectedOption = option;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isPaused || timeLeft === 0) return;
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (isPaused || timeLeft === 0) return;
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    if (isPaused || timeLeft === 0) return;
    setCurrentQuestionIndex(index);
  };

  const calculateResult = useCallback((): QuizResult => {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let notAttempted = 0;
    const wrongQuestions: QuizResult["wrongQuestions"] = [];
    const correctQuestions: QuizResult["correctQuestions"] = [];
    
    // Get negative marks from localStorage
    const negativeMarks = parseFloat(localStorage.getItem('negativeMarks') || '0');
    
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index].selectedOption;
      if (userAnswer === null) {
        // Not attempted
        notAttempted++;
        wrongQuestions.push({ question, userAnswer: null, correctAnswer: question.answer, explanation: question.explanation });
      } else if (userAnswer === question.answer) {
        // Correct answer
        correctAnswers++;
        correctQuestions.push({ question, userAnswer: userAnswer, explanation: question.explanation });
      } else {
        // Wrong answer
        wrongAnswers++;
        wrongQuestions.push({ question, userAnswer: userAnswer, correctAnswer: question.answer, explanation: question.explanation });
      }
    });
    
    const totalQuestions = questions.length;
    // Calculate score with negative marking: correct answers get +1, wrong answers get -negativeMarks, not attempted get 0
    const score = correctAnswers - (wrongAnswers * negativeMarks);
    const maxPossibleScore = totalQuestions; // Maximum score if all answers are correct
    const percentage = totalQuestions > 0 ? Math.max(0, (score / maxPossibleScore) * 100) : 0;
    
    return { 
      totalQuestions, 
      correctAnswers, 
      wrongAnswers, 
      notAttempted,
      score: Math.max(0, score), // Ensure score doesn't go below 0
      maxScore: maxPossibleScore,
      negativeMarks,
      percentage, 
      wrongQuestions, 
      correctQuestions 
    };
  }, [questions, userAnswers]);

  const handleSubmit = () => {
    if (isPaused) return;
    const result = calculateResult();
    setQuizResult(result);
    setIsQuizCompleted(true);
    stopTimer();
  };

  const handleTimeUp = () => {
    const result = calculateResult();
    setQuizResult(result);
    setIsQuizCompleted(true);
    stopTimer();
  };

  const handleRestart = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsQuizStarted(false);
    setIsQuizCompleted(false);
    stopTimer();
    setQuizResult(null);
  };

  const getAllQuestionsData = () => JSON.stringify(questions, null, 2);
  const getAnsweredCount = () => userAnswers.filter((ans) => ans.selectedOption !== null).length;

  // Loading fallback component
  const LoadingFallback = ({ text = "Loading..." }: { text?: string }) => (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="text-gray-600">{text}</span>
      </div>
    </div>
  );

  if (!isQuizStarted) {
    return (
      <>
        <Suspense fallback={<LoadingFallback text="Loading header..." />}>
          <Header onHowToUseClick={() => setShowHowToUse(!showHowToUse)} />
        </Suspense>
        <Suspense fallback={<LoadingFallback text="Loading quiz input..." />}>
          <QuestionInput onQuestionsLoaded={handleQuestionsLoaded} />
        </Suspense>
        
        {/* How to Use Modal */}
        {showHowToUse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowHowToUse(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">📚 How to Use ChatGPTMCQ</h2>
                  <button onClick={() => setShowHowToUse(false)} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-8 space-y-8">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Enter Your Quiz Details</h3>
                    <p className="text-gray-600 mb-3">Fill in the following information:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                      <li><strong>Topic Name:</strong> Enter the subject you want to be quizzed on (e.g., "JavaScript", "World History", "Biology")</li>
                      <li><strong>Number of Questions:</strong> Choose how many questions you want (1-100)</li>
                      <li><strong>Timer Duration:</strong> Set the quiz timer (1-60 minutes)</li>
                    </ul>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Generate Your Prompt</h3>
                    <p className="text-gray-600 mb-3">Click the <strong>"Generate Prompt"</strong> button to create a custom ChatGPT prompt based on your inputs.</p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <p className="text-sm text-blue-800"><strong>💡 Tip:</strong> The prompt is automatically formatted to work perfectly with ChatGPT!</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Copy & Paste to ChatGPT</h3>
                    <p className="text-gray-600 mb-3">Follow these steps:</p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                      <li>Click the <strong>"Copy Prompt"</strong> button (it will turn green when copied)</li>
                      <li>Open ChatGPT in a new tab</li>
                      <li>Paste the prompt and press Enter</li>
                      <li>Wait for ChatGPT to generate your quiz questions</li>
                    </ol>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">4</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Import & Start Quiz</h3>
                    <p className="text-gray-600 mb-3">Complete the process:</p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                      <li>Copy ChatGPT's response (the JSON array of questions)</li>
                      <li>Paste it into the <strong>"Paste Questions Here"</strong> text area</li>
                      <li>Click <strong>"Start Quiz"</strong></li>
                      <li>Your timer will start automatically!</li>
                    </ol>
                  </div>
                </div>

                {/* Additional Features */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Quiz Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⏱️</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Timer Control</h4>
                        <p className="text-sm text-gray-600">Pause and resume your quiz anytime</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔢</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Quick Navigation</h4>
                        <p className="text-sm text-gray-600">Jump to any question instantly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📊</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Instant Results</h4>
                        <p className="text-sm text-gray-600">See your score and review answers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔒</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Privacy First</h4>
                        <p className="text-sm text-gray-600">All data stays in your browser</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-center pt-4">
                  <button onClick={() => setShowHowToUse(false)} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
                    Got it, Let's Start! 🚀
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (isQuizCompleted && quizResult) {
    return (
      <>
        <Suspense fallback={<LoadingFallback text="Loading header..." />}>
          <Header />
        </Suspense>
        <Suspense fallback={<LoadingFallback text="Loading results..." />}>
          <ResultCard result={quizResult} onRestart={handleRestart} allQuestionsData={getAllQuestionsData()} />
        </Suspense>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = getAnsweredCount();

  return (
    <>
      <Suspense fallback={<LoadingFallback text="Loading header..." />}>
        <Header />
      </Suspense>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Suspense fallback={<LoadingFallback text="Loading quiz header..." />}>
          <QuizHeader isQuizActive={isQuizStarted && !isQuizCompleted} onTimerEnd={handleTimeUp} />
        </Suspense>
        {isPaused && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 pointer-events-auto animate-pulse">
              <div className="text-center">
                <div className="text-6xl mb-4">⏸️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Paused</h3>
                <p className="text-gray-600">Click the Resume button in the header to continue</p>
              </div>
            </div>
          </div>
        )}
        <div className="pt-4 sm:pt-6 pb-8 px-4">
          <div className="max-w-6xl mx-auto">
            <Suspense fallback={<LoadingFallback text="Loading question..." />}>
              <QuestionCard question={currentQuestion} questionNumber={currentQuestionIndex + 1} totalQuestions={questions.length} selectedOption={userAnswers[currentQuestionIndex].selectedOption} onSelectOption={handleSelectOption} />
            </Suspense>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={handlePrevious} disabled={currentQuestionIndex === 0 || isPaused || timeLeft === 0} className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${currentQuestionIndex === 0 || isPaused || timeLeft === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl border-2 border-gray-200"}`}>← Previous</button>
              {currentQuestionIndex === questions.length - 1 ? (
                <button onClick={handleSubmit} disabled={isPaused || timeLeft === 0} className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${isPaused || timeLeft === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl hover:scale-105"}`}>Submit Quiz →</button>
              ) : (
                <button onClick={handleNext} disabled={isPaused || timeLeft === 0} className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${isPaused || timeLeft === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105"}`}>Next →</button>
              )}
            </div>
            <div className="mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700">Quick Navigation</h3>
                <span className="text-sm text-gray-600">Answered: {answeredCount}/{questions.length}</span>
              </div>
              <div className="grid grid-cols-5 xs:grid-cols-7 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
                {questions.map((_, index) => {
                  const isAnswered = userAnswers[index].selectedOption !== null;
                  const isCurrent = index === currentQuestionIndex;
                  return (
                    <button key={index} onClick={() => handleJumpToQuestion(index)} disabled={isPaused || timeLeft === 0} className={`aspect-square rounded-lg font-semibold text-sm transition-all duration-200 ${isCurrent ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110 ring-4 ring-blue-200" : isAnswered ? "bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300" : "bg-gray-100 text-gray-500 hover:bg-gray-200 border-2 border-gray-300"} ${isPaused || timeLeft === 0 ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}`}>{index + 1}</button>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-indigo-600"></div><span className="text-gray-600">Current</span></div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-green-100 border-2 border-green-300"></div><span className="text-gray-600">Answered</span></div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-gray-100 border-2 border-gray-300"></div><span className="text-gray-600">Unanswered</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
