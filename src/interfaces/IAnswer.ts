export interface IAnswer {
  question: string;
  answer: string;
  isRight: boolean;
}

export interface IAnswers {
  quizId: string;
  answers: IAnswer[];
}

export interface IAnswersCreateResponse {
  _id: string;
  quizId: string;
  answers: IAnswer[];
  totalAnswers: number;
  rightAnswers: number;
  wrongAnswers: number;
  createdAt: Date;
}

export interface IAnswersGet {
  _id: string;
  answers: IAnswer[];
  quizId: string;
  createdAt: Date;
}

export interface IAnswersPercentage {
  answersLength: number;
  percentRight: number;
  percentWrong: number;
}
