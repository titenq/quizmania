import { IQuestion } from './IQuestion';

export interface IQuiz {
  userId: string;
  quizTitle: string;
  questions: IQuestion[];
}
