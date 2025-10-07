"use client";

import { useState, useCallback } from "react";
import QuestionInput from "@/components/QuestionInput";
import QuestionCard from "@/components/QuestionCard";
import QuizHeader from "@/components/QuizHeader";
import ResultCard from "@/components/ResultCard";
import { Question, UserAnswer, QuizResult } from "@/types/quiz";
import { useTimer } from "@/context/TimerContext";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const { startTimer, stopTimer, isPaused } = useTimer();

  const handleQuestionsLoaded = (loadedQuestions: Question[], selectedTimerMinutes: number) => {
    setQuestions(loadedQuestions);
    setUserAnswers(loadedQuestions.map((_, index) => ({ questionIndex: index, selectedOption: null })));
    setIsQuizStarted(true);
    setCurrentQuestionIndex(0);
    startTimer(selectedTimerMinutes);
    setIsQuizCompleted(false);
  };

  const handleSelectOption = (option: "A" | "B" | "C" | "D") => {
    if (isPaused) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex].selectedOption = option;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isPaused) return;
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (isPaused) return;
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    if (isPaused) return;
    setCurrentQuestionIndex(index);
  };

  const calculateResult = useCallback((): QuizResult => {
    let correctAnswers = 0;
    const wrongQuestions: QuizResult["wrongQuestions"] = [];
    const correctQuestions: QuizResult["correctQuestions"] = [];
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index].selectedOption;
      if (userAnswer === question.answer) {
        correctAnswers++;
        correctQuestions.push({ question, userAnswer: userAnswer, explanation: question.explanation });
      } else {
        wrongQuestions.push({ question, userAnswer: userAnswer || null, correctAnswer: question.answer, explanation: question.explanation });
      }
    });
    const totalQuestions = questions.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;
    return { totalQuestions, correctAnswers, wrongAnswers, score: correctAnswers, percentage, wrongQuestions, correctQuestions };
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

  if (!isQuizStarted) {
    return <QuestionInput onQuestionsLoaded={handleQuestionsLoaded} />;
  }

  if (isQuizCompleted && quizResult) {
    return <ResultCard result={quizResult} onRestart={handleRestart} allQuestionsData={getAllQuestionsData()} />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = getAnsweredCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <QuizHeader isQuizActive={isQuizStarted && !isQuizCompleted} onTimerEnd={handleTimeUp} />
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
          <QuestionCard question={currentQuestion} questionNumber={currentQuestionIndex + 1} totalQuestions={questions.length} selectedOption={userAnswers[currentQuestionIndex].selectedOption} onSelectOption={handleSelectOption} />
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0 || isPaused} className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${currentQuestionIndex === 0 || isPaused ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl border-2 border-gray-200"}`}>← Previous</button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button onClick={handleSubmit} disabled={isPaused} className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${isPaused ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl hover:scale-105"}`}>Submit Quiz →</button>
            ) : (
              <button onClick={handleNext} disabled={isPaused} className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${isPaused ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105"}`}>Next →</button>
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
                  <button key={index} onClick={() => handleJumpToQuestion(index)} disabled={isPaused} className={`aspect-square rounded-lg font-semibold text-sm transition-all duration-200 ${isCurrent ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110 ring-4 ring-blue-200" : isAnswered ? "bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300" : "bg-gray-100 text-gray-500 hover:bg-gray-200 border-2 border-gray-300"} ${isPaused ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}`}>{index + 1}</button>
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
  );
}
