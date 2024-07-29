export interface IQuestion {
  question: string;
  rightAnswer: string;
  wrongAnswers: string[];
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

export interface IQuizzes {
  quizzes: IQuizResponse[];
  currentPage: number;
  totalPages: number;
}
