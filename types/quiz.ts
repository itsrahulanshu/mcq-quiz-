export interface Question {
  id?: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: "A" | "B" | "C" | "D";
  explanation?: string;
}

export interface UserAnswer {
  questionIndex: number;
  selectedOption: "A" | "B" | "C" | "D" | null;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  notAttempted: number;
  score: number;
  maxScore: number;
  negativeMarks: number;
  percentage: number;
  wrongQuestions: {
    question: Question;
    userAnswer: string | null;
    correctAnswer: string;
    explanation?: string;
  }[];
  correctQuestions: {
    question: Question;
    userAnswer: string;
    explanation?: string;
  }[];
}
