"use client";

import { Question } from "@/types/quiz";
import { useTimer } from "@/context/TimerContext";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: "A" | "B" | "C" | "D" | null;
  onSelectOption: (option: "A" | "B" | "C" | "D") => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
}: QuestionCardProps) {
  const options: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
  const { isPaused } = useTimer();

  return (
    <div className="w-full">
      <div className={`bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${isPaused ? 'opacity-60' : 'opacity-100'}`}>
        {/* Progress Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 border-b border-gray-100">
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700 bg-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-sm flex-shrink-0">
                Question {questionNumber} of {totalQuestions}
              </span>
              {question.id && (
                <span className="px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs sm:text-sm md:text-base font-bold rounded-lg sm:rounded-xl shadow-md flex-shrink-0">
                  #{question.id}
                </span>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 md:h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
          <div className="mt-1.5 sm:mt-2 text-right">
            <span className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
              {Math.round((questionNumber / totalQuestions) * 100)}% Complete
            </span>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-relaxed">
            {question.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
            {options.map((optionKey) => {
              const isSelected = selectedOption === optionKey;
              return (
                <button
                  key={optionKey}
                  onClick={() => !isPaused && onSelectOption(optionKey)}
                  disabled={isPaused}
                  className={`w-full p-2.5 sm:p-3 md:p-4 lg:p-5 text-left rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                    isPaused 
                      ? "cursor-not-allowed opacity-50" 
                      : "transform hover:scale-[1.02] cursor-pointer"
                  } ${
                    isSelected
                      ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 shadow-lg"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                    <span
                      className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {optionKey}
                    </span>
                    <span className="flex-1 text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed pt-0.5 sm:pt-1 pr-1 sm:pr-2">
                      {question.options[optionKey]}
                    </span>
                    {isSelected && (
                      <svg
                        className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selection Hint */}
          {!selectedOption && (
            <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 p-2.5 sm:p-3 md:p-4 bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-yellow-800 flex items-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Please select an answer to proceed</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
