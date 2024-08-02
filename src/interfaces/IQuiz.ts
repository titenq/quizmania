export interface IQuestion {
  question: string;
  rightAnswer: string;
  wrongAnswers: string[];
}

export interface IQuestionModified {
  question: string;
  answers: string[];
}

export interface IQuiz {
  userId: string;
  quizTitle: string;
  questions: IQuestion[];
}

export interface IQuizResponse extends IQuiz {
  _id: string;
  createdAt: Date;
}

export interface IQuizModifiedResponse {
  _id: string;
  userId: string;
  quizTitle: string;
  questions: IQuestionModified[];
  createdAt: Date;
}

export interface IQuizzes {
  quizzes: IQuizResponse[];
  currentPage: number;
  totalPages: number;
}
